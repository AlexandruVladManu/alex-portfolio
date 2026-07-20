"use client";

import Link from "next/link";
import React from "react";

import { useStageTransition } from "./StageTransitionProvider";

type Direction = "up" | "down";

type Props = React.ComponentPropsWithoutRef<"a"> & {
  href: string;
  direction?: Direction;
};

export default function TransitionLink({
  href,
  children,
  className,
  direction = "up",
  onClick,
  ...rest
}: Props) {
  const { startTransition, isTransitioning } = useStageTransition();

  return (
    <Link
      href={href}
      prefetch={false}
      className={className}
      aria-disabled={isTransitioning}
      onClick={(event) => {
        onClick?.(event);

        if (
          event.defaultPrevented ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey ||
          event.button !== 0
        ) {
          return;
        }

        event.preventDefault();

        if (isTransitioning) return;

        startTransition(href, direction);
      }}
      {...rest}
    >
      {children}
    </Link>
  );
}
