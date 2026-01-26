"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";

interface NavCard {
  id: string;
  label: string;
  href: string;
}

const navCards: NavCard[] = [
  { id: "about", label: "About Us", href: "https://opensession.co/about" },
  { id: "projects", label: "Projects", href: "https://opensession.co/projects" },
  { id: "contact", label: "Contact", href: "https://opensession.co/contact" },
];

export function CardNav() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !cardsRef.current) return;

    const tl = gsap.timeline();

    if (isOpen) {
      // Expand animation
      tl.to(containerRef.current, {
        height: "auto",
        duration: 0.4,
        ease: "power2.out",
      })
        .fromTo(
          cardsRef.current.children,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.3,
            stagger: 0.08,
            ease: "power2.out",
          },
          "-=0.2"
        );
    } else {
      // Collapse animation
      tl.to(cardsRef.current.children, {
        opacity: 0,
        y: 10,
        duration: 0.2,
        stagger: 0.03,
        ease: "power2.in",
      }).to(containerRef.current, {
        height: 60,
        duration: 0.3,
        ease: "power2.inOut",
      });
    }

    return () => {
      tl.kill();
    };
  }, [isOpen]);

  // Hamburger to X animation
  useEffect(() => {
    if (!hamburgerRef.current) return;
    const lines = hamburgerRef.current.querySelectorAll("span");

    if (isOpen) {
      gsap.to(lines[0], {
        rotation: 45,
        y: 8,
        transformOrigin: "center",
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(lines[1], {
        opacity: 0,
        scaleX: 0,
        duration: 0.2,
        ease: "power2.out",
      });
      gsap.to(lines[2], {
        rotation: -45,
        y: -8,
        transformOrigin: "center",
        duration: 0.3,
        ease: "power2.out",
      });
    } else {
      gsap.to(lines[0], {
        rotation: 0,
        y: 0,
        transformOrigin: "center",
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(lines[1], {
        opacity: 1,
        scaleX: 1,
        duration: 0.3,
        delay: 0.1,
        ease: "power2.out",
      });
      gsap.to(lines[2], {
        rotation: 0,
        y: 0,
        transformOrigin: "center",
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, [isOpen]);

  // Background blur overlay animation
  useEffect(() => {
    if (!overlayRef.current) return;

    if (isOpen) {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );
    }
  }, [isOpen]);

  return (
    <>
      {/* Background blur overlay */}
      {isOpen && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-40"
          style={{
            backgroundColor: "rgba(25, 25, 25, 0.3)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
          onClick={() => setIsOpen(false)}
        />
      )}

      <nav className="absolute top-0 left-0 right-0 z-50 w-full px-4 py-4">
        <div className="max-w-[800px] mx-auto">
          <div
            ref={containerRef}
            className="overflow-hidden rounded-2xl shadow-md"
            style={{
              background: "var(--color-vanilla)",
              border: "1px solid var(--border-secondary)",
              height: 60,
            }}
          >
            {/* Header Row */}
            <div className="flex items-center justify-between h-[60px] px-4">
              {/* Hamburger / X Button */}
              <button
                ref={hamburgerRef}
                onClick={() => setIsOpen(!isOpen)}
                className="relative w-10 h-10 flex flex-col items-center justify-center gap-1.5"
                aria-label={isOpen ? "Close menu" : "Open menu"}
              >
                <span
                  className="block w-5 h-0.5 origin-center"
                  style={{ background: "var(--color-charcoal)" }}
                />
                <span
                  className="block w-5 h-0.5 origin-center"
                  style={{ background: "var(--color-charcoal)" }}
                />
                <span
                  className="block w-5 h-0.5 origin-center"
                  style={{ background: "var(--color-charcoal)" }}
                />
              </button>

              {/* Website Button */}
              <a
                href="https://opensession.co/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-sm font-medium rounded-lg transition-opacity hover:opacity-80"
                style={{
                  background: "var(--color-charcoal)",
                  color: "var(--color-vanilla)",
                }}
              >
                Website
              </a>
            </div>

            {/* Cards Container */}
            <div
              ref={cardsRef}
              className="px-4 pb-4 grid gap-3 md:grid-cols-3 grid-cols-1"
            >
              {navCards.map((card) => (
                <a
                  key={card.id}
                  href={card.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-card group relative block pt-4 pb-8 px-5 rounded-xl text-left font-accent text-2xl font-bold min-h-[148px]"
                  style={{
                    background: "var(--color-charcoal)",
                  }}
                >
                  <span className="nav-card-text transition-colors duration-150">
                    {card.label}
                  </span>
                  {/* External link arrow */}
                  <svg
                    className="nav-card-arrow absolute top-4 right-4 w-5 h-5 transition-colors duration-150"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.833 14.167L14.166 5.833M14.166 5.833H5.833M14.166 5.833V14.167"
                      stroke="currentColor"
                      strokeWidth="1.67"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
