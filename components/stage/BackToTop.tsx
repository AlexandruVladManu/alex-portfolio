"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const OPEN_HUB_EVENT = "portfolio:openHub";
const CLOSE_HUB_EVENT = "portfolio:closeHub";
const PREPARE_HUB_RETURN_EVENT = "portfolio:prepareHubReturn";

export default function BackToTop() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const show = () => setIsVisible(true);
    const hide = () => setIsVisible(false);

    window.addEventListener(OPEN_HUB_EVENT, show);
    window.addEventListener(PREPARE_HUB_RETURN_EVENT, show);
    window.addEventListener(CLOSE_HUB_EVENT, hide);

    return () => {
      window.removeEventListener(OPEN_HUB_EVENT, show);
      window.removeEventListener(PREPARE_HUB_RETURN_EVENT, show);
      window.removeEventListener(CLOSE_HUB_EVENT, hide);
    };
  }, []);

  if (!isHome) return null;

  return (
    <motion.div
      initial={false}
      animate={{
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : 18,
        pointerEvents: isVisible ? "auto" : "none",
      }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="fixed left-0 right-0 top-6 z-[85] px-6 md:px-16 lg:px-24"
    >
      <div className="mx-auto w-full max-w-[1600px]">
        <div className="grid grid-cols-[clamp(140px,18vw,280px)_1fr] items-center">
          <div className="flex justify-end pr-2 md:pr-3">
            <button
              type="button"
              onClick={() => {
                window.dispatchEvent(new Event(CLOSE_HUB_EVENT));
              }}
              className="inline-flex h-10 items-center gap-3 rounded-full border border-white/15 bg-white/20 px-5 text-[0.7rem] font-medium uppercase tracking-[0.22em] text-white backdrop-blur-md transition hover:bg-white/25"
              aria-label="Back to home"
            >
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/15">
                ←
              </span>
              Back to home
            </button>
          </div>

          <div aria-hidden className="h-1" />
        </div>
      </div>
    </motion.div>
  );
}
