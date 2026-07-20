"use client";

import React from "react";
import { useReducedMotion } from "framer-motion";

type CssVars = React.CSSProperties & Record<string, string>;

const OPEN_HUB_EVENT = "portfolio:openHub";

export default function ScrollHint() {
  const reduceMotion = useReducedMotion();
  const [hoverEnter, setHoverEnter] = React.useState(false);

  const scrollToStage = () => {};

  const enterStage = () => {
    window.dispatchEvent(new Event(OPEN_HUB_EVENT));
  };

  const baseSurface: React.CSSProperties = {
    backgroundImage: "linear-gradient(to bottom, #ffffff 0%, #f3f3f3 100%)",
    boxShadow:
      "0 0 0 1px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.85), 0 2px 6px rgba(0,0,0,0.22), 0 18px 54px rgba(0,0,0,0.32)",
    transform: "translateZ(0)",
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
  };

  const hoverSurface: React.CSSProperties = {
    backgroundImage: "linear-gradient(to bottom, #f7c600 0%, #f0b800 100%)",
    boxShadow:
      "0 0 0 1px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.55), 0 3px 8px rgba(0,0,0,0.24), 0 24px 70px rgba(0,0,0,0.38)",
  };

  const baseClass =
    "inline-flex h-12 min-w-0 items-center text-black " +
    "text-[11px] font-semibold uppercase tracking-[0.3em] leading-none " +
    "select-none sm:text-[12px] sm:tracking-[0.34em]";

  const enterStyle: React.CSSProperties = hoverEnter
    ? {
        ...baseSurface,
        ...hoverSurface,
        transform: "translateY(-0.5px) scale(1.005) translateZ(0)",
      }
    : {
        ...baseSurface,
        transform: "translateY(0px) scale(1) translateZ(0)",
      };

  const WINDOW_H = 56;
  const TICK_H = 28;
  const TICK_W = 3;
  const PAD = 10;

  const FROM_Y = WINDOW_H + TICK_H + PAD;
  const TO_Y = -TICK_H - PAD;

  const DURATION = 6.5;

  const delayB = `-${(DURATION / 3).toFixed(3)}s`;
  const delayC = `-${((2 * DURATION) / 3).toFixed(3)}s`;

  const tickVars: CssVars = {
    "--fromY": `${FROM_Y}px`,
    "--toY": `${TO_Y}px`,
    "--dur": `${DURATION}s`,
    "--delayB": delayB,
    "--delayC": delayC,
  };

  return (
    <div className="hero-scroll-controls mt-7 w-full max-w-[490px] sm:mt-10">
      <div className="relative">
        <div className="grid grid-cols-[minmax(0,1fr)_7.75rem] gap-2.5 max-[380px]:grid-cols-1">
          <button
            type="button"
            onClick={scrollToStage}
            aria-disabled="true"
            className={`
              ${baseClass}
              pointer-events-none cursor-default justify-start px-7 opacity-90
              rounded-l-full rounded-r-[18px]
              max-[380px]:justify-center max-[380px]:rounded-full
              sm:px-10
            `}
            style={baseSurface}
          >
            Scroll
          </button>

          <button
            type="button"
            onClick={enterStage}
            className={`
              ${baseClass}
              justify-center px-5
              rounded-l-[18px] rounded-r-full
              transition-transform duration-200
              active:scale-[0.985]
              max-[380px]:rounded-full
              sm:px-7
            `}
            style={enterStyle}
            onMouseEnter={() => setHoverEnter(true)}
            onMouseLeave={() => setHoverEnter(false)}
            onFocus={() => setHoverEnter(true)}
            onBlur={() => setHoverEnter(false)}
          >
            Enter
          </button>
        </div>

        <div
          className="fm-ticks pointer-events-none absolute overflow-hidden"
          aria-hidden
          style={{
            left: 8,
            top: "calc(100% + 18px)",
            height: WINDOW_H,
            width: TICK_W,
            zIndex: 80,
            isolation: "isolate",
            ...tickVars,
          }}
        >
          <div
            className="fm-tick"
            style={{
              width: TICK_W,
              height: TICK_H,
              borderRadius: 2,
              backgroundColor: "rgba(255,255,255,0.85)",
              opacity: reduceMotion ? 0.85 : 1,
            }}
          />

          <div
            className="fm-tick fm-tick-b"
            style={{
              width: TICK_W,
              height: TICK_H,
              borderRadius: 2,
              backgroundColor: "rgba(255,255,255,0.72)",
            }}
          />

          <div
            className="fm-tick fm-tick-c"
            style={{
              width: TICK_W,
              height: TICK_H,
              borderRadius: 2,
              backgroundColor: "rgba(255,255,255,0.62)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
