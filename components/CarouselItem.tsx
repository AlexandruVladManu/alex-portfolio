import Link from "next/link";

type CarouselItemProps = {
  label: string;
  href: string;
};

export default function CarouselItem({ label, href }: CarouselItemProps) {
  return (
    <Link
      href={href}
      prefetch={false}
      className="group inline-flex items-baseline gap-3 whitespace-nowrap text-[1.05rem] tracking-[0.08em] text-(--fg)/70 transition-opacity hover:text-(--fg)/95"
    >
      <span className="uppercase">{label}</span>

      <span className="h-px w-8 translate-y-[0.05em] bg-(--line)/40 transition-all group-hover:w-12 group-hover:bg-(--line)/70" />
    </Link>
  );
}
