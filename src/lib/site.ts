export const SITE_NAME = 'Lilite'
export const DEFAULT_SITE_URL = 'https://www.lilite.site'
export const DEFAULT_OG_IMAGE_PATH = '/og-image.png'

export const getSiteUrl = () => {
  return ((import.meta.env.VITE_SITE_URL as string | undefined) ?? DEFAULT_SITE_URL).replace(/\/+$/, '')
}

export const toAbsoluteUrl = (value: string, siteUrl = getSiteUrl()) => {
  return new URL(value, siteUrl).toString()
}
