import { useEffect, useState } from 'react'

function getSlidesPerView(): number {
  if (typeof window === 'undefined') return 1
  if (window.matchMedia('(min-width: 1024px)').matches) return 3
  if (window.matchMedia('(min-width: 640px)').matches) return 2
  return 1
}

export function useSlidesPerView(): number {
  const [slidesPerView, setSlidesPerView] = useState(getSlidesPerView)

  useEffect(() => {
    const queries = [
      window.matchMedia('(min-width: 640px)'),
      window.matchMedia('(min-width: 1024px)'),
    ]

    const update = () => setSlidesPerView(getSlidesPerView())

    queries.forEach((query) => query.addEventListener('change', update))
    return () => queries.forEach((query) => query.removeEventListener('change', update))
  }, [])

  return slidesPerView
}
