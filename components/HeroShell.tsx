"use client";

import {
  motion,
  useMotionValue,
  useTransform,
  type MotionValue,
} from "framer-motion";

import ScrollHint from "./ScrollHint";
import { withBasePath } from "@/lib/withBasePath";

type Props = {
  phase?: MotionValue<number>;
};

export default function HeroShell({ phase }: Props) {
  const fallbackPhase = useMotionValue(0);
  const phaseSource = phase ?? fallbackPhase;

  const scale = useTransform(phaseSource, [0, 1], [1.05, 1]);
  const overlayOpacity = useTransform(phaseSource, [0, 1], [0.15, 0.35]);
  const blur = useTransform(phaseSource, [0, 1], ["0px", "4px"]);

  const fgOpacity = useTransform(phaseSource, [0, 0.25, 0.6], [1, 1, 0]);

  const BASELINE_NUDGE = -8;

  const fgY = useTransform(
    phaseSource,
    [0, 0.6],
    [BASELINE_NUDGE, BASELINE_NUDGE - 48],
  );

  const fgPointer = useTransform(
    phaseSource,
    [0, 0.45, 1],
    ["auto", "none", "none"],
  );

  const headlineClass =
    "font-semibold leading-[0.96] " +
    "text-[clamp(2rem,7.8vw,3rem)] " +
    "sm:text-[clamp(2.35rem,5.6vw,3.7rem)] " +
    "lg:text-[clamp(2.15rem,1.35rem+2.65vw,4.25rem)] " +
    "tracking-[-0.025em] text-white/95";

  const subcopyClass =
    "max-w-[40ch] text-[0.93rem] leading-[1.55] tracking-[-0.005em] " +
    "text-white/70 sm:text-[1rem] md:text-[1.05rem]";

  const heroBackgroundImage = withBasePath("/heroIMG1-3.webp");

  return (
    <section className="relative h-[100svh] min-h-[100svh] overflow-hidden">
      <motion.div
        className="pointer-events-none fixed inset-0 z-[-1] will-change-transform"
        style={{ scale, filter: blur }}
      >
        <div
          className="hero-background absolute inset-0 bg-cover"
          style={{ backgroundImage: `url("${heroBackgroundImage}")` }}
        />

        <div className="pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute inset-0" />

        <motion.div
          className="absolute inset-0"
          style={{
            opacity: overlayOpacity,
            backgroundImage:
              "radial-gradient(circle at top, rgba(0,0,0,0.45), transparent 60%), linear-gradient(to bottom, rgba(0,0,0,0.65), rgba(0,0,0,0.9))",
          }}
        />
      </motion.div>

      <motion.div
        className="hero-foreground relative z-10 flex h-full flex-col justify-center px-5 pb-10 pt-24 sm:px-8 sm:pb-16 sm:pt-28 md:px-16 lg:px-24"
        style={{ opacity: fgOpacity, y: fgY, pointerEvents: fgPointer }}
      >
        <div className="hero-role mb-4 sm:mb-6">
          <span className="inline-flex items-center rounded-full border border-(--line)/55 bg-black/25 px-4 py-1 text-[0.65rem] font-medium uppercase tracking-[0.24em] text-(--fg)/75 sm:text-[0.68rem] sm:tracking-[0.26em]">
            Developer
          </span>
        </div>

        <div className="hero-copy flex max-w-[52rem] flex-col gap-4 sm:gap-5">
          <h1
            className={headlineClass}
            style={{
              fontFamily:
                '"Space Grotesk Variable", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
            }}
          >
            <span className="block">Alex</span>
            <span className="block">React / Next.js Developer</span>
          </h1>

          <p className={subcopyClass}>
            Welcome to my portfolio. I design and build minimal, motion-driven
            web experiences with a strong focus on clean, maintainable code.
          </p>
        </div>

        <ScrollHint />
      </motion.div>
    </section>
  );
}
