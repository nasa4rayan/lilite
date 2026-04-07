import { useEffect } from 'react'

interface SEOOptions {
  title: string
  description: string
  pathname?: string
  noindex?: boolean
  imagePath?: string
  type?: 'website' | 'article'
  keywords?: string[]
}

const DEFAULT_SITE_URL = 'https://www.lilite.site'
const DEFAULT_IMAGE_PATH = '/og-image.png'
const DEFAULT_KEYWORDS = [
  'lilite',
  'ninite for linux',
  'ninite alternative for linux',
  'linux command builder',
  'linux app installer',
  'linux apps',
  'pro linux apps',
  'linux software installer',
  'package installer command',
  'apt install command',
  'pacman install command',
  'dnf install command',
  'zypper install command',
  'apk add command',
  'arch linux installer',
  'debian package installer',
  'fedora package installer',
  'pop os app installer',
  'pop!_os package installer',
  'pop os linux',
  'cachyos app installer',
  'cachyos linux',
  'cachyos package manager',
]

function upsertMetaByName(name: string, content: string) {
  let tag = document.head.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null

  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute('name', name)
    document.head.appendChild(tag)
  }

  tag.setAttribute('content', content)
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

function toAbsoluteUrl(value: string, siteUrl: string) {
  return new URL(value, siteUrl).toString()
}

export function useSEO({
  title,
  description,
  pathname,
  noindex = false,
  imagePath = DEFAULT_IMAGE_PATH,
  type = 'website',
  keywords = [],
}: SEOOptions) {
  useEffect(() => {
    const siteUrl = ((import.meta.env.VITE_SITE_URL as string | undefined) ?? DEFAULT_SITE_URL).replace(/\/+$/, '')
    const titleWithBrand = title.includes('Lilite') ? title : `${title} | Lilite`
    const currentPath = pathname ?? window.location.pathname
    const normalizedPath = currentPath.startsWith('/') ? currentPath : `/${currentPath}`
    const canonicalUrl = new URL(normalizedPath, siteUrl).toString()
    const imageUrl = toAbsoluteUrl(imagePath, siteUrl)
    const allKeywords = [...new Set([...DEFAULT_KEYWORDS, ...keywords.map((value) => value.trim().toLowerCase()).filter(Boolean)])]
    const keywordsContent = allKeywords.join(', ')

    document.title = titleWithBrand
    upsertMetaByName('description', description)
    upsertMetaByName('keywords', keywordsContent)
    upsertMetaByName('robots', noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large')
    upsertMetaByName('application-name', 'Lilite')
    upsertMetaByName('apple-mobile-web-app-title', 'Lilite')
    upsertMetaByProperty('og:site_name', 'Lilite')
    upsertMetaByProperty('og:locale', 'en_US')
    upsertMetaByProperty('og:type', type)
    upsertMetaByProperty('og:title', titleWithBrand)
    upsertMetaByProperty('og:description', description)
    upsertMetaByProperty('og:url', canonicalUrl)
    upsertMetaByProperty('og:image', imageUrl)
    upsertMetaByProperty('og:image:alt', 'Lilite Linux command builder preview')
    upsertMetaByName('twitter:card', 'summary_large_image')
    upsertMetaByName('twitter:title', titleWithBrand)
    upsertMetaByName('twitter:description', description)
    upsertMetaByName('twitter:image', imageUrl)
    upsertCanonical(canonicalUrl)
  }, [description, imagePath, keywords, noindex, pathname, title, type])
}
