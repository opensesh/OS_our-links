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

// Parse RSS XML directly using DOMParser (no third-party JSON conversion)
function parseRssXml(xmlText: string): RssItem[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xmlText, "text/xml");

  const items = doc.querySelectorAll("item");
  const parsedItems: RssItem[] = [];

  items.forEach((item) => {
    // Helper to get text content safely
    const getText = (selector: string): string => {
      const el = item.querySelector(selector);
      return el?.textContent?.trim() || "";
    };

    // Get content from content:encoded or fallback to description
    const contentEncoded = item.getElementsByTagName("content:encoded")[0];
    const content = contentEncoded?.textContent?.trim() || getText("description");

    // Get author from dc:creator or author
    const dcCreator = item.getElementsByTagName("dc:creator")[0];
    const author = dcCreator?.textContent?.trim() || getText("author") || "Open Session";

    // Get enclosure if present
    const enclosureEl = item.querySelector("enclosure");
    const enclosure = enclosureEl
      ? {
          link: enclosureEl.getAttribute("url") || "",
          type: enclosureEl.getAttribute("type") || undefined,
        }
      : undefined;

    // Get media:thumbnail or media:content for image
    const mediaThumbnail = item.getElementsByTagName("media:thumbnail")[0];
    const mediaContent = item.getElementsByTagName("media:content")[0];
    const thumbnail =
      mediaThumbnail?.getAttribute("url") ||
      mediaContent?.getAttribute("url") ||
      "";

    parsedItems.push({
      title: getText("title"),
      link: getText("link"),
      description: getText("description"),
      content,
      pubDate: getText("pubDate"),
      author,
      thumbnail,
      enclosure,
    });
  });

  return parsedItems;
}

// Fetch og:image from a post URL using CORS proxy with fallback chain
async function fetchOgImage(postUrl: string): Promise<string | null> {
  const proxies = [
    (url: string) => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`,
    (url: string) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
  ];

  for (const makeProxy of proxies) {
    try {
      const proxyUrl = makeProxy(postUrl);
      const response = await fetch(proxyUrl, { signal: AbortSignal.timeout(5000) });
      if (!response.ok) continue;

      const html = await response.text();
      // Match og:image meta tag (handles both quote styles and attribute order)
      const ogMatch = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i) ||
                      html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i);
      if (ogMatch?.[1]) return ogMatch[1];
    } catch {
      continue;
    }
  }
  return null;
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
      {/* Outer container - padding + background color */}
      <div className="w-full sm:w-48 flex-shrink-0 rounded-lg bg-[#2a2a2a] p-2 sm:p-3">
        {/* Inner container - true 16:9 aspect ratio with rounded corners */}
        <div className="w-full aspect-video rounded overflow-hidden">
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
        // Try multiple approaches to fetch RSS with fallbacks
        const cacheBuster = Date.now();
        let items: RssItem[] = [];

        // Approach 1: Try CORS proxies for direct XML parsing (freshest data)
        const proxies = [
          (url: string) => `https://api.codetabs.com/v1/proxy/?quest=${encodeURIComponent(url)}&_=${cacheBuster}`,
          (url: string) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}&_=${cacheBuster}`,
        ];

        for (const makeProxy of proxies) {
          try {
            const proxyUrl = makeProxy(SUBSTACK_RSS_URL);
            const response = await fetch(proxyUrl, { signal: AbortSignal.timeout(6000) });
            if (!response.ok) continue;
            const xmlText = await response.text();
            // Verify it's valid XML (starts with <?xml or <rss)
            if (xmlText.includes("<rss") || xmlText.includes("<?xml")) {
              items = parseRssXml(xmlText);
              if (items.length > 0) break;
            }
          } catch {
            continue;
          }
        }

        // Approach 2: Fallback to rss2json if proxies fail (may have cached data)
        if (items.length === 0) {
          try {
            const rss2jsonUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(SUBSTACK_RSS_URL)}&_=${cacheBuster}`;
            const response = await fetch(rss2jsonUrl, { signal: AbortSignal.timeout(8000) });
            if (response.ok) {
              const data = await response.json();
              if (data.status === "ok" && data.items) {
                items = data.items.map((item: RssItem) => ({
                  title: item.title,
                  link: item.link,
                  description: item.description,
                  content: item.content || item.description,
                  pubDate: item.pubDate,
                  author: item.author || "Open Session",
                  thumbnail: item.thumbnail || "",
                  enclosure: item.enclosure,
                }));
              }
            }
          } catch {
            // Silently fail, will show nothing if all approaches fail
          }
        }

        if (!items.length) {
          throw new Error("Failed to fetch RSS from all sources");
        }

        // Parse posts and fetch og:images for those without RSS images
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
