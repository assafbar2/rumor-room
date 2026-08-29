import fs from 'node:fs';
import path from 'node:path';

const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const runtimeDependencies = Object.keys(packageJson.dependencies ?? {});
const forbiddenPackages = [
  /openai/i,
  /anthropic/i,
  /langchain/i,
  /llamaindex/i,
  /mastra/i,
  /^ai$/i,
];

const forbiddenDependency = runtimeDependencies.find((name) =>
  forbiddenPackages.some((pattern) => pattern.test(name)),
);

if (forbiddenDependency) {
  throw new Error(`Forbidden non-Google AI runtime dependency: ${forbiddenDependency}`);
}

const sourceRoots = ['src', 'server', 'shared'];
const sourceFiles = sourceRoots.flatMap((root) => walk(root)).filter((file) => /\.[cm]?[jt]sx?$/.test(file));
const forbiddenImport = /(?:from\s+|import\s*\()['"](?:openai|@anthropic|langchain|llamaindex|@mastra|ai)[/'"]/i;

for (const file of sourceFiles) {
  if (forbiddenImport.test(fs.readFileSync(file, 'utf8'))) {
    throw new Error(`Forbidden non-Google AI import in ${file}`);
  }
}

if (!runtimeDependencies.includes('@google/adk') || !runtimeDependencies.includes('parallel-web')) {
  throw new Error('Required Google ADK and Parallel runtime dependencies must remain installed.');
}

console.log(`runtime policy: ${runtimeDependencies.length} dependencies and ${sourceFiles.length} source files checked`);

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const target = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(target) : [target];
  });
}
