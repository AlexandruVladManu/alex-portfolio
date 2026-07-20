"use client";

import { useEffect, type CSSProperties } from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";

import { withBasePath } from "@/lib/withBasePath";

type ContactSectionVariant = "embedded" | "standalone";

type ContactSectionProps = {
  variant?: ContactSectionVariant;
};

type ContactLink = {
  label: string;
  value: string;
  href?: string;
  external?: boolean;
  disabled?: boolean;
};

const contactLinks: ContactLink[] = [
  {
    label: "Email",
    value: "alex@example.com",
    href: "mailto:alex@example.com",
  },
  {
    label: "LinkedIn",
    value: "Profile",
    href: "https://www.linkedin.com/in/your-handle",
    external: true,
  },
  {
    label: "GitHub",
    value: "Repository",
    href: "https://github.com/your-username",
    external: true,
  },
  {
    label: "CV / Resume",
    value: "Coming soon",
    disabled: true,
  },
  {
    label: "Location",
    value: "Romania",
  },
];

const sectionVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const titleVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 34,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const blockVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 22,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const linkVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.62,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const titleTextShadow = {
  textShadow: "0 2px 22px rgba(0,0,0,0.42)",
} satisfies CSSProperties;

const bodyTextShadow = {
  textShadow: "0 1px 2px rgba(0,0,0,0.82), 0 3px 16px rgba(0,0,0,0.58)",
} satisfies CSSProperties;

function ContactLinkRow({ item }: { item: ContactLink }) {
  const rowClassName =
    "group grid min-w-0 grid-cols-[4.75rem_minmax(0,1fr)] items-baseline gap-3 border-t border-white/28 py-3 text-left transition-colors duration-300 last:border-b hover:border-white/52 min-[340px]:grid-cols-[5.5rem_minmax(0,1fr)] min-[340px]:gap-4 min-[340px]:py-3.5 sm:grid-cols-[minmax(6.5rem,0.8fr)_minmax(9rem,1.2fr)] sm:gap-8 sm:py-4";

  const labelClassName =
    "min-w-0 text-[0.58rem] font-medium uppercase tracking-[0.16em] text-white/68 transition-colors duration-300 group-hover:text-white/92 min-[340px]:text-[0.62rem] min-[340px]:tracking-[0.19em] sm:text-[0.68rem] sm:tracking-[0.22em]";

  const valueClassName =
    "min-w-0 break-words text-[0.9rem] font-light leading-[1.05] tracking-[-0.015em] text-white/95 drop-shadow-[0_1px_10px_rgba(0,0,0,0.72)] transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white min-[340px]:text-[0.96rem] sm:text-[clamp(1rem,1.2vw,1.18rem)] sm:leading-none";

  const content = (
    <>
      <span className={labelClassName}>{item.label}</span>
      <span className={valueClassName}>{item.value}</span>
    </>
  );

  if (item.disabled || !item.href) {
    return (
      <motion.div variants={linkVariants} className={rowClassName}>
        {content}
      </motion.div>
    );
  }

  return (
    <motion.a
      variants={linkVariants}
      href={item.href}
      target={item.external ? "_blank" : undefined}
      rel={item.external ? "noopener noreferrer" : undefined}
      className={rowClassName}
    >
      {content}
    </motion.a>
  );
}

export default function ContactSection({
  variant = "standalone",
}: ContactSectionProps) {
  const isStandalone = variant === "standalone";

  useEffect(() => {
    if (!isStandalone) return;

    const preventWheel = (event: WheelEvent) => {
      event.preventDefault();
    };

    const preventTouchMove = (event: TouchEvent) => {
      event.preventDefault();
    };

    const preventScrollKeys = (event: KeyboardEvent) => {
      const blockedKeys = new Set([
        "ArrowUp",
        "ArrowDown",
        "PageUp",
        "PageDown",
        "Home",
        "End",
        " ",
      ]);

      if (blockedKeys.has(event.key)) {
        event.preventDefault();
      }
    };

    window.addEventListener("wheel", preventWheel, { passive: false });
    window.addEventListener("touchmove", preventTouchMove, { passive: false });
    window.addEventListener("keydown", preventScrollKeys);

    return () => {
      window.removeEventListener("wheel", preventWheel);
      window.removeEventListener("touchmove", preventTouchMove);
      window.removeEventListener("keydown", preventScrollKeys);
    };
  }, [isStandalone]);

  const sectionClassName = isStandalone
    ? "fixed inset-0 isolate h-svh overflow-hidden bg-[#02050c] text-white"
    : "relative isolate h-svh overflow-hidden bg-[#02050c] text-white";

  return (
    <motion.section
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
      className={sectionClassName}
      aria-labelledby="contact-title"
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        <Image
          src={withBasePath("/stage/about/contact-v2.webp")}
          alt=""
          fill
          priority={isStandalone}
          sizes="100vw"
          className="select-none object-cover"
        />
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-white/10" />

      <div className="relative z-20 flex h-full min-h-0 flex-col px-5 pb-5 pt-[5.75rem] min-[340px]:px-6 min-[340px]:pb-6 min-[340px]:pt-24 sm:px-[clamp(1.5rem,4vw,5rem)] sm:py-[clamp(6rem,9vh,7.5rem)]">
        <div className="shrink-0">
          <motion.p
            variants={blockVariants}
            className="mb-4 font-mono text-[0.6rem] uppercase tracking-[0.24em] text-white/48 min-[340px]:mb-5 min-[340px]:text-[0.64rem] sm:text-[0.68rem] sm:tracking-[0.28em]"
          >
            {isStandalone ? "04 / Contact" : "Final / Contact"}
          </motion.p>

          <motion.h1
            id="contact-title"
            variants={titleVariants}
            className="whitespace-nowrap font-['Space_Grotesk_Variable'] text-[clamp(3.85rem,18vw,5.2rem)] font-light uppercase leading-[0.74] tracking-[-0.095em] text-white sm:text-[clamp(5.2rem,15vw,17rem)] sm:leading-[0.72]"
            style={titleTextShadow}
          >
            Contact
          </motion.h1>
        </div>

        <div className="mt-auto grid min-h-0 grid-cols-12 gap-y-8 min-[340px]:gap-y-10 md:gap-y-0">
          <motion.div
            variants={sectionVariants}
            className="col-span-12 md:col-span-4 md:col-start-2"
          >
            <div className="w-full max-w-[34rem]">
              {contactLinks.map((item) => (
                <ContactLinkRow key={item.label} item={item} />
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={blockVariants}
            className="col-span-12 md:col-span-5 md:col-start-8"
          >
            <p
              className="max-w-[18rem] text-[clamp(1.05rem,5.2vw,1.3rem)] font-light leading-[1.03] tracking-[-0.04em] text-white/96 min-[340px]:max-w-[21rem] sm:max-w-[33rem] sm:text-[clamp(1.3rem,2vw,2.25rem)] sm:tracking-[-0.045em] md:ml-auto"
              style={bodyTextShadow}
            >
              Available for frontend roles, portfolio collaborations, and
              carefully built web interfaces.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
