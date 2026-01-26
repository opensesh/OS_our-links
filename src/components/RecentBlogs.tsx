"use client";

import { useState, useEffect } from "react";

interface BlogPost {
  id: string;
  title: string;
  description: string;
  date: string;
  author: string;
  imageUrl: string | null;
  link: string;
}

function ExternalLinkIcon() {
  return (
    <svg
      width="14"
      height="14"
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

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <a
      href={post.link}
      target="_blank"
      rel="noopener noreferrer"
      className="blog-card group flex gap-3 sm:gap-4"
    >
      {/* Image */}
      <div className="blog-card-image relative flex-shrink-0 rounded-lg overflow-hidden bg-[#2a2a2a]">
        {post.imageUrl ? (
          <img
            src={post.imageUrl}
            alt=""
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[var(--fg-quaternary)]">
            <span className="text-xl font-bold font-accent">OS</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 flex flex-col justify-center gap-1">
        {/* Title + Date row */}
        <div className="flex items-start justify-between gap-2">
          <h4 className="blog-card-title font-accent font-bold text-[var(--color-vanilla)] line-clamp-2 leading-tight">
            {post.title}
          </h4>
          <span className="blog-card-date flex-shrink-0 text-[var(--fg-tertiary)]">
            {post.date}
          </span>
        </div>

        {/* Author */}
        <span className="blog-card-author text-[var(--fg-quaternary)]">
          by {post.author}
        </span>

        {/* Description - hidden on mobile */}
        <p className="blog-card-description hidden sm:block text-[var(--fg-secondary)] line-clamp-2">
          {post.description}
        </p>

        {/* Link indicator on hover */}
        <div className="flex items-center gap-1.5 text-[var(--fg-brand-primary)] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <span className="text-xs">Read on Substack</span>
          <ExternalLinkIcon />
        </div>
      </div>
    </a>
  );
}

function BlogCardSkeleton() {
  return (
    <div className="blog-card flex gap-3 sm:gap-4">
      <div className="blog-card-image flex-shrink-0 rounded-lg bg-[#2a2a2a] animate-pulse" />
      <div className="flex-1 flex flex-col justify-center gap-2">
        <div className="flex items-center justify-between">
          <div className="h-4 w-3/4 bg-[#2a2a2a] rounded animate-pulse" />
          <div className="h-3 w-14 bg-[#2a2a2a] rounded animate-pulse" />
        </div>
        <div className="h-3 w-20 bg-[#2a2a2a] rounded animate-pulse" />
        <div className="hidden sm:block h-3 w-full bg-[#2a2a2a] rounded animate-pulse" />
      </div>
    </div>
  );
}

export function RecentBlogs() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadPosts() {
      try {
        const response = await fetch('/api/blog-posts?limit=3');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setPosts(data.posts || []);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    loadPosts();
  }, []);

  // Don't render if error or no posts
  if (error || (!isLoading && posts.length === 0)) {
    return null;
  }

  return (
    <section className="w-full mt-6 sm:mt-8">
      {/* Heading - aligned with max-w-[800px] lg:max-w-[1024px] xl:max-w-[1200px] content */}
      <div className="px-4 mb-3 sm:mb-4">
        <div className="max-w-[800px] lg:max-w-[1024px] xl:max-w-[1200px] mx-auto">
          <h2
            className="font-accent text-xl sm:text-2xl lg:text-3xl font-bold"
            style={{ color: "var(--color-vanilla)" }}
          >
            Recent
          </h2>
        </div>
      </div>

      {/* Blog cards - vertical stack within max-width */}
      <div className="px-4">
        <div className="max-w-[800px] lg:max-w-[1024px] xl:max-w-[1200px] mx-auto flex flex-col gap-3">
          {isLoading ? (
            <>
              <BlogCardSkeleton />
              <BlogCardSkeleton />
              <BlogCardSkeleton />
            </>
          ) : (
            posts.map((post) => <BlogCard key={post.id} post={post} />)
          )}
        </div>
      </div>

      {/* Subscribe form */}
      <div className="px-4 mt-6">
        <div className="max-w-[800px] lg:max-w-[1024px] xl:max-w-[1200px] mx-auto">
          <form
            action="https://opensession.substack.com/api/v1/free?nojs=true"
            method="post"
            className="subscribe-form"
          >
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              className="subscribe-input"
            />
            <button type="submit" className="subscribe-button">
              Subscribe
            </button>
          </form>
          <p className="subscribe-hint">
            Get our latest posts delivered to your inbox
          </p>
        </div>
      </div>
    </section>
  );
}
