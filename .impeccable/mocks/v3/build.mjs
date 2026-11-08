import { writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { D1, D2, D3 } from './dirs.mjs';
import { KITS, drag, replay, ports, summary, shared } from './more.mjs';
for (const D of [D1, D2, D3]) Object.assign(D, { drag: () => drag(KITS[D.id]), replay: () => replay(KITS[D.id]), ports: () => ports(KITS[D.id]), summary: () => summary(KITS[D.id]), shared: () => shared(KITS[D.id]) });

const out = dirname(fileURLToPath(import.meta.url));
const screens = process.argv[2] ? process.argv[2].split(',') : ['home', 'step', 'drag', 'replay', 'ports', 'summary', 'shared'];
const NAMES = { home: 'Module home', step: 'Lesson step', drag: 'Practice: drag and place', replay: 'Mistake replay', ports: 'Port Match drill', summary: 'Week summary', shared: 'Shared figure' };
const dirs = [D1, D2, D3];
const fonts = dirs.map((d) => `family=${d.font}`).join('&');
const base = `*{box-sizing:border-box;margin:0;padding:0}
body{background:#D9D9D6;padding:32px;font-family:system-ui;-webkit-font-smoothing:antialiased}
.grid{display:flex;flex-direction:column;gap:40px}.rowd{display:flex;gap:32px}
.phone{width:390px;height:844px;position:relative;overflow:hidden;flex:none;border-radius:0}
.sb{height:47px;display:flex;align-items:center;justify-content:space-between;padding:4px 30px 0 34px;font:600 16px -apple-system,'SF Pro Text','Inter',sans-serif}
.lbl{font:600 15px system-ui;color:#333;margin-bottom:10px}
.hi{position:absolute;bottom:8px;left:50%;width:134px;height:5px;border-radius:3px;background:#111;transform:translateX(-50%)}`;
const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Network+ pilot directions</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?${fonts}&display=swap"><style>${base}${dirs.map((d) => d.css).join('')}</style></head>
<body><div class="grid">${dirs.map((d) => `<div class="rowd">${screens.map((s) => `<div><div class="lbl">${d.name} · ${NAMES[s]}</div><div class="phone ${d.id}" data-name="${d.name} · ${NAMES[s]}">${d[s]()}</div></div>`).join('')}</div>`).join('')}</div></body></html>`;
writeFileSync(join(out, 'screens.html'), html);
// one self-contained file per direction for Figma import (fonts by name; Figma has them)
for (const d of dirs) writeFileSync(join(out, `figma-${d.id}.html`), `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${d.name}</title><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=${d.font}&display=swap"><style>${base}${d.css}</style></head><body><div class="rowd">${screens.map((s) => `<div class="phone ${d.id}" data-name="${d.name} · ${NAMES[s]}">${d[s]()}</div>`).join('')}</div></body></html>`);
console.log('ok', screens.join(','));
