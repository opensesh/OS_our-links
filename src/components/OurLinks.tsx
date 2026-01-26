"use client";

// Icon components - all stroke-based for consistent outline style
function FigmaIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" />
      <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" />
      <path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z" />
      <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z" />
      <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

function SubstackIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 6h16" />
      <path d="M4 10h16" />
      <path d="M4 14v8l8-4 8 4v-8" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function MediumIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <ellipse cx="6.5" cy="12" rx="4.5" ry="6" />
      <ellipse cx="17" cy="12" rx="2" ry="6" />
      <line x1="22" y1="6" x2="22" y2="18" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  );
}

interface LinkItem {
  id: string;
  title: string;
  handle: string;
  href: string;
  icon: React.ReactNode;
}

const links: LinkItem[] = [
  {
    id: "figma",
    title: "Figma",
    handle: "@opensession",
    href: "https://link.opensession.co/website-figma",
    icon: <FigmaIcon />,
  },
  {
    id: "github",
    title: "Github",
    handle: "@opensesh",
    href: "https://link.opensession.co/website-github",
    icon: <GitHubIcon />,
  },
  {
    id: "substack",
    title: "Substack",
    handle: "@opensession",
    href: "https://link.opensession.co/website-substack",
    icon: <SubstackIcon />,
  },
  {
    id: "instagram",
    title: "Insta",
    handle: "@opensession.co",
    href: "https://link.opensession.co/website-instagram",
    icon: <InstagramIcon />,
  },
  {
    id: "medium",
    title: "Medium",
    handle: "@opensession",
    href: "https://link.opensession.co/website-medium",
    icon: <MediumIcon />,
  },
  {
    id: "youtube",
    title: "YouTube",
    handle: "@opensession",
    href: "https://link.opensession.co/website-youtube",
    icon: <YouTubeIcon />,
  },
];

function LinkCard({ link }: { link: LinkItem }) {
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className="link-card flex-shrink-0 flex flex-col gap-4 p-4 pb-5 rounded-md transition-all duration-150 hover:opacity-90"
      style={{
        background: "var(--color-charcoal)",
        border: "1px solid var(--color-vanilla)",
        minWidth: "calc((100% - 34px) / 3)", // Show 3 cards with gap
        maxWidth: "160px",
      }}
    >
      {/* Icon container */}
      <div
        className="link-card-icon flex items-center justify-center w-[33px] h-[33px] rounded-full"
        style={{
          border: "0.83px solid var(--color-vanilla)",
          color: "var(--color-vanilla)",
        }}
      >
        {link.icon}
      </div>

      {/* Text content */}
      <div className="flex flex-col">
        <span
          className="text-[22px] leading-[1.2] font-medium"
          style={{ color: "var(--color-vanilla)" }}
        >
          {link.title}
        </span>
        <span
          className="text-[12px] leading-[1.25] font-normal"
          style={{ color: "var(--color-vanilla)" }}
        >
          {link.handle}
        </span>
      </div>
    </a>
  );
}

export function OurLinks() {
  return (
    <section className="w-full mt-4">
      {/* Heading - aligned with content */}
      <div className="px-4 mb-4">
        <div className="max-w-[800px] mx-auto">
          <h2
            className="text-[32px] font-bold"
            style={{ color: "var(--color-vanilla)" }}
          >
            Our Links
          </h2>
        </div>
      </div>

      {/* Scrollable Cards Container */}
      <div className="links-scroll-wrapper">
        <div className="links-scroll">
          {links.map((link) => (
            <LinkCard key={link.id} link={link} />
          ))}
          {/* Right padding spacer for scroll end */}
          <div className="flex-shrink-0 w-4 sm:w-0" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
