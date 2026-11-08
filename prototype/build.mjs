// Inlines the Hairline kernel, the three figures, the app and its styles into one self-contained index.html.
import { readFileSync, writeFileSync } from 'node:fs';
const r = (f) => readFileSync(new URL(f, import.meta.url), 'utf8');
const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#F5F4F0">
<title>Under the Hood</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700;800&family=Manrope:wght@400;500;600;700;800&family=Archivo:wght@400;500;600;700;800;900&family=Inter:wght@600&display=swap">
<style>${r('./src/app.css')}</style>
</head>
<body>
<div class="app" id="app" data-style="studio">
  <div class="sb" aria-hidden="true"><span>9:41</span><svg width="68" height="13" viewBox="0 0 68 13" fill="currentColor"><rect x="0" y="8" width="3.2" height="5" rx="1"/><rect x="5.2" y="5.5" width="3.2" height="7.5" rx="1"/><rect x="10.4" y="3" width="3.2" height="10" rx="1"/><rect x="15.6" y=".5" width="3.2" height="12.5" rx="1"/><path d="M30 4.6a9 9 0 0 1 12 0l-1.5 1.5a7 7 0 0 0-9 0zM33 7.6a4.6 4.6 0 0 1 6 0L36 10.8z"/><rect x="45.5" y="1" width="20" height="11" rx="3.4" fill="none" stroke="currentColor" stroke-opacity=".4"/><rect x="47.3" y="2.8" width="14.5" height="7.4" rx="2"/></svg></div>
  <main id="view"></main>
  <div class="home-ind"></div>
</div>
<!-- Hairline kernel (MIT, Lucas Marques, github.com/lucasmarkes/hairline), unchanged -->
<script>${r('./vendor/hairline-kernel.js')}</script>
<script>window.hairline = (f) => { (window.__figs = window.__figs || []).push(f); };</script>
<script>{
${r('./figures/layers.js')}
}</script>
<script>{
${r('./figures/doors.js')}
}</script>
<script>{
${r('./figures/slicer.js')}
}</script>
<script>${r('./src/app.js').replace("const FIGS = {}; window.hairline = (f) => { FIGS[f.name] = f; };", "const FIGS = {}; (window.__figs || []).forEach((f) => { FIGS[f.name] = f; });")}</script>
</body>
</html>`;
writeFileSync(new URL('./index.html', import.meta.url), html);
// Artifact version: the platform supplies doctype, html, head, body and the viewport meta; the page starts with its title and styles.
const body = html.slice(html.indexOf('<body>') + 6, html.lastIndexOf('</body>'));
const NL = String.fromCharCode(10);
const head = html.slice(html.indexOf('<title>'), html.indexOf('</head>')).split(NL).filter((l) => !l.includes('theme-color')).join(NL);
writeFileSync(new URL('./artifact.html', import.meta.url), head + body);
console.log('index.html', Math.round(html.length / 1024) + ' KB');
