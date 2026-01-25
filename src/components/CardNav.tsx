import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'

interface CardNavProps {
  onSubscribeClick?: () => void
}

export function CardNav({ onSubscribeClick }: CardNavProps) {
  const [isOpen, setIsOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const hamburgerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!menuRef.current) return

    if (isOpen) {
      gsap.fromTo(
        menuRef.current,
        { opacity: 0, y: -10, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: 'power2.out' }
      )
    } else {
      gsap.to(menuRef.current, {
        opacity: 0,
        y: -10,
        scale: 0.95,
        duration: 0.2,
        ease: 'power2.in',
      })
    }
  }, [isOpen])

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 px-4 py-3"
      style={{
        background: 'linear-gradient(180deg, var(--color-bg-primary) 0%, rgba(25, 25, 25, 0.8) 70%, rgba(25, 25, 25, 0) 100%)',
      }}
    >
      <div className="max-w-[720px] mx-auto flex items-center justify-between">
        {/* Hamburger Menu Button */}
        <button
          ref={hamburgerRef}
          onClick={handleToggle}
          className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-lg transition-colors hover:bg-bg-tertiary focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-aperol"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
        >
          <span
            className="w-5 h-0.5 bg-fg-primary transition-transform duration-200"
            style={{
              transform: isOpen ? 'translateY(4px) rotate(45deg)' : 'none',
            }}
          />
          <span
            className="w-5 h-0.5 bg-fg-primary transition-opacity duration-200"
            style={{ opacity: isOpen ? 0 : 1 }}
          />
          <span
            className="w-5 h-0.5 bg-fg-primary transition-transform duration-200"
            style={{
              transform: isOpen ? 'translateY(-4px) rotate(-45deg)' : 'none',
            }}
          />
        </button>

        {/* Center Logo */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <img
            src="/images/3D Logo_rotation_square_compressed.gif"
            alt="Open Session"
            className="w-8 h-8 rounded-lg"
          />
        </div>

        {/* Subscribe Button */}
        <button
          onClick={onSubscribeClick}
          className="px-4 py-2 rounded-lg text-sm font-semibold text-white transition-transform duration-150 hover:scale-[1.02] active:scale-[0.97]"
          style={{ backgroundColor: 'var(--color-brand-aperol)' }}
        >
          Subscribe
        </button>
      </div>

      {/* Dropdown Menu (placeholder for future expansion) */}
      <div
        ref={menuRef}
        className="absolute top-full left-4 right-4 mt-2 max-w-[720px] mx-auto rounded-xl p-4"
        style={{
          backgroundColor: 'var(--color-bg-secondary)',
          border: '1px solid var(--color-border-secondary)',
          display: isOpen ? 'block' : 'none',
          opacity: 0,
        }}
      >
        <div className="text-sm text-fg-secondary text-center py-4">
          Navigation cards coming soon
        </div>
      </div>
    </nav>
  )
}
