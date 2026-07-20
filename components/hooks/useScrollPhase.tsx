"use client";

import { useScroll, useTransform, useSpring } from "framer-motion";

export default function useScrollPhase(threshold = 90) {
  const { scrollY } = useScroll();

  // Start early, finish later, then soften with a spring
  const rawPhase = useTransform(scrollY, [0, 20, threshold + 180], [0, 0, 1]);

  // Smooth the motion so it feels less mechanically tied to the wheel
  const phase = useSpring(rawPhase, {
    stiffness: 70,
    damping: 22,
    mass: 0.65,
  });

  return { phase };
}
