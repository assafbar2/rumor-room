import {
  BaseLlm,
  InMemorySessionService,
  LlmAgent,
  Runner,
  isFinalResponse,
  stringifyContent,
  type BaseLlmConnection,
  type LlmResponse,
} from '@google/adk';
import { describe, expect, it, vi } from 'vitest';
import { createParallelTool, mergeSearchQueries, parseAgentJson, requireParallelCitations } from './live-provider.js';

const response = {
  analysis: 'The later official record contradicts the old date.',
  evidence: [
    {
      title: 'Updated release date',
      publisher: 'Example Studio',
      publishedAt: '2026-05-14',
      url: 'https://example.com/verified',
      excerpt: 'The release date changed.',
      stance: 'contradicts' as const,
      quality: 'official' as const,
      provenance: 'Direct studio update.',
      isIndependent: true,
    },
  ],
};

describe('live provider trust boundary', () => {
  it('parses fenced JSON without accepting prose as evidence', () => {
    expect(parseAgentJson(`\`\`\`json\n${JSON.stringify(response)}\n\`\`\``)).toEqual(response);
  });

  it('keeps only URLs actually returned by Parallel', () => {
    const evidence = [
      ...response.evidence,
      { ...response.evidence[0], url: 'https://hallucinated.example/source' },
    ];
    expect(requireParallelCitations(evidence, new Set(['https://example.com/verified']))).toEqual(response.evidence);
  });

  it('rejects an answer with no tool-grounded citations', () => {
    expect(() => requireParallelCitations(response.evidence, new Set())).toThrow(/Parallel tool response/);
  });

  it('rejects non-web citation protocols', () => {
    const unsafe = {
      ...response,
      evidence: [{ ...response.evidence[0], url: 'javascript:alert(1)' }],
    };
    expect(() => parseAgentJson(JSON.stringify(unsafe))).toThrow(/HTTP or HTTPS/);
  });

  it('keeps every Gemini query ahead of authored coverage queries', () => {
    const agentQueries = ['gemini query one', 'gemini query two', 'gemini query three'];
    const coverage = ['authored one', 'gemini query two', 'authored two', 'authored three'];
    const merged = mergeSearchQueries(agentQueries, coverage);

    expect(merged.slice(0, 3)).toEqual(agentQueries);
    expect(merged).toEqual([...agentQueries, 'authored one', 'authored two']);
  });

  it('passes Gemini queries first to Parallel when coverage hints are supplied', async () => {
    const search = vi.fn(async () => ({ search_id: 's', session_id: 'x', results: [] }));
    const tool = createParallelTool(new Set(), { search }, { queryHints: ['authored hint', 'example film date changed'] });
    await runScriptedInvestigation(tool);

    expect(search).toHaveBeenCalledWith(
      expect.objectContaining({
        search_queries: ['example film release date', 'example film date changed', 'authored hint'],
      }),
    );
  });

  it('runs the Parallel tool through the real Google ADK runner loop', async () => {
    const capturedUrls = new Set<string>();
    const search = vi.fn(async () => ({
      search_id: 'search_test',
      session_id: 'session_test',
      results: [
        {
          title: 'Updated release date',
          url: 'https://example.com/verified',
          publish_date: '2026-05-14',
          excerpts: ['The release date changed.'],
        },
      ],
    }));
    const tool = createParallelTool(capturedUrls, { search });
    const finalText = await runScriptedInvestigation(tool);

    expect(search).toHaveBeenCalledOnce();
    expect(capturedUrls).toEqual(new Set(['https://example.com/verified']));
    expect(parseAgentJson(finalText)).toEqual(response);
  });
});

async function runScriptedInvestigation(tool: ReturnType<typeof createParallelTool>) {
  const agent = new LlmAgent({
    name: 'test_investigator',
    model: new ScriptedInvestigatorModel(),
    instruction: 'Call the search tool, then return the evidence JSON.',
    tools: [tool],
  });
  const runner = new Runner({
    appName: 'rumor_room_test',
    agent,
    sessionService: new InMemorySessionService(),
  });

  let finalText = '';
  for await (const event of runner.runEphemeral({
    userId: 'test-player',
    newMessage: { role: 'user', parts: [{ text: 'Investigate the date.' }] },
  })) {
    if (isFinalResponse(event)) finalText = stringifyContent(event);
  }
  return finalText;
}

class ScriptedInvestigatorModel extends BaseLlm {
  private turn = 0;

  constructor() {
    super({ model: 'scripted-investigator' });
  }

  async *generateContentAsync(): AsyncGenerator<LlmResponse, void> {
    this.turn += 1;
    if (this.turn === 1) {
      yield {
        content: {
          role: 'model',
          parts: [
            {
              functionCall: {
                id: 'search-call-1',
                name: 'parallel_search',
                args: {
                  objective: 'Find the current official release date and any superseding announcement.',
                  searchQueries: ['example film release date', 'example film date changed'],
                  maxResults: 4,
                },
              },
            },
          ],
        },
      };
      return;
    }

    yield { content: { role: 'model', parts: [{ text: JSON.stringify(response) }] } };
  }

  async connect(): Promise<BaseLlmConnection> {
    throw new Error('Live connections are not used by this test model.');
  }
}
