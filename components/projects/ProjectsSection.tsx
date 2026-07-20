"use client";

import React from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { withBasePath } from "@/lib/withBasePath";

type ProjectItem = {
  index: string;
  title: string;
  year: string;
  tags: string[];
  description: string;
  liveUrl?: string;
  liveLabel?: string;
  primaryImage: string;
  secondaryImage: string;
  primaryImagePosition?: string;
  secondaryImagePosition?: string;
  overlayClassName?: string;
  stickyInset?: string;
  stickyFrameHeight?: string;
  titleClassName?: string;
};

const projects: ProjectItem[] = [
  {
    index: "01",
    title: "Hidden",
    year: "2024",
    tags: ["Frontend Dev", "Real Client", "Hospitality"],
    description:
      "A dark hospitality website built around atmosphere, brand presence, and direct access to menu, events, and contact information.",
    liveUrl: "https://hiddenpub.ro/",
    liveLabel: "Visit site",
    primaryImage: withBasePath("/projects/hidden-1.webp"),
    secondaryImage: withBasePath("/projects/hidden-2.webp"),
    primaryImagePosition: "center center",
    secondaryImagePosition: "center center",
    overlayClassName:
      "bg-[linear-gradient(90deg,rgba(2,6,23,0.86)_0%,rgba(2,6,23,0.72)_24%,rgba(2,6,23,0.38)_50%,rgba(2,6,23,0.60)_74%,rgba(2,6,23,0.82)_100%)]",
    stickyInset: "6rem",
  },
  {
    index: "02",
    title: "MVIEWSERVICE",
    year: "2025",
    tags: ["Frontend Dev", "Real Client", "Business Website"],
    description:
      "A practical service-business website for an auto service and parts company, focused on clarity, service discovery, and local commercial credibility.",
    liveUrl: "https://mviewservice.ro/",
    liveLabel: "Visit site",
    primaryImage: withBasePath("/projects/service-1.webp"),
    secondaryImage: withBasePath("/projects/service-2.webp"),
    primaryImagePosition: "center center",
    secondaryImagePosition: "center center",
    overlayClassName:
      "bg-[linear-gradient(90deg,rgba(2,6,23,0.88)_0%,rgba(2,6,23,0.72)_24%,rgba(18,10,12,0.46)_50%,rgba(22,8,10,0.72)_76%,rgba(2,6,23,0.90)_100%)]",
    titleClassName: "text-[clamp(3.45rem,5.25vw,5.85rem)]",
  },
  {
    index: "03",
    title: "Wild Oasis",
    year: "2023",
    tags: ["React", "Next.js", "Dashboard UI"],
    description:
      "A course-based React application interface focused on bookings, dashboard views, tables, filtering, and admin-style product logic.",
    liveUrl: "https://alexandruvladmanu.github.io/wild-oasis-demo/",
    liveLabel: "Visit site",
    primaryImage: withBasePath("/projects/wildoasis-1.webp"),
    secondaryImage: withBasePath("/projects/wildoasis-2.webp"),
    primaryImagePosition: "center center",
    secondaryImagePosition: "center center",
    overlayClassName:
      "bg-[linear-gradient(90deg,rgba(2,6,23,0.84)_0%,rgba(6,12,28,0.64)_24%,rgba(8,14,32,0.34)_50%,rgba(8,14,32,0.54)_74%,rgba(2,6,23,0.80)_100%)]",
  },
];

const titleTextShadow: React.CSSProperties = {
  textShadow: "0 2px 18px rgba(0,0,0,0.45)",
};

const bodyTextShadow: React.CSSProperties = {
  textShadow: "0 1px 10px rgba(0,0,0,0.55)",
};

type ProjectImageLayerProps = {
  src: string;
  opacity: MotionValue<number>;
  objectPosition?: string;
  priority?: boolean;
  zIndexClassName: string;
};

function ProjectImageLayer({
  src,
  opacity,
  objectPosition = "center center",
  priority = false,
  zIndexClassName,
}: ProjectImageLayerProps) {
  return (
    <motion.div
      className={`scroll-opacity-layer pointer-events-none absolute inset-0 ${zIndexClassName}`}
      style={{ opacity }}
    >
      <Image
        src={src}
        alt=""
        fill
        priority={priority}
        sizes="100vw"
        className="select-none object-cover"
        style={{ objectPosition }}
      />
    </motion.div>
  );
}

