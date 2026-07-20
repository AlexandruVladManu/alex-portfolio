"use client";

import Image from "next/image";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { withBasePath } from "@/lib/withBasePath";

type ActThreeCardData = {
  id: string;
  title: string;
  description: string;
  image: string;
  eyebrow: string;
};

type TechItem = {
  id: string;
  label: string;
  category: string;
  index: string;
  gridClassName: string;
  minHeightClassName: string;
  surfaceClassName: string;
  accentClassName: string;
  labelClassName: string;
};

const actThreeCards: ActThreeCardData[] = [
  {
    id: "card-1",
    eyebrow: "What I do",
    title: "Clean Architecture",
    description:
      "Systems designed with clarity, maintainability and strong structural thinking, so the interface feels calm, intentional and easy to evolve over time.",
    image: withBasePath("/stage/about/Clean-Architecture.webp"),
  },
  {
    id: "card-2",
    eyebrow: "How it moves",
    title: "Motion Systems",
    description:
      "Transitions and interactions built as part of the product architecture, giving rhythm, hierarchy and continuity without drifting into decoration.",
    image: withBasePath("/stage/about/Motion-Systems.webp"),
  },
  {
    id: "card-3",
    eyebrow: "How it scales",
    title: "Scalable Interfaces",
    description:
      "Layouts and components shaped to stay coherent across larger screens, real content and future growth, instead of only looking good in one ideal viewport.",
    image: withBasePath("/stage/about/Scalable-Interfaces.webp"),
  },
  {
    id: "card-4",
    eyebrow: "How it performs",
    title: "Performance & SEO",
    description:
      "Fast-loading, accessible and search-friendly experiences where structure, technical discipline and visual quality support each other from the start.",
    image: withBasePath("/stage/about/Performance-SEO.webp"),
  },
];

