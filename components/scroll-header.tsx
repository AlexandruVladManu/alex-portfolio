"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function ScrollHeader() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 10); // later can change to 120
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="scroll-header"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed top-6 right-20 z-40 flex items-center gap-6
                     text-muted"
        >
          <span className="text-[0.65rem] tracking-[0.25em] uppercase opacity-70">
            Back to Home
          </span>

          <nav className="flex items-center gap-4 text-sm">
            <Link href="/work" className="opacity-75 hover:opacity-100">
              Works
            </Link>
            <Link href="/about" className="opacity-75 hover:opacity-100">
              Abouts
            </Link>
            <Link href="/contact" className="opacity-75 hover:opacity-100">
              Contact
            </Link>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
