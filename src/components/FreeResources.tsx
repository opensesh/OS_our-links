"use client";

// Custom icon component - stroke-based for consistent outline style
function ExternalLinkIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

interface ResourceCard {
  id: string;
  label: string;
  badge: { text: string; variant: "coming-soon" | "live" };
  image: string;
  title: string;
  description: string;
  href: string;
}

const resourceCards: ResourceCard[] = [
  {
    id: "brand-design-system",
    label: "Identity",
    badge: { text: "Coming Soon", variant: "coming-soon" },
    image: "/images/brand-design-system.png",
    title: "Brand Design System",
    description:
      "Comprehensive design system optimized for brand identity in the AI era. Fully configurable with connected variables",
    href: "#",
  },
  {
    id: "resource-universe",
    label: "Brand Resource Universe",
    badge: { text: "Live", variant: "live" },
    image: "/images/resource-universe.png",
    title: "Resource Universe",
    description:
      "All of our favorite design tools and inspiration in one place. Constantly updated to keep you creative daily",
    href: "#",
  },
  {
    id: "portfolio",
    label: "Portfolio",
    badge: { text: "Coming Soon", variant: "coming-soon" },
    image: "/images/portfolio.png",
    title: "Portfolio",
    description:
      "Our co-founder's portfolio showcasing work from Google, Salesforce, and more",
    href: "#",
  },
];

function Badge({ text, variant }: { text: string; variant: "coming-soon" | "live" }) {
  return (
    <span
      className={`
        resource-card-badge font-medium rounded-full
        ${variant === "coming-soon" ? "badge-coming-soon" : "badge-live"}
      `}
    >
      {text}
    </span>
  );
}

function ResourceCardComponent({ card }: { card: ResourceCard }) {
  return (
    <div className="resource-card">
      {/* Image Area */}
      <div className="resource-card-image relative bg-[#191919] rounded-t-xl overflow-hidden">
        {/* Placeholder dark background - replace with actual images later */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#2a2a2a] to-[#191919]" />

        {/* Label - Top Left */}
        <span className="resource-card-label absolute top-2 left-2 sm:top-3 sm:left-3 font-medium bg-white/90 text-[#191919] rounded">
          {card.label}
        </span>

        {/* Badge - Top Right */}
        <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
          <Badge text={card.badge.text} variant={card.badge.variant} />
        </div>
      </div>

      {/* Content Area */}
      <div className="resource-card-content">
        <h3 className="resource-card-title font-accent font-bold text-[#191919] mb-1.5 sm:mb-2">
          {card.title}
        </h3>
        <p className="resource-card-description text-[#191919]/80 mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3">
          {card.description}
        </p>
        <a
          href={card.href}
          target="_blank"
          rel="noopener noreferrer"
          className="card-button inline-flex items-center gap-1.5 sm:gap-2 font-medium rounded-lg"
        >
          Website
          <ExternalLinkIcon />
        </a>
      </div>
    </div>
  );
}

export function FreeResources() {
  return (
    <section className="w-full mt-6 sm:mt-8">
      {/* Heading - aligned with max-w-[800px] lg:max-w-[1024px] xl:max-w-[1200px] content */}
      <div className="px-4 mb-3 sm:mb-4">
        <div className="max-w-[800px] lg:max-w-[1024px] xl:max-w-[1200px] mx-auto">
          <h2
            className="font-accent text-xl sm:text-2xl lg:text-3xl font-bold"
            style={{ color: "var(--color-vanilla)" }}
          >
            Free Resources
          </h2>
        </div>
      </div>

      {/* Scrollable Cards Container */}
      <div className="resources-scroll-wrapper">
        <div className="resources-scroll">
          {resourceCards.map((card) => (
            <ResourceCardComponent key={card.id} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
