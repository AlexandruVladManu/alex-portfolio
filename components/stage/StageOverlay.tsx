"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import {
  motion,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";
import StageShell from "./StageShell";
import type { Slide } from "./stageTypes";
import {
  THROTTLE_WHEEL,
  THROTTLE_TOUCH,
  THROTTLE_KEYS,
  IGNORE_INPUT_MS,
} from "./stageMotion";

type Props = {
  slides: readonly Slide[];
  phase: MotionValue<number>;
  enabled?: boolean;
};

export default function StageOverlay({ slides, phase, enabled = true }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  const isAnimatingRef = useRef(false);

  const STAGE_ACTIVE_AT = 0.94;

  const didInitIndex = useRef(false);
  const lastNavAt = useRef(0);
  const ignoreInputUntil = useRef(0);
  const stageActiveRef = useRef(false);

  const touchStartY = useRef<number | null>(null);
  const touchLastY = useRef<number | null>(null);

  const y = useTransform(phase, [0, 1], [900, 0]);
  const opacity = useTransform(phase, [0, 0.55, 1], [0, 0, 1]);

  const pointerEvents = useTransform(
    phase,
    [0, STAGE_ACTIVE_AT - 0.02, STAGE_ACTIVE_AT],
    ["none", "none", "auto"],
  );

  const active = useMemo(() => {
    if (!slides.length) return null;
    return slides[Math.min(activeIndex, slides.length - 1)];
  }, [slides, activeIndex]);

  const goTo = useCallback(
    (i: number) => {
      if (!slides.length) return;
      const clamped = Math.max(0, Math.min(i, slides.length - 1));
      setActiveIndex(clamped);
    },
    [slides.length],
  );

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => {
      if (!slides.length) return prev;
      return Math.max(prev - 1, 0);
    });
  }, [slides.length]);

  const goNext = useCallback(() => {
    setActiveIndex((prev) => {
      if (!slides.length) return prev;
      return Math.min(prev + 1, slides.length - 1);
    });
  }, [slides.length]);

  // Animation lock sync
  useEffect(() => {
    const onStart = () => {
      isAnimatingRef.current = true;
    };
    const onEnd = () => {
      isAnimatingRef.current = false;
    };

    window.addEventListener("stage:animStart", onStart);
    window.addEventListener("stage:animEnd", onEnd);

    return () => {
      window.removeEventListener("stage:animStart", onStart);
      window.removeEventListener("stage:animEnd", onEnd);
      isAnimatingRef.current = false;
    };
  }, []);

  const canNavNow = (now: number) => {
    if (!enabled) return false;
    if (!stageActiveRef.current) return false;
    if (isAnimatingRef.current) return false;
    if (now < ignoreInputUntil.current) return false;
    return true;
  };

  const throttleNav = (now: number, ms: number) => {
    if (now - lastNavAt.current < ms) return false;
    lastNavAt.current = now;
    return true;
  };

  // ✅ CRITICAL: if overlay gets disabled (leaving home), always release scroll lock
  useEffect(() => {
    if (!enabled) {
      stageActiveRef.current = false;
      touchStartY.current = null;
      touchLastY.current = null;
      document.body.style.overflow = "";
    }
  }, [enabled]);

  // Stage activation lock
  useMotionValueEvent(phase, "change", (v) => {
    if (!enabled) return;

    const isActiveNow = v >= STAGE_ACTIVE_AT;

    if (isActiveNow && !stageActiveRef.current) {
      stageActiveRef.current = true;
      document.body.style.overflow = "hidden";

      if (!didInitIndex.current) {
        didInitIndex.current = true;
        setActiveIndex(0);
      }

      const now = performance.now();
      ignoreInputUntil.current = now + IGNORE_INPUT_MS;
      lastNavAt.current = now;
    }

    if (!isActiveNow && stageActiveRef.current) {
      stageActiveRef.current = false;
      document.body.style.overflow = "";
      if (v < 0.2) didInitIndex.current = false;
    }
  });

  // Wheel
  useEffect(() => {
    if (!enabled) return;

    const onWheel = (e: WheelEvent) => {
      const now = performance.now();

      if (!stageActiveRef.current) return;
      e.preventDefault();

      if (!canNavNow(now)) return;
      if (!throttleNav(now, THROTTLE_WHEEL)) return;
      if (Math.abs(e.deltaY) < 18) return;

      if (e.deltaY > 0) goNext();
      else goPrev();
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [enabled, goNext, goPrev]);

  // Touch
  useEffect(() => {
    if (!enabled) return;

    const onTouchStart = (e: TouchEvent) => {
      if (!stageActiveRef.current) return;
      const t = e.touches[0];
      touchStartY.current = t?.clientY ?? null;
      touchLastY.current = t?.clientY ?? null;
    };

    const onTouchMove = (e: TouchEvent) => {
      const now = performance.now();
      if (!stageActiveRef.current) return;

      e.preventDefault();

      const t = e.touches[0];
      if (!t) return;

      const yNow = t.clientY;
      touchLastY.current = yNow;

      if (!canNavNow(now)) return;

      if (touchStartY.current == null) touchStartY.current = yNow;

      const dyFromStart = (touchStartY.current ?? yNow) - yNow;
      if (Math.abs(dyFromStart) < 26) return;
      if (!throttleNav(now, THROTTLE_TOUCH)) return;

      if (dyFromStart > 0) goNext();
      else goPrev();

      touchStartY.current = yNow;
    };

    const onTouchEnd = () => {
      touchStartY.current = null;
      touchLastY.current = null;
    };

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("touchcancel", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
    };
  }, [enabled, goNext, goPrev]);

  // Keyboard
  useEffect(() => {
    if (!enabled) return;

    const onKeyDown = (e: KeyboardEvent) => {
      const now = performance.now();
      if (!stageActiveRef.current) return;

      if (
        e.key === "ArrowUp" ||
        e.key === "ArrowDown" ||
        e.key === " " ||
        e.key === "PageDown" ||
        e.key === "PageUp"
      ) {
        e.preventDefault();
      }

      if (!canNavNow(now)) return;

      if (e.key === "ArrowRight") {
        e.preventDefault();
        if (!throttleNav(now, THROTTLE_KEYS)) return;
        goNext();
      }

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        if (!throttleNav(now, THROTTLE_KEYS)) return;
        goPrev();
      }
    };

    window.addEventListener("keydown", onKeyDown, { passive: false });
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [enabled, goNext, goPrev]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[60]"
      style={{
        y,
        opacity,
        pointerEvents: enabled ? pointerEvents : ("none" as const),
      }}
    >
      <StageShell
        slides={slides}
        activeIndex={activeIndex}
        phase={phase}
        onPrev={goPrev}
        onNext={goNext}
        onSelect={goTo}
        activeSlide={active}
      />
    </motion.div>
  );
}
