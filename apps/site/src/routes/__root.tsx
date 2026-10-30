import { useEffect } from "react"
import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router"

import kiranaCss from "@kirana-style/core/stylesheet.css?url"
import designScript from "virtual:design-script"

import { axes } from "@workspace/registry/core/axes"
import { usePageDesign } from "@/lib/page-design"
import { loadDesignFonts } from "@/lib/design-fonts"
import { documentAttributes } from "@workspace/registry/core/preview"

import { root } from "@workspace/registry/core/root"
import { page } from "@workspace/registry/styles/page.styles"
import { ThemeProvider, useTheme } from "@workspace/shell/theme-provider"
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

export const Route = createRootRoute({
  head: () => ({
    meta: [...headMeta, { title: siteTitle() }],
    links: [
      // First, so its `@layer reset, base, kirana` statement fixes the layer
      // order before a page's own stylesheet opens the reset and base layers:
      // the registry's reset (each route's head).
      { rel: "stylesheet", href: kiranaCss },
      ...headLinks,
    ],
  }),
  // Before the document renders: the saved colour mode. A prerendered page is written in the
  // system mode and the default design; the inline script puts the saved mode, and on a preview the
  // URL's design, on `<html>` before the first paint.
  beforeLoad: () => ({ mode: readThemeMode() }),
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
  const { mode } = Route.useRouteContext()
  return (
    <ThemeProvider defaultMode={mode} cookie={THEME_COOKIE}>
      <RegistryDocument script={`${THEME_SCRIPT};${designScript}`}>
        {children}
      </RegistryDocument>
    </ThemeProvider>
  )
}

/**
 * The document of the site's pages and of every preview: the registry's design on `<html>` (its
 * tokens, the anchor the styles read the visual style through, and every axis's attribute, `dir`
 * among them) in the site's colour mode. The design is the URL's or the reader's saved one
 * (`usePageDesign`); a choice in the customizer, or a framing page's new design on a preview,
 * changes it, and so the attributes.
 */
function RegistryDocument({
  script,
  children,
}: {
  /** What runs before the first paint: the colour mode and the page's design. */
  script: string
  children: React.ReactNode
}) {
  // `color-scheme` goes on the root element, not the body: the root decides the page's scrollbars
  // and canvas, and an iframe whose root scheme differs from the frame element's gets an opaque
  // light backdrop behind the page. A prerendered page hydrates in the system mode while
  // THEME_SCRIPT has already set the saved one, until the provider reads the cookie: React keeps
  // the attributes it finds.
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
