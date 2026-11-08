/**
 * Doors: a server drawn as a long rounded block with six doors along its front,
 * one per port, each counted by the dots above it. A crate (a request) waits on
 * the floor. The pointer picks a door: it swings open, the others close, and the
 * crate slides to it. At rest door 4 stands ajar and the crate waits at door 5,
 * which is shut. The slider is how far a door opens, in degrees.
 *
 * Pattern: one of many. Tweens, a hit test on the doors' resting centres.
 */
const { Cam, clamp, facing, fit, prism, proj, rings, rrect, poly, open, mk, solid, put, rad, tween, tset, tval, tdone, register, pointer, disposer } = HL;

const LEN = 150, DEP = 40, H = 54, N = 6, DW = 15, DH = 30, PITCH = 22, U0 = 14;
const AJAR = 3, WAIT = 4;

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  let open_ = value;
  const C = Cam(45, 0.5, 1.62);
  fit(C, [[0, 0, 0], [LEN, DEP + 34, 0], [LEN, 0, 0], [0, DEP + 34, 0], [0, 0, H], [LEN, 0, H]], 200, 158);
  const P = proj(C), front = facing(C);
  const g = mk("g", {}, svg);
  const [ring, inner] = rings(0, 0, LEN, DEP, 8, 1.8);
  put(solid(g), prism(P, front, ring, inner, 0, H));
  // vents on the side the camera sees
  for (let k = 0; k < 4; k++) mk("path", { d: open([P(LEN, 10, H - 12 - k * 6), P(LEN, DEP - 10, H - 12 - k * 6)]), class: "nf lo" }, g);

  const onFront = (pts) => pts.map((q) => P(q.u, DEP, q.v));
  const doors = [];
  for (let i = 0; i < N; i++) {
    const u0 = U0 + i * PITCH, u1 = u0 + DW;
    mk("path", { d: poly(onFront(rrect(u0, 4, u1, 4 + DH, 2.2, 3))), class: "nf lo" }, g);
    const dots = [];
    for (let k = 0; k <= i; k++) {
      const c = mk("circle", { r: 0.95, class: "dot off" }, g);
      const p = P(u0 + 2.5 + (k % 3) * 4.4, DEP, 4 + DH + 5 + Math.floor(k / 3) * 3.6);
      c.setAttribute("cx", p[0]); c.setAttribute("cy", p[1]);
      dots.push(c);
    }
    const leaf = mk("path", { class: "" }, g);
    doors.push({ u0, u1, dots, leaf, th: tween(i === AJAR ? 32 : 0), drawn: NaN });
  }
  const crate = solid(g);
  const cx = tween(U0 + WAIT * PITCH + DW / 2);
  let act = -1;

  function leafPath(d, th) {
    const c = Math.cos(rad(th)), s = Math.sin(rad(th)), w = d.u1 - d.u0;
    const pts = rrect(0, 4, w, 4 + DH, 2.2, 3).map((q) => P(d.u0 + q.u * c, DEP + q.u * s, q.v));
    return poly(pts);
  }
  function draw(now) {
    let moving = false;
    for (const d of doors) {
      const th = tval(d.th, now);
      if (!tdone(d.th, now)) moving = true;
      if (th !== d.drawn) { d.drawn = th; d.leaf.setAttribute("d", leafPath(d, th)); }
    }
    const x = tval(cx, now);
    if (!tdone(cx, now)) moving = true;
    const [r, i] = rings(x - 7, DEP + 16, x + 7, DEP + 30, 3, 1);
    put(crate, prism(P, front, r, i, 0, 11));
    return moving;
  }
  const B = register(stage, (_dt, now) => draw(now));
  bag.add(B.unregister);

  function pick(a) {
    if (a === act) return;
    const now = performance.now();
    act = a;
    doors.forEach((d, i) => {
      tset(d.th, a < 0 ? (i === AJAR ? 32 : 0) : i === a ? open_ : 0, now, 0);
      d.leaf.classList.toggle("hi", i === a);
      d.dots.forEach((c) => c.setAttribute("class", i === (a < 0 ? WAIT : a) ? "dot" : "dot off"));
    });
    const to = a < 0 ? WAIT : a;
    tset(cx, U0 + to * PITCH + DW / 2, now, 0);
    crate.sil.classList.toggle("hi", a < 0);
    read.textContent = a < 0 ? "rest" : "door " + (a + 1);
    B.wake();
  }
  const centres = doors.map((d) => P((d.u0 + d.u1) / 2, DEP, DH / 2)[0]);
  const hit = ([x]) => {
    let best = 0;
    centres.forEach((c, i) => { if (Math.abs(x - c) < Math.abs(x - centres[best])) best = i; });
    return clamp(best, 0, N - 1);
  };
  act = 0; pick(-1);
  bag.add(pointer(stage, { move: (p) => pick(hit(p)), leave: () => pick(-1) }));
  bag.add(() => svg.replaceChildren());
  function replay(o) {
    const now = performance.now();
    act = -3;
    doors.forEach((d, i) => {
      tset(d.th, i === o ? open_ : 0, now, 0);
      d.leaf.classList.toggle("hi", false);
      d.dots.forEach((c) => c.setAttribute("class", i === WAIT ? "dot" : "dot off"));
    });
    tset(cx, U0 + WAIT * PITCH + DW / 2, now, 0);
    crate.sil.classList.toggle("hi", true);
    read.textContent = "shut";
    B.wake();
  }
  return { set: (v) => { open_ = v; const a = act; act = -2; pick(a); }, pick: (a) => pick(a), replay, destroy: bag.dispose };
}

hairline({
  name: "doors",
  means: "A server with a door per port: point at one and it opens, the rest close, and the waiting crate slides over to it.",
  rules: [1, 4, 5, 10],
  range: [55, 80, 110],
  mount,
});