const techItems: TechItem[] = [
  {
    id: "react",
    label: "React",
    category: "Interface",
    index: "01",
    gridClassName: "md:col-span-5",
    minHeightClassName: "min-h-[11rem] md:min-h-[15rem] lg:min-h-[18rem]",
    surfaceClassName:
      "bg-[linear-gradient(135deg,rgba(5,18,27,0.98)_0%,rgba(7,37,52,0.96)_54%,rgba(8,77,91,0.82)_100%)]",
    accentClassName:
      "bg-[radial-gradient(circle_at_82%_24%,rgba(76,220,235,0.28),transparent_34%)]",
    labelClassName: "text-[clamp(2.8rem,5vw,5.5rem)] tracking-[-0.065em]",
  },
  {
    id: "nextjs",
    label: "Next.js",
    category: "Framework",
    index: "02",
    gridClassName: "md:col-span-7",
    minHeightClassName: "min-h-[11rem] md:min-h-[15rem] lg:min-h-[18rem]",
    surfaceClassName:
      "bg-[linear-gradient(135deg,rgba(3,8,13,0.99)_0%,rgba(7,19,29,0.98)_46%,rgba(10,49,65,0.9)_100%)]",
    accentClassName:
      "bg-[linear-gradient(115deg,transparent_0%,rgba(38,184,213,0.1)_48%,rgba(84,230,240,0.24)_100%)]",
    labelClassName: "text-[clamp(3rem,5.8vw,6.4rem)] tracking-[-0.07em]",
  },
  {
    id: "typescript",
    label: "TypeScript",
    category: "Language",
    index: "03",
    gridClassName: "md:col-span-6",
    minHeightClassName: "min-h-[10rem] md:min-h-[14rem] lg:min-h-[17rem]",
    surfaceClassName:
      "bg-[linear-gradient(145deg,rgba(4,14,25,0.99)_0%,rgba(8,32,57,0.96)_58%,rgba(15,73,104,0.86)_100%)]",
    accentClassName:
      "bg-[radial-gradient(circle_at_18%_78%,rgba(50,138,214,0.24),transparent_38%)]",
    labelClassName: "text-[clamp(2.6rem,4.8vw,5.2rem)] tracking-[-0.06em]",
  },
  {
    id: "framer-motion",
    label: "Framer Motion",
    category: "Motion",
    index: "04",
    gridClassName: "md:col-span-6",
    minHeightClassName: "min-h-[10rem] md:min-h-[14rem] lg:min-h-[17rem]",
    surfaceClassName:
      "bg-[linear-gradient(135deg,rgba(8,12,24,0.99)_0%,rgba(17,29,55,0.96)_54%,rgba(20,73,88,0.86)_100%)]",
    accentClassName:
      "bg-[linear-gradient(125deg,transparent_6%,rgba(44,197,218,0.08)_50%,rgba(104,116,214,0.18)_100%)]",
    labelClassName:
      "max-w-[8ch] text-[clamp(2.45rem,4.35vw,4.85rem)] tracking-[-0.06em]",
  },
  {
    id: "tailwind-css",
    label: "Tailwind CSS",
    category: "Styling",
    index: "05",
    gridClassName: "md:col-span-7",
    minHeightClassName: "min-h-[10rem] md:min-h-[14rem] lg:min-h-[16rem]",
    surfaceClassName:
      "bg-[linear-gradient(135deg,rgba(3,17,24,0.99)_0%,rgba(6,46,57,0.96)_58%,rgba(24,88,82,0.84)_100%)]",
    accentClassName:
      "bg-[radial-gradient(circle_at_78%_72%,rgba(81,188,155,0.24),transparent_38%)]",
    labelClassName: "text-[clamp(2.6rem,4.8vw,5.2rem)] tracking-[-0.065em]",
  },
  {
    id: "javascript",
    label: "JavaScript",
    category: "Language",
    index: "06",
    gridClassName: "md:col-span-5",
    minHeightClassName: "min-h-[10rem] md:min-h-[14rem] lg:min-h-[16rem]",
    surfaceClassName:
      "bg-[linear-gradient(135deg,rgba(18,10,9,0.99)_0%,rgba(40,20,19,0.95)_58%,rgba(92,36,28,0.84)_100%)]",
    accentClassName:
      "bg-[radial-gradient(circle_at_82%_22%,rgba(221,78,48,0.3),transparent_34%)]",
    labelClassName: "text-[clamp(2.45rem,4.2vw,4.7rem)] tracking-[-0.06em]",
  },
  {
    id: "html",
    label: "HTML",
    category: "Foundation",
    index: "07",
    gridClassName: "md:col-span-3",
    minHeightClassName: "min-h-[8rem] md:min-h-[10rem] lg:min-h-[12rem]",
    surfaceClassName:
      "bg-[linear-gradient(145deg,rgba(5,12,17,0.99)_0%,rgba(8,29,38,0.96)_100%)]",
    accentClassName:
      "bg-[radial-gradient(circle_at_72%_28%,rgba(43,163,184,0.18),transparent_40%)]",
    labelClassName: "text-[clamp(2rem,3.2vw,3.5rem)] tracking-[-0.055em]",
  },
  {
    id: "css",
    label: "CSS",
    category: "Foundation",
    index: "08",
    gridClassName: "md:col-span-3",
    minHeightClassName: "min-h-[8rem] md:min-h-[10rem] lg:min-h-[12rem]",
    surfaceClassName:
      "bg-[linear-gradient(145deg,rgba(5,12,19,0.99)_0%,rgba(10,33,49,0.96)_100%)]",
    accentClassName:
      "bg-[linear-gradient(135deg,transparent_20%,rgba(42,135,189,0.16)_100%)]",
    labelClassName: "text-[clamp(2rem,3.2vw,3.5rem)] tracking-[-0.055em]",
  },
  {
    id: "git",
    label: "Git",
    category: "Versioning",
    index: "09",
    gridClassName: "md:col-span-2",
    minHeightClassName: "min-h-[8rem] md:min-h-[10rem] lg:min-h-[12rem]",
    surfaceClassName:
      "bg-[linear-gradient(145deg,rgba(6,13,17,0.99)_0%,rgba(18,38,42,0.96)_100%)]",
    accentClassName:
      "bg-[radial-gradient(circle_at_28%_76%,rgba(72,145,126,0.16),transparent_44%)]",
    labelClassName: "text-[clamp(2rem,3vw,3.2rem)] tracking-[-0.055em]",
  },
  {
    id: "github",
    label: "GitHub",
    category: "Workflow",
    index: "10",
    gridClassName: "md:col-span-4",
    minHeightClassName: "min-h-[8rem] md:min-h-[10rem] lg:min-h-[12rem]",
    surfaceClassName:
      "bg-[linear-gradient(145deg,rgba(4,9,13,0.99)_0%,rgba(11,24,31,0.97)_100%)]",
    accentClassName:
      "bg-[linear-gradient(120deg,transparent_10%,rgba(51,131,151,0.13)_100%)]",
    labelClassName: "text-[clamp(2rem,3.3vw,3.6rem)] tracking-[-0.055em]",
  },
  {
    id: "pnpm",
    label: "pnpm",
    category: "Tooling",
    index: "11",
    gridClassName: "md:col-span-12",
    minHeightClassName: "min-h-[7rem] md:min-h-[8.5rem] lg:min-h-[10rem]",
    surfaceClassName:
      "bg-[linear-gradient(110deg,rgba(4,10,14,0.99)_0%,rgba(7,25,32,0.98)_42%,rgba(10,47,55,0.92)_72%,rgba(10,26,32,0.98)_100%)]",
    accentClassName:
      "bg-[linear-gradient(90deg,transparent_0%,rgba(39,176,192,0.1)_56%,rgba(78,198,179,0.16)_100%)]",
    labelClassName: "text-[clamp(2.2rem,3.6vw,4rem)] tracking-[-0.06em]",
  },
];

