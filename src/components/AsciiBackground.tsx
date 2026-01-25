import { useEffect, useRef } from 'react'

export function AsciiBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const layerARef = useRef<HTMLPreElement>(null)
  const layerBRef = useRef<HTMLPreElement>(null)
  const visibleARef = useRef(true)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const layerA = layerARef.current
    const layerB = layerBRef.current
    if (!layerA || !layerB) return

    let rafId = 0
    let timerId: ReturnType<typeof setTimeout>

    const chars = [' ', '.', '·', ':', '•']
    const frequency = 0.18

    function generateFrame(cols: number, rows: number, t: number): string {
      const output: string[] = []
      for (let y = 0; y < rows; y++) {
        let line = ''
        for (let x = 0; x < cols; x++) {
          const v = (
            Math.sin(x * frequency + t) +
            Math.cos(y * frequency - t * 0.9) +
            Math.sin((x + y) * frequency * 0.7 + t * 0.6)
          ) / 3
          const n = Math.floor(((v + 1) / 2) * (chars.length - 1))
          line += chars[n]
        }
        output.push(line)
      }
      return output.join('\n')
    }

    function measureChar(): { width: number; height: number } {
      const ruler = document.createElement('span')
      ruler.textContent = 'M'
      ruler.style.position = 'absolute'
      ruler.style.visibility = 'hidden'
      ruler.style.whiteSpace = 'pre'
      ruler.style.fontFamily = getComputedStyle(layerA!).fontFamily
      ruler.style.fontSize = getComputedStyle(layerA!).fontSize
      ruler.style.lineHeight = getComputedStyle(layerA!).lineHeight
      document.body.appendChild(ruler)
      const rect = ruler.getBoundingClientRect()
      document.body.removeChild(ruler)
      return {
        width: Math.max(1, rect.width),
        height: Math.max(1, rect.height),
      }
    }

    function sizeForViewport(): { cols: number; rows: number } {
      const vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
      const vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
      const { width: charWidth, height: charHeight } = measureChar()
      return {
        cols: Math.max(40, Math.ceil(vw / charWidth)),
        rows: Math.max(22, Math.ceil(vh / charHeight)),
      }
    }

    function render(timeMs?: number) {
      const t = (timeMs || performance.now()) / 900
      const { cols, rows } = sizeForViewport()
      const next = generateFrame(cols, rows, t)

      const incoming = visibleARef.current ? layerB! : layerA!
      const outgoing = visibleARef.current ? layerA! : layerB!

      const lines = next.split('\n')
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].length < cols) {
          lines[i] = lines[i] + ' '.repeat(cols - lines[i].length)
        }
      }
      incoming.textContent = lines.join('\n')

      incoming.classList.add('is-visible')
      outgoing.classList.remove('is-visible')
      visibleARef.current = !visibleARef.current
    }

    function loop() {
      rafId = requestAnimationFrame(() => {
        render(performance.now())
      })
      timerId = setTimeout(loop, 700)
    }

    render(performance.now())
    loop()

    let resizeTO: ReturnType<typeof setTimeout>
    const handleResize = () => {
      clearTimeout(resizeTO)
      resizeTO = setTimeout(() => render(performance.now()), 150)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(rafId)
      clearTimeout(timerId)
      clearTimeout(resizeTO)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 pointer-events-none overflow-hidden"
      style={{
        color: 'var(--color-fg-primary)',
        opacity: 0.1,
        mixBlendMode: 'normal',
        filter: 'blur(0.3px)',
      }}
      aria-hidden="true"
    >
      <pre ref={layerARef} className="ascii-layer" />
      <pre ref={layerBRef} className="ascii-layer" />
    </div>
  )
}
