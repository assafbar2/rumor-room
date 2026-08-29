import 'dotenv/config';

const appEnv = process.env.APP_ENV ?? process.env.NODE_ENV ?? 'development';
const nodeEnv = process.env.NODE_ENV ?? 'development';
const requestedMode = process.env.INVESTIGATION_MODE ?? 'fixture';

if (appEnv === 'production' && requestedMode !== 'live') {
  throw new Error('Production requires INVESTIGATION_MODE=live. Fixture evidence may not power the hosted submission.');
}

export const config = {
  appEnv,
  nodeEnv,
  port: Number(process.env.PORT ?? 8787),
  investigationMode: requestedMode === 'live' ? ('live' as const) : ('fixture' as const),
  googleModel: process.env.GOOGLE_MODEL ?? 'gemini-3.7-flash',
  googleCloudProject: process.env.GOOGLE_CLOUD_PROJECT ?? '',
  googleCloudLocation: process.env.GOOGLE_CLOUD_LOCATION ?? 'global',
  parallelApiKey: process.env.PARALLEL_API_KEY ?? '',
};

export function liveRuntimeReady() {
  return Boolean(config.googleCloudProject && config.parallelApiKey);
}
