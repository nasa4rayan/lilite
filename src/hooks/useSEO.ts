import { useEffect } from 'react'
import { DEFAULT_OG_IMAGE_PATH, getSiteUrl, SITE_NAME, toAbsoluteUrl } from '@/lib/site'
import { StructuredData } from '@/lib/structuredData'

interface SEOOptions {
  title: string
  description: string
  pathname?: string
  noindex?: boolean
  imagePath?: string
  type?: 'website' | 'article'
  keywords?: string[]
  structuredData?: StructuredData[]
}

function upsertMetaByName(name: string, content: string) {
  let tag = document.head.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null

  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute('name', name)
    document.head.appendChild(tag)
  }

  tag.setAttribute('content', content)
}

function removeMetaByName(name: string) {
  document.head.querySelector(`meta[name="${name}"]`)?.remove()
}

function upsertMetaByProperty(property: string, content: string) {
  let tag = document.head.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null

  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute('property', property)
    document.head.appendChild(tag)
  }

  tag.setAttribute('content', content)
}

function upsertCanonical(url: string) {
  let link = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null

  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', 'canonical')
    document.head.appendChild(link)
  }

  link.setAttribute('href', url)
}

function syncStructuredData(items: StructuredData[]) {
  document.head
    .querySelectorAll('script[type="application/ld+json"][data-lilite-seo], script[type="application/ld+json"][data-lilite-static-seo]')
    .forEach((node) => node.remove())

  items.forEach((item, index) => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.dataset.liliteSeo = String(index)
    script.text = JSON.stringify(item)
    document.head.appendChild(script)
  })
}

export function useSEO({
  title,
  description,
  pathname,
  noindex = false,
  imagePath = DEFAULT_OG_IMAGE_PATH,
  type = 'website',
  keywords,
  structuredData = [],
}: SEOOptions) {
  useEffect(() => {
    const siteUrl = getSiteUrl()
    const titleWithBrand = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`
    const currentPath = pathname ?? window.location.pathname
    const normalizedPath = currentPath.startsWith('/') ? currentPath : `/${currentPath}`
    const canonicalUrl = new URL(normalizedPath, siteUrl).toString()
    const imageUrl = toAbsoluteUrl(imagePath, siteUrl)
    const robotsContent = noindex
      ? 'noindex, nofollow'
      : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
    const language = document.documentElement.lang === 'fr' ? 'fr' : 'en'
    const locale = language === 'fr' ? 'fr_FR' : 'en_US'

    document.title = titleWithBrand
    upsertMetaByName('description', description)
    upsertMetaByName('application-name', SITE_NAME)
    upsertMetaByName('apple-mobile-web-app-title', SITE_NAME)
    upsertMetaByName('googlebot', robotsContent)
    upsertMetaByName('robots', robotsContent)
    upsertMetaByProperty('og:locale', locale)
    upsertMetaByProperty('og:site_name', SITE_NAME)
    upsertMetaByProperty('og:type', type)
    upsertMetaByProperty('og:title', titleWithBrand)
    upsertMetaByProperty('og:description', description)
    upsertMetaByProperty('og:url', canonicalUrl)
    upsertMetaByProperty('og:image', imageUrl)
    upsertMetaByProperty('og:image:width', '1200')
    upsertMetaByProperty('og:image:height', '630')
    upsertMetaByProperty('og:image:alt', 'Lilite Linux command builder preview')
    upsertMetaByName('twitter:card', 'summary_large_image')
    upsertMetaByName('twitter:title', titleWithBrand)
    upsertMetaByName('twitter:description', description)
    upsertMetaByName('twitter:image', imageUrl)
    upsertMetaByName('twitter:image:alt', 'Lilite Linux command builder preview')
    upsertCanonical(canonicalUrl)

    if (keywords?.length) {
      upsertMetaByName('keywords', keywords.join(', '))
    } else {
      removeMetaByName('keywords')
    }

    syncStructuredData(structuredData)
  }, [description, imagePath, keywords, noindex, pathname, structuredData, title, type])
}
