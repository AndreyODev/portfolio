import { useCallback, useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import type { Project } from '@/domain/entities/Project'
import { ProjectCard } from '@/presentation/components/projects/ProjectCard'
import { ProjectModal } from '@/presentation/components/projects/ProjectModal'
import { usePrefersReducedMotion } from '@/shared/hooks/usePrefersReducedMotion'
import { useSlidesPerView } from '@/shared/hooks/useSlidesPerView'
import { useTranslation } from '@/shared/i18n/LanguageProvider'

function chunkProjects(projects: Project[], size: number): Project[][] {
  const pages: Project[][] = []
  for (let i = 0; i < projects.length; i += size) {
    pages.push(projects.slice(i, i + size))
  }
  return pages
}

function CarouselArrow({
  direction,
  onClick,
  disabled,
  label,
}: {
  direction: 'prev' | 'next'
  onClick: () => void
  disabled: boolean
  label: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-accent bg-accent text-bg-primary transition-colors hover:bg-accent-light hover:border-accent-light disabled:cursor-not-allowed disabled:opacity-30"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        className="h-5 w-5"
        aria-hidden="true"
      >
        {direction === 'prev' ? (
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
        )}
      </svg>
    </button>
  )
}

interface ProjectCarouselProps {
  projects: Project[]
}

export function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const slidesPerView = useSlidesPerView()
  const prefersReducedMotion = usePrefersReducedMotion()
  const { t, format } = useTranslation()
  const [currentPage, setCurrentPage] = useState(0)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const openProject = useCallback((project: Project) => {
    setSelectedProject(project)
  }, [])

  const closeProject = useCallback(() => {
    setSelectedProject(null)
  }, [])

  const pages = useMemo(
    () => chunkProjects(projects, slidesPerView),
    [projects, slidesPerView],
  )

  const pageCount = pages.length
  const canGoPrev = currentPage > 0
  const canGoNext = currentPage < pageCount - 1

  const goToPrev = useCallback(() => {
    setCurrentPage((page) => Math.max(0, page - 1))
  }, [])

  const goToNext = useCallback(() => {
    setCurrentPage((page) => Math.min(pageCount - 1, page + 1))
  }, [pageCount])

  useEffect(() => {
    setCurrentPage(0)
  }, [projects, slidesPerView])

  useEffect(() => {
    if (currentPage >= pageCount) {
      setCurrentPage(Math.max(0, pageCount - 1))
    }
  }, [currentPage, pageCount])

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        goToPrev()
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        goToNext()
      }
    },
    [goToPrev, goToNext],
  )

  if (projects.length === 0) return null

  const gridCols =
    slidesPerView === 3
      ? 'lg:grid-cols-3'
      : slidesPerView === 2
        ? 'sm:grid-cols-2'
        : 'grid-cols-1'

  const startIndex = currentPage * slidesPerView + 1
  const endIndex = Math.min((currentPage + 1) * slidesPerView, projects.length)

  return (
    <>
      <section
        aria-label={t.projects.carouselLabel}
        className="space-y-6"
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-body-sm text-text-primary/50">
          <span className="text-accent">{projects.length}</span>{' '}
          {projects.length === 1 ? t.projects.projectSingular : t.projects.projectPlural}
        </p>
        {pageCount > 1 && (
          <p className="font-mono text-body-sm text-text-primary/40">
            {startIndex}–{endIndex} / {projects.length}
          </p>
        )}
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        {pageCount > 1 && (
          <CarouselArrow
            direction="prev"
            onClick={goToPrev}
            disabled={!canGoPrev}
            label={t.projects.prevPage}
          />
        )}

        <div className="min-w-0 flex-1 overflow-hidden">
          <motion.div
            className="flex"
            animate={{ x: `-${currentPage * 100}%` }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { type: 'spring', stiffness: 320, damping: 32 }
            }
          >
            {pages.map((page, pageIndex) => (
              <div
                key={pageIndex}
                className={`grid w-full shrink-0 gap-4 ${gridCols}`}
                aria-hidden={pageIndex !== currentPage}
              >
                {page.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    featured={project.featured}
                    onOpenDetails={openProject}
                  />
                ))}
              </div>
            ))}
          </motion.div>
        </div>

        {pageCount > 1 && (
          <CarouselArrow
            direction="next"
            onClick={goToNext}
            disabled={!canGoNext}
            label={t.projects.nextPage}
          />
        )}
      </div>

      {pageCount > 1 && (
        <div
          className="flex items-center justify-center gap-2"
          role="tablist"
          aria-label={t.projects.carouselPages}
        >
          {pages.map((_, index) => (
            <button
              key={index}
              type="button"
              role="tab"
              aria-label={format(t.projects.goToPage, {
                page: index + 1,
                total: pageCount,
              })}
              aria-selected={index === currentPage}
              onClick={() => setCurrentPage(index)}
              className={`h-2.5 w-2.5 rounded-full transition-colors ${
                index === currentPage
                  ? 'bg-accent'
                  : 'bg-text-secondary/60 hover:bg-text-secondary'
              }`}
            />
          ))}
        </div>
      )}
      </section>

      <ProjectModal project={selectedProject} onClose={closeProject} />
    </>
  )
}
