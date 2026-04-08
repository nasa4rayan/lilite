import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'

const SITE_NAME = 'Lilite'
const SITE_URL = 'https://www.lilite.site'
const BUILD_DATE = new Date().toISOString().slice(0, 10)
const DIST_DIR = path.resolve('dist')
const DISTRO_ROUTES = [
  {
    path: '/distro/arch-based',
    title: 'Arch Family Package Builder | Lilite',
    description:
      'Arch-based distributions use pacman. Select curated packages from official repositories and generate one grouped install command.',
    heading: 'Arch Family Package Builder',
    body: 'Build one clean pacman install command for Arch-based systems using curated packages from official repositories.',
    manager: 'pacman',
  },
  {
    path: '/distro/debian-based',
    title: 'Debian Family Package Builder | Lilite',
    description:
      'Debian-based distributions use apt. Choose commonly used packages and copy one grouped install command for manual execution.',
    heading: 'Debian Family Package Builder',
    body: 'Build one clean apt install command for Debian-based systems using curated packages from official repositories.',
    manager: 'apt',
  },
  {
    path: '/distro/fedora-based',
    title: 'Fedora Family Package Builder | Lilite',
    description:
      'Fedora-based distributions use dnf. Pick useful packages from official repositories and generate one grouped install command.',
    heading: 'Fedora Family Package Builder',
    body: 'Build one clean dnf install command for Fedora-based systems using curated packages from official repositories.',
    manager: 'dnf',
  },
  {
    path: '/distro/opensuse-based',
    title: 'openSUSE Family Package Builder | Lilite',
    description:
      'openSUSE-based distributions use zypper. Pick useful packages from official repositories and generate one grouped install command.',
    heading: 'openSUSE Family Package Builder',
    body: 'Build one clean zypper install command for openSUSE-based systems using curated packages from official repositories.',
    manager: 'zypper',
  },
  {
    path: '/distro/alpine-based',
    title: 'Alpine Family Package Builder | Lilite',
    description:
      'Alpine-based distributions use apk. Pick useful packages from official repositories and generate one grouped install command.',
    heading: 'Alpine Family Package Builder',
    body: 'Build one clean apk install command for Alpine-based systems using curated packages from official repositories.',
    manager: 'apk',
  },
  {
    path: '/distro/ubuntu-based',
    title: 'Ubuntu Family Package Builder | Lilite',
    description:
      'Ubuntu-based distributions use apt. Pick useful packages from official repositories and generate one grouped install command.',
    heading: 'Ubuntu Family Package Builder',
    body: 'Build one clean apt install command for Ubuntu-based systems using curated packages from official repositories.',
    manager: 'apt',
  },
  {
    path: '/distro/kali-based',
    title: 'Kali Family Package Builder | Lilite',
    description:
      'Kali-based distributions use apt. Pick useful packages from official repositories and generate one grouped install command.',
    heading: 'Kali Family Package Builder',
    body: 'Build one clean apt install command for Kali-based systems using curated packages from official repositories.',
    manager: 'apt',
  },
  {
    path: '/distro/manjaro-based',
    title: 'Manjaro Family Package Builder | Lilite',
    description:
      'Manjaro-based distributions use pacman. Pick useful packages from official repositories and generate one grouped install command.',
    heading: 'Manjaro Family Package Builder',
    body: 'Build one clean pacman install command for Manjaro-based systems using curated packages from official repositories.',
    manager: 'pacman',
  },
  {
    path: '/distro/mint-based',
    title: 'Linux Mint Family Package Builder | Lilite',
    description:
      'Linux Mint-based distributions use apt. Pick useful packages from official repositories and generate one grouped install command.',
    heading: 'Linux Mint Family Package Builder',
    body: 'Build one clean apt install command for Linux Mint-based systems using curated packages from official repositories.',
    manager: 'apt',
  },
  {
    path: '/distro/popos-based',
    title: 'Pop!_OS Family Package Builder | Lilite',
    description:
      'Pop!_OS-based distributions use apt. Pick useful packages from official repositories and generate one grouped install command.',
    heading: 'Pop!_OS Family Package Builder',
    body: 'Build one clean apt install command for Pop!_OS-based systems using curated packages from official repositories.',
    manager: 'apt',
  },
  {
    path: '/distro/zorin-based',
    title: 'Zorin Family Package Builder | Lilite',
    description:
      'Zorin-based distributions use apt. Pick useful packages from official repositories and generate one grouped install command.',
    heading: 'Zorin Family Package Builder',
    body: 'Build one clean apt install command for Zorin-based systems using curated packages from official repositories.',
    manager: 'apt',
  },
  {
    path: '/distro/parrot-based',
    title: 'Parrot Family Package Builder | Lilite',
    description:
      'Parrot-based distributions use apt. Pick useful packages from official repositories and generate one grouped install command.',
    heading: 'Parrot Family Package Builder',
    body: 'Build one clean apt install command for Parrot-based systems using curated packages from official repositories.',
    manager: 'apt',
  },
  {
    path: '/distro/endeavouros-based',
    title: 'EndeavourOS Family Package Builder | Lilite',
    description:
      'EndeavourOS-based distributions use pacman. Pick useful packages from official repositories and generate one grouped install command.',
    heading: 'EndeavourOS Family Package Builder',
    body: 'Build one clean pacman install command for EndeavourOS-based systems using curated packages from official repositories.',
    manager: 'pacman',
  },
  {
    path: '/distro/garuda-based',
    title: 'Garuda Family Package Builder | Lilite',
    description:
      'Garuda-based distributions use pacman. Pick useful packages from official repositories and generate one grouped install command.',
    heading: 'Garuda Family Package Builder',
    body: 'Build one clean pacman install command for Garuda-based systems using curated packages from official repositories.',
    manager: 'pacman',
  },
  {
    path: '/distro/nobara-based',
    title: 'Nobara Family Package Builder | Lilite',
    description:
      'Nobara-based distributions use dnf. Pick useful packages from official repositories and generate one grouped install command.',
    heading: 'Nobara Family Package Builder',
    body: 'Build one clean dnf install command for Nobara-based systems using curated packages from official repositories.',
    manager: 'dnf',
  },
]

