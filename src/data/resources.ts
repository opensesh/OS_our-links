export interface Resource {
  id: string
  title: string
  description: string
  href: string
  thumbnail?: string
}

export const freeResources: Resource[] = [
  {
    id: 'brand-design-system',
    title: 'Brand Design System',
    description: 'Complete design tokens, components, and guidelines',
    href: '#brand-design-system',
    thumbnail: '/images/3D Logo_rotation_square_compressed.gif',
  },
  {
    id: 'resource-universe',
    title: 'Resource Universe',
    description: 'Curated collection of design tools and resources',
    href: '#resource-universe',
    thumbnail: '/images/3D Logo_rotation_square_compressed.gif',
  },
  {
    id: 'portfolio',
    title: 'Portfolio',
    description: 'Case studies and project showcases',
    href: '#portfolio',
    thumbnail: '/images/3D Logo_rotation_square_compressed.gif',
  },
]
