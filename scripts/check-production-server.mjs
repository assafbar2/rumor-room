import { spawn } from 'node:child_process';

const port = 8793;
const server = spawn(process.execPath, ['dist-server/server/index.js'], {
  env: {
    ...process.env,
    NODE_ENV: 'production',
    APP_ENV: 'development',
    INVESTIGATION_MODE: 'fixture',
    PORT: String(port),
  },
  stdio: ['ignore', 'pipe', 'pipe'],
});

try {
  const health = await waitForServer(`http://127.0.0.1:${port}/api/health`);
  if (!health.ready || health.provider !== 'fixture') throw new Error('Compiled server health response is invalid.');

  const page = await fetch(`http://127.0.0.1:${port}/`);
  if (!page.ok) throw new Error(`Compiled client returned ${page.status}.`);
  for (const header of ['content-security-policy', 'x-content-type-options', 'x-frame-options', 'referrer-policy']) {
    if (!page.headers.get(header)) throw new Error(`Production response is missing ${header}.`);
  }
  if (!page.headers.get('content-security-policy')?.includes("worker-src 'self' blob:")) {
    throw new Error('Production CSP must allow the Tone.js blob worker.');
  }
} finally {
  server.kill('SIGTERM');
}

const guard = spawn(process.execPath, ['dist-server/server/index.js'], {
  env: {
    ...process.env,
    NODE_ENV: 'production',
    APP_ENV: 'production',
    INVESTIGATION_MODE: 'fixture',
    PORT: String(port + 1),
  },
  stdio: 'ignore',
});

const guardExit = await Promise.race([
  new Promise((resolve) => guard.once('exit', resolve)),
  new Promise((_, reject) => setTimeout(() => reject(new Error('Production fixture guard did not exit.')), 5000)),
]);

if (guardExit === 0) throw new Error('Production fixture guard allowed the server to start.');
console.log('production server: static app, health, security headers, and live-mode guard validated');

async function waitForServer(url) {
  let lastError;
  for (let attempt = 0; attempt < 30; attempt += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) return response.json();
      lastError = new Error(`Health returned ${response.status}.`);
    } catch (error) {
      lastError = error;
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw lastError ?? new Error('Compiled server did not start.');
}
