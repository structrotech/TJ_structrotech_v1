'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function ScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      // Defer so the destination element is mounted after a route change.
      requestAnimationFrame(() => {
        const el = document.querySelector(hash)
        if (el) {
          el.scrollIntoView()
        } else {
          window.scrollTo(0, 0)
        }
      })
      return
    }
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
