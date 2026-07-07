import { Section } from '@/presentation/components/Section'

export function HomePage() {
  return (
    <>
      <Section id="hero" label="01 · início">
        <h1 className="font-display text-display-lg font-medium text-balance">
          Desenvolvedor Full Stack
        </h1>
        <p className="mt-4 max-w-xl font-body text-body-md text-text-primary/70">
          Seção hero — em construção.
        </p>
      </Section>

      <Section id="sobre" label="02 · sobre">
        <h2 className="font-display text-display-md font-medium">Trajetória</h2>
        <p className="mt-4 max-w-2xl font-body text-body-md text-text-primary/70">
          Seção sobre — em construção.
        </p>
      </Section>

      <Section id="skills" label="03 · skills">
        <h2 className="font-display text-display-md font-medium">
          Stack por camada
        </h2>
        <p className="mt-4 max-w-2xl font-body text-body-md text-text-primary/70">
          Seção skills — em construção.
        </p>
      </Section>

      <Section id="projetos" label="04 · projetos">
        <h2 className="font-display text-display-md font-medium">Projetos</h2>
        <p className="mt-4 max-w-2xl font-body text-body-md text-text-primary/70">
          Seção projetos — em construção.
        </p>
      </Section>

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
