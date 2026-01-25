import { linkGroups, type LinkGroup } from '@/data/links'

interface LinkSectionProps {
  animationDelay?: number
}

function LinkGroupRow({ group, baseDelay }: { group: LinkGroup; baseDelay: number }) {
  return (
    <div
      className="flex flex-col gap-2 p-3 rounded-xl animate-fade-in-up"
      style={{
        backgroundColor: 'var(--color-bg-secondary)',
        border: '1px solid var(--color-border-secondary)',
        animationDelay: `${baseDelay}ms`,
      }}
    >
      {/* Category Label */}
      <span
        className="text-xs font-medium uppercase tracking-wider px-1"
        style={{ color: 'var(--color-fg-tertiary)' }}
      >
        {group.category}
      </span>

      {/* Horizontal Icon Row */}
      <div className="flex flex-wrap gap-2">
        {group.links.map((link, idx) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-150 animate-fade-in-up hover:translate-y-[-1px] hover:scale-[1.03] active:translate-y-0 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-brand-aperol focus-visible:outline-offset-2"
            style={{
              backgroundColor: 'var(--color-bg-tertiary)',
              color: 'var(--color-fg-primary)',
              animationDelay: `${baseDelay + 60 + idx * 80}ms`,
            }}
          >
            <img
              src={link.icon}
              alt=""
              className="w-4 h-4 flex-shrink-0"
              aria-hidden="true"
            />
            <span>{link.label}</span>
          </a>
        ))}
      </div>
    </div>
  )
}

export function LinkSection({ animationDelay = 0 }: LinkSectionProps) {
  return (
    <section className="space-y-2 mb-8" aria-label="Links">
      <nav aria-label="Categorized links" className="space-y-2">
        {linkGroups.map((group, idx) => (
          <LinkGroupRow
            key={group.category}
            group={group}
            baseDelay={animationDelay + idx * 60}
          />
        ))}
      </nav>
    </section>
  )
}
