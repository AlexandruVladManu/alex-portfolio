"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import React from "react";
import TransitionLink from "@/components/TransitionLink";

const OPEN_HUB_EVENT = "portfolio:openHub";
const CLOSE_HUB_EVENT = "portfolio:closeHub";
const PREPARE_HUB_RETURN_EVENT = "portfolio:prepareHubReturn";

export function Logo() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [isHubOpen, setIsHubOpen] = React.useState(false);

  React.useEffect(() => {
    const showHubBackButton = () => {
      setIsHubOpen(true);
    };

    const showBrand = () => {
      setIsHubOpen(false);
    };

    window.addEventListener(OPEN_HUB_EVENT, showHubBackButton);
    window.addEventListener(PREPARE_HUB_RETURN_EVENT, showHubBackButton);
    window.addEventListener(CLOSE_HUB_EVENT, showBrand);

    return () => {
      window.removeEventListener(OPEN_HUB_EVENT, showHubBackButton);
      window.removeEventListener(PREPARE_HUB_RETURN_EVENT, showHubBackButton);
      window.removeEventListener(CLOSE_HUB_EVENT, showBrand);
    };
  }, []);

  const backBtnClass =
    "inline-flex w-max max-w-[calc(100vw-5.5rem)] items-center " +
    "gap-2 whitespace-nowrap rounded-full border border-white/15 " +
    "bg-white/15 px-3 py-2 " +
    "text-[0.62rem] font-medium uppercase leading-none " +
    "tracking-[0.14em] text-white backdrop-blur-md " +
    "transition hover:bg-white/20 " +
    "sm:gap-3 sm:px-4 sm:text-[0.67rem] sm:tracking-[0.18em] " +
    "md:px-5 md:text-[0.7rem] md:tracking-[0.22em]";

  const closeHub = React.useCallback(() => {
    window.dispatchEvent(new Event(CLOSE_HUB_EVENT));
  }, []);

  return (
    <div className="fixed left-4 top-4 z-[80] sm:left-6 sm:top-6 md:left-10 md:top-8">
      <div className="inline-flex items-center gap-2.5 sm:gap-3">
        <span className="inline-block h-5 w-5 shrink-0 rounded-full border border-white/30 sm:h-6 sm:w-6" />

        {isHome ? (
          <div className="relative min-h-10 min-w-[180px] sm:min-w-[220px]">
            <motion.div
              initial={false}
              animate={{
                opacity: isHubOpen ? 0 : 1,
                y: isHubOpen ? -14 : 0,
                pointerEvents: isHubOpen ? "none" : "auto",
              }}
              transition={{
                duration: 0.42,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="absolute left-0 top-1/2 -translate-y-1/2"
            >
              <Link
                href="/"
                className="whitespace-nowrap text-[0.8rem] tracking-wide text-white/85 transition-colors hover:text-white sm:text-sm"
                aria-label="Go to home"
              >
                <span className="font-medium">Alex — Portfolio</span>
              </Link>
            </motion.div>

            <motion.button
              type="button"
              onClick={closeHub}
              initial={false}
              animate={{
                opacity: isHubOpen ? 1 : 0,
                y: isHubOpen ? 0 : 14,
                pointerEvents: isHubOpen ? "auto" : "none",
              }}
              transition={{
                duration: 0.42,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`absolute left-0 top-0 ${backBtnClass}`}
              aria-label="Back to home"
            >
              <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/15">
                ←
              </span>
              Back to home
            </motion.button>
          </div>
        ) : (
          <TransitionLink
            href="/"
            direction="down"
            className={backBtnClass}
            aria-label="Back to home"
          >
            <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/15">
              ←
            </span>
            Back to home
          </TransitionLink>
        )}
      </div>
    </div>
  );
}
