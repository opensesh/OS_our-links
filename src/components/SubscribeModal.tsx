"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, FormEvent } from "react";
import { X } from "lucide-react";
import { ShuffleText } from "./ShuffleText";

interface SubscribeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSkip: () => void;
  resourceTitle: string;
  resourceHref: string;
}

export function SubscribeModal({
  isOpen,
  onClose,
  onSkip,
  resourceTitle,
  resourceHref,
}: SubscribeModalProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // ESC key to close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Submit to Substack via form (opens in new tab for confirmation)
    const form = document.createElement("form");
    form.method = "POST";
    form.action = "https://opensession.substack.com/api/v1/free?nojs=true";
    form.target = "_blank";

    const emailInput = document.createElement("input");
    emailInput.name = "email";
    emailInput.value = email;
    form.appendChild(emailInput);

    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);

    // Show success state briefly, then redirect
    setIsSubscribed(true);
    setTimeout(() => {
      window.open(resourceHref, "_blank", "noopener,noreferrer");
      handleReset();
    }, 1500);
  };

  const handleSkip = () => {
    window.open(resourceHref, "_blank", "noopener,noreferrer");
    onSkip();
  };

  const handleReset = () => {
    setEmail("");
    setIsSubscribed(false);
    setIsSubmitting(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal container */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            <motion.div
              className="relative w-full max-w-sm bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-2xl p-6 shadow-xl"
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-1 text-[var(--fg-tertiary)] hover:text-[var(--fg-primary)] transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

              {/* Content */}
              <div className="text-center">
                {/* Animated logo */}
                <div className="flex justify-center mb-4">
                  <div className="w-20 h-20 rounded-full overflow-hidden bg-[var(--bg-tertiary)] border border-[var(--border-secondary)]">
                    <video
                      src="/images/logo-crt.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                </div>

                <h2 className="text-lg font-accent font-bold text-[var(--fg-primary)] mb-2">
                  <ShuffleText
                    text="STAY IN THE LOOP"
                    duration={0.2}
                    shuffleTimes={1}
                    stagger={0.09}
                    ease="power3.out"
                    playOnMount={true}
                    hoverReplay={true}
                  />
                </h2>
                <p className="text-sm text-[var(--fg-secondary)] mb-6">
                  Subscribe to get notified when we release new resources like{" "}
                  <span className="font-medium text-[var(--fg-primary)]">
                    {resourceTitle}
                  </span>
                </p>

                {isSubscribed ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-8"
                  >
                    <p className="text-[var(--fg-brand-primary)] font-medium">
                      Thanks for subscribing!
                    </p>
                    <p className="text-sm text-[var(--fg-tertiary)] mt-1">
                      Opening resource...
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      className="subscribe-input w-full"
                      disabled={isSubmitting}
                    />
                    <button
                      type="submit"
                      className="subscribe-button w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Subscribing..." : "Subscribe"}
                    </button>
                  </form>
                )}
              </div>

              {/* Skip link */}
              {!isSubscribed && (
                <button
                  onClick={handleSkip}
                  className="mt-4 w-full text-center text-sm text-[var(--fg-quaternary)] hover:text-[var(--fg-tertiary)] transition-colors"
                >
                  Skip and view resource
                </button>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
