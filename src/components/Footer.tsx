export function Footer() {
  return (
    <footer className="w-full bg-[var(--color-charcoal)] mt-8">
      {/* Decorative handle */}
      <div className="flex justify-center pt-6">
        <div className="w-12 h-1.5 bg-[var(--color-vanilla)]/20 rounded-full" />
      </div>

      {/* Content container - matches NavCard max-width */}
      <div className="max-w-[var(--content-max-width)] mx-auto px-4 py-10">
        <div className="flex flex-col sm:flex-row justify-between gap-8 sm:gap-12">
          {/* Left column - Tagline & Email */}
          <div className="flex flex-col gap-6">
            <p className="text-[var(--color-vanilla)]/70 text-lg italic leading-relaxed max-w-[280px]">
              Transform your brand. Leverage AI design workflows. Bring bold
              ideas to life. Start here.
            </p>
            <a
              href="mailto:hello@opensession.co"
              className="text-[var(--color-vanilla)] text-xl sm:text-2xl font-bold hover:text-[var(--color-aperol)] transition-colors"
            >
              hello@opensession.co
            </a>
          </div>

          {/* Right column - Made with love & Copyright */}
          <div className="flex flex-col items-start sm:items-end gap-3 sm:text-right">
            <div className="flex items-baseline gap-2 text-[var(--color-vanilla)]/50">
              <span className="text-sm">Made with</span>
              <span className="font-accent text-2xl sm:text-3xl text-[var(--color-vanilla)]/70">
                love<sup className="text-xs">™</sup>
              </span>
            </div>
            <p className="text-[var(--color-vanilla)]/50 text-sm">
              © 2026 All rights reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