const faqItems = [
  {
    question: 'Does Lilite install software automatically?',
    answer:
      'No. Lilite only generates commands. You manually copy, review, and run them in your terminal.',
  },
  {
    question: 'Where do package names come from?',
    answer:
      'Lilite uses local typed datasets that reference package names from official repositories for each supported distribution family.',
  },
  {
    question: 'Can Lilite generate scripts?',
    answer:
      'No. Lilite intentionally outputs one grouped install command to keep behavior transparent and easy to inspect.',
  },
  {
    question: 'Are third-party package sources supported?',
    answer:
      'No. Flatpak, Snap, AUR, COPR, AppImage, and other external sources are intentionally excluded.',
  },
]

const absoluteUrl = (pathname) => new URL(pathname, SITE_URL).toString()

const createBreadcrumbSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    item: item.url,
    name: item.name,
    position: index + 1,
  })),
})

const routes = [
  {
    path: '/',
    title: 'Lilite | Linux Package Command Builder',
    description:
      'Lilite is a Linux command builder that helps you generate one grouped install command using official Arch, Debian, and Fedora repositories.',
    keywords:
      'linux command builder, linux install command generator, apt install command, pacman install command, dnf install command, lilite',
    heading: 'Lilite Linux Package Command Builder',
    body:
      'Select packages from official repositories and generate one grouped Linux install command without hidden execution.',
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        inLanguage: ['en', 'fr'],
        name: SITE_NAME,
        url: absoluteUrl('/'),
      },
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        applicationCategory: 'DeveloperApplication',
        description:
          'Linux command builder that generates one grouped install command from official repositories.',
        name: SITE_NAME,
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        operatingSystem: 'Linux',
        url: absoluteUrl('/'),
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqItems.map((item) => ({
          '@type': 'Question',
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
          name: item.question,
        })),
      },
    ],
  },
  {
    path: '/get-started',
    title: 'Choose a Distribution Family | Lilite',
    description:
      'Select your Linux distribution family and generate one grouped install command with the right package manager.',
    keywords:
      'linux distro chooser, linux distribution family, package manager selector, apt pacman dnf zypper apk, choose linux distro package manager',
    heading: 'Choose Your Distribution Family',
    body:
      'Pick your Linux family to generate install commands with the correct package manager and package names.',
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        description:
          'Select your Linux distribution family and generate one grouped install command with the right package manager.',
        name: 'Choose Your Distribution Family',
        url: absoluteUrl('/get-started'),
      },
      createBreadcrumbSchema([
        { name: SITE_NAME, url: absoluteUrl('/') },
        { name: 'Choose Your Distribution Family', url: absoluteUrl('/get-started') },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: DISTRO_ROUTES.map((route, index) => ({
          '@type': 'ListItem',
          name: route.heading.replace(' Package Builder', ''),
          position: index + 1,
          url: absoluteUrl(route.path),
        })),
        name: 'Choose Your Distribution Family',
        url: absoluteUrl('/get-started'),
      },
    ],
  },
  ...DISTRO_ROUTES.map((route) => ({
    ...route,
    keywords: `${route.manager} install command, linux package builder, official repository packages, ${route.heading.toLowerCase()}, ${route.manager} package manager`,
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        description: route.description,
        name: route.heading,
        url: absoluteUrl(route.path),
      },
      createBreadcrumbSchema([
        { name: SITE_NAME, url: absoluteUrl('/') },
        { name: 'Choose Your Distribution Family', url: absoluteUrl('/get-started') },
        { name: route.heading.replace(' Package Builder', ''), url: absoluteUrl(route.path) },
      ]),
    ],
  })),
]

