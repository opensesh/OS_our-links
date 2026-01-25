import { useState } from 'react'
import { freeResources, type Resource } from '@/data/resources'
import { EmailGateModal, useEmailGate } from './EmailGateModal'

interface FreeResourcesProps {
  animationDelay?: number
}

function ResourceCard({
  resource,
  isUnlocked,
  onUnlockClick,
  animationDelay,
}: {
  resource: Resource
  isUnlocked: boolean
  onUnlockClick: (resource: Resource) => void
  animationDelay: number
}) {
  const handleClick = () => {
    if (isUnlocked) {
      window.open(resource.href, '_blank')
    } else {
      onUnlockClick(resource)
    }
  }

  return (
    <button
      onClick={handleClick}
      className="flex-shrink-0 w-[200px] rounded-xl overflow-hidden text-left transition-all duration-200 animate-fade-in-up hover:translate-y-[-2px] hover:shadow-lg active:scale-[0.98]"
      style={{
        backgroundColor: 'var(--color-bg-secondary)',
        border: '1px solid var(--color-border-secondary)',
        animationDelay: `${animationDelay}ms`,
      }}
    >
      {/* Thumbnail */}
      <div
        className="w-full h-24 relative overflow-hidden"
        style={{ backgroundColor: 'var(--color-bg-tertiary)' }}
      >
        {resource.thumbnail && (
          <img
            src={resource.thumbnail}
            alt=""
            className="w-full h-full object-cover"
          />
        )}
        {!isUnlocked && (
          <div
            className="absolute inset-0 flex items-center justify-center backdrop-blur-sm"
            style={{ backgroundColor: 'rgba(25, 25, 25, 0.6)' }}
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'var(--color-brand-aperol)' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <rect x="5" y="11" width="14" height="10" rx="2" stroke="white" strokeWidth="2" />
                <path d="M8 11V7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7V11" stroke="white" strokeWidth="2" />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3">
        <h3 className="text-sm font-semibold mb-1 line-clamp-1">{resource.title}</h3>
        <p className="text-xs text-fg-secondary line-clamp-2">{resource.description}</p>
      </div>
    </button>
  )
}

export function FreeResources({ animationDelay = 0 }: FreeResourcesProps) {
  const { hasSubmitted, submitEmail, isResourceUnlocked, unlockResource } = useEmailGate()
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null)

  const handleUnlockClick = (resource: Resource) => {
    setSelectedResource(resource)
    setModalOpen(true)
  }

  const handleEmailSubmit = (email: string) => {
    submitEmail(email)
    if (selectedResource) {
      unlockResource(selectedResource.id)
      // After unlocking, open the resource
      window.open(selectedResource.href, '_blank')
    }
    setModalOpen(false)
    setSelectedResource(null)
  }

  return (
    <section className="mb-8" aria-label="Free Resources">
      <h2
        className="text-xs font-medium uppercase tracking-wider px-1 mb-3 animate-fade-in-up"
        style={{
          color: 'var(--color-fg-tertiary)',
          animationDelay: `${animationDelay}ms`,
        }}
      >
        Free Resources
      </h2>

      {/* Horizontal Scroll Container */}
      <div
        className="flex gap-3 overflow-x-auto pb-2 -mx-5 px-5 snap-x snap-mandatory scrollbar-hide"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {freeResources.map((resource, idx) => (
          <ResourceCard
            key={resource.id}
            resource={resource}
            isUnlocked={hasSubmitted || isResourceUnlocked(resource.id)}
            onUnlockClick={handleUnlockClick}
            animationDelay={animationDelay + 60 + idx * 80}
          />
        ))}
      </div>

      {/* Email Gate Modal */}
      <EmailGateModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false)
          setSelectedResource(null)
        }}
        onSubmit={handleEmailSubmit}
        resourceTitle={selectedResource?.title}
      />
    </section>
  )
}
