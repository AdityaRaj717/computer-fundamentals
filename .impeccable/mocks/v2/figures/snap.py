# Renders a hairline-<name>.html pose in headless Chrome and saves the figure's svg (classes kept) to snaps/<out>.svg.
# usage: snap.py <name> <query> <out>   e.g. snap.py doors "at=230,170" doors-443
import subprocess, sys, re, pathlib
here = pathlib.Path(__file__).parent
CH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
name, q, out = sys.argv[1], sys.argv[2], sys.argv[3]
url = f"file:///{here.as_posix()}/hairline-{name}.html?{q}".replace(" ", "%20")
dom = subprocess.run([CH, "--headless=new", "--disable-gpu", r"--user-data-dir=D:\tmp_render\nplus\prof", "--window-size=820,900",
                      "--virtual-time-budget=5000", "--dump-dom", url], capture_output=True, timeout=120).stdout.decode("utf-8")
m = re.search(r'<svg viewBox="0 0 400 320"[^>]*>.*?</svg>', dom, re.S)
svg = m.group(0)
svg = re.sub(r'<path class="[^"]*" d=""></path>', "", svg)
svg = re.sub(r"<g></g>", "", svg)
read = re.search(r'data-hairline-read[^>]*>([^<]*)<', dom) or re.search(r'class="read[^"]*"[^>]*>([^<]*)<', dom)
nums = [float(n) for n in re.findall(r"-?\d+\.?\d*", " ".join(re.findall(r' d="([^"]+)"', svg)))]
xs, ys = nums[0::2], nums[1::2]
(here / "snaps").mkdir(exist_ok=True)
(here / "snaps" / f"{out}.svg").write_text(svg, encoding="utf-8")
print(out, "bbox x", round(min(xs)), round(max(xs)), "y", round(min(ys)), round(max(ys)), "read:", read.group(1) if read else "?")
