import { useEffect } from 'react'

interface SEOOptions {
  title: string
  description: string
  pathname?: string
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

export function useSEO({ title, description, pathname }: SEOOptions) {
  useEffect(() => {
    const titleWithBrand = title.includes('Lilite') ? title : `${title} | Lilite`
    const currentPath = pathname ?? window.location.pathname
    const canonicalUrl = new URL(currentPath, window.location.origin).toString()

    document.title = titleWithBrand
    upsertMetaByName('description', description)
    upsertMetaByProperty('og:title', titleWithBrand)
    upsertMetaByProperty('og:description', description)
    upsertMetaByProperty('og:url', canonicalUrl)
    upsertMetaByName('twitter:title', titleWithBrand)
    upsertMetaByName('twitter:description', description)
    upsertCanonical(canonicalUrl)
  }, [description, pathname, title])
}
