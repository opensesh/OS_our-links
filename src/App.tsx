import {
  AsciiBackground,
  CardNav,
  Hero,
  LinkSection,
  FreeResources,
  SubstackFeed,
  TechDock,
} from './components'

function App() {
  const scrollToSubscribe = () => {
    // Find the subscribe input in the SubstackFeed component
    const subscribeInput = document.querySelector('input[placeholder="your@email.com"]')
    if (subscribeInput) {
      subscribeInput.scrollIntoView({ behavior: 'smooth', block: 'center' })
      setTimeout(() => {
        (subscribeInput as HTMLInputElement).focus()
      }, 500)
    }
  }

  return (
    <>
      {/* Background */}
      <AsciiBackground />

      {/* Header Gradient */}
      <div
        className="fixed top-0 left-0 right-0 h-64 pointer-events-none z-0"
        style={{
          background: 'linear-gradient(180deg, var(--color-bg-primary) 0%, rgba(25, 25, 25, 0.6) 40%, rgba(25, 25, 25, 0) 100%)',
        }}
      />

      {/* Navigation */}
      <CardNav onSubscribeClick={scrollToSubscribe} />

      {/* Main Content */}
      <main className="relative z-10 max-w-[720px] mx-auto px-5 pb-12 sm:px-8 lg:px-12">
        {/* Hero Section */}
        <Hero animationDelay={0} />

        {/* Links Section */}
        <LinkSection animationDelay={200} />

        {/* Free Resources */}
        <FreeResources animationDelay={400} />

        {/* Substack Feed */}
        <SubstackFeed animationDelay={600} />

        {/* Tech Dock */}
        <TechDock animationDelay={800} />

        {/* Footer */}
        <footer
          className="text-center pt-16 pb-8 border-t animate-fade-in-up"
          style={{
            borderColor: 'var(--color-border-secondary)',
            animationDelay: '1000ms',
          }}
        >
          <p className="text-sm" style={{ color: 'var(--color-fg-quaternary)' }}>
            &copy; {new Date().getFullYear()} Open Session
          </p>
        </footer>
      </main>
    </>
  )
}

export default App
