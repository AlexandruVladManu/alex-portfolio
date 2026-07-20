"use client";

import { Logo } from "@/components/Logo";
import { MenuCircle } from "@/components/MenuCircle";
import FullscreenNav from "@/components/FullscreenNav";
import { usePathname } from "next/navigation";
import { motion, useTransform } from "framer-motion";
import useScrollPhase from "@/components/hooks/useScrollPhase";

export default function SiteChrome() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const { phase } = useScrollPhase(90);

  // Match StageOverlay activation threshold
  const dockOpacity = useTransform(phase, [0.92, 1], [0, 1]);
  const dockY = useTransform(phase, [0.92, 1], [12, 0]);

  const LINKS = {
    email: "mailto:alex@example.com",
    github: "https://github.com/your-username",
    linkedin: "https://www.linkedin.com/in/your-handle",
  } as const;

  const iconSize = "h-[24px] w-[24px] md:h-[26px] md:w-[26px]";
  const strokeW = 1.8;

  const linkClass =
    "opacity-70 hover:opacity-100 transition-opacity duration-300";

  // ✅ IMPORTANT: keep className as a single-line string (avoid hydration mismatch)
  const dockClass =
    "pointer-events-auto fixed z-[80] bottom-7 right-7 md:bottom-12 md:right-14";

  return (
    <>
      <div className="fixed inset-0 z-[80] pointer-events-none">
        <div className="pointer-events-auto">
          <Logo />
        </div>

        <div className="pointer-events-auto">
          <MenuCircle />
        </div>

        {/* Bottom-right contact dock — ONLY when hub active */}
        {isHome && (
          <motion.div
            style={{ opacity: dockOpacity, y: dockY }}
            className={dockClass}
          >
            <div className="flex items-center gap-7 md:gap-8">
              <a href={LINKS.email} className={linkClass} aria-label="Email">
                <svg
                  className={`${iconSize} text-white`}
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M4 7.5A2.5 2.5 0 0 1 6.5 5h11A2.5 2.5 0 0 1 20 7.5v9A2.5 2.5 0 0 1 17.5 19h-11A2.5 2.5 0 0 1 4 16.5v-9Z"
                    stroke="currentColor"
                    strokeWidth={strokeW}
                  />
                  <path
                    d="M6.5 7.5 12 12l5.5-4.5"
                    stroke="currentColor"
                    strokeWidth={strokeW}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>

              <a
                href={LINKS.github}
                target="_blank"
                rel="noreferrer"
                className={linkClass}
                aria-label="GitHub"
              >
                <svg
                  className={`${iconSize} text-white`}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2.75c-5.1 0-9.25 4.16-9.25 9.3 0 4.1 2.66 7.58 6.34 8.81.46.09.63-.2.63-.44v-1.55c-2.58.57-3.12-1.12-3.12-1.12-.42-1.1-1.03-1.39-1.03-1.39-.84-.58.06-.57.06-.57.93.07 1.42.96 1.42.96.83 1.44 2.18 1.02 2.71.78.08-.61.33-1.02.6-1.26-2.06-.24-4.22-1.04-4.22-4.62 0-1.02.36-1.86.95-2.52-.1-.24-.41-1.22.09-2.54 0 0 .78-.25 2.55.96a8.7 8.7 0 0 1 4.64 0c1.77-1.21 2.55-.96 2.55-.96.5 1.32.19 2.3.1 2.54.59.66.95 1.5.95 2.52 0 3.59-2.17 4.38-4.23 4.61.34.3.64.9.64 1.82v2.7c0 .24.16.53.63.44 3.68-1.23 6.34-4.7 6.34-8.81 0-5.14-4.15-9.3-9.25-9.3Z" />
                </svg>
              </a>

              <a
                href={LINKS.linkedin}
                target="_blank"
                rel="noreferrer"
                className={linkClass}
                aria-label="LinkedIn"
              >
                <svg
                  className={`${iconSize} text-white`}
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M6.5 9.5V19"
                    stroke="currentColor"
                    strokeWidth={strokeW}
                    strokeLinecap="round"
                  />
                  <path
                    d="M6.5 6.5h.01"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <path
                    d="M10.5 19v-5.3c0-1.85 1.05-3.2 2.85-3.2 1.73 0 2.65 1.23 2.65 3.2V19"
                    stroke="currentColor"
                    strokeWidth={strokeW}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10.5 9.5V19"
                    stroke="currentColor"
                    strokeWidth={strokeW}
                    strokeLinecap="round"
                  />
                </svg>
              </a>
            </div>
          </motion.div>
        )}
      </div>

      <div className="relative z-[90]">
        <FullscreenNav />
      </div>
    </>
  );
}
