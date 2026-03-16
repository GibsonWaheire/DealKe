import { useEffect, useState } from 'react'

export default function useScrollAnimation(ref, options = {}) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const node = ref?.current
    if (!node || isVisible) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      {
        threshold: options.threshold ?? 0.2,
        rootMargin: options.rootMargin ?? '0px',
      }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [ref, isVisible, options.threshold, options.rootMargin])

  return isVisible
}
