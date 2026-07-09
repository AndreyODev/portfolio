import { AboutSection } from '@/presentation/components/about/AboutSection'
import { ContactSection } from '@/presentation/components/contact/ContactSection'
import { HeroSection } from '@/presentation/components/hero/HeroSection'
import { ProjectsSection } from '@/presentation/components/projects/ProjectsSection'
import { SkillsSection } from '@/presentation/components/skills/SkillsSection'
import { TimelineSection } from '@/presentation/components/timeline/TimelineSection'

export function HomePage() {
  return (
    <>
      <HeroSection />

      <AboutSection />

      <SkillsSection />

      <ProjectsSection />

      <TimelineSection />

      <ContactSection />
    </>
  )
}
