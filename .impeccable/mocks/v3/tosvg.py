# Renders figma-D*.html with tosvg.js injected, then writes one SVG per screen into svg/.
import subprocess, pathlib, json, re, html
here = pathlib.Path(__file__).parent
CH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
out = here / "svg"; out.mkdir(exist_ok=True)
js = (here / "tosvg.js").read_text(encoding="utf-8")
slug = {"D1": "studio", "D2": "night-shift", "D3": "ticket-desk"}
names = ["1-home", "2-lesson-step", "3-practice-drag", "4-mistake-replay", "5-port-match", "6-week-summary", "7-shared-figure"]
for d, sl in slug.items():
    page = (here / f"figma-{d}.html").read_text(encoding="utf-8").replace("</body>", f"<script>{js}</script></body>")
    tmp = here / f"_svgexport-{d}.html"; tmp.write_text(page, encoding="utf-8")
    dom = subprocess.run([CH, "--headless=new", "--disable-gpu", r"--user-data-dir=D:\tmp_render\nplus\prof", "--window-size=3020,910",
                          "--virtual-time-budget=10000", "--dump-dom", tmp.as_uri()], capture_output=True, timeout=180).stdout.decode("utf-8")
    m = re.search(r'<pre id="svg-out">(.*?)</pre>', dom, re.S)
    items = json.loads(html.unescape(m.group(1)))
    for i, it in enumerate(items):
        (out / f"{sl}-{names[i]}.svg").write_text(it["svg"], encoding="utf-8")
    tmp.unlink()
    print(d, len(items), "screens")
