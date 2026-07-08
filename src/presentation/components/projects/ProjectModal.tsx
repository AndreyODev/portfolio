import { useCallback, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Project } from '@/domain/entities/Project'
import { ProjectScreenshot } from '@/presentation/components/projects/ProjectScreenshot'
import { resolveProjectDetails } from '@/infrastructure/repositories/data/projectDetails.data'
import { useBodyScrollLock } from '@/shared/hooks/useBodyScrollLock'
import { usePrefersReducedMotion } from '@/shared/hooks/usePrefersReducedMotion'
import {
  getLocalizedProject,
  getLocalizedProjectDetails,
} from '@/shared/i18n/content'
import { useTranslation } from '@/shared/i18n/LanguageProvider'

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
    </svg>
  )
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = usePrefersReducedMotion()
  const { locale, t } = useTranslation()
  const isOpen = project !== null

  useBodyScrollLock(isOpen)

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    },
    [onClose],
  )

  useEffect(() => {
    if (!isOpen) return
    document.addEventListener('keydown', handleKeyDown)
    dialogRef.current?.focus()
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown, isOpen])

  const localizedProject = project ? getLocalizedProject(project, locale) : null
  const baseDetails = project ? resolveProjectDetails(project) : null
  const details =
    project && baseDetails
      ? getLocalizedProjectDetails(project, baseDetails, locale)
      : null
  const tags = details?.tags?.length ? details.tags : localizedProject?.stack.slice(0, 3)

  return (
    <AnimatePresence>
      {localizedProject && details && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
          role="presentation"
        >
          <button
            type="button"
            aria-label={t.projectModal.close}
            className="absolute inset-0 bg-bg-primary/85 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            tabIndex={-1}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: 24 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.25 }}
            className="relative z-10 flex max-h-[92dvh] w-full max-w-6xl flex-col overflow-hidden border border-text-secondary/60 bg-bg-primary shadow-2xl sm:max-h-[88dvh]"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label={t.projectModal.closeDetails}
              className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center border border-text-secondary/70 bg-bg-primary/90 text-text-primary/70 transition-colors hover:border-accent/60 hover:text-accent-light"
            >
              <CloseIcon />
            </button>

            <div className="grid min-h-0 flex-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
              <div className="overflow-y-auto border-b border-text-secondary/40 p-6 sm:p-8 lg:border-b-0 lg:border-r">
                <div className="space-y-6 pr-8">
                  <div className="space-y-4">
                    <h2
                      id="project-modal-title"
                      className="font-display text-display-md font-medium text-balance text-text-primary"
                    >
                      {localizedProject.name}
                    </h2>

                    {tags && tags.length > 0 && (
                      <ul className="flex flex-wrap gap-2" aria-label={t.a11y.tags}>
                        {tags.map((tag) => (
                          <li
                            key={tag}
                            className="rounded-full border border-accent/40 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-wider text-accent-light"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                    )}

                    <p className="font-body text-body-md text-text-primary/75">
                      {localizedProject.description}
                    </p>
                  </div>

                  <section className="space-y-3">
                    <h3 className="font-mono text-label uppercase tracking-widest text-accent">
                      {t.projectModal.overview}
                    </h3>
                    <p className="font-body text-body-sm leading-relaxed text-text-primary/70">
                      {details.overview}
                    </p>
                  </section>

                  {details.highlights && details.highlights.length > 0 && (
                    <section className="space-y-4">
                      <h3 className="font-mono text-label uppercase tracking-widest text-accent">
                        {t.projectModal.highlights}
                      </h3>
                      <ul className="space-y-4">
                        {details.highlights.map((highlight) => (
                          <li key={highlight.title} className="space-y-1">
                            <p className="font-mono text-body-sm text-text-primary">
                              {highlight.title}
                            </p>
                            <p className="font-body text-body-sm text-text-primary/65">
                              {highlight.description}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </section>
                  )}

                  <ul className="flex flex-wrap gap-2" aria-label={t.a11y.stack}>
                    {localizedProject.stack.map((tech) => (
                      <li
                        key={tech}
                        className="border border-accent/30 px-2 py-1 font-mono text-[0.65rem] uppercase tracking-wider text-text-primary/60"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-3 pt-2">
                    {!localizedProject.isPrivate && localizedProject.repositoryUrl && (
                      <a
                        href={localizedProject.repositoryUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-full border border-accent px-5 py-2.5 font-mono text-label uppercase text-accent-light transition-colors hover:bg-accent/10"
                      >
                        {t.projectModal.viewRepository}
                      </a>
                    )}
                    {localizedProject.isPrivate && (
                      <span className="font-mono text-body-sm text-text-primary/45">
                        {t.projectModal.privateRepository}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="min-h-0 overflow-y-auto bg-bg-surface/40 p-6 sm:p-8">
                <h3 className="mb-5 font-mono text-label uppercase tracking-widest text-accent">
                  {t.projectModal.images} · {details.images.length}
                </h3>
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {details.images.map((image, index) => (
                    <ProjectScreenshot
                      key={`${image.alt}-${index}`}
                      image={image}
                      projectName={localizedProject.name}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
