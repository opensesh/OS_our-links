import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface EmailGateModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (email: string) => void
  resourceTitle?: string
}

const STORAGE_KEYS = {
  EMAIL_SUBMITTED: 'os-links-email-submitted',
  USER_EMAIL: 'os-links-user-email',
  UNLOCKED_RESOURCES: 'os-links-unlocked-resources',
}

export function useEmailGate() {
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [unlockedResources, setUnlockedResources] = useState<string[]>([])

  useEffect(() => {
    const submitted = localStorage.getItem(STORAGE_KEYS.EMAIL_SUBMITTED) === 'true'
    const email = localStorage.getItem(STORAGE_KEYS.USER_EMAIL)
    const resources = JSON.parse(localStorage.getItem(STORAGE_KEYS.UNLOCKED_RESOURCES) || '[]')

    setHasSubmitted(submitted)
    setUserEmail(email)
    setUnlockedResources(resources)
  }, [])

  const submitEmail = (email: string) => {
    localStorage.setItem(STORAGE_KEYS.EMAIL_SUBMITTED, 'true')
    localStorage.setItem(STORAGE_KEYS.USER_EMAIL, email)
    setHasSubmitted(true)
    setUserEmail(email)
  }

  const unlockResource = (resourceId: string) => {
    const updated = [...unlockedResources, resourceId]
    localStorage.setItem(STORAGE_KEYS.UNLOCKED_RESOURCES, JSON.stringify(updated))
    setUnlockedResources(updated)
  }

  const isResourceUnlocked = (resourceId: string) => {
    return hasSubmitted || unlockedResources.includes(resourceId)
  }

  return {
    hasSubmitted,
    userEmail,
    unlockedResources,
    submitEmail,
    unlockResource,
    isResourceUnlocked,
  }
}

export function EmailGateModal({
  isOpen,
  onClose,
  onSubmit,
  resourceTitle,
}: EmailGateModalProps) {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!overlayRef.current || !modalRef.current) return

    if (isOpen) {
      document.body.style.overflow = 'hidden'
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.2, ease: 'power2.out' }
      )
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: 'power2.out', delay: 0.1 }
      )
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    setIsSubmitting(true)

    // Simulate a brief delay for UX
    await new Promise(resolve => setTimeout(resolve, 300))

    onSubmit(email)
    setEmail('')
    setIsSubmitting(false)
  }

  const handleClose = () => {
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.2,
      ease: 'power2.in',
      onComplete: onClose,
    })
    gsap.to(modalRef.current, {
      opacity: 0,
      y: 20,
      scale: 0.95,
      duration: 0.2,
      ease: 'power2.in',
    })
  }

  if (!isOpen) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
      onClick={(e) => {
        if (e.target === overlayRef.current) handleClose()
      }}
    >
      <div
        ref={modalRef}
        className="w-full max-w-md rounded-2xl p-6"
        style={{
          backgroundColor: 'var(--color-bg-secondary)',
          border: '1px solid var(--color-border-secondary)',
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="email-gate-title"
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-bg-tertiary"
          aria-label="Close"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M4 4L12 12M12 4L4 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* Content */}
        <div className="text-center mb-6">
          <div
            className="w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: 'var(--color-bg-tertiary)' }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
              <path d="M3 7L12 13L21 7" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>
          <h2
            id="email-gate-title"
            className="text-xl font-bold mb-2"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Unlock Free Resources
          </h2>
          <p className="text-sm text-fg-secondary">
            {resourceTitle
              ? `Enter your email to access "${resourceTitle}" and all our free resources.`
              : 'Enter your email to unlock all our free resources and get updates.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            autoComplete="email"
            className="w-full h-12 px-4 rounded-lg text-sm outline-none transition-colors"
            style={{
              backgroundColor: 'var(--color-bg-tertiary)',
              border: '1px solid var(--color-border-secondary)',
              color: 'var(--color-fg-primary)',
            }}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 rounded-lg text-sm font-semibold text-white transition-transform duration-150 hover:scale-[1.02] active:scale-[0.97] disabled:opacity-50"
            style={{ backgroundColor: 'var(--color-brand-aperol)' }}
          >
            {isSubmitting ? 'Unlocking...' : 'Unlock Resources'}
          </button>
        </form>

        <p className="mt-4 text-xs text-fg-tertiary text-center">
          We respect your privacy. Unsubscribe anytime.
        </p>
      </div>
    </div>
  )
}
