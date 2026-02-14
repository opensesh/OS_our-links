"use client";

import { useState, useEffect } from "react";

const SUBSTACK_RSS_URL = "https://opensession.substack.com/feed";

interface BlogPost {
  id: string;
  title: string;
  description: string;
  date: string;
  author: string;
  imageUrl: string | null;
  link: string;
}

interface RssItem {
  title: string;
  link: string;
  description: string;
  content: string;
  pubDate: string;
  author: string;
  thumbnail: string;
  enclosure?: { link: string; type?: string };
}

interface RssResponse {
  status: string;
  items: RssItem[];
}

// Fetch og:image from a post URL using CORS proxy
async function fetchOgImage(postUrl: string): Promise<string | null> {
  try {
    // Use allorigins as a CORS proxy
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(postUrl)}`;
    const response = await fetch(proxyUrl, { signal: AbortSignal.timeout(5000) });
    if (!response.ok) return null;

    const html = await response.text();
    // Match og:image meta tag (handles both quote styles and attribute order)
    const ogMatch = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i) ||
                    html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i);
    return ogMatch?.[1] || null;
  } catch {
    return null;
  }
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .trim();
}

function extractImageFromHtml(html: string): string | null {
  if (!html) return null;

  // Look for img tags with src attribute (supports srcset too)
  const imgMatch = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  if (imgMatch?.[1]) {
    // Clean up Substack CDN URLs - remove size constraints for better quality
    let url = imgMatch[1];
    // Substack images often have /w_xx,c_limit/ - we can request a reasonable size
    if (url.includes("substackcdn.com")) {
      url = url.replace(/\/w_\d+,c_limit\//, "/w_400,c_limit/");
    }
    return url;
  }

  return null;
}

function getImageUrl(item: RssItem): string | null {
  // Priority 1: Explicit thumbnail
  if (item.thumbnail) {
    return item.thumbnail;
  }

  // Priority 2: Enclosure if it's an image (not audio/video)
  if (item.enclosure?.link && item.enclosure.type?.startsWith("image/")) {
    return item.enclosure.link;
  }

  // Priority 3: Extract first image from content HTML
  const contentImage = extractImageFromHtml(item.content);
  if (contentImage) {
    return contentImage;
  }

  // Priority 4: Try description HTML
  const descImage = extractImageFromHtml(item.description);
  if (descImage) {
    return descImage;
  }

  return null;
}

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <a
      href={post.link}
      target="_blank"
      rel="noopener noreferrer"
      className="blog-card group flex flex-col sm:flex-row gap-3 sm:gap-4"
    >
      {/* Image - full width on mobile, fixed on desktop, with padding to prevent cropping */}
      <div className="w-full sm:w-48 aspect-video relative flex-shrink-0 rounded-lg overflow-hidden bg-[#2a2a2a] p-2 sm:p-3">
        {post.imageUrl ? (
          <img
            src={post.imageUrl}
            alt=""
            className="w-full h-full object-contain rounded"
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
        {/* Title - full width */}
        <h4 className="blog-card-title font-accent font-bold text-[var(--color-vanilla)] line-clamp-2 leading-tight">
          {post.title}
        </h4>

        {/* Author + Date - same line, wraps on mobile */}
        <div className="flex flex-wrap items-center gap-x-2 text-[var(--fg-quaternary)]">
          <span className="blog-card-author">by {post.author}</span>
          <span className="text-[var(--fg-tertiary)]">•</span>
          <span className="blog-card-date">{post.date}</span>
        </div>

        {/* Description */}
        <p className="blog-card-description text-[var(--fg-secondary)] line-clamp-3">
          {post.description}
        </p>
      </div>
    </a>
  );
}

function BlogCardSkeleton() {
  return (
    <div className="blog-card flex flex-col sm:flex-row gap-3 sm:gap-4">
      <div className="w-full sm:w-48 aspect-video flex-shrink-0 rounded-lg bg-[#2a2a2a] animate-pulse" />
      <div className="flex-1 flex flex-col justify-center gap-2">
        <div className="h-4 w-3/4 bg-[#2a2a2a] rounded animate-pulse" />
        <div className="h-3 w-24 bg-[#2a2a2a] rounded animate-pulse" />
        <div className="h-3 w-full bg-[#2a2a2a] rounded animate-pulse" />
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
        // Use rss2json.com API for CORS-friendly RSS fetching
        // Per-request cache-busting for freshest data
        const cacheBuster = Date.now();
        const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(SUBSTACK_RSS_URL)}&_=${cacheBuster}`;
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Failed to fetch");
        const data: RssResponse = await response.json();

        if (data.status !== "ok" || !data.items) {
          throw new Error("Invalid response");
        }

        // Parse posts and fetch og:images for those without RSS images
        const items = data.items; // Show all posts
        const parsedPosts: BlogPost[] = await Promise.all(
          items.map(async (item, index) => {
            let imageUrl = getImageUrl(item);

            // If no image from RSS, try fetching og:image from the post page
            if (!imageUrl) {
              imageUrl = await fetchOgImage(item.link);
            }

            return {
              id: `blog-${index}-${new Date(item.pubDate).getTime()}`,
              title: item.title,
              description:
                stripHtml(item.description).slice(0, 200) +
                (item.description.length > 200 ? "..." : ""),
              date: formatDate(item.pubDate),
              author: item.author || "Open Session",
              imageUrl,
              link: item.link,
            };
          })
        );

        setPosts(parsedPosts);
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
      {/* Container with max-width */}
      <div className="max-w-[var(--content-max-width)] mx-auto">
        {/* Heading - Neue Haas Grotesk */}
        <h2
          className="text-xl font-bold mb-3 sm:mb-4"
          style={{ color: "var(--color-vanilla)" }}
        >
          Recent Blogs
        </h2>

        {/* Subscribe form - right after heading */}
        <div className="mb-4 sm:mb-6">
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

        {/* Blog cards - vertical stack */}
        <div className="flex flex-col gap-3">
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
    </section>
  );
}
