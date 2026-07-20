"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useMotionValue } from "framer-motion";
import { usePathname } from "next/navigation";

import HeroShell from "@/components/HeroShell";
import StageOverlay from "@/components/stage/StageOverlay";
import { withBasePath } from "@/lib/withBasePath";

const OPEN_HUB_EVENT = "portfolio:openHub";
const CLOSE_HUB_EVENT = "portfolio:closeHub";
const PREPARE_HUB_RETURN_EVENT = "portfolio:prepareHubReturn";

const OPEN_INPUT_LOCK_MS = 900;

const SLIDES = [
  {
    id: "about",
    pill: "About me",
    title: "ABOUT ME",
    ctaHref: "/about",
    caption: "Background, mindset and philosophy.",
    cards: [
      {
        id: "about-1",
        src: withBasePath("/stage/about/Who-I-am.webp"),
        alt: "About preview",
      },
    ] as const,
  },
  {
    id: "projects",
    pill: "Projects",
    title: "PROJECTS",
    ctaHref: "/projects",
    caption: "Selected work and experiments.",
    cards: [
      {
        id: "projects-1",
        src: withBasePath("/stage/projects/projects.webp"),
        alt: "Projects preview",
      },
    ] as const,
  },
  {
    id: "contact",
    pill: "Contact",
    title: "CONTACT",
    ctaHref: "/contact",
    caption: "Availability, links and next steps.",
    cards: [
      {
        id: "contact-1",
        src: withBasePath("/stage/about/contact-v2.webp"),
        alt: "Contact preview",
      },
    ] as const,
  },
] as const;

export default function HubUnderlay() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const phase = useMotionValue(0);

  const [isHubOpen, setIsHubOpen] = useState(false);
  const [isPreparingReturn, setIsPreparingReturn] = useState(false);

  const isHubOpenRef = useRef(false);
  const isPreparingReturnRef = useRef(false);
  const openInputLockedUntilRef = useRef(0);
  const touchStartYRef = useRef<number | null>(null);

  const hubEnabled = isHome || isPreparingReturn;

  useEffect(() => {
    isHubOpenRef.current = isHubOpen;
  }, [isHubOpen]);

  useEffect(() => {
    isPreparingReturnRef.current = isPreparingReturn;
  }, [isPreparingReturn]);

  useEffect(() => {
    const openHub = () => {
      const now = performance.now();

      if (now < openInputLockedUntilRef.current) return;

      openInputLockedUntilRef.current = now + OPEN_INPUT_LOCK_MS;

      setIsHubOpen(true);
      setIsPreparingReturn(false);

      animate(phase, 1, {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
      });
    };

    const closeHub = () => {
      setIsHubOpen(false);
      setIsPreparingReturn(false);

      openInputLockedUntilRef.current = performance.now() + 450;

      animate(phase, 0, {
        duration: 0.75,
        ease: [0.16, 1, 0.3, 1],
      });
    };

    const prepareHubReturn = () => {
      setIsHubOpen(true);
      setIsPreparingReturn(true);

      phase.set(0.999);

      window.requestAnimationFrame(() => {
        phase.set(1);
      });
    };

    window.addEventListener(OPEN_HUB_EVENT, openHub);
    window.addEventListener(CLOSE_HUB_EVENT, closeHub);
    window.addEventListener(PREPARE_HUB_RETURN_EVENT, prepareHubReturn);

    return () => {
      window.removeEventListener(OPEN_HUB_EVENT, openHub);
      window.removeEventListener(CLOSE_HUB_EVENT, closeHub);
      window.removeEventListener(PREPARE_HUB_RETURN_EVENT, prepareHubReturn);
    };
  }, [phase]);

  useEffect(() => {
    if (!isHome) return;
    if (!isPreparingReturn) return;

    const release = window.setTimeout(() => {
      setIsPreparingReturn(false);
    }, 700);

    return () => window.clearTimeout(release);
  }, [isHome, isPreparingReturn]);

  useEffect(() => {
    if (!isHome) return;

    const requestOpenHub = () => {
      if (isHubOpenRef.current) return;
      if (isPreparingReturnRef.current) return;

      window.dispatchEvent(new Event(OPEN_HUB_EVENT));
    };

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();

      if (isHubOpenRef.current) return;
      if (event.deltaY <= 18) return;

      requestOpenHub();
    };

    const onTouchStart = (event: TouchEvent) => {
      const touch = event.touches[0];
      touchStartYRef.current = touch?.clientY ?? null;
    };

    const onTouchMove = (event: TouchEvent) => {
      event.preventDefault();

      if (isHubOpenRef.current) return;

      const touch = event.touches[0];
      if (!touch) return;

      const startY = touchStartYRef.current;
      if (startY == null) return;

      const deltaY = startY - touch.clientY;

      if (deltaY > 28) {
        requestOpenHub();
        touchStartYRef.current = touch.clientY;
      }
    };

    const onTouchEnd = () => {
      touchStartYRef.current = null;
    };

    const onKeyDown = (event: KeyboardEvent) => {
      const openKeys = new Set(["ArrowDown", "PageDown", " "]);

      const blockedKeys = new Set([
        "ArrowUp",
        "ArrowDown",
        "PageUp",
        "PageDown",
        "Home",
        "End",
        " ",
      ]);

      if (blockedKeys.has(event.key)) {
        event.preventDefault();
      }

      if (isHubOpenRef.current) return;

      if (openKeys.has(event.key)) {
        requestOpenHub();
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, {
      passive: true,
    });
    window.addEventListener("touchmove", onTouchMove, {
      passive: false,
    });
    window.addEventListener("touchend", onTouchEnd, {
      passive: true,
    });
    window.addEventListener("touchcancel", onTouchEnd, {
      passive: true,
    });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isHome]);

  return (
    <div
      className="fixed inset-0 z-0 overflow-hidden"
      style={{
        pointerEvents: isHome ? "auto" : "none",
      }}
      aria-hidden={!isHome && !isPreparingReturn}
    >
      <HeroShell phase={phase} />

      <StageOverlay slides={SLIDES} phase={phase} enabled={hubEnabled} />

      <div aria-hidden className="h-[220px]" data-hub-open={isHubOpen} />
    </div>
  );
}
