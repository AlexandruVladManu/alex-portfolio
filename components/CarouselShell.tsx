"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  type MotionValue,
} from "framer-motion";
import CarouselItem from "./CarouselItem";

type Item = { label: string; href: string };

const ITEMS: Item[] = [
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
  { label: "Skills", href: "/skills" },
  { label: "Journey", href: "/journey" },
  { label: "Contact", href: "/contact" },
];

type Props = {
  phase?: MotionValue<number>;
};

export default function CarouselShell({ phase }: Props) {
  const rowRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Always available scroll value (hook order safety)
  const { scrollY } = useScroll();

  // Fallback phase MotionValue for pages that don't pass phase
  const fallbackPhase = useMotionValue(0);
  const phaseSource = phase ?? fallbackPhase;

  // --- Reveal motion values (always created, no conditional hooks) ---
  // Scroll-driven fallback reveal (if you ever use CarouselShell without phase)
  const opacityFromScroll = useTransform(scrollY, [0, 110, 200], [0, 0, 1]);
  const yFromScroll = useTransform(scrollY, [0, 110, 200], [28, 28, 0]);

  // Phase-driven reveal (Home q1 -> q2)
  // Federico-ish: comes from below, not from top
  const opacityFromPhase = useTransform(phaseSource, [0, 1], [0, 1]);
  const yFromPhase = useTransform(phaseSource, [0, 1], [28, 0]);

  // Use phase if provided, otherwise fallback to scroll-driven
  const opacity = phase ? opacityFromPhase : opacityFromScroll;
  const y = phase ? yFromPhase : yFromScroll;

  // Measure active (closest to center)
  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;

    const calcActive = () => {
      const children = Array.from(el.children) as HTMLElement[];
      if (children.length === 0) return;

      const center = el.scrollLeft + el.clientWidth / 2;

      let best = 0;
      let bestDist = Number.POSITIVE_INFINITY;

      for (let i = 0; i < children.length; i += 1) {
        const c = children[i];
        const cCenter = c.offsetLeft + c.offsetWidth / 2;
        const d = Math.abs(center - cCenter);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      }

      setActiveIndex(best);
    };

    calcActive();
    el.addEventListener("scroll", calcActive, { passive: true });
    window.addEventListener("resize", calcActive);

    return () => {
      el.removeEventListener("scroll", calcActive);
      window.removeEventListener("resize", calcActive);
    };
  }, []);

  const centerToIndex = (index: number) => {
    const el = rowRef.current;
    if (!el) return;

    const child = el.children[index] as HTMLElement | undefined;
    if (!child) return;

    const target =
      child.offsetLeft + child.offsetWidth / 2 - el.clientWidth / 2;
    el.scrollTo({ left: target, behavior: "smooth" });
  };

  const itemNodes = useMemo(() => {
    return ITEMS.map((item, i) => {
      const isActive = i === activeIndex;

      // Visual-only emphasis (no DOM changes)
      const textClass = isActive ? "text-(--fg)/95" : "text-(--fg)/65";

      return (
        <button
          key={item.href}
          type="button"
          onClick={() => centerToIndex(i)}
          className="snap-center"
        >
          <div className={textClass}>
            <CarouselItem label={item.label} href={item.href} />
          </div>
        </button>
      );
    });
  }, [activeIndex]);

  return (
    <motion.section
      className="relative px-6 pb-20 md:px-16 lg:px-24"
      style={{ opacity, y }}
    >
      {/* rail line */}
      <div className="mb-8 h-px w-full bg-(--line)/35" />

      {/* carousel row */}
      <div
        ref={rowRef}
        className="no-scrollbar flex gap-8 md:gap-12 overflow-x-auto py-2 px-6 md:px-16 lg:px-24 snap-x md:snap-mandatory scroll-smooth"
      >
        {/* spacer so first item can reach center */}
        <div className="shrink-0 w-[15vw] md:w-[25vw]" />

        {itemNodes}

        {/* spacer so last item can reach center */}
        <div className="shrink-0 w-[15vw] md:w-[25vw]" />
      </div>
    </motion.section>
  );
}
