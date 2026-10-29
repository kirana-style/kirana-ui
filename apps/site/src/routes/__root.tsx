import { useEffect } from "react"
import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router"
import { css } from "@kirana-style/core"

import kiranaCss from "@kirana-style/core/stylesheet.css?url"
import designScript from "virtual:design-script"

import { axes } from "@workspace/registry/core/axes"
import { usePageDesign } from "@/lib/page-design"
import { loadDesignFonts } from "@/lib/design-fonts"
import { documentAttributes } from "@workspace/registry/core/preview"

import { root } from "@workspace/registry/core/root"
import { page } from "@workspace/registry/styles/page.styles"
import { ThemeProvider, useTheme } from "@workspace/ui/theme/theme-provider"
import { theme } from "@workspace/ui/theme/semantic"
import { fontFamily } from "@workspace/ui/tokens/typography"
import {
  ThemeColorMeta,
  headLinks,
  headMeta,
  siteTitle,
} from "@workspace/shell/head"
import {
  THEME_SCRIPT,
  themeDocumentProps,
} from "@workspace/shell/theme-document"
import { THEME_COOKIE, readThemeMode } from "@workspace/shell/theme-mode"

const styles = {
  body: css({
    // The theme's ground colour. The global stylesheet deliberately names no
    // tokens, so the document's own colours are applied here instead.
    backgroundColor: theme.background,
    color: theme.foreground,
    fontFamily: fontFamily.sans,
  }),
}

export const Route = createRootRoute({
  head: () => ({
    meta: [...headMeta, { title: siteTitle() }],
    links: [
      // First, so its `@layer reset, base, kirana` statement fixes the layer
      // order before a page's own stylesheet opens the reset and base layers:
      // the demo's globals.css, the registry's reset on every other page (each route's head).
      { rel: "stylesheet", href: kiranaCss },
      ...headLinks,
    ],
  }),
  // Before the document renders: the saved colour mode, and which document the page takes. A
  // prerendered page is written in the system mode and the default design; the inline script puts
  // the saved mode, and on a preview the URL's design, on `<html>` before the first paint.
  beforeLoad: ({ location }) => ({
    mode: readThemeMode(),
    document:
      location.pathname === "/demo"
        ? ("demo" as const)
        : location.pathname.startsWith("/preview/")
          ? ("preview" as const)
          : ("site" as const),
  }),
  notFoundComponent: NotFound,
  shellComponent: RootDocument,
})

function NotFound() {
  return (
    <main>
      <h1>404</h1>
      <p>The requested page could not be found.</p>
    </main>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  const { mode, document } = Route.useRouteContext()
  if (document !== "demo") {
    return (
      <ThemeProvider defaultMode={mode} cookie={THEME_COOKIE}>
        <RegistryDocument script={`${THEME_SCRIPT};${designScript}`}>
          {children}
        </RegistryDocument>
      </ThemeProvider>
    )
  }
  return (
    <ThemeProvider defaultMode={mode} cookie={THEME_COOKIE}>
      <ThemedDocument>{children}</ThemedDocument>
    </ThemeProvider>
  )
}

function ThemedDocument({ children }: { children: React.ReactNode }) {
  const { mode } = useTheme()

  // `color-scheme` goes on the root element, not the body: the root decides the
  // page's scrollbars and canvas, and an iframe whose root scheme differs from
  // the frame element's gets an opaque light backdrop behind the page.
  // A prerendered page hydrates in the system mode while THEME_SCRIPT has already set the saved
  // one, until the provider reads the cookie: React keeps the attributes it finds.
  return (
    <html
      lang="en"
      data-mode={mode}
      {...themeDocumentProps(mode)}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <HeadContent />
        <ThemeColorMeta />
      </head>
      <body sx={styles.body}>
        {children}
        <Scripts />
      </body>
    </html>
  )
}

/**
 * The document of the site's pages and of every preview: the registry's design on `<html>` (its
 * tokens, the anchor the styles read the visual style through, and every axis's attribute, `dir`
 * among them) in the site's colour mode, and none of the demo's providers. The design is the URL's
 * or the reader's saved one (`usePageDesign`); a choice in the customizer, or a framing page's new
 * design on a preview, changes it, and so the attributes.
 */
function RegistryDocument({
  script,
  children,
}: {
  /** What runs before the first paint: the colour mode and the page's design. */
  script: string
  children: React.ReactNode
}) {
  const { mode } = useTheme()
  const design = usePageDesign()
  // The design's families, loaded once it names them: the page links Inter and Geist only.
  const { font, fontHeading } = design.system
  useEffect(() => {
    void loadDesignFonts({ font, fontHeading })
  }, [font, fontHeading])
  return (
    <html
      lang="en"
      data-mode={mode}
      {...documentAttributes(design)}
      {...themeDocumentProps(mode)}
      sx={[root, axes.anchor]}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: script }} />
        <HeadContent />
        <ThemeColorMeta />
      </head>
      <body sx={page.body}>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
