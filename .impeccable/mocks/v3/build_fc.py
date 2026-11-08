# Builds the FigCraft file through FigCraft's own MCP server (stdio), one row per direction.
import json, subprocess, base64, pathlib
EXE = r"C:\Program Files\ArtCraft\FigCraft\figcraft-cli.exe"
ROOT = r"D:\Programming\Self Learning\Projects\Misc\Computer Fundamentals"
V3 = pathlib.Path(ROOT) / ".impeccable" / "mocks" / "v3"
p = subprocess.Popen([EXE, "mcp", "--automation-write-root", ROOT, "--automation-read-root", "D:\\"],
                     stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, encoding="utf-8")
nid = 0
def rpc(method, params=None, notify=False):
    global nid
    msg = {"jsonrpc": "2.0", "method": method}
    if params is not None: msg["params"] = params
    if not notify: nid += 1; msg["id"] = nid
    p.stdin.write(json.dumps(msg) + "\n"); p.stdin.flush()
    if notify: return None
    while True:
        r = json.loads(p.stdout.readline())
        if r.get("id") == nid: return r
def tool(name, args):
    r = rpc("tools/call", {"name": name, "arguments": args})
    res = r.get("result", {})
    if "error" in r or res.get("isError"): raise SystemExit(f"{name} failed: {json.dumps(r)[:800]}")
    return res
def cmd(command, params):
    txt = "".join(c.get("text", "") for c in tool("run_command", {"command": command, "params": params})["content"])
    return json.loads(txt) if txt.strip().startswith(("{", "[")) else txt

rpc("initialize", {"protocolVersion": "2025-06-18", "capabilities": {}, "clientInfo": {"name": "claude-session", "version": "1"}})
rpc("notifications/initialized", {}, notify=True)

INK, INK2 = "#1C1B19", "#64625D"
def text(t, x, y, size, style, color, name):
    return cmd("text.create", {"text": t, "x": x, "y": y, "name": name, "props": {"fontFamily": "Geist", "fontStyle": style, "fontSize": size, "fill": color}})["id"]

cmd("file.rename", {"name": "Network+ pilot — 3 visual directions"})
text("Network+ pilot — three visual directions", 0, 0, 56, "Bold", INK, "Title")
text("Your first week as a network tech · Brew & Byte · 7 screens per direction · figures drawn on Hairline’s engine", 0, 78, 22, "Regular", INK2, "Subtitle")

ROWS = [
    ("studio", "Studio", "Light. White cards with soft depth, figures on pale objective tints. Geist."),
    ("night-shift", "Night shift", "Dark. Figures on deep tinted stages with bright line work. Manrope."),
    ("ticket-desk", "Ticket desk", "Bold colour panel per objective, tickets with a perforated stub. Archivo."),
]
SCREENS = [("1-home", "Module home"), ("2-lesson-step", "Lesson step"), ("3-practice-drag", "Practice: drag and place"),
           ("4-mistake-replay", "Mistake replay"), ("5-port-match", "Port Match drill"), ("6-week-summary", "Week summary"),
           ("7-shared-figure", "Shared figure")]
GAP_X, ROW_H, TOP = 60, 844 + 300, 200
frames = []
for r, (slug, title, blurb) in enumerate(ROWS):
    y0 = TOP + r * ROW_H
    text(title, 0, y0, 40, "Bold", INK, f"{title} · label")
    text(blurb, 0, y0 + 54, 20, "Regular", INK2, f"{title} · description")
    for c, (file, label) in enumerate(SCREENS):
        x = c * (390 + GAP_X)
        fid = cmd("file.import", {"path": str(V3 / "svg" / f"{slug}-{file}.svg"), "x": x, "y": y0 + 120})["id"]
        tool("set_properties", {"ids": [fid], "props": {"name": f"{title} · {label}"}})
        text(label, x, y0 + 120 + 844 + 18, 16, "Medium", INK2, f"{title} · {label} · caption")
        frames.append(fid)
    print("row", title, "done")

out = V3 / "network-plus-directions.figcraft"
tool("save_file", {"path": str(out)})
info = json.loads("".join(c.get("text", "") for c in tool("inspect_document", {"depth": 1, "fields": ["name", "type"]})["content"]))
print("saved", out, "| top-level layers:", len(info["pages"][0]["children"]), "| frames:", len(frames), "| dirty:", info["dirty"])
shot = tool("screenshot", {"maxSize": 2400})
for c in shot["content"]:
    if c.get("type") == "image":
        pathlib.Path(r"D:\tmp_render\nplus\fc\page.png").write_bytes(base64.b64decode(c["data"]))
        print("screenshot saved")
p.stdin.close(); p.terminate()
