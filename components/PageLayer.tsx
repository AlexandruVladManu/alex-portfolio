"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useStageTransition } from "@/components/StageTransitionProvider";

export default function PageLayer({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const { pageControls, isPageFrozen, frozenPageTop, isTransitioning } =
    useStageTransition();

  return (
    <motion.div
      animate={pageControls}
      initial={false}
      className="z-[10] min-h-[100svh] w-full"
      style={{
        position: isPageFrozen ? "fixed" : "relative",
        top: isPageFrozen ? frozenPageTop : undefined,
        left: isPageFrozen ? 0 : undefined,
        right: isPageFrozen ? 0 : undefined,
        pointerEvents: isHome ? "none" : "auto",

        /*
         * Route transitions require the entire page to be a transform layer.
         * Once the transition finishes, remove that transform completely.
         *
         * This is important for iOS Safari because sticky descendants inside
         * a permanently transformed ancestor can shake during scroll-linked
         * animation and image compositing.
         */
        transform: isTransitioning ? undefined : "none",
        willChange: isTransitioning ? "transform" : "auto",
      }}
    >
      {children}
    </motion.div>
  );
}
