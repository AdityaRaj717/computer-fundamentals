// Shared helpers: Hairline snapshots resolved to a theme, icons, status bar.
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const SNAPS = join(dirname(fileURLToPath(import.meta.url)), '..', 'v2', 'figures', 'snaps');

// Hairline's own class palette (kernel css), written out as attributes so the svg survives import into Figma.
export function figure(name, hl, { w, h, pad = 12, label = '' } = {}) {
  let svg = readFileSync(join(SNAPS, `${name}.svg`), 'utf8');
  const nums = [];
  for (const d of svg.matchAll(/ d="([^"]+)"/g)) nums.push(...d[1].match(/-?\d+\.?\d*/g).map(Number));
  const xs = nums.filter((_, i) => i % 2 === 0), ys = nums.filter((_, i) => i % 2 === 1);
  const x0 = Math.min(...xs) - pad, x1 = Math.max(...xs) + pad, y0 = Math.min(...ys) - pad, y1 = Math.max(...ys) + pad;
  const vw = x1 - x0, vh = y1 - y0;
  const scale = Math.min(w / vw, h / vh);
  const sw = (hl.sw || 0.9) / scale;
  svg = svg.replace(/<(path|polygon|ellipse|line|circle)([^>]*?)(\/?)>/g, (m, tag, attrs, sl) => {
    const cls = ((attrs.match(/class="([^"]*)"/) || [])[1] || '').split(/\s+/).filter(Boolean);
    const has = (c) => cls.includes(c);
    let fill = hl.plate, stroke = hl.mid, dash = '';
    if (has('nf')) fill = 'none';
    if (has('fo')) stroke = 'none';
    if (has('sil')) stroke = hl.edge;
    if (has('lo')) stroke = hl.lo;
    if (has('hi')) stroke = hl.hi;
    if (has('dash')) dash = ` stroke-dasharray="${(1 / scale).toFixed(2)} ${(3 / scale).toFixed(2)}"`;
    if (has('dot')) { stroke = 'none'; fill = has('m') ? hl.edge : has('off') ? hl.lo : hl.hi; }
    if (tag === 'circle' && !has('dot')) fill = hl.hi;
    const a = attrs.replace(/\s*class="[^"]*"/, '');
    return `<${tag}${a} fill="${fill}" stroke="${stroke}" stroke-width="${sw.toFixed(3)}" stroke-linejoin="round" stroke-linecap="round"${dash}${sl}>`;
  });
  svg = svg.replace(/<svg viewBox="0 0 400 320"[^>]*>/, `<svg viewBox="${x0.toFixed(1)} ${y0.toFixed(1)} ${vw.toFixed(1)} ${vh.toFixed(1)}" width="${w}" height="${h}" role="img" aria-label="${label}" xmlns="http://www.w3.org/2000/svg">`);
  return svg;
}

// Phosphor-style regular icons, 24 grid, one stroke weight.
const I = {
  x: '<path d="M18 6 6 18M6 6l12 12"/>',
  flag: '<path d="M5 21V4.5M5 15.5c5-3.5 9 3 14 0v-11c-5 3.5-9-3-14 0"/>',
  back: '<path d="M15 19 8 12l7-7"/>',
  share: '<path d="M12 15V3.5M7.5 8 12 3.5 16.5 8M8 11H5.5v9.5h13V11H16"/>',
  today: '<path d="M4 10.5 12 4l8 6.5V20h-5.5v-5.5h-5V20H4z"/>',
  practice: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r=".8" fill="currentColor"/>',
  review: '<path d="M4.5 9.5A8 8 0 0 1 19 8M19.5 14.5A8 8 0 0 1 5 16M19 3.5V8h-4.5M5 20.5V16h4.5"/>',
  progress: '<path d="M4 20h16M7 20v-7M12 20V6M17 20v-10"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
  checkc: '<circle cx="12" cy="12" r="9"/><path d="m8 12.3 2.8 2.8L16 9.8"/>',
  xc: '<circle cx="12" cy="12" r="9"/><path d="m9 9 6 6M15 9l-6 6"/>',
  play: '<path d="M7.5 5v14l11-7z"/>',
  timer: '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2.5M9.5 2.5h5"/>',
  xray: '<path d="M4 8V5.5A1.5 1.5 0 0 1 5.5 4H8M16 4h2.5A1.5 1.5 0 0 1 20 5.5V8M20 16v2.5a1.5 1.5 0 0 1-1.5 1.5H16M8 20H5.5A1.5 1.5 0 0 1 4 18.5V16M4 12h16"/>',
  arrow: '<path d="M4.5 12h15M13 5.5l6.5 6.5-6.5 6.5"/>',
  dots: '<circle cx="5.5" cy="12" r="1.2" fill="currentColor"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/><circle cx="18.5" cy="12" r="1.2" fill="currentColor"/>',
  bolt: '<path d="M13.5 3 5 13.5h6L10.5 21 19 10.5h-6z"/>',
  lock: '<rect x="5" y="10.5" width="14" height="10" rx="2"/><path d="M8.5 10.5V7.5a3.5 3.5 0 0 1 7 0v3"/>',
  circle: '<circle cx="12" cy="12" r="8.5"/>',
  half: '<circle cx="12" cy="12" r="8.5"/><path d="M12 3.5a8.5 8.5 0 0 1 0 17z" fill="currentColor" stroke="none"/>',
  mail: '<rect x="3.5" y="5.5" width="17" height="13" rx="2.5"/><path d="m4.5 7.5 7.5 5.5 7.5-5.5"/>',
  next: '<path d="m9 5 7 7-7 7"/>',
  replay: '<path d="M4 12a8 8 0 1 0 2.3-5.7M4 4v4.5h4.5"/>',
};
export const icon = (n, s = 24, w = 1.6, c = 'currentColor') =>
  `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="color:${c};flex:none">${I[n]}</svg>`;

export const statusBar = (c) => `<div class="sb" style="color:${c}"><span>9:41</span><svg width="68" height="13" viewBox="0 0 68 13" fill="${c}" aria-hidden="true"><rect x="0" y="8" width="3.2" height="5" rx="1"/><rect x="5.2" y="5.5" width="3.2" height="7.5" rx="1"/><rect x="10.4" y="3" width="3.2" height="10" rx="1"/><rect x="15.6" y=".5" width="3.2" height="12.5" rx="1"/><path d="M30 4.6a9 9 0 0 1 12 0l-1.5 1.5a7 7 0 0 0-9 0zM33 7.6a4.6 4.6 0 0 1 6 0L36 10.8z"/><rect x="45.5" y="1" width="20" height="11" rx="3.4" fill="none" stroke="${c}" stroke-opacity=".4"/><rect x="47.3" y="2.8" width="14.5" height="7.4" rx="2"/><rect x="66.6" y="4.6" width="1.4" height="3.8" rx=".7" fill-opacity=".4"/></svg></div>`;
