# Minimal MCP stdio client for FigCraft's own MCP server (figcraft-cli mcp), same args as .mcp.json.
# usage: fcmcp.py list            -> prints the server's tools
#        fcmcp.py call <calls.json> -> runs [{"tool": name, "args": {...}}, ...] in one session, prints each result
import json, subprocess, sys
EXE = r"C:\Program Files\ArtCraft\FigCraft\figcraft-cli.exe"
ROOT = r"D:\Programming\Self Learning\Projects\Misc\Computer Fundamentals"
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
        line = p.stdout.readline()
        if not line: raise SystemExit("server closed: " + p.stderr.read()[:2000])
        r = json.loads(line)
        if r.get("id") == nid: return r
rpc("initialize", {"protocolVersion": "2025-06-18", "capabilities": {}, "clientInfo": {"name": "claude-session", "version": "1"}})
rpc("notifications/initialized", {}, notify=True)
if sys.argv[1] == "list":
    for t in rpc("tools/list")["result"]["tools"]:
        print("##", t["name"], "-", (t.get("description") or "")[:600].replace("\n", " "))
        print("   params:", json.dumps(t.get("inputSchema", {}).get("properties", {}))[:900])
else:
    calls = json.load(open(sys.argv[2], encoding="utf-8"))
    for c in calls:
        r = rpc("tools/call", {"name": c["tool"], "arguments": c.get("args", {})})
        res = r.get("result") or r.get("error")
        txt = " ".join(x.get("text", "") for x in (res.get("content") or [])) if isinstance(res, dict) and "content" in res else json.dumps(res)
        print(c["tool"], "->", ("ERROR " if (isinstance(res, dict) and res.get("isError")) or "error" in r else ""), txt[:700])
p.stdin.close(); p.terminate()
