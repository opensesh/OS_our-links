/**
 * Blog Posts API Route
 * Fetches posts from Open Session's Substack RSS feed
 */

import { NextRequest, NextResponse } from 'next/server';

const SUBSTACK_RSS_URL = 'https://opensession.substack.com/feed';

interface BlogPost {
  id: string;
  title: string;
  description: string;
  date: string;
  pubDate: Date;
  author: string;
  imageUrl: string | null;
  link: string;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function stripHtml(html: string): string {
  return html
    .replace(/<!\[CDATA\[(.*?)\]\]>/gs, '$1')
    .replace(/<[^>]*>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .trim();
}

function extractTagContent(xml: string, tagName: string): string | null {
  const regex = new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, 'i');
  const match = xml.match(regex);
  return match ? match[1] : null;
}

function extractImageUrl(itemXml: string): string | null {
  // Try enclosure
  const enclosureMatch = itemXml.match(/<enclosure[^>]+url=["']([^"']+)["']/i);
  if (enclosureMatch && enclosureMatch[1]) {
    const url = enclosureMatch[1];
    if (url.match(/\.(jpg|jpeg|png|webp|gif)/i)) {
      return url;
    }
  }

  // Try media:content
  const mediaMatch = itemXml.match(/<media:content[^>]+url=["']([^"']+)["']/i);
  if (mediaMatch && mediaMatch[1]) {
    return mediaMatch[1];
  }

  // Try content:encoded (first image)
  const contentEncoded = extractTagContent(itemXml, 'content:encoded');
  if (contentEncoded) {
    const imgMatch = contentEncoded.match(/<img[^>]+src=["']([^"']+)["']/i);
    if (imgMatch && imgMatch[1]) {
      return imgMatch[1];
    }
  }

  return null;
}

function parseRssFeed(xml: string, limit: number): BlogPost[] {
  const posts: BlogPost[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
  let match;
  let index = 0;

  while ((match = itemRegex.exec(xml)) !== null && posts.length < limit) {
    const itemXml = match[1];

    const title = stripHtml(extractTagContent(itemXml, 'title') || '');
    const description = stripHtml(extractTagContent(itemXml, 'description') || '');
    const link = stripHtml(extractTagContent(itemXml, 'link') || '');
    const pubDateStr = extractTagContent(itemXml, 'pubDate') || '';

    const authorMatch = itemXml.match(/<dc:creator[^>]*>([^<]*)<\/dc:creator>/i);
    const author = authorMatch ? stripHtml(authorMatch[1]) : 'Open Session';

    const imageUrl = extractImageUrl(itemXml);
    const pubDate = new Date(pubDateStr);

    if (isNaN(pubDate.getTime())) continue;

    posts.push({
      id: `blog-${index}-${pubDate.getTime()}`,
      title,
      description: description.length > 200 ? description.slice(0, 200) + '...' : description,
      date: formatDate(pubDate),
      pubDate,
      author,
      imageUrl,
      link,
    });

    index++;
  }

  posts.sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());
  return posts;
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = Math.min(parseInt(searchParams.get('limit') || '3', 10), 10);

    const response = await fetch(SUBSTACK_RSS_URL, {
      next: { revalidate: 3600 }, // Cache 1 hour
      headers: { 'User-Agent': 'OS-Links/1.0 RSS Reader' },
    });

    if (!response.ok) {
      return NextResponse.json({ posts: [] }, { status: 200 });
    }

    const xml = await response.text();
    const posts = parseRssFeed(xml, limit);

    return NextResponse.json({ posts });
  } catch (error) {
    console.error('Blog posts API error:', error);
    return NextResponse.json({ posts: [] }, { status: 200 });
  }
}
