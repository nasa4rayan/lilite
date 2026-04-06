import { SITE_NAME } from '@/lib/site'

export type StructuredData = Record<string, unknown>

interface BreadcrumbItem {
  name: string
  url: string
}

interface CollectionPageOptions {
  description: string
  name: string
  url: string
}

interface FAQItem {
  answer: string
  question: string
}

interface ItemListEntry {
  name: string
  url: string
}

interface ItemListOptions {
  items: ItemListEntry[]
  name: string
  url: string
}

export const createWebSiteSchema = (siteUrl: string): StructuredData => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  inLanguage: ['en', 'fr'],
  name: SITE_NAME,
  url: `${siteUrl}/`,
})

export const createSoftwareApplicationSchema = (
  siteUrl: string,
  description: string,
  language: string,
): StructuredData => ({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  applicationCategory: 'DeveloperApplication',
  description,
  inLanguage: language,
  name: SITE_NAME,
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  operatingSystem: 'Linux',
  url: `${siteUrl}/`,
})

export const createFAQSchema = (items: FAQItem[]): StructuredData => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((item) => ({
    '@type': 'Question',
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
    name: item.question,
  })),
})

export const createBreadcrumbSchema = (items: BreadcrumbItem[]): StructuredData => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    item: item.url,
    name: item.name,
    position: index + 1,
  })),
})

export const createCollectionPageSchema = ({
  description,
  name,
  url,
}: CollectionPageOptions): StructuredData => ({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  description,
  name,
  url,
})

export const createItemListSchema = ({ items, name, url }: ItemListOptions): StructuredData => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    name: item.name,
    position: index + 1,
    url: item.url,
  })),
  name,
  url,
})
