# Assembles hairline-<name>.html the way hairline-create's SKILL.md says to without Node:
# copy bench.html, put kernel.js at /*KERNEL*/ and the figure at /*FIGURE*/, change nothing else.
import sys, pathlib
HL = pathlib.Path(r"D:\tmp_render\nplus\hl")
here = pathlib.Path(__file__).parent
bench = (HL / "bench.html").read_text(encoding="utf-8")
kernel = (HL / "kernel.js").read_text(encoding="utf-8")
for name in sys.argv[1:]:
    fig = (here / f"{name}.js").read_text(encoding="utf-8")
    page = bench.replace("/*KERNEL*/", kernel, 1).replace("/*FIGURE*/", fig, 1)
    (here / f"hairline-{name}.html").write_text(page, encoding="utf-8")
    print("built", name)
