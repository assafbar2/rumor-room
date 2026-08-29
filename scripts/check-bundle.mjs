import fs from 'node:fs';
import path from 'node:path';

const manifestPath = path.resolve('dist/.vite/manifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const entries = Object.values(manifest);
const entry = entries.find((item) => item.isEntry);

if (!entry) throw new Error('Vite manifest contains no entry chunk.');

const bytes = (file) => fs.statSync(path.resolve('dist', file)).size;
const kib = (value) => `${(value / 1024).toFixed(1)} KiB`;
const initialJs = bytes(entry.file);
const initialCss = (entry.css ?? []).reduce((total, file) => total + bytes(file), 0);
const lazyJs = entries.filter((item) => !item.isEntry && item.file?.endsWith('.js')).map((item) => bytes(item.file));
const largestLazy = Math.max(0, ...lazyJs);
const totalJs = initialJs + lazyJs.reduce((total, size) => total + size, 0);

const budgets = {
  initialJs: 240 * 1024,
  initialCss: 32 * 1024,
  largestLazy: 380 * 1024,
  totalJs: 650 * 1024,
};

const metrics = { initialJs, initialCss, largestLazy, totalJs };
const failures = Object.entries(metrics).filter(([name, value]) => value > budgets[name]);

console.log(`bundle: initial JS ${kib(initialJs)}, CSS ${kib(initialCss)}, largest lazy JS ${kib(largestLazy)}, total JS ${kib(totalJs)}`);

if (failures.length) {
  for (const [name, value] of failures) {
    console.error(`${name} exceeded budget: ${kib(value)} > ${kib(budgets[name])}`);
  }
  process.exit(1);
}
