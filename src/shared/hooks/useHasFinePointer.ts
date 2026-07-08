import { useSyncExternalStore } from 'react'

function subscribe(callback: () => void) {
  const media = window.matchMedia('(pointer: fine)')
  media.addEventListener('change', callback)
  return () => media.removeEventListener('change', callback)
}

function getSnapshot() {
  return window.matchMedia('(pointer: fine)').matches
}

function getServerSnapshot() {
  return false
}

export function useHasFinePointer(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
