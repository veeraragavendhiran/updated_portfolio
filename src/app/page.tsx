import { AppShell } from "@/components/app-shell"
import { HeroSection } from "@/components/hero-section"
import { StudentSections } from "@/components/student-sections"

export default function HomePage() {
  return (
    <AppShell>
      <HeroSection />
      <StudentSections />
    </AppShell>
  )
}
