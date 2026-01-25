import { useState, useEffect } from 'react'

interface BlogPost {
  title: string
  link: string
  pubDate: string
  description: string
}

interface SubstackFeedProps {
  animationDelay?: number
}

const SUBSTACK_RSS = 'https://opensession.substack.com/feed'
const CORS_PROXY = 'https://api.allorigins.win/raw?url='

function parseDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function stripHtml(html: string): string {
  const tmp = document.createElement('div')
  tmp.innerHTML = html
  return tmp.textContent || tmp.innerText || ''
}

function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + '...'
}

export function SubstackFeed({ animationDelay = 0 }: SubstackFeedProps) {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [email, setEmail] = useState('')

  useEffect(() => {
    async function fetchFeed() {
      try {
        const response = await fetch(`${CORS_PROXY}${encodeURIComponent(SUBSTACK_RSS)}`)
        if (!response.ok) throw new Error('Failed to fetch feed')

        const text = await response.text()
        const parser = new DOMParser()
        const xml = parser.parseFromString(text, 'text/xml')

        const items = xml.querySelectorAll('item')
        const parsedPosts: BlogPost[] = []

        items.forEach((item, idx) => {
          if (idx >= 3) return // Only take 3 posts

          const title = item.querySelector('title')?.textContent || ''
          const link = item.querySelector('link')?.textContent || ''
          const pubDate = item.querySelector('pubDate')?.textContent || ''
          const description = item.querySelector('description')?.textContent || ''

          parsedPosts.push({
            title,
            link,
            pubDate,
            description: truncate(stripHtml(description), 100),
          })
        })

        setPosts(parsedPosts)
      } catch (err) {
        setError('Unable to load recent posts')
        console.error('RSS fetch error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchFeed()
  }, [])

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    // Submit to Substack's native form
    const form = document.createElement('form')
    form.method = 'POST'
    form.action = 'https://opensession.substack.com/api/v1/free?nojs=true'
    form.target = '_blank'

    const input = document.createElement('input')
    input.type = 'hidden'
    input.name = 'email'
    input.value = email
    form.appendChild(input)

    document.body.appendChild(form)
    form.submit()
    document.body.removeChild(form)

    setEmail('')
  }

  return (
    <section className="mb-8" aria-label="Recent Blog Posts">
      <h2
        className="text-xs font-medium uppercase tracking-wider px-1 mb-3 animate-fade-in-up"
        style={{
          color: 'var(--color-fg-tertiary)',
          animationDelay: `${animationDelay}ms`,
        }}
      >
        Recent from Substack
      </h2>

      {/* Posts List */}
      <div
        className="rounded-xl p-4 space-y-4 animate-fade-in-up"
        style={{
          backgroundColor: 'var(--color-bg-secondary)',
          border: '1px solid var(--color-border-secondary)',
          animationDelay: `${animationDelay + 60}ms`,
        }}
      >
        {loading && (
          <div className="flex items-center justify-center py-8">
            <div
              className="w-6 h-6 rounded-full border-2 border-t-transparent animate-spin"
              style={{ borderColor: 'var(--color-fg-tertiary)', borderTopColor: 'transparent' }}
            />
          </div>
        )}

        {error && (
          <p className="text-sm text-fg-tertiary text-center py-4">{error}</p>
        )}

        {!loading && !error && posts.map((post, idx) => (
          <a
            key={post.link}
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block group animate-fade-in-up"
            style={{ animationDelay: `${animationDelay + 120 + idx * 60}ms` }}
          >
            <article className="p-3 -mx-1 rounded-lg transition-colors hover:bg-bg-tertiary">
              <h3 className="text-sm font-semibold mb-1 group-hover:text-brand-aperol transition-colors line-clamp-2">
                {post.title}
              </h3>
              <p className="text-xs text-fg-secondary mb-2 line-clamp-2">
                {post.description}
              </p>
              <time className="text-xs text-fg-tertiary">{parseDate(post.pubDate)}</time>
            </article>
            {idx < posts.length - 1 && (
              <div
                className="h-px mt-4"
                style={{ backgroundColor: 'var(--color-border-secondary)' }}
              />
            )}
          </a>
        ))}

        {/* Subscribe Form */}
        <form onSubmit={handleSubscribe} className="flex gap-2 pt-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            autoComplete="email"
            className="flex-1 min-w-0 h-10 px-3 rounded-lg text-sm outline-none transition-colors"
            style={{
              backgroundColor: 'var(--color-bg-tertiary)',
              border: '1px solid var(--color-border-secondary)',
              color: 'var(--color-fg-primary)',
            }}
          />
          <button
            type="submit"
            className="h-10 px-4 rounded-lg text-sm font-semibold text-white transition-transform duration-150 hover:scale-[1.02] active:scale-[0.97]"
            style={{ backgroundColor: 'var(--color-brand-aperol)' }}
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  )
}
