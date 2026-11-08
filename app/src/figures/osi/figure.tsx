import * as React from "react";
import { Plate } from "../kit/react/draw";
import { BENCH, CABINET, CARRIAGE, DRAWER_FRONTS, JACK, LED_POINTS, PLUG, PRINTER, PRINTER_FRONT, RAIL, SHELF_LIP } from "./art";
import { OsiLive, type OsiHandle, type OsiLiveProps } from "./live";
import { PAYLOAD, WIRE_BYTES, readoutOf, READY } from "./model";
import "./osi.css";

export type { OsiHandle };

interface OsiFigureProps extends Pick<OsiLiveProps, "tour" | "plugged" | "fault" | "onCable" | "onSendDone" | "onPick" | "onSend"> {
  ref?: React.Ref<OsiHandle>;
  hint?: string;
  /** Show the legend and caption under the card (the lesson screen keeps them off on phones). */
  legend?: boolean;
  /** "card" is the framed plate (share view); "stage" fills its parent, for the lesson screen. */
  variant?: "card" | "stage";
}

export function OsiFigure({ ref, hint = "Tap a drawer", legend = false, plugged = true, variant = "card", ...rest }: OsiFigureProps) {
  return (
    <div className={variant === "stage" ? "iso osi osi--stage" : "iso osi"} data-theme="light">
      <Plate
        fig="Fig 1"
        title="OSI cabinet"
        hint={hint}
        readout={readoutOf(READY, null, plugged)}
        keys={
          legend
            ? [
                { mark: "lit", label: "The print job: it grows one plate per header on the way down" },
                { mark: "raised", label: "Drawers: what each layer adds, 2 units per byte" },
              ]
            : []
        }
        caption={
          legend
            ? `Jo's ${PAYLOAD}-byte receipt goes down seven layers, picks up TCP, IP and Ethernet headers, and leaves as ${WIRE_BYTES} bytes of signal on the cable. Layers 5 and 6 add nothing here (simplified).`
            : undefined
        }
      >
        <OsiLive
          ref={ref}
          plugged={plugged}
          bench={BENCH}
          cabinet={CABINET}
          fronts={DRAWER_FRONTS}
          jack={JACK}
          plug={PLUG}
          rail={RAIL}
          carriage={CARRIAGE}
          lip={SHELF_LIP}
          printer={PRINTER}
          printerFront={PRINTER_FRONT}
          leds={LED_POINTS}
          {...rest}
        />
      </Plate>
    </div>
  );
}
