export interface LinkItem {
  label: string
  href: string
  icon: string
}

export interface LinkGroup {
  category: string
  links: LinkItem[]
}

export const linkGroups: LinkGroup[] = [
  {
    category: 'Social',
    links: [
      {
        label: 'Instagram',
        href: 'https://open-session.link/instagram-social',
        icon: '/images/Linkree_instagram_thumbnails.svg',
      },
      {
        label: 'Threads',
        href: 'https://www.threads.com/@opensession.co',
        icon: '/images/Linkree_threads_thumbnails.svg',
      },
      {
        label: 'LinkedIn',
        href: 'https://open-session.link/linkedin-social',
        icon: '/images/Linkree_linkedin_thumbnails.svg',
      },
    ],
  },
  {
    category: 'Content',
    links: [
      {
        label: 'Substack',
        href: 'https://open-session.link/substack-social',
        icon: '/images/Linkree_substack_thumbnails.svg',
      },
      {
        label: 'Medium',
        href: 'https://open-session.link/medium-social',
        icon: '/images/Linkree_medium_thumbnails.svg',
      },
      {
        label: 'YouTube',
        href: 'https://open-session.link/youtube-social',
        icon: '/images/Linkree_youtube_thumbnails.svg',
      },
    ],
  },
  {
    category: 'Design',
    links: [
      {
        label: 'Figma',
        href: 'https://open-session.link/figma-social',
        icon: '/images/Linkree_figma_thumbnails.svg',
      },
      {
        label: 'GitHub',
        href: 'https://github.com/opensesh',
        icon: '/images/Linkree_github_thumbnails.svg',
      },
    ],
  },
]
