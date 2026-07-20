import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export default function Section({
  children,
  className,
  ...rest
}: HTMLAttributes<HTMLElement>) {
  return (
    <section className={cn("px-6 py-24", className)} {...rest}>
      {children}
    </section>
  );
}
