import { AboutSection } from '@/presentation/components/about/AboutSection'
import { HeroSection } from '@/presentation/components/hero/HeroSection'
import { ProjectsSection } from '@/presentation/components/projects/ProjectsSection'
import { SkillsSection } from '@/presentation/components/skills/SkillsSection'
import { Section } from '@/presentation/components/Section'

export function HomePage() {
  return (
    <>
      <HeroSection />

      <AboutSection />

      <SkillsSection />

      <ProjectsSection />

      <Section id="trajetoria" label="05 · trajetória">
        <h2 className="font-display text-display-md font-medium">
          Linha do tempo
        </h2>
        <p className="mt-4 max-w-2xl font-body text-body-md text-text-primary/70">
          Seção timeline — em construção.
        </p>
      </Section>

      <Section
        id="contato"
        label="06 · contato"
        className="border-b-0"
      >
        <h2 className="font-display text-display-md font-medium">Contato</h2>
        <p className="mt-4 max-w-2xl font-body text-body-md text-text-primary/70">
          Seção contato — em construção.
        </p>
      </Section>
    </>
  )
}