function ActThreeContentOverlay({
  card,
  opacity,
  y,
}: {
  card: ActThreeCardData;
  opacity: MotionValue<number>;
  y: MotionValue<number>;
}) {
  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 z-20 flex items-end"
    >
      <div className="w-full p-10 md:p-12">
        <div className="max-w-[34rem]">
          <p className="mb-4 text-sm uppercase tracking-[0.22em] text-white/72">
            {card.eyebrow}
          </p>

          <h3 className="max-w-[10ch] text-[clamp(2.8rem,5.4vw,5.4rem)] font-semibold leading-[0.94] tracking-[-0.06em] text-white">
            {card.title}
          </h3>

          <p className="mt-6 max-w-[32rem] text-[1.03rem] leading-[1.8] text-white/82">
            {card.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function ActThreeTakeoverLayer({
  progress,
  card,
  enterStart,
  enterEnd,
  holdEnd,
  exitEnd,
  zIndex,
  finalCard = false,
}: {
  progress: MotionValue<number>;
  card: ActThreeCardData;
  enterStart: number;
  enterEnd: number;
  holdEnd: number;
  exitEnd: number;
  zIndex: number;
  finalCard?: boolean;
}) {
  const opacityInput = finalCard
    ? [enterStart, enterEnd, holdEnd]
    : [enterStart, enterEnd, holdEnd, exitEnd];

  const opacityOutput = finalCard ? [0, 1, 1] : [0, 1, 1, 0];

  const scaleInput = finalCard
    ? [enterStart, enterEnd, holdEnd]
    : [enterStart, enterEnd, holdEnd, exitEnd];

  const scaleOutput = finalCard ? [0.95, 0.988, 1] : [0.95, 0.988, 1, 0.995];

  const yInput = finalCard
    ? [enterStart, enterEnd, holdEnd]
    : [enterStart, enterEnd, holdEnd, exitEnd];

  const yOutput = finalCard ? [180, 0, 0] : [180, 0, 0, -48];

  const contentOpacityInput = finalCard
    ? [enterStart + 0.035, enterEnd + 0.02, holdEnd]
    : [enterStart + 0.035, enterEnd + 0.02, holdEnd, exitEnd];

  const contentOpacityOutput = finalCard ? [0, 1, 1] : [0, 1, 1, 0];

  const contentYInput = finalCard
    ? [enterStart + 0.035, enterEnd + 0.02]
    : [enterStart + 0.035, enterEnd + 0.02, exitEnd];

  const contentYOutput = finalCard ? [24, 0] : [24, 0, -12];

  const opacity = useTransform(progress, opacityInput, opacityOutput);
  const scale = useTransform(progress, scaleInput, scaleOutput);
  const y = useTransform(progress, yInput, yOutput);

  const contentOpacity = useTransform(
    progress,
    contentOpacityInput,
    contentOpacityOutput,
  );

  const contentY = useTransform(progress, contentYInput, contentYOutput);

  return (
    <motion.div
      style={{ opacity, scale, y, zIndex }}
      className="absolute inset-0 will-change-transform"
    >
      <div className="relative h-full w-full overflow-hidden rounded-[28px]">
        <div className="absolute inset-0">
          <Image
            src={card.image}
            alt={card.title}
            fill
            className="object-cover object-center"
          />
        </div>
        <div className="absolute inset-0" />
        <div className="absolute inset-0" />
        <div className="absolute inset-0" />

        <ActThreeContentOverlay
          card={card}
          opacity={contentOpacity}
          y={contentY}
        />
      </div>
    </motion.div>
  );
}

function ActThreeScene() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const marqueeOpacity = useTransform(
    scrollYProgress,
    [0.0, 0.05, 0.11, 0.16],
    [1, 0.78, 0.28, 0],
  );

  const firstWrapperOpacity = useTransform(
    scrollYProgress,
    [0.02, 0.08, 0.4, 0.54, 0.62],
    [0.46, 1, 1, 1, 0],
  );

  const firstWrapperScale = useTransform(
    scrollYProgress,
    [0.02, 0.08],
    [0.874, 1],
  );

  const firstWrapperY = useTransform(
    scrollYProgress,
    [0.0, 0.08, 0.48, 0.62],
    [0, 0, 0, -20],
  );

  /*
   * These values intentionally remain unchanged.
   * They define the pill-to-full-screen expansion choreography.
   */
  const firstImageFrameScale = useTransform(
    scrollYProgress,
    [0.02, 0.085, 0.155],
    [0.34, 0.58, 1],
  );

  const firstImageFrameRadius = useTransform(
    scrollYProgress,
    [0.02, 0.085, 0.155],
    ["420px", "300px", "0px"],
  );

  const firstInnerImageScale = useTransform(
    scrollYProgress,
    [0.02, 0.085, 0.155],
    [2.35, 1.55, 1],
  );

  const firstContentOpacity = useTransform(
    scrollYProgress,
    [0.11, 0.17, 0.46, 0.56],
    [0, 1, 1, 0],
  );

  const firstContentY = useTransform(
    scrollYProgress,
    [0.11, 0.17, 0.56],
    [24, 0, -12],
  );

  return (
    <section ref={sectionRef} className="relative h-[430svh]">
      <div className="sticky top-0 h-[100svh]">
        <div className="relative h-[100svh] w-full">
          <div className="relative z-10 mx-auto flex h-[100svh] w-full max-w-none items-center px-0">
            <div className="scroll-paint-container relative h-[100svh] w-full overflow-hidden rounded-none bg-black">
              <motion.div
                style={{ opacity: marqueeOpacity }}
                className="pointer-events-none absolute inset-0 z-0 flex items-center justify-between overflow-hidden px-[clamp(1.5rem,3.6vw,4.5rem)]"
              >
                <span className="select-none whitespace-nowrap text-[clamp(3.5rem,20vw,7rem)] font-semibold leading-none tracking-[-0.085em] text-white/82 sm:text-[clamp(7rem,18vw,21rem)]">
                  What
                </span>

                <span className="select-none whitespace-nowrap text-[clamp(3.5rem,20vw,7rem)] font-semibold leading-none tracking-[-0.085em] text-white/82 sm:text-[clamp(7rem,18vw,21rem)]">
                  I do
                </span>
              </motion.div>

              <motion.div
                style={{
                  opacity: firstWrapperOpacity,
                  scale: firstWrapperScale,
                  y: firstWrapperY,
                }}
                className="scroll-compositor-layer absolute inset-0 z-10 will-change-transform"
              >
                <div className="relative h-full w-full">
                  {/*
                   * Expansion transform layer:
                   * owns only the frame scale.
                   */}
                  <motion.div
                    style={{
                      scale: firstImageFrameScale,
                    }}
                    className="scroll-compositor-layer absolute inset-0 will-change-transform"
                  >
                    {/*
                     * Dedicated clipping layer:
                     * owns only border-radius and overflow clipping.
                     *
                     * Separating clipping from scaling prevents Safari from
                     * rebuilding the same rounded, transformed image surface.
                     */}
                    <motion.div
                      style={{
                        borderRadius: firstImageFrameRadius,
                      }}
                      className="ios-stable-rounded-clip absolute inset-0 overflow-hidden bg-black"
                    >
                      {/*
                       * Counter-scale layer:
                       * preserves the original visual image behavior.
                       */}
                      <motion.div
                        style={{
                          scale: firstInnerImageScale,
                        }}
                        className="scroll-compositor-layer absolute inset-0 will-change-transform"
                      >
                        <Image
                          src={actThreeCards[0].image}
                          alt={actThreeCards[0].title}
                          fill
                          sizes="100vw"
                          className="object-cover object-center"
                        />
                      </motion.div>

                      <div className="absolute inset-0" />
                      <div className="absolute inset-0" />
                      <div className="absolute inset-0" />
                    </motion.div>
                  </motion.div>

                  <ActThreeContentOverlay
                    card={actThreeCards[0]}
                    opacity={firstContentOpacity}
                    y={firstContentY}
                  />
                </div>
              </motion.div>

              <ActThreeTakeoverLayer
                progress={scrollYProgress}
                card={actThreeCards[1]}
                enterStart={0.39}
                enterEnd={0.5}
                holdEnd={0.61}
                exitEnd={0.7}
                zIndex={20}
              />

              <ActThreeTakeoverLayer
                progress={scrollYProgress}
                card={actThreeCards[2]}
                enterStart={0.56}
                enterEnd={0.67}
                holdEnd={0.79}
                exitEnd={0.87}
                zIndex={30}
              />

              <ActThreeTakeoverLayer
                progress={scrollYProgress}
                card={actThreeCards[3]}
                enterStart={0.73}
                enterEnd={0.84}
                holdEnd={1}
                exitEnd={1}
                zIndex={40}
                finalCard
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ActFourTechCell({
  item,
  progress,
  fillProgress,
  revealIndex,
}: {
  item: TechItem;
  progress: MotionValue<number>;
  fillProgress: MotionValue<number>;
  revealIndex: number;
}) {
  const revealStart = 0.2 + revealIndex * 0.035;
  const revealEnd = revealStart + 0.12;

  const fillStart = 0.02 + revealIndex * 0.025;

  const fillEnd =
    item.id === "pnpm" ? 0.98 : Math.min(0.7 + revealIndex * 0.025, 0.95);

  const accentStartX =
    item.id === "pnpm"
      ? "-26%"
      : revealIndex <= 4
        ? "-22%"
        : item.id === "javascript"
          ? "-18%"
          : "-12%";

  const opacity = useTransform(progress, [revealStart, revealEnd], [0, 1]);

  const y = useTransform(progress, [revealStart, revealEnd], [48, 0]);

  const scale = useTransform(progress, [revealStart, revealEnd], [0.985, 1]);

  const accentX = useTransform(
    fillProgress,
    [fillStart, fillEnd],
    [accentStartX, "0%"],
  );

  return (
    <motion.article
      style={{ opacity, y, scale }}
      className={[
        "group relative overflow-hidden rounded-[24px]",
        "border border-white/[0.08]",
        "will-change-transform",
        item.gridClassName,
        item.minHeightClassName,
        item.surfaceClassName,
      ].join(" ")}
    >
      <motion.div
        style={{ x: accentX }}
        className={[
          "pointer-events-none absolute inset-0",
          "will-change-transform",
          item.accentClassName,
        ].join(" ")}
      />

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.035)_0%,transparent_34%,rgba(0,0,0,0.16)_100%)]" />

      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/18 to-transparent" />

      <div className="relative z-10 flex h-full min-h-inherit flex-col justify-between p-5 sm:p-6 md:p-7 lg:p-8">
        <div className="flex items-start justify-between gap-6">
          <p className="text-[0.69rem] uppercase tracking-[0.22em] text-white/48">
            {item.category}
          </p>

          <span className="font-mono text-[0.68rem] tracking-[0.14em] text-white/34">
            {item.index}
          </span>
        </div>

        <h3
          className={[
            "mt-8 font-semibold leading-[0.9] text-white/96 md:mt-12",
            item.labelClassName,
          ].join(" ")}
        >
          {item.label}
        </h3>
      </div>
    </motion.article>
  );
}

