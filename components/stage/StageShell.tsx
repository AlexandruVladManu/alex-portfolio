"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import {
  motion,
  AnimatePresence,
  useAnimation,
  useTransform,
  type MotionValue,
  useReducedMotion,
} from "framer-motion";
import type { Slide } from "./stageTypes";
import TitleWave from "./TitleWave";
import TransitionLink from "@/components/TransitionLink";
import { EASE_SOFT, EASE_SNAPPY, D_FAST, D_BASE } from "./stageMotion";

type Props = {
  slides: readonly Slide[];
  activeIndex: number;
  phase: MotionValue<number>;
  onPrev: () => void;
  onNext: () => void;
  onSelect: (i: number) => void;
  activeSlide: Slide | null;
};

type StageGeometry = {
  slotWidth: number;
  slotHeight: number;
  gap: number;
  axisLeft: number;
  pillAxisLeft: number;
  arrowsNudge: number;
};

const SLOT_RATIO = 240 / 560;

const DESKTOP_GEOMETRY: StageGeometry = {
  slotWidth: 560,
  slotHeight: 240,
  gap: 56,
  axisLeft: 260,
  pillAxisLeft: 300,
  arrowsNudge: 104,
};

function getStageGeometry(viewportWidth: number): StageGeometry {
  if (viewportWidth < 640) {
    const gutter = 24;
    const availableWidth = Math.max(0, viewportWidth - gutter * 2);
    const slotWidth = Math.min(560, availableWidth);

    return {
      slotWidth,
      slotHeight: slotWidth * SLOT_RATIO,
      gap: 20,
      axisLeft: gutter,
      pillAxisLeft: gutter,
      arrowsNudge: 0,
    };
  }

  if (viewportWidth < 1024) {
    const gutter = 40;
    const availableWidth = Math.max(360, viewportWidth - gutter * 2);
    const slotWidth = Math.min(480, availableWidth);

    return {
      slotWidth,
      slotHeight: slotWidth * SLOT_RATIO,
      gap: 32,
      axisLeft: gutter,
      pillAxisLeft: gutter,
      arrowsNudge: 0,
    };
  }

  const axisLeft = Math.min(Math.max(220, viewportWidth * 0.18), 520);
  const pillAxisLeft = Math.min(Math.max(300, viewportWidth * 0.18), 520);

  return {
    slotWidth: 560,
    slotHeight: 240,
    gap: 56,
    axisLeft,
    pillAxisLeft,
    arrowsNudge: 104,
  };
}

function useResponsiveStageGeometry(): StageGeometry {
  const [geometry, setGeometry] = useState<StageGeometry>(DESKTOP_GEOMETRY);

  useEffect(() => {
    let frameId = 0;

    const updateGeometry = () => {
      window.cancelAnimationFrame(frameId);

      frameId = window.requestAnimationFrame(() => {
        const layoutWidth = document.documentElement.clientWidth;
        setGeometry(getStageGeometry(layoutWidth));
      });
    };

    updateGeometry();

    window.addEventListener("resize", updateGeometry);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", updateGeometry);
    };
  }, []);

  return geometry;
}

