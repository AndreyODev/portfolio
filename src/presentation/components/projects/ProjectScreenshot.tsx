import { useState } from 'react'
import type { ProjectImage } from '@/domain/entities/Project'

interface ProjectScreenshotProps {
  image: ProjectImage
  projectName: string
  index: number
}

function hashHue(value: string): number {
  let hash = 0
  for (let i = 0; i < value.length; i += 1) {
    hash = value.charCodeAt(i) + ((hash << 5) - hash)
  }
  return 28 + (Math.abs(hash) % 18)
}

export function ProjectScreenshot({
  image,
  projectName,
  index,
}: ProjectScreenshotProps) {
  const [hasError, setHasError] = useState(false)
  const showPlaceholder = !image.src || hasError
  const hue = hashHue(`${projectName}-${index}`)

  return (
    <figure className="space-y-2">
      <div className="overflow-hidden border border-text-secondary/50 bg-bg-surface">
        {showPlaceholder ? (
          <div
            className="flex aspect-[4/3] flex-col items-center justify-center gap-3 p-6"
            style={{
              background: `linear-gradient(145deg, hsl(${hue} 35% 12%) 0%, hsl(${hue} 25% 6%) 100%)`,
            }}
          >
            <span className="font-mono text-[0.6rem] uppercase tracking-widest text-accent/70">
              preview
            </span>
            <span className="text-center font-body text-body-sm text-text-primary/55">
              {image.caption ?? image.alt}
            </span>
          </div>
        ) : (
          <img
            src={image.src}
            alt={image.alt}
            loading="lazy"
            onError={() => setHasError(true)}
            className="aspect-[4/3] w-full object-cover object-top"
          />
        )}
      </div>
      {(image.caption ?? image.alt) && (
        <figcaption className="font-mono text-[0.65rem] uppercase tracking-wider text-text-primary/45">
          {image.caption ?? image.alt}
        </figcaption>
      )}
    </figure>
  )
}
