"use client";

// Icon components - all stroke-based for consistent outline style
function InstagramIcon() {
  return (
    <svg
      width="20"
      height="20"
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

function LinkedInIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function SubstackIcon() {
  return (
    <svg
      width="20"
      height="20"
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

function MediumIcon() {
  return (
    <svg
      width="20"
      height="20"
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

function FigmaIcon() {
  return (
    <svg
      width="20"
      height="20"
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
      width="20"
      height="20"
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

function Divider() {
  return (
    <div
      className="w-px h-6 flex-shrink-0"
      style={{ backgroundColor: "var(--color-vanilla)", opacity: 0.3 }}
    />
  );
}

interface LinkItem {
  name: string;
  href: string;
  icon: React.ReactNode;
}

const socialLinks: LinkItem[] = [
  {
    name: "Instagram",
    href: "https://link.opensession.co/website-instagram",
    icon: <InstagramIcon />,
  },
  {
    name: "LinkedIn",
    href: "https://link.opensession.co/website-linkedin",
    icon: <LinkedInIcon />,
  },
];

const contentLinks: LinkItem[] = [
  {
    name: "Substack",
    href: "https://link.opensession.co/website-substack",
    icon: <SubstackIcon />,
  },
  {
    name: "Medium",
    href: "https://link.opensession.co/website-medium",
    icon: <MediumIcon />,
  },
];

const designLinks: LinkItem[] = [
  {
    name: "Figma",
    href: "https://link.opensession.co/website-figma",
    icon: <FigmaIcon />,
  },
  {
    name: "GitHub",
    href: "https://link.opensession.co/website-github",
    icon: <GitHubIcon />,
  },
];

function LinkButton({ link }: { link: LinkItem }) {
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity"
      style={{ color: "var(--color-vanilla)" }}
      aria-label={link.name}
      title={link.name}
    >
      {link.icon}
    </a>
  );
}

export function OurLinks() {
  return (
    <section className="w-full px-4 mt-4">
      <div className="max-w-[800px] mx-auto">
        <div
          className="p-6 rounded-xl"
          style={{
            backgroundColor: "#0d0d0d",
          }}
        >
          <div className="flex flex-wrap items-center gap-4">
            <h2
              className="font-accent text-2xl sm:text-3xl font-bold"
              style={{ color: "var(--color-vanilla)" }}
            >
              Our Links
            </h2>

            <Divider />
            {/* Social */}
            {socialLinks.map((link) => (
              <LinkButton key={link.name} link={link} />
            ))}

            <Divider />

            {/* Content */}
            {contentLinks.map((link) => (
              <LinkButton key={link.name} link={link} />
            ))}

            <Divider />

            {/* Design */}
            {designLinks.map((link) => (
              <LinkButton key={link.name} link={link} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