export default function StageShell({
  slides,
  activeIndex,
  phase,
  onPrev,
  onNext,
  onSelect,
  activeSlide,
}: Props) {
  const reduceMotion = useReducedMotion();
  const [isHoveringStage, setIsHoveringStage] = useState(false);
  const [isHoveringCta, setIsHoveringCta] = useState(false);

  const geometry = useResponsiveStageGeometry();

  const { slotWidth, slotHeight, gap, axisLeft, pillAxisLeft, arrowsNudge } =
    geometry;

  const step = slotWidth + gap;
  const stripX = -activeIndex * step;

  const contentOpacity = useTransform(phase, [0, 0.6, 1], [0, 0, 1]);
  const contentY = useTransform(phase, [0, 1], [18, 0]);

  const underlineControls = useAnimation();

  const active = useMemo(() => {
    if (activeSlide) return activeSlide;
    if (!slides.length) return null;

    return slides[Math.min(activeIndex, slides.length - 1)];
  }, [activeSlide, slides, activeIndex]);

  useEffect(() => {
    underlineControls.set({ scaleX: 0.55, opacity: 0.55 });

    underlineControls.start({
      scaleX: 1,
      opacity: 1,
      transition: { duration: D_BASE, ease: EASE_SOFT },
    });
  }, [activeIndex, underlineControls]);

  const laneBase = "relative left-1/2 w-screen -ml-[50vw]";

  const clippedLane = `${laneBase} overflow-hidden`;

  const lanePaddingStyle: CSSProperties = {
    paddingLeft: axisLeft,
    paddingRight: axisLeft,
  };

  const FRAME_SHADOW_IDLE =
    "0 0 0 1px rgba(255,255,255,0.16), 0 18px 64px rgba(0,0,0,0.52), 0 0 34px rgba(255,255,255,0.12)";

  const FRAME_SHADOW_BREATHE_1 =
    "0 0 0 1px rgba(255,255,255,0.20), 0 22px 72px rgba(0,0,0,0.56), 0 0 44px rgba(255,255,255,0.16)";

  const FRAME_SHADOW_BREATHE_2 =
    "0 0 0 1px rgba(255,255,255,0.14), 0 16px 56px rgba(0,0,0,0.48), 0 0 28px rgba(255,255,255,0.10)";

  const frameAnimate = reduceMotion
    ? {
        scale: 1,
        boxShadow: FRAME_SHADOW_IDLE,
      }
    : isHoveringStage
      ? {
          scale: 1.01,
          boxShadow: [
            FRAME_SHADOW_BREATHE_2,
            FRAME_SHADOW_BREATHE_1,
            FRAME_SHADOW_BREATHE_2,
          ],
        }
      : {
          scale: 1,
          boxShadow: FRAME_SHADOW_IDLE,
        };

  const frameTransition = reduceMotion
    ? {
        duration: 0,
      }
    : isHoveringStage
      ? {
          duration: 2.4,
          ease: EASE_SOFT,
          repeat: Infinity,
          repeatType: "mirror" as const,
        }
      : {
          duration: 0.32,
          ease: EASE_SOFT,
        };

  const underlineWidth = Math.min(slotWidth, 420);

  return (
    <section className="h-full w-full overflow-hidden">
      <div className="pointer-events-auto absolute left-0 right-0 top-[5.75rem] z-[70] lg:top-8">
        <div
          className="w-screen overflow-hidden"
          style={{
            paddingLeft: pillAxisLeft,
            paddingRight: axisLeft,
          }}
        >
          <div className="no-scrollbar grid grid-cols-3 gap-2 whitespace-nowrap sm:flex sm:items-center sm:gap-3 sm:overflow-x-auto">
            {slides.map((slide, index) => {
              const isActive = index === activeIndex;

              const base =
                "relative inline-flex h-9 min-w-0 w-full select-none " +
                "items-center justify-center rounded-full border " +
                "px-1.5 text-[0.56rem] uppercase tracking-[0.05em] " +
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 " +
                "min-[340px]:px-2 min-[340px]:text-[0.62rem] min-[340px]:tracking-[0.07em] " +
                "sm:w-auto sm:shrink-0 sm:px-5 sm:text-xs sm:tracking-[0.11em]";

              const idleClass =
                "border-(--line)/35 bg-black/15 text-(--fg)/85 " +
                "hover:border-(--line)/50 hover:text-(--fg)/95";

              const activeClass = "border-white/55";

              return (
                <motion.button
                  key={slide.id}
                  type="button"
                  onClick={() => onSelect(index)}
                  className={[
                    base,
                    isActive ? activeClass : idleClass,
                    "min-w-0 w-full sm:w-auto sm:min-w-[112px] md:min-w-[128px]",
                  ].join(" ")}
                  aria-pressed={isActive}
                  whileTap={{ scale: 0.985 }}
                  transition={{ duration: D_FAST, ease: EASE_SNAPPY }}
                >
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.span
                        className="pointer-events-none absolute inset-0 rounded-full bg-white/12"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                          duration: D_FAST,
                          ease: EASE_SNAPPY,
                        }}
                      />
                    )}
                  </AnimatePresence>

                  <motion.span
                    className="relative inline-flex items-center justify-center"
                    initial={false}
                    animate={
                      isActive
                        ? {
                            y: -1,
                            scale: 1.04,
                            opacity: 1,
                          }
                        : {
                            y: 0,
                            scale: 1,
                            opacity: 0.86,
                          }
                    }
                    transition={{
                      duration: D_BASE,
                      ease: EASE_SNAPPY,
                    }}
                  >
                    <span className="relative">
                      <span className={isActive ? "text-white" : ""}>
                        {slide.pill}
                      </span>

                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 font-semibold opacity-0"
                      >
                        {slide.pill}
                      </span>
                    </span>

                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.span
                          className="ml-2 inline-block h-1.5 w-1.5 rounded-full bg-white/80"
                          initial={{ opacity: 0, scale: 0.6 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.6 }}
                          transition={{
                            duration: D_FAST,
                            ease: EASE_SNAPPY,
                          }}
                        />
                      )}
                    </AnimatePresence>
                  </motion.span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex h-full w-full items-center pt-20 lg:pt-0">
        <div className="mx-auto w-full max-w-[1600px] px-0">
          <motion.div
            style={{ opacity: contentOpacity, y: contentY }}
            className="will-change-transform"
          >
            <div className={clippedLane} style={lanePaddingStyle}>
              <div className="flex min-w-0 items-center gap-3 sm:gap-5 lg:gap-6">
                <div className="shrink-0" style={{ marginLeft: -arrowsNudge }}>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={onPrev}
                      className="h-10 w-10 rounded-xl border border-white/30 bg-white/5 text-white/80 transition-all hover:border-white/50 hover:text-white"
                      aria-label="Previous"
                    >
                      {"‹"}
                    </button>

                    <button
                      type="button"
                      onClick={onNext}
                      className="h-10 w-10 rounded-xl border border-white/30 bg-white/5 text-white/80 transition-all hover:border-white/50 hover:text-white"
                      aria-label="Next"
                    >
                      {"›"}
                    </button>
                  </div>
                </div>

                <div className="relative min-w-0 -mt-[2px]">
                  <TitleWave
                    text={active?.title ?? ""}
                    trigger={activeIndex}
                    className="whitespace-nowrap leading-none text-[clamp(1.5rem,6.7vw,2.35rem)] font-semibold uppercase tracking-[0.1em] sm:text-[2.35rem] md:text-[2.6rem] lg:text-[2.8rem] lg:tracking-[0.12em]"
                  />

                  <motion.div
                    aria-hidden
                    className="mt-3 h-[3px] origin-left bg-white/35"
                    style={{ width: underlineWidth }}
                    initial={false}
                    animate={underlineControls}
                  />
                </div>
              </div>
            </div>

            <div
              className={`${laneBase} mt-6 sm:mt-8 lg:mt-10`}
              onMouseEnter={() => setIsHoveringStage(true)}
              onMouseLeave={() => setIsHoveringStage(false)}
            >
              <div
                className="pointer-events-none absolute top-0 z-[5] will-change-transform"
                style={{
                  left: axisLeft,
                  width: slotWidth,
                  height: slotHeight,
                  transform: "translateZ(0)",
                }}
              >
                <motion.div
                  className="relative h-full w-full rounded-2xl border-[3px] border-white"
                  style={{
                    transformOrigin: "center",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                  initial={false}
                  animate={frameAnimate}
                  transition={frameTransition}
                >
                  <div className="pointer-events-none absolute inset-[6px] rounded-[14px] border border-white/20" />
                </motion.div>
              </div>

              <div className="overflow-hidden">
                <div style={lanePaddingStyle}>
                  <motion.div
                    className="relative z-[1] flex will-change-transform"
                    initial={false}
                    animate={{ x: stripX }}
                    transition={{
                      duration: D_BASE,
                      ease: EASE_SOFT,
                    }}
                    onAnimationStart={() => {
                      window.dispatchEvent(new Event("stage:animStart"));
                    }}
                    onAnimationComplete={() => {
                      window.dispatchEvent(new Event("stage:animEnd"));
                    }}
                    style={{ gap }}
                  >
                    {slides.map((slide, index) => {
                      const thumb = slide.cards[0];
                      const isActive = index === activeIndex;

                      return (
                        <button
                          key={slide.id}
                          type="button"
                          onClick={() => onSelect(index)}
                          className="relative shrink-0 text-left"
                          style={{
                            width: slotWidth,
                            height: slotHeight,
                          }}
                          aria-label={`Select ${slide.pill}`}
                        >
                          <motion.div
                            className={[
                              "relative h-full w-full rounded-2xl will-change-[transform,filter]",
                              isActive ? "p-[8px]" : "",
                            ]
                              .filter(Boolean)
                              .join(" ")}
                            initial={false}
                            animate={{
                              scale: isActive ? 1 : 0.88,
                              opacity: isActive ? 1 : 0.6,
                              y: 0,
                              filter: isActive ? "blur(0px)" : "blur(0.5px)",
                            }}
                            transition={{
                              duration: D_BASE,
                              ease: EASE_SOFT,
                            }}
                          >
                            <div className="h-full w-full overflow-hidden rounded-[18px] bg-black">
                              {thumb ? (
                                <img
                                  src={thumb.src}
                                  alt={thumb.alt}
                                  className="h-full w-full object-cover"
                                  draggable={false}
                                />
                              ) : null}
                            </div>

                            {!isActive && (
                              <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/22" />
                            )}
                          </motion.div>
                        </button>
                      );
                    })}
                  </motion.div>
                </div>
              </div>
            </div>

            <div
              className={`${clippedLane} mt-4 sm:mt-5 lg:mt-6`}
              style={lanePaddingStyle}
            >
              <motion.p
                key={active?.id}
                initial={{ y: 3 }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.24,
                  ease: EASE_SOFT,
                }}
                className="max-w-[46ch] text-[12px] font-medium leading-[1.55] tracking-[0.08em] text-white/65 antialiased [text-wrap:balance] sm:text-[13px] sm:tracking-[0.1em] md:text-[14px]"
              >
                {active?.caption}
              </motion.p>
            </div>

            <div
              className={`${clippedLane} mt-4 sm:mt-5 lg:mt-6`}
              style={lanePaddingStyle}
            >
              <TransitionLink
                href={active?.ctaHref ?? "/"}
                onMouseEnter={() => setIsHoveringCta(true)}
                onMouseLeave={() => setIsHoveringCta(false)}
                onFocus={() => setIsHoveringCta(true)}
                onBlur={() => setIsHoveringCta(false)}
                className="inline-flex h-12 items-center justify-center rounded-full text-[10px] font-[500] uppercase leading-none tracking-[0.28em] text-black shadow-[0_10px_28px_rgba(0,0,0,0.22)] transition-[background-image,box-shadow,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:opacity-[0.96] hover:shadow-[0_14px_44px_rgba(0,0,0,0.26)] active:opacity-[0.92] active:shadow-[0_9px_24px_rgba(0,0,0,0.20)] sm:h-14 sm:text-[11px] sm:tracking-[0.32em] md:text-[12px]"
                style={{
                  width: slotWidth,
                  maxWidth: "100%",
                  backgroundImage: isHoveringCta
                    ? "linear-gradient(to bottom, #f7c600 0%, #f0b800 100%)"
                    : "linear-gradient(to bottom, #ffffff 0%, #f4f4f4 100%)",
                }}
                direction="up"
              >
                Open page
              </TransitionLink>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