function ActFourTechStack() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const { scrollYProgress: fillProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"],
  });

  const eyebrowOpacity = useTransform(scrollYProgress, [0.06, 0.16], [0, 1]);

  const eyebrowY = useTransform(scrollYProgress, [0.06, 0.16], [24, 0]);

  const titleOpacity = useTransform(scrollYProgress, [0.09, 0.21], [0, 1]);

  const titleY = useTransform(scrollYProgress, [0.09, 0.21], [64, 0]);

  const lineScaleX = useTransform(scrollYProgress, [0.12, 0.28], [0, 1]);

  const gridY = useTransform(scrollYProgress, [0.14, 0.34], [72, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-black pb-[20vh] pt-[10vh]"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[18%] top-[18%] h-[32rem] w-[32rem] rounded-full bg-cyan-400/[0.035] blur-[120px]" />
        <div className="absolute right-[8%] top-[46%] h-[26rem] w-[26rem] rounded-full bg-blue-500/[0.03] blur-[130px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1920px] px-[clamp(1rem,3vw,3.5rem)]">
        <header className="mb-[10vh] grid grid-cols-1 gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-4">
            <motion.div
              style={{
                opacity: eyebrowOpacity,
                y: eyebrowY,
              }}
              className="will-change-transform"
            >
              <div className="flex items-center gap-4">
                <span className="h-[0.42rem] w-[0.42rem] rounded-full bg-cyan-300/70" />

                <p className="text-[0.76rem] uppercase tracking-[0.24em] text-white/58">
                  What I build with
                </p>
              </div>
            </motion.div>
          </div>

          <div className="md:col-span-7 md:col-start-6">
            <motion.h2
              style={{
                opacity: titleOpacity,
                y: titleY,
              }}
              className="max-w-[9ch] text-[clamp(4.2rem,8.4vw,9rem)] font-semibold uppercase leading-[0.82] tracking-[-0.075em] text-white/96 will-change-transform"
            >
              Technical
              <br />
              Stack
            </motion.h2>
          </div>
        </header>

        <motion.div
          style={{
            scaleX: lineScaleX,
            transformOrigin: "left center",
          }}
          className="mb-4 h-px w-full bg-gradient-to-r from-white/32 via-cyan-300/18 to-transparent will-change-transform"
        />

        <motion.div
          style={{ y: gridY }}
          className="grid grid-cols-1 gap-3 md:grid-cols-12 md:gap-4 will-change-transform"
        >
          {techItems.map((item, index) => (
            <ActFourTechCell
              key={item.id}
              item={item}
              progress={scrollYProgress}
              fillProgress={fillProgress}
              revealIndex={index}
            />
          ))}
        </motion.div>

        <div className="mt-[12vh] grid grid-cols-1 gap-8 border-t border-white/[0.08] pt-8 md:grid-cols-12">
          <p className="text-[0.72rem] uppercase tracking-[0.22em] text-white/36 md:col-span-3">
            Selected technologies
          </p>

          <p className="max-w-[34rem] text-[clamp(1rem,1.2vw,1.15rem)] leading-[1.75] text-white/56 md:col-span-5 md:col-start-7">
            A focused stack for building structured, responsive interfaces with
            deliberate motion, maintainable systems and careful attention to
            performance.
          </p>
        </div>
      </div>
    </section>
  );
}