const escapeHtml = (value) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

const replaceTag = (html, pattern, replacement) => {
  if (!pattern.test(html)) {
    return html
  }

  return html.replace(pattern, replacement)
}

const replaceMetaByName = (html, name, content) =>
  replaceTag(
    html,
    new RegExp(`<meta(?=[^>]*name="${escapeRegExp(name)}")[^>]*content="[^"]*"[^>]*\\/?>`, 'i'),
    `<meta name="${name}" content="${escapeHtml(content)}" />`,
  )

const replaceMetaByProperty = (html, property, content) =>
  replaceTag(
    html,
    new RegExp(`<meta(?=[^>]*property="${escapeRegExp(property)}")[^>]*content="[^"]*"[^>]*\\/?>`, 'i'),
    `<meta property="${property}" content="${escapeHtml(content)}" />`,
  )

const renderStructuredData = (schemas) =>
  schemas
    .map(
      (schema) =>
        `    <script type="application/ld+json" data-lilite-static-seo="true">${JSON.stringify(
          schema,
        ).replace(/</g, '\\u003c')}</script>`,
    )
    .join('\n')

const renderNoscript = (route) => {
  const links =
    route.path === '/get-started'
      ? DISTRO_ROUTES.slice(0, 6)
          .map(
            (item) =>
              `<li><a href="${escapeHtml(item.path)}">${escapeHtml(
                item.heading.replace(' Package Builder', ''),
              )}</a></li>`,
          )
          .join('')
      : `<li><a href="/">Home</a></li><li><a href="/get-started">Choose a Distro</a></li>`

  return `    <noscript id="lilite-noscript">
      <section style="margin:2rem auto;max-width:60rem;padding:0 1rem;font-family:system-ui,sans-serif">
        <h1>${escapeHtml(route.heading)}</h1>
        <p>${escapeHtml(route.body)}</p>
        <ul>${links}</ul>
      </section>
    </noscript>`
}

const buildRouteHtml = (baseHtml, route) => {
  const canonicalUrl = absoluteUrl(route.path)
  const structuredDataMarkup = renderStructuredData(route.schemas)
  let html = baseHtml

  html = replaceTag(html, /<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(route.title)}</title>`)
  html = replaceMetaByName(html, 'description', route.description)
  html = replaceMetaByName(html, 'keywords', route.keywords)
  html = replaceMetaByName(
    html,
    'robots',
    'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
  )
  html = replaceMetaByName(
    html,
    'googlebot',
    'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
  )
  html = replaceTag(
    html,
    /<link rel="canonical" href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${canonicalUrl}" />`,
  )
  html = replaceMetaByProperty(html, 'og:url', canonicalUrl)
  html = replaceMetaByProperty(html, 'og:title', route.title)
  html = replaceMetaByProperty(html, 'og:description', route.description)
  html = replaceMetaByName(html, 'twitter:title', route.title)
  html = replaceMetaByName(html, 'twitter:description', route.description)
  html = html.replace('<!-- lilite-static-seo -->', structuredDataMarkup)
  html = html.replace(
    /<noscript id="lilite-noscript">[\s\S]*?<\/noscript>/,
    renderNoscript(route),
  )

  return html
}

const writeRouteHtml = (route, html) => {
  if (route.path === '/') {
    writeFileSync(path.join(DIST_DIR, 'index.html'), html)
    return
  }

  const outputDir = path.join(DIST_DIR, route.path.replace(/^\/+/, ''))
  mkdirSync(outputDir, { recursive: true })
  writeFileSync(path.join(outputDir, 'index.html'), html)
}

const baseHtml = readFileSync(path.join(DIST_DIR, 'index.html'), 'utf8')

routes.forEach((route) => {
  writeRouteHtml(route, buildRouteHtml(baseHtml, route))
})

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route, index) => `  <url>
    <loc>${absoluteUrl(route.path)}</loc>
    <lastmod>${BUILD_DATE}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${index === 0 ? '1.0' : route.path === '/get-started' ? '0.9' : '0.8'}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`

writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemapXml)
writeFileSync(
  path.join(DIST_DIR, 'robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${absoluteUrl('/sitemap.xml')}\n`,
)
