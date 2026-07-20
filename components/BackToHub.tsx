"use client";

import { usePathname } from "next/navigation";
import TransitionLink from "@/components/TransitionLink";

export default function BackToHub() {
  const pathname = usePathname();

  if (pathname === "/") return null;

  return (
    <div
      className="pointer-events-auto fixed top-6 z-[85]"
      style={{ left: "clamp(120px, 10vw, 220px)" }}
    >
      <TransitionLink
        href="/"
        direction="down"
        className="inline-flex h-10 items-center gap-3 rounded-full bg-white/20 px-5 text-[0.7rem] font-medium uppercase tracking-[0.22em] text-white backdrop-blur-md border border-white/15 hover:bg-white/25 transition"
      >
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/15">
          ←
        </span>
        Back to home
      </TransitionLink>
    </div>
  );
}
