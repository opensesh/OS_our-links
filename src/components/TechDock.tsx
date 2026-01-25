import { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'

interface TechDockProps {
  animationDelay?: number
}

interface DockItem {
  id: string
  label: string
  icon: string
}

// Placeholder tech items - to be expanded together
const dockItems: DockItem[] = [
  { id: 'react', label: 'React', icon: '⚛️' },
  { id: 'typescript', label: 'TypeScript', icon: '📘' },
  { id: 'figma', label: 'Figma', icon: '🎨' },
  { id: 'tailwind', label: 'Tailwind', icon: '🌊' },
  { id: 'vite', label: 'Vite', icon: '⚡' },
]

export function TechDock({ animationDelay = 0 }: TechDockProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (hoveredIndex === null) {
      // Reset all items
      itemRefs.current.forEach((ref) => {
        if (ref) {
          gsap.to(ref, {
            scale: 1,
            y: 0,
            duration: 0.2,
            ease: 'power2.out',
          })
        }
      })
      return
    }

    itemRefs.current.forEach((ref, idx) => {
      if (!ref) return

      const distance = Math.abs(idx - hoveredIndex)
      let scale = 1
      let y = 0

      if (distance === 0) {
        scale = 1.4
        y = -8
      } else if (distance === 1) {
        scale = 1.2
        y = -4
      } else if (distance === 2) {
        scale = 1.1
        y = -2
      }

      gsap.to(ref, {
        scale,
        y,
        duration: 0.2,
        ease: 'power2.out',
      })
    })
  }, [hoveredIndex])

  return (
    <section className="mb-8" aria-label="Tech Stack">
      <h2
        className="text-xs font-medium uppercase tracking-wider px-1 mb-3 text-center animate-fade-in-up"
        style={{
          color: 'var(--color-fg-tertiary)',
          animationDelay: `${animationDelay}ms`,
        }}
      >
        Built With
      </h2>

      <div
        className="flex items-end justify-center gap-1 py-4 animate-fade-in-up"
        style={{ animationDelay: `${animationDelay + 60}ms` }}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {dockItems.map((item, idx) => (
          <div
            key={item.id}
            ref={(el) => { itemRefs.current[idx] = el }}
            className="flex flex-col items-center cursor-pointer"
            onMouseEnter={() => setHoveredIndex(idx)}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-shadow duration-200"
              style={{
                backgroundColor: 'var(--color-bg-secondary)',
                border: '1px solid var(--color-border-secondary)',
                boxShadow: hoveredIndex === idx ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
              }}
            >
              {item.icon}
            </div>
            <span
              className="text-[10px] mt-1 transition-opacity duration-200"
              style={{
                color: 'var(--color-fg-tertiary)',
                opacity: hoveredIndex === idx ? 1 : 0,
              }}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
