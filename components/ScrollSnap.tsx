"use client";

import { useEffect, useRef } from "react";

/* ---------- PROPS ---------- */

type SnapToVhProps = {
  snapTo: "vh";
  snapVh: number;
  maxScrollY?: number;
  deltaThreshold?: number;
  offset?: number;
};

type SnapToIdProps = {
  snapTo: "id";
  targetId: string;
  maxScrollY?: number;
  deltaThreshold?: number;
  offset?: number;
};

type Props = SnapToVhProps | SnapToIdProps;

/* ---------- COMPONENT ---------- */

export default function ScrollSnap(props: Props) {
  const didSnap = useRef(false);

  useEffect(() => {
    const maxScrollY = props.maxScrollY ?? 120;
    const deltaThreshold = props.deltaThreshold ?? 24;
    const offset = props.offset ?? 0;

    const lockScroll = () => {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    };

    const unlockScroll = () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };

    const getSnapTop = () => {
      if (props.snapTo === "vh") {
        return window.innerHeight * (props.snapVh / 100) + offset;
      }

      const target = document.getElementById(props.targetId);
      if (!target) return null;

      const rect = target.getBoundingClientRect();
      return window.scrollY + rect.top + offset;
    };

    const onWheel = (e: WheelEvent) => {
      if (didSnap.current) return;
      if (e.deltaY <= deltaThreshold) return;
      if (window.scrollY > maxScrollY) return;

      const top = getSnapTop();
      if (top === null) return;

      e.preventDefault();
      didSnap.current = true;

      lockScroll();
      window.scrollTo({ top, behavior: "smooth" });

      window.setTimeout(unlockScroll, 700);
    };

    window.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", onWheel);
      unlockScroll();
    };
  }, [props]);

  return null;
}
