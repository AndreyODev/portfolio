import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '@/shared/hooks/usePrefersReducedMotion'
import { useTranslation } from '@/shared/i18n/LanguageProvider'

export function ScrollIndicator() {
  const reduceMotion = usePrefersReducedMotion()
  const { t } = useTranslation()

  return (
    <motion.a
      href="#sobre"
      aria-label={t.a11y.scrollToAbout}
      className="absolute bottom-[var(--section-py)] left-1/2 z-20 -translate-x-1/2 text-accent/70 transition-colors hover:text-accent-light focus-visible:text-accent-light"
      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="relative flex h-9 w-5 items-start justify-center rounded-full border border-current pt-1.5">
        <motion.span
          aria-hidden="true"
          className="block h-1 w-0.5 rounded-full bg-current"
          animate={
            reduceMotion
              ? undefined
              : { y: [0, 8, 0], opacity: [1, 0.3, 1] }
          }
          transition={
            reduceMotion
              ? undefined
              : {
                  duration: 1.8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }
          }
        />
      </span>
    </motion.a>
  )
}
