import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const out = join(dirname(fileURLToPath(import.meta.url)), '..');
const which = process.argv.slice(2);
const dirs = which.length ? which : ['A', 'B', 'C'];

const base = `*{box-sizing:border-box;margin:0;padding:0}
body{background:#C9CBC5;font-family:system-ui;padding:40px;-webkit-font-smoothing:antialiased}
.row{display:flex;gap:40px;align-items:flex-start}
.phone{width:390px;height:844px;position:relative;overflow:hidden;flex:none}
.sb{height:44px;display:flex;align-items:center;justify-content:space-between;padding:0 26px 0 30px;font-size:15px;font-weight:600;font-family:-apple-system,'SF Pro Text','Inter',sans-serif}
.lbl{font:600 14px system-ui;color:#2a2a2a;margin-bottom:10px}`;

for (const id of dirs) {
  const m = await import(`./dir${id}.mjs`);
  const phones = m.screens
    .map(([name, fn]) => `<div><div class="lbl">${m.meta.name} · ${name}</div><div class="phone ${m.meta.cls}" data-name="${m.meta.id} · ${name}">${fn()}</div></div>`)
    .join('\n');
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${m.meta.name} screens</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=${m.meta.fonts}&display=swap">
<style>${base}\n${m.css}</style></head><body><div class="row">${phones}</div></body></html>`;
  writeFileSync(join(out, `${id}.html`), html);
  console.log('wrote', id);
}
