import * as React from "react";
import { Dots, FaceText, Line, Solid } from "../kit/react/draw";
import { BENCH_ART, CABINET_ART, CARRIAGE_ART, DRAWERS, JACK_ART, LIFT_ART, PLUG_ART, PRINTER_ART, TABLET_ART } from "./geometry";

// Static parts as element props. Every root carries a key (react.md, "the large-page key-warning trap").

export const BENCH = (
  <g key="bench">
    <path className="iso-halo" d={BENCH_ART.halo} />
    {BENCH_ART.feet.map((parts, index) => (
      <g key={index}>
        {parts.map((paths, part) => (
          <Solid key={part} paths={paths} tone={part ? "mid" : "lo"} crease="faint" />
        ))}
      </g>
    ))}
    <Solid paths={BENCH_ART.slab} tone="lo" crease="faint" />
    <Line d={BENCH_ART.groove} tone="faint" />
    <Line d={BENCH_ART.screwRings} tone="lo" />
    <Dots points={BENCH_ART.screws} size={0.5} tone="mid" />
    <Solid paths={BENCH_ART.label} tone="lo" crease="none" />
    <Line d={BENCH_ART.labelLine} tone="faint" />
    <Line d={BENCH_ART.labelRule} tone="lo" free />
    <Dots points={BENCH_ART.labelScrews} size={0.45} tone="mid" />
    <path className="iso-halo osi-soft" d={BENCH_ART.cabinetHalo} />
    <path className="iso-halo osi-soft" d={BENCH_ART.printerHalo} />
  </g>
);

export const CABINET = (
  <g key="cabinet">
    <Solid paths={CABINET_ART.plinth} tone="lo" crease="faint" />
    <Dots points={CABINET_ART.plinthScrews} size={0.45} tone="mid" />
    <Solid paths={CABINET_ART.carcass} tone="mid" crease="faint" inner={<Line d={CABINET_ART.carcassSeam} tone="faint" />} />
    <Line d={CABINET_ART.sideRecess} tone="faint" />
    <Solid paths={CABINET_ART.cap} tone="mid" crease="faint" inner={<Line d={CABINET_ART.capSeam} tone="faint" />} />
    <Line d={CABINET_ART.capGroove} tone="faint" />
    <Dots points={CABINET_ART.capScrews} size={0.5} tone="mid" />
    <Solid paths={TABLET_ART.stand} tone="lo" crease="faint" />
    <Solid paths={TABLET_ART.body} tone="mid" crease="faint" />
    <Line d={TABLET_ART.screen} tone="lo" />
    <Line d={TABLET_ART.receipt} tone="faint" />
    <Line d={TABLET_ART.receiptRules} tone="lo" free />
    <Line d={TABLET_ART.button} tone="mid" />
    <Dots points={[TABLET_ART.camera]} size={0.5} tone="mid" />
  </g>
);

/** One drawer front with its pull and label holder; n = 1 … 7. */
export const DRAWER_FRONTS = DRAWERS.map((art, index) => (
  <g key={`front-${index + 1}`}>
    <Solid paths={art.front} tone="mid" crease="faint" inner={<Line d={art.frontSeam} tone="faint" />} className="osi-front" />
    <Line d={art.holder} tone="lo" />
    <Solid paths={art.card} tone="lo" crease="none" />
    <Dots points={art.rivets} size={0.45} tone="mid" />
    <FaceText transform={art.digit} size={6.2} tone="hi" anchor="middle">
      {index + 1}
    </FaceText>
    {art.lock ? <Line d={art.lock.ring} tone="lo" /> : null}
    {art.lock ? <Line d={art.lock.key} tone="mid" /> : null}
    {art.posts.map((paths, post) => (
      <Solid key={post} paths={paths} tone="mid" crease="none" />
    ))}
    <Solid paths={art.bar} tone="mid" crease="faint" />
  </g>
));

export const RAIL = (
  <g key="rail">
    <Solid paths={LIFT_ART.ruler} tone="lo" crease="none" />
    <Line d={LIFT_ART.ticksMinor} tone="lo" />
    <Line d={LIFT_ART.ticksMajor} tone="mid" />
    <Solid paths={LIFT_ART.rail} tone="mid" crease="faint" />
    <Line d={LIFT_ART.railLine} tone="faint" />
    <Dots points={LIFT_ART.railScrews} size={0.45} tone="mid" />
    {LIFT_ART.stops.map((paths, index) => (
      <Solid key={index} paths={paths} tone="mid" crease="faint" />
    ))}
    <Dots points={LIFT_ART.stopScrews} size={0.45} tone="mid" />
  </g>
);

export const CARRIAGE = (
  <g key="carriage">
    <Solid paths={CARRIAGE_ART.carriage} tone="mid" crease="faint" />
    <Line d={CARRIAGE_ART.gib} tone="faint" />
    <Dots points={CARRIAGE_ART.carriageScrews} size={0.45} tone="mid" />
    <Solid paths={CARRIAGE_ART.pointer} tone="hi" crease="none" />
    <Solid paths={CARRIAGE_ART.bracket} tone="mid" crease="none" />
    <Solid paths={CARRIAGE_ART.shelf} tone="mid" crease="faint" />
    <Dots points={CARRIAGE_ART.shelfScrews} size={0.45} tone="mid" />
  </g>
);

export const SHELF_LIP = (
  <g key="lip">
    <Solid paths={CARRIAGE_ART.shelfLip} tone="mid" crease="faint" />
  </g>
);

export const JACK = (
  <g key="jack">
    <Solid paths={JACK_ART.housing} tone="mid" crease="faint" />
    <Line d={JACK_ART.mouth} tone="lo" />
    <Line d={JACK_ART.ledRing} tone="lo" />
  </g>
);

export const PLUG = (
  <g key="plug">
    <Solid paths={PLUG_ART.plug} tone="hi" crease="lo" />
    <Solid paths={PLUG_ART.latch} tone="mid" crease="none" />
    <Solid paths={PLUG_ART.boot} tone="mid" crease="faint" />
    <Line d={PLUG_ART.bootRibs} tone="lo" />
  </g>
);

export const PRINTER = (
  <g key="printer">
    {PRINTER_ART.feet.map((paths, index) => (
      <Solid key={index} paths={paths} tone="lo" crease="none" />
    ))}
    <Solid paths={PRINTER_ART.body} tone="mid" crease="faint" inner={<Line d={PRINTER_ART.lidSeam} tone="faint" />} />
    <Line d={PRINTER_ART.lidLine} tone="faint" />
    <Line d={PRINTER_ART.ventRows} tone="faint" />
    <Line d={PRINTER_ART.slot} tone="lo" />
    <Solid paths={PRINTER_ART.button} tone="mid" crease="faint" />
    <Line d={PRINTER_ART.ledRing} tone="lo" />
  </g>
);

export const PRINTER_FRONT = (
  <g key="printer-front">
    <Solid paths={PRINTER_ART.cutter} tone="mid" crease="faint" />
  </g>
);

export const LED_POINTS = { jack: JACK_ART.led, printer: PRINTER_ART.led };
