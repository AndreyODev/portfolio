import { motion, type Variants } from 'framer-motion'
import type { CSSProperties, ReactNode } from 'react'
import { usePrefersReducedMotion } from '@/shared/hooks/usePrefersReducedMotion'
import {
  defaultTransition,
  fadeIn,
  fadeUp,
  scaleIn,
  slideLeft,
  slideRight,
} from '@/shared/motion/variants'

type RevealVariant = 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight' | 'scaleIn'

const variantMap: Record<RevealVariant, Variants> = {
  fadeUp,
  fadeIn,
  slideLeft,
  slideRight,
  scaleIn,
}

interface RevealProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
  variant?: RevealVariant
  delay?: number
  /** Anima ao montar (hero) em vez de ao entrar na viewport */
  immediate?: boolean
  amount?: number
}

export function Reveal({
  children,
  className = '',
  style,
  variant = 'fadeUp',
  delay = 0,
  immediate = false,
  amount = 0.2,
}: RevealProps) {
  const reduceMotion = usePrefersReducedMotion()

  if (reduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      style={style}
      variants={variantMap[variant]}
      initial="hidden"
      animate={immediate ? 'visible' : undefined}
      whileInView={immediate ? undefined : 'visible'}
      viewport={immediate ? undefined : { once: true, amount }}
      transition={{ ...defaultTransition, delay }}
    >
      {children}
    </motion.div>
  )
}
