import { motion } from 'framer-motion'
import { forwardRef, type ReactNode } from 'react'
import { usePrefersReducedMotion } from '@/shared/hooks/usePrefersReducedMotion'
import {
  defaultTransition,
  fadeUp,
  staggerContainer,
} from '@/shared/motion/variants'

interface RevealStaggerProps {
  children: ReactNode
  className?: string
  immediate?: boolean
  id?: string
}

export const RevealStagger = forwardRef<HTMLDivElement, RevealStaggerProps>(
  function RevealStagger({ children, className = '', immediate = false, id }, ref) {
    const reduceMotion = usePrefersReducedMotion()

    if (reduceMotion) {
      return (
        <div ref={ref} id={id} className={className}>
          {children}
        </div>
      )
    }

    return (
      <motion.div
        ref={ref}
        id={id}
        className={className}
        variants={staggerContainer}
        initial="hidden"
        animate={immediate ? 'visible' : undefined}
        whileInView={immediate ? undefined : 'visible'}
        viewport={immediate ? undefined : { once: true, amount: 0.15 }}
      >
        {children}
      </motion.div>
    )
  },
)

interface RevealItemProps {
  children: ReactNode
  className?: string
}

export function RevealItem({ children, className = '' }: RevealItemProps) {
  const reduceMotion = usePrefersReducedMotion()

  if (reduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      variants={fadeUp}
      transition={defaultTransition}
    >
      {children}
    </motion.div>
  )
}
