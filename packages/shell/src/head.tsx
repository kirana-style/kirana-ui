/**
 * The `<head>` every app shares: the Kirana mark as its icons (each app's `public/` holds the same
 * files as the Kirana site's), the web manifest, a description, and the browser chrome in the
 * page's ground colour per scheme.
 */

export const SITE_NAME = "Kirana UI"

/** `<title>` for a page of an app: "Blocks · Kirana UI", or the site's name alone. */
export function siteTitle(page?: string) {
  return page ? `${page} · ${SITE_NAME}` : `${SITE_NAME}: shadcn/ui on Kirana`
}

export const headMeta = [
  { charSet: "utf-8" },
  { name: "viewport", content: "width=device-width, initial-scale=1" },
  {
    name: "description",
    content:
      "The shadcn/ui components, blocks and examples, styled with Kirana: typed style objects compiled to one atomic stylesheet, no Tailwind.",
  },
]

export const headLinks = [
  { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
  { rel: "icon", href: "/favicon.ico", sizes: "48x48" },
  { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
  { rel: "manifest", href: "/manifest.json" },
]

/**
 * The browser chrome in `theme.background` per scheme: white, and `oklch(0.145 0 0)` in dark.
 * Rendered in `<head>` directly, after `<HeadContent />`: TanStack Router keeps one `meta` per
 * `name`, so a pair that differs only in `media` would lose its light half through `head()`.
 */
export function ThemeColorMeta() {
  return (
    <>
      <meta
        name="theme-color"
        content="#ffffff"
        media="(prefers-color-scheme: light)"
      />
      <meta
        name="theme-color"
        content="#0a0a0a"
        media="(prefers-color-scheme: dark)"
      />
    </>
  )
}
