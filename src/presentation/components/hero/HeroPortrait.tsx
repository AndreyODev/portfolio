import { motion } from 'framer-motion'
import {
  HERO_BOKEH,
  HERO_PORTRAIT_ICONS,
  type PortraitIconPlacement,
} from '@/presentation/components/hero/heroFloating.config'
import {
  DockerIcon,
  PostgresIcon,
} from '@/presentation/components/hero/techIcons'
import { Reveal } from '@/presentation/components/Reveal'
import { usePrefersReducedMotion } from '@/shared/hooks/usePrefersReducedMotion'

const INLINE_TECH_ICONS = {
  docker: DockerIcon,
  postgresql: PostgresIcon,
} as const

const TECH_ICON_CLASS =
  'h-[clamp(1.15rem,2.4vw,1.55rem)] w-[clamp(1.15rem,2.4vw,1.55rem)] object-contain'

function TechIconGlyph({ techId, imageSrc }: { techId: string; imageSrc: string }) {
  const InlineIcon = INLINE_TECH_ICONS[techId as keyof typeof INLINE_TECH_ICONS]

  if (InlineIcon) {
    return (
      <InlineIcon
        className={`${TECH_ICON_CLASS} ${
          techId === 'docker' ? 'text-[#2496ED]' : 'text-[#336791]'
        }`}
      />
    )
  }

  return (
    <img src={imageSrc} alt="" draggable={false} className={TECH_ICON_CLASS} />
  )
}

function FloatingIcon({
  icon,
  reduceMotion,
}: {
  icon: PortraitIconPlacement
  reduceMotion: boolean
}) {
  const positionStyle =
    icon.side === 'left'
      ? { left: `${icon.edge}%`, top: `${icon.top}%` }
      : { right: `${icon.edge}%`, top: `${icon.top}%` }

  return (
    <Reveal
      variant="scaleIn"
      immediate
      delay={0.5 + icon.delay * 0.2}
      className="absolute z-30"
      style={positionStyle}
    >
      <motion.div
        animate={
          reduceMotion
            ? undefined
            : {
                y: [0, -6, 0],
                rotate: [icon.rotation - 2, icon.rotation + 2, icon.rotation - 2],
              }
        }
        transition={
          reduceMotion
            ? undefined
            : {
                duration: icon.duration,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: icon.delay,
              }
        }
        className="group relative"
      >
        <div className="flex h-[clamp(2.35rem,5vw,3.1rem)] w-[clamp(2.35rem,5vw,3.1rem)] items-center justify-center rounded-2xl border border-white/10 bg-bg-surface/80 p-2 shadow-[0_8px_28px_rgba(0,0,0,0.45)] backdrop-blur-md ring-1 ring-inset ring-accent/10 transition-colors duration-300 group-hover:border-accent/40">
          <TechIconGlyph techId={icon.id} imageSrc={icon.imageSrc} />
        </div>

        <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-accent/30 bg-bg-primary/90 px-2.5 py-1 font-mono text-[0.68rem] tracking-wide text-accent-light opacity-0 shadow-lg backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100">
          {icon.label}
        </span>
      </motion.div>
    </Reveal>
  )
}

function Bokeh({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute z-20 h-[clamp(2.5rem,6vw,4rem)] w-[clamp(2.5rem,6vw,4rem)] rounded-full bg-[radial-gradient(circle,rgba(217,190,129,0.55)_0%,rgba(171,135,49,0.15)_45%,transparent_75%)] blur-md"
      style={{ left: HERO_BOKEH.left, top: HERO_BOKEH.top }}
      animate={
        reduceMotion
          ? undefined
          : { y: [0, -18, 0], x: [0, 8, 0], opacity: [0.5, 0.85, 0.5] }
      }
      transition={
        reduceMotion
          ? undefined
          : { duration: 9, repeat: Infinity, ease: 'easeInOut' }
      }
    />
  )
}

export function HeroPortrait() {
  const reduceMotion = usePrefersReducedMotion()

  return (
    <div className="hero-portrait">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-[12%] bottom-[6%] top-[18%] rounded-full bg-[radial-gradient(ellipse,rgba(171,135,49,0.16)_0%,transparent_70%)] blur-2xl"
      />

      <Bokeh reduceMotion={reduceMotion} />

      <Reveal
        variant="scaleIn"
        immediate
        delay={0.35}
        className="absolute inset-0 z-10 flex items-end justify-center"
      >
        <img
          src="/images/hero.png"
          alt="Andrey Oliveira"
          draggable={false}
          className="hero-portrait__photo drop-shadow-[0_16px_48px_rgba(0,0,0,0.5)]"
        />
      </Reveal>

      <div className="pointer-events-none absolute inset-0 hidden sm:block">
        <div className="pointer-events-auto absolute inset-0">
          {HERO_PORTRAIT_ICONS.map((icon) => (
            <FloatingIcon key={icon.id} icon={icon} reduceMotion={reduceMotion} />
          ))}
        </div>
      </div>
    </div>
  )
}