export default function AboutIntroSection() {
  return (
    <section className="relative bg-black text-white">
      {/* ACT I — full-bleed stage */}
      <div className="relative z-10 min-h-[100svh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={withBasePath("/stage/about/Who-I-am.webp")}
            alt="About background"
            fill
            priority
            className="object-cover object-[72%_center] sm:object-[66%_center] md:object-[60%_center] lg:object-center"
          />

          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-black sm:h-28 lg:h-32" />
        </div>

        <div className="relative grid h-[100svh] min-h-[100svh] grid-cols-1 lg:grid-cols-[minmax(0,1fr)_1px_minmax(0,1fr)]">
          <div className="relative flex h-full items-end">
            <div className="w-full px-5 pb-0 sm:px-8 md:px-12 lg:pl-[clamp(1.75rem,5.3vw,6rem)] lg:pr-0">
              <div className="max-w-[42rem] lg:max-w-[30rem]">
                <p className="mb-4 text-[0.82rem] leading-none text-white/92 sm:mb-5 sm:text-[0.9rem] lg:text-[15px]">
                  Creativity is just connecting things
                </p>

                <h1 className="max-w-[10ch] text-[clamp(3.7rem,10vw,6rem)] font-semibold leading-[0.91] tracking-[-0.055em] sm:max-w-none lg:max-w-[26rem]">
                  Who I am
                </h1>

                <p className="mt-5 max-w-[34rem] text-[0.95rem] leading-[1.6] text-white/88 sm:mt-6 sm:text-[1rem] sm:leading-[1.65] lg:mt-7 lg:max-w-[32rem] lg:text-[1.02rem]">
                  <span className="md:hidden">
                    A brief introduction to who I am and what I do
                    <br />
                    as a developer and a designer.
                  </span>

                  <span className="hidden md:inline">
                    A brief introduction to who I am and what I do as a
                    developer and a designer.
                  </span>
                </p>
              </div>

              <div className="pointer-events-none mt-6 w-full sm:mt-7 lg:mt-8">
                <div className="h-[7rem] w-full border-t border-white/55 sm:h-[9rem] md:w-[calc(50vw-3rem)] md:rounded-tr-[4rem] md:border-r lg:h-[12.25rem] lg:w-full lg:rounded-tr-[4.6rem] lg:border-white/62" />
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block" />
          <div className="relative hidden lg:block" />
        </div>
      </div>

      {/* ACT II + motto — constrained editorial content */}
      <div className="relative z-10 mx-auto w-full max-w-[1800px] px-5 sm:px-8 md:px-10 lg:px-[clamp(1rem,2vw,2rem)]">
        {/* ACT II — emergence below stage */}
        <div className="grid grid-cols-1 pt-16 sm:pt-20 md:grid-cols-[minmax(0,1fr)_1px_minmax(0,1fr)] md:pt-24">
          <div className="flex justify-start md:justify-end md:pr-8 md:pt-5 lg:pr-10 xl:pr-12 xl:pt-7">
            <h2 className="text-[clamp(2.6rem,5vw,3.45rem)] font-semibold leading-none tracking-[-0.05em] text-white/95">
              ABOUT ME
            </h2>
          </div>

          <div className="relative my-8 h-px w-full bg-white/18 md:my-0 md:h-full md:min-h-[24rem] md:w-px">
            <div className="hidden h-full w-px bg-white/18 md:block" />
          </div>

          <div className="md:pl-8 lg:pl-10 xl:pl-12">
            <h3 className="text-[clamp(1.65rem,3vw,2rem)] font-semibold leading-tight text-white">
              Introduction
            </h3>

            <div className="mt-6 max-w-[38rem] space-y-6 text-[0.98rem] leading-[1.75] text-white/84 sm:text-[1rem] md:mt-7 md:leading-[1.8] lg:mt-8 lg:max-w-[33rem] lg:space-y-7 lg:text-[1.03rem] xl:leading-[1.9]">
              <p>
                I’m Alex, a frontend-focused developer who values clarity,
                structure and refined digital experiences. My approach combines
                clean architecture, thoughtful motion and careful attention to
                detail, with the goal of creating interfaces that feel both
                efficient and enjoyable to use.
              </p>

              <p>
                My background in dentistry shaped the way I work: with
                precision, patience and responsibility. Today, I bring those
                same qualities into digital systems, building with React and
                Next.js in a way that balances aesthetics, performance and
                long-term maintainability.
              </p>
            </div>
          </div>
        </div>

        {/* Oversized motto */}
        <div className="mx-auto max-w-[1100px] px-0 pb-16 pt-20 text-center sm:pb-20 sm:pt-24 md:px-6 md:pb-24 md:pt-28 lg:px-10 lg:pb-28 lg:pt-40">
          <h2 className="text-[clamp(3rem,8.5vw,6.8rem)] font-semibold leading-[0.96] tracking-[-0.06em] text-white/96">
            Code with clarity.
          </h2>
        </div>
      </div>

      {/* ACT III — full-bleed sticky viewport scene */}
      <section className="relative isolate z-10 pb-[14svh] pt-[8svh]">
        <ActThreeScene />
      </section>

      {/* ACT IV — expansive technical stack */}
      <ActFourTechStack />
    </section>
  );
}
