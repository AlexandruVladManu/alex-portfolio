"use client";

import { AnimatePresence, motion } from "framer-motion";

import TransitionLink from "@/components/TransitionLink";
import { useNav } from "@/components/state/NavContext";

type NavItem = {
  label: string;
  href: string;
};

const navItems: NavItem[] = [
  {
    label: "Work",
    href: "/projects",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

export default function FullscreenNav() {
  const { open, setOpen } = useNav();

  const closeNav = () => {
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 backdrop-blur-xl"
          onClick={closeNav}
        >
          <motion.nav
            aria-label="Primary navigation"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{
              duration: 0.35,
              ease: "easeOut",
              delay: 0.05,
            }}
            className="space-y-8 text-center text-3xl"
            onClick={(event) => event.stopPropagation()}
          >
            {navItems.map((item) => (
              <TransitionLink
                key={item.href}
                href={item.href}
                direction="up"
                onClick={closeNav}
                className="block transition-opacity hover:opacity-70"
              >
                {item.label}
              </TransitionLink>
            ))}
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
