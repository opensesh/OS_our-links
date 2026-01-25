interface HeroProps {
  animationDelay?: number
}

export function Hero({ animationDelay = 0 }: HeroProps) {
  return (
    <section
      className="text-center pt-24 pb-4 animate-fade-in-up"
      style={{ animationDelay: `${animationDelay}ms` }}
      aria-label="Profile"
    >
      {/* Profile Image */}
      <div
        className="w-16 h-16 mx-auto mb-2 rounded-[16px] overflow-hidden flex items-center justify-center animate-fade-in-up sm:w-22 sm:h-22 sm:mb-4 lg:w-28 lg:h-28"
        style={{
          backgroundColor: 'var(--color-bg-secondary)',
          boxShadow: 'var(--shadow-profile)',
          animationDelay: `${animationDelay}ms`,
        }}
      >
        <img
          src="/images/3D Logo_rotation_square_compressed.gif"
          alt="Open Session logo"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Profile Name */}
      <h1
        className="text-2xl font-bold mb-1 tracking-tight animate-fade-in-up sm:text-3xl lg:text-4xl"
        style={{
          fontFamily: 'var(--font-display)',
          animationDelay: `${animationDelay + 100}ms`,
        }}
      >
        Open Session
      </h1>

      {/* Tagline */}
      <p
        className="text-sm text-fg-secondary leading-relaxed max-w-[480px] mx-auto animate-fade-in-up sm:text-base"
        style={{ animationDelay: `${animationDelay + 150}ms` }}
      >
        <strong
          className="text-fg-primary text-base inline-block sm:text-lg"
          style={{ fontFamily: 'var(--font-accent)', fontWeight: 700 }}
        >
          Your design workflow, upgraded.
        </strong>
        <br />
        Figma templates, AI workflows, and the latest designer insights
      </p>
    </section>
  )
}
