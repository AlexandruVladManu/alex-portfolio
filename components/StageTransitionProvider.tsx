"use client";

import React from "react";
import { useAnimationControls } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";

type Direction = "up" | "down";
type PageControls = ReturnType<typeof useAnimationControls>;

type TransitionCtx = {
  startTransition: (href: string, dir?: Direction) => void;
  isTransitioning: boolean;
  pageControls: PageControls;
  isPageFrozen: boolean;
  frozenPageTop: number;
};

const Ctx = React.createContext<TransitionCtx | null>(null);

export function useStageTransition() {
  const ctx = React.useContext(Ctx);

  if (!ctx) {
    throw new Error(
      "useStageTransition must be used within StageTransitionProvider",
    );
  }

  return ctx;
}

const EASE_SOFT: [number, number, number, number] = [0.16, 1, 0.3, 1];

const PAGE_EXIT_DUR = 1.35;
const PAGE_ENTER_DUR = 0.68;
const RELEASE_LOCK_MS = 180;

const PREPARE_HUB_RETURN_EVENT = "portfolio:prepareHubReturn";

function waitForFrames(count: number) {
  return new Promise<void>((resolve) => {
    let current = 0;

    const step = () => {
      current += 1;

      if (current >= count) {
        resolve();
        return;
      }

      window.requestAnimationFrame(step);
    };

    window.requestAnimationFrame(step);
  });
}

export default function StageTransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const pageControls = useAnimationControls();

  const [isTransitioning, setIsTransitioning] = React.useState(false);
  const [isPageFrozen, setIsPageFrozen] = React.useState(false);
  const [frozenPageTop, setFrozenPageTop] = React.useState(0);

  const dirRef = React.useRef<Direction>("up");
  const didMountRef = React.useRef(false);

  const startTransition = React.useCallback(
    async (href: string, dir: Direction = "up") => {
      if (isTransitioning) return;

      setIsTransitioning(true);
      dirRef.current = dir;

      const isOpeningFromHub = pathname === "/" && href !== "/";
      const isReturningToHub =
        pathname !== "/" && href === "/" && dir === "down";

      if (isOpeningFromHub) {
        router.push(href);
        return;
      }

      if (isReturningToHub) {
        window.dispatchEvent(new Event(PREPARE_HUB_RETURN_EVENT));

        const currentScrollY = window.scrollY;

        setFrozenPageTop(-currentScrollY);
        setIsPageFrozen(true);

        await waitForFrames(2);
      }

      const exitTo = dir === "up" ? "-105vh" : "105vh";

      try {
        await pageControls.start({
          y: exitTo,
          transition: { duration: PAGE_EXIT_DUR, ease: EASE_SOFT },
        });
      } finally {
        router.push(href);
      }
    },
    [isTransitioning, pageControls, pathname, router],
  );

  React.useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      pageControls.set({ y: "0vh" });
      setIsTransitioning(false);
      setIsPageFrozen(false);
      setFrozenPageTop(0);
      return;
    }

    if (pathname === "/") {
      pageControls.set({ y: "0vh" });
      setIsTransitioning(false);
      setIsPageFrozen(false);
      setFrozenPageTop(0);
      return;
    }

    setIsPageFrozen(false);
    setFrozenPageTop(0);

    const enterFrom = dirRef.current === "up" ? "105vh" : "-105vh";

    pageControls.set({ y: enterFrom });

    pageControls.start({
      y: "0vh",
      transition: { duration: PAGE_ENTER_DUR, ease: EASE_SOFT },
    });

    const release = window.setTimeout(
      () => {
        setIsTransitioning(false);
      },
      Math.max(RELEASE_LOCK_MS, PAGE_ENTER_DUR * 1000),
    );

    return () => window.clearTimeout(release);
  }, [pathname, pageControls]);

  return (
    <Ctx.Provider
      value={{
        startTransition,
        isTransitioning,
        pageControls,
        isPageFrozen,
        frozenPageTop,
      }}
    >
      <div className="relative">
        {children}

        {isTransitioning && pathname !== "/" && (
          <div className="fixed inset-0 z-[9999] pointer-events-auto" />
        )}
      </div>
    </Ctx.Provider>
  );
}
