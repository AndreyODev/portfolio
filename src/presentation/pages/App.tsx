const swatches = [
  { name: 'bg-primary', className: 'bg-bg-primary border border-text-secondary' },
  { name: 'bg-surface', className: 'bg-bg-surface border border-text-secondary' },
  { name: 'accent', className: 'bg-accent' },
  { name: 'accent-light', className: 'bg-accent-light' },
  { name: 'text-primary', className: 'bg-text-primary' },
  { name: 'text-secondary', className: 'bg-text-secondary' },
] as const

export function App() {
  return (
    <main className="min-h-screen px-6 py-16 md:px-12 lg:px-20">
      <div className="mx-auto max-w-3xl space-y-12">
        <header className="space-y-3">
          <p className="font-mono text-label uppercase text-accent">theme preview</p>
          <h1 className="font-display text-display-lg font-medium text-balance">
            Tokens de cor e tipografia
          </h1>
          <p className="font-body text-body-md text-text-primary/80 max-w-xl">
            Parte 2 — paleta preto + dourado, Cormorant Garamond, Manrope e JetBrains Mono.
          </p>
        </header>

        <section aria-label="Paleta de cores" className="space-y-4">
          <h2 className="font-mono text-label uppercase text-accent-light">Cores</h2>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {swatches.map(({ name, className }) => (
              <li key={name} className="space-y-2">
                <div className={`h-14 rounded-sm ${className}`} />
                <span className="font-mono text-label text-text-primary/60">{name}</span>
              </li>
            ))}
          </ul>
        </section>

        <section aria-label="Tipografia" className="space-y-4 rounded-sm border border-text-secondary bg-bg-surface p-6">
          <h2 className="font-mono text-label uppercase text-accent-light">Tipografia</h2>
          <p className="font-display text-display-md">Display — Cormorant Garamond</p>
          <p className="font-body text-body-lg">Body — Manrope para leitura contínua.</p>
          <p className="font-mono text-body-sm text-accent">
            Mono — JetBrains Mono · presentation · application · data
          </p>
        </section>
      </div>
    </main>
  )
}
