import ContactSection from "@/components/contact/ContactSection";

export default function ContactPage() {
  return (
    <main className="relative bg-[#02050c]">
      <ContactSection variant="standalone" />

      <div aria-hidden className="min-h-[200dvh]" />
    </main>
  );
}
