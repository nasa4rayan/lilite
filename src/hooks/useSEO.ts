import { useEffect } from 'react'

interface SEOOptions {
  title: string
  description: string
  pathname?: string
  noindex?: boolean
  imagePath?: string
  type?: 'website' | 'article'
}

const DEFAULT_SITE_URL = 'https://www.lilite.site'
const DEFAULT_IMAGE_PATH = '/og-image.png'

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

export function useSEO({ title, description, pathname, noindex = false, imagePath = DEFAULT_IMAGE_PATH, type = 'website' }: SEOOptions) {
  useEffect(() => {
    const siteUrl = ((import.meta.env.VITE_SITE_URL as string | undefined) ?? DEFAULT_SITE_URL).replace(/\/+$/, '')
    const titleWithBrand = title.includes('Lilite') ? title : `${title} | Lilite`
    const currentPath = pathname ?? window.location.pathname
    const normalizedPath = currentPath.startsWith('/') ? currentPath : `/${currentPath}`
    const canonicalUrl = new URL(normalizedPath, siteUrl).toString()
    const imageUrl = toAbsoluteUrl(imagePath, siteUrl)

    document.title = titleWithBrand
    upsertMetaByName('description', description)
    upsertMetaByName('robots', noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large')
    upsertMetaByProperty('og:site_name', 'Lilite')
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
  }, [description, imagePath, noindex, pathname, title, type])
}
