"use client";

import { motion } from "framer-motion";
import { useNav } from "@/components/state/NavContext";

export function MenuCircle() {
  const { open, setOpen } = useNav();

  return (
    <motion.button
      type="button"
      onClick={() => setOpen(!open)}
      initial={false}
      animate={{ rotate: open ? 45 : 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="fixed right-4 top-4 z-[1100] flex h-11 w-11 items-center justify-center rounded-full border border-(--line) transition-opacity hover:opacity-80 sm:right-6 sm:top-6 sm:h-12 sm:w-12 md:right-8 md:top-8"
      aria-label={open ? "Close navigation" : "Open navigation"}
      aria-expanded={open}
    >
      <motion.div
        initial={false}
        animate={{
          opacity: 1,
          rotate: open ? 90 : 0,
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="relative h-5 w-5"
      >
        <span className="absolute left-1/2 top-0 h-full w-[3px] -translate-x-1/2 bg-white" />
        <span className="absolute left-0 top-1/2 h-[3px] w-full -translate-y-1/2 bg-white" />
      </motion.div>
    </motion.button>
  );
}
