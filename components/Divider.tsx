"use client";

import { motion } from "framer-motion";

export default function Divider() {
  return (
    <motion.hr
      className="border-0 h-px my-4"
      initial={{ scaleX: 0, transformOrigin: "left" }}
      whileInView={{
        scaleX: 1,
        transition: { duration: 0.6, ease: "easeOut" },
      }}
      viewport={{ once: true }}
      style={{
        backgroundImage:
          "linear-gradient(90deg, #d8a354, rgba(35, 36, 38, 0.8))",
      }}
    />
  );
}
