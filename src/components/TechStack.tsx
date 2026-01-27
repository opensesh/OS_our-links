"use client";

import { useState, useCallback, useRef } from "react";

interface TechItem {
  id: string;
  name: string;
  icon: string;
  url: string;
}

const techStack: TechItem[] = [
  {
    id: "notion",
    name: "Notion",
    icon: "/icons/tech/notion.svg",
    url: "https://notion.so",
  },
  {
    id: "figma",
    name: "Figma",
    icon: "/icons/tech/figma.svg",
    url: "https://figma.com",
  },
  {
    id: "claude-code",
    name: "Claude Code",
    icon: "/icons/tech/claude-code.svg",
    url: "https://claude.ai/code",
  },
  {
    id: "cursor",
    name: "Cursor",
    icon: "/icons/tech/cursor.svg",
    url: "https://cursor.sh",
  },
  {
    id: "google-workspace",
    name: "Google Workspace",
    icon: "/icons/tech/google-workspace.svg",
    url: "https://workspace.google.com",
  },
  {
    id: "open-screen",
    name: "Open Screen",
    icon: "/icons/tech/open-screen.png",
    url: "https://opensession.co",
  },
  {
    id: "claude",
    name: "Claude",
    icon: "/icons/tech/claude.svg",
    url: "https://claude.ai",
  },
  {
    id: "premiere-pro",
    name: "Premiere Pro",
    icon: "/icons/tech/premiere-pro.svg",
    url: "https://www.adobe.com/products/premiere.html",
  },
  {
    id: "lightroom",
    name: "Adobe Lightroom",
    icon: "/icons/tech/lightroom.svg",
    url: "https://www.adobe.com/products/photoshop-lightroom.html",
  },
  {
    id: "obsidian",
    name: "Obsidian",
    icon: "/icons/tech/obsidian.svg",
    url: "https://obsidian.md",
  },
];

function TechIcon({
  item,
  onHover,
  onLeave,
}: {
  item: TechItem;
  onHover: (name: string) => void;
  onLeave: () => void;
}) {
  const handleMouseEnter = useCallback(
    () => onHover(item.name),
    [item.name, onHover]
  );

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="tech-icon-wrapper"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={onLeave}
      aria-label={"Visit " + item.name}
    >
      <img
        src={item.icon}
        alt={item.name}
        className="tech-icon"
        loading="lazy"
      />
    </a>
  );
}

export function TechStack() {
  const [hoveredName, setHoveredName] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = useCallback(() => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const maxScroll = scrollWidth - clientWidth;
      setScrollProgress(maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0);
    }
  }, []);

  const handleHover = useCallback((name: string) => {
    setHoveredName(name);
  }, []);

  const handleLeave = useCallback(() => {
    setHoveredName(null);
  }, []);

  return (
    <section className="w-full mt-8 sm:mt-10 mb-8">
      {/* Heading - aligned with max-w content */}
      <div className="px-4 mb-4">
        <div className="max-w-[var(--content-max-width)] mx-auto">
          <h2
            className="font-accent text-xl sm:text-2xl lg:text-3xl font-bold"
            style={{ color: "var(--color-vanilla)" }}
          >
            Our Tech Stack
          </h2>
        </div>
      </div>

      {/* Glassmorphism Container */}
      <div className="tech-stack-outer">
        <div className="tech-stack-container">
          <div className="tech-stack-inner">
            <div 
              ref={scrollRef}
              onScroll={handleScroll}
              className="tech-stack-scroll"
            >
              {techStack.map((item) => (
                <TechIcon
                  key={item.id}
                  item={item}
                  onHover={handleHover}
                  onLeave={handleLeave}
                />
              ))}
            </div>
          </div>

          {/* Floating Label Pill */}
          <div
            className={"tech-label-pill " + (hoveredName ? "visible" : "")}
            aria-live="polite"
          >
            {hoveredName || "\u00A0"}
          </div>
        </div>
        
        {/* Scroll progress indicator */}
        <div className="scroll-progress-container">
          <div className="scroll-progress-track">
            <div 
              className="scroll-progress-thumb" 
              style={{ width: `${scrollProgress}%` }} 
            />
          </div>
        </div>
      </div>
    </section>
  );
}
