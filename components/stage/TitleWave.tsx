"use client";

import * as React from "react";
import { motion, type Variants } from "framer-motion";

type Props = {
  text: string;
  /** change this value to retrigger the wave (e.g. activeIndex) */
  trigger: number | string;
  className?: string;
};

export default function TitleWave({ text, trigger, className }: Props) {
  const chars = React.useMemo(() => Array.from(text), [text]);

  // ✅ Type as cubic-bezier tuple so TS is happy
  const EASE: [number, number, number, number] = [0.2, 0.8, 0.2, 1];

  const container: Variants = {
    show: {
      transition: {
        staggerChildren: 0.018,
        delayChildren: 0.02,
      },
    },
  };

  const char: Variants = {
    hidden: { y: 14, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.38,
        ease: EASE,
      },
    },
  };

  return (
    <motion.h2
      key={String(trigger)}
      className={className}
      variants={container}
      initial="hidden"
      animate="show"
      aria-label={text}
    >
      {chars.map((c, i) => {
        const display = c === " " ? "\u00A0" : c;
        return (
          <motion.span
            key={`${c}-${i}`}
            variants={char}
            className="inline-block will-change-transform"
          >
            {display}
          </motion.span>
        );
      })}
    </motion.h2>
  );
}