function VisitSiteButton({
  href,
  label = "Visit site",
}: {
  href?: string;
  label?: string;
}) {
  const baseClassName =
    "group mt-5 inline-flex h-10 min-w-[9.5rem] items-center justify-center gap-3 rounded-full border px-5 text-[0.67rem] font-semibold uppercase tracking-[0.18em] transition-all duration-300 sm:h-11 sm:min-w-[10.5rem] sm:px-6 lg:mt-4";

  if (!href) {
    return (
      <span
        aria-disabled="true"
        className={`${baseClassName} cursor-not-allowed border-white/12 bg-black/20 text-white/38 backdrop-blur-md`}
      >
        {label}
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseClassName} border-white/30 bg-black/25 text-white/90 backdrop-blur-md hover:border-[#f7c600]/80 hover:bg-[#f7c600] hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f7c600]/60`}
      aria-label={`${label} for project, opens in a new tab`}
    >
      <span>{label}</span>

      <span
        aria-hidden="true"
        className="inline-block text-[0.9rem] leading-none transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      >
        ↗
      </span>
    </a>
  );
}

function ProjectStage({
  project,
  isFirst,
}: {
  project: ProjectItem;
  isFirst: boolean;
}) {
  const sectionRef = React.useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  /*
   * Apply scale and vertical movement once to the shared image stage.
   * The two image surfaces now animate only opacity.
   */
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.06, 1]);

  /*
   * Stable pixel movement avoids recalculating viewport-relative transform
   * values while iOS Safari changes or evaluates its browser chrome viewport.
   */
  const imageY = useTransform(scrollYProgress, [0, 1], [28, -28]);

  const primaryOpacity = useTransform(
    scrollYProgress,
    [0, 0.45, 0.75],
    [1, 1, 0],
  );

  const secondaryOpacity = useTransform(scrollYProgress, [0.42, 0.75], [0, 1]);

  const defaultStickyTopInset = "13rem";
  const desktopStickyTopInset = project.stickyInset ?? defaultStickyTopInset;

  const desktopStickyFrameHeight =
    project.stickyFrameHeight ?? "max(42svh, 21rem)";

  const mobileStickyTopInset = isFirst ? "5.5rem" : "7rem";
  const tabletStickyTopInset = isFirst ? "5.5rem" : "8rem";

  const railOffsetTop = "3rem";

  const desktopTitleClassName =
    project.titleClassName ?? "text-[clamp(4.25rem,6.6vw,7rem)]";

  const tabletTitleClassName =
    project.title === "MVIEWSERVICE"
      ? "text-[clamp(2.65rem,5.1vw,3.4rem)]"
      : "text-[clamp(3.2rem,6vw,4.25rem)]";

  const tabletDescriptionClassName =
    project.title === "MVIEWSERVICE"
      ? "max-w-[clamp(22rem,38vw,26rem)]"
      : project.title === "Wild Oasis"
        ? "max-w-[clamp(18rem,32vw,22rem)]"
        : "max-w-[clamp(16rem,28vw,19rem)]";

  const mobileTitleClassName =
    project.title === "MVIEWSERVICE"
      ? "text-[clamp(2.15rem,9.2vw,3rem)]"
      : "text-[clamp(2.65rem,11vw,3.8rem)]";

  const mobileDescriptionClassName =
    project.title === "MVIEWSERVICE"
      ? "max-w-[23rem]"
      : project.title === "Wild Oasis"
        ? "max-w-[20rem]"
        : "max-w-[20.5rem]";

  const stickyVariables = {
    "--project-sticky-mobile": mobileStickyTopInset,
    "--project-sticky-tablet": tabletStickyTopInset,
    "--project-sticky-desktop": desktopStickyTopInset,
  } as React.CSSProperties & Record<string, string>;

  return (
    <article
      ref={sectionRef}
      className="relative h-[180svh] bg-[#02050c] text-white"
    >
      <div className="absolute inset-0 z-0">
        <div className="scroll-paint-container sticky top-0 h-[100svh] overflow-hidden">
          <motion.div
            className="scroll-compositor-layer absolute inset-x-0 -bottom-8 -top-8 will-change-transform"
            style={{
              scale: imageScale,
              y: imageY,
            }}
          >
            <ProjectImageLayer
              src={project.primaryImage}
              opacity={primaryOpacity}
              objectPosition={project.primaryImagePosition}
              priority={isFirst}
              zIndexClassName="z-0"
            />

            <ProjectImageLayer
              src={project.secondaryImage}
              opacity={secondaryOpacity}
              objectPosition={project.secondaryImagePosition}
              zIndexClassName="z-10"
            />
          </motion.div>

          <div
            className={[
              "pointer-events-none absolute inset-0 z-20",
              project.overlayClassName ?? "",
            ].join(" ")}
          />

          <div className="pointer-events-none absolute inset-0 z-30 bg-[linear-gradient(180deg,rgba(2,5,12,0.12)_0%,rgba(2,5,12,0.04)_42%,rgba(2,5,12,0.46)_100%)]" />
        </div>
      </div>

      <div
        className="sticky z-40 top-[var(--project-sticky-mobile)] md:top-[var(--project-sticky-tablet)] lg:top-[var(--project-sticky-desktop)]"
        style={stickyVariables}
      >
        {/* Mobile */}
        <div className="relative min-h-[56svh] px-5 md:hidden">
          <div className="flex items-start justify-between gap-6">
            <span className="block text-[clamp(5.4rem,24vw,7.4rem)] font-light leading-[0.82] tracking-[-0.08em] text-white">
              {project.index}
            </span>

            <span className="pt-3 text-right text-[0.82rem] font-medium tracking-[0.08em] text-white/80">
              {project.year}
            </span>
          </div>

          <div className="mt-8">
            <h2
              className={[
                mobileTitleClassName,
                "font-light uppercase leading-[0.88]",
                "tracking-[-0.06em] text-white",
              ].join(" ")}
              style={titleTextShadow}
            >
              {project.title}
            </h2>

            <div className="mt-5 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-sm border border-white/20 bg-white/90 px-2.5 py-1 text-[0.66rem] font-medium uppercase tracking-[0.07em] text-black"
                >
                  {tag}
                </span>
              ))}
            </div>

            <p
              className={[
                "mt-5 text-[0.98rem] leading-[1.42] text-white/92",
                mobileDescriptionClassName,
              ].join(" ")}
              style={bodyTextShadow}
            >
              {project.description}
            </p>

            <VisitSiteButton href={project.liveUrl} label={project.liveLabel} />
          </div>
        </div>

        {/* Tablet */}
        <div className="relative hidden min-h-[44svh] px-8 md:block lg:hidden">
          <div className="grid grid-cols-[clamp(9rem,22vw,12.5rem)_minmax(0,1fr)_4.5rem] items-start gap-x-6 pt-8">
            <div>
              <span className="block text-[clamp(7rem,16vw,10rem)] font-light leading-[0.84] tracking-[-0.08em] text-white">
                {project.index}
              </span>
            </div>

            <div className="min-w-0">
              <h2
                className={[
                  tabletTitleClassName,
                  "whitespace-nowrap font-light uppercase",
                  "leading-[0.88] tracking-[-0.065em] text-white",
                ].join(" ")}
                style={titleTextShadow}
              >
                {project.title}
              </h2>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-sm border border-white/20 bg-white/90 px-2.5 py-1 text-[0.68rem] font-medium uppercase tracking-[0.08em] text-black"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p
                className={[
                  "mt-5 text-[clamp(0.98rem,1.6vw,1.08rem)]",
                  "leading-[1.38] text-white/92",
                  tabletDescriptionClassName,
                ].join(" ")}
                style={bodyTextShadow}
              >
                {project.description}
              </p>

              <VisitSiteButton
                href={project.liveUrl}
                label={project.liveLabel}
              />
            </div>

            <div className="pt-2 text-right">
              <span className="text-[0.9rem] font-medium tracking-[0.08em] text-white/80">
                {project.year}
              </span>
            </div>
          </div>
        </div>

        {/* Desktop */}
        <div
          className="relative hidden w-full lg:block"
          style={{ height: desktopStickyFrameHeight }}
        >
          <div
            className="pointer-events-none absolute left-[clamp(1.5rem,2.7vw,3rem)]"
            style={{ top: railOffsetTop }}
          >
            <span className="block text-[clamp(7rem,14vw,12rem)] font-light leading-[0.86] tracking-[-0.08em] text-white">
              {project.index}
            </span>
          </div>

          <div
            className="pointer-events-none absolute right-[clamp(1.5rem,2.7vw,3rem)]"
            style={{ top: railOffsetTop }}
          >
            <span className="block text-right text-[0.95rem] font-medium tracking-[0.08em] text-white/80">
              {project.year}
            </span>
          </div>

          <div
            className="absolute right-[clamp(6rem,12vw,14rem)] w-[min(40rem,36vw)]"
            style={{ top: railOffsetTop }}
          >
            <h2
              className={[
                desktopTitleClassName,
                "font-light uppercase leading-[0.86]",
                "tracking-[-0.065em] text-white",
              ].join(" ")}
              style={titleTextShadow}
            >
              {project.title}
            </h2>

            <div className="mt-5 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-sm border border-white/20 bg-white/90 px-2.5 py-1 text-[0.72rem] font-medium uppercase tracking-[0.08em] text-black"
                >
                  {tag}
                </span>
              ))}
            </div>

            <p
              className="mt-5 max-w-[31rem] text-[clamp(1rem,1.1vw,1.12rem)] leading-[1.34] text-white/92"
              style={bodyTextShadow}
            >
              {project.description}
            </p>

            <VisitSiteButton href={project.liveUrl} label={project.liveLabel} />
          </div>
        </div>
      </div>
    </article>
  );
}

export default function ProjectsSection() {
  return (
    <section className="relative bg-[#02050c]">
      <div className="absolute inset-x-0 top-0 z-50 h-px bg-white/10" />

      {projects.map((project, index) => (
        <ProjectStage
          key={project.index}
          project={project}
          isFirst={index === 0}
        />
      ))}
    </section>
  );
}
