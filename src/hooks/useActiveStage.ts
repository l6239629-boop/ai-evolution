import { useState, useEffect, useCallback } from 'react'

const STAGE_IDS = [
  'stage-cover',
  'stage-intro',
  'stage-1', 'stage-2', 'stage-3', 'stage-4',
  'stage-5', 'stage-6', 'stage-7', 'stage-8',
  'stage-conclusion',
]

export function useActiveStage() {
  const [activeId, setActiveId] = useState('stage-cover')

  const handleScroll = useCallback(() => {
    const viewMiddle = window.innerHeight / 2
    let closest: { id: string; dist: number } = { id: activeId, dist: Infinity }

    for (const id of STAGE_IDS) {
      const el = document.getElementById(id)
      if (!el) continue
      const rect = el.getBoundingClientRect()
      const elMiddle = rect.top + rect.height / 2
      const dist = Math.abs(elMiddle - viewMiddle)
      if (dist < closest.dist) {
        closest = { id, dist }
      }
    }
    if (closest.id !== activeId) {
      setActiveId(closest.id)
    }
  }, [activeId])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const scrollToStage = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [])

  return { activeId, scrollToStage, STAGE_IDS }
}
