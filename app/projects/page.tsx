import ContactSection from "@/components/contact/ContactSection";
import ProjectsSection from "@/components/projects/ProjectsSection";

export default function ProjectsPage() {
  return (
    <main className="bg-[#02050c]">
      <ProjectsSection />
      <ContactSection variant="embedded" />
    </main>
  );
}
