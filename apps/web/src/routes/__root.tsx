import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router"
import { css } from "@kirana-style/core"

import kiranaCss from "@kirana-style/core/stylesheet.css?url"
import { axes } from "@workspace/registry/core/axes"
import {
  documentAttributes,
  readPreviewDesign,
} from "@workspace/registry/core/preview"
import { root } from "@workspace/registry/core/root"
import { page } from "@workspace/registry/styles/page.styles"
import { DirectionProvider } from "@workspace/ui/components/direction"
import { Toaster } from "@workspace/ui/components/toast"
import { TooltipProvider } from "@workspace/ui/components/tooltip"
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
      // the demo's globals.css, a preview's registry reset (each route's head).
      { rel: "stylesheet", href: kiranaCss },
      ...headLinks,
    ],
  }),
  // Before the document renders: the saved colour mode, and on a preview page the design its URL
  // names, so the server writes `<html>` in both and the first paint is already right.
  beforeLoad: ({ location }) => ({
    mode: readThemeMode(),
    preview: location.pathname.startsWith("/preview/")
      ? readPreviewDesign(new URLSearchParams(location.searchStr))
      : null,
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
  const { mode, preview } = Route.useRouteContext()
  if (preview) {
    return (
      <ThemeProvider defaultMode={mode} cookie={THEME_COOKIE}>
        <PreviewDocument design={preview}>{children}</PreviewDocument>
      </ThemeProvider>
    )
  }
  return (
    <DirectionProvider direction="ltr">
      <ThemeProvider defaultMode={mode} cookie={THEME_COOKIE}>
        <ThemedDocument>{children}</ThemedDocument>
      </ThemeProvider>
    </DirectionProvider>
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
        <TooltipProvider>{children}</TooltipProvider>
        <Toaster />
        <Scripts />
      </body>
    </html>
  )
}

/**
 * A preview page's document: the registry's design on `<html>` (its tokens, the anchor the styles
 * read the visual style through, and every axis's attribute, `dir` among them) in the site's colour
 * mode, and none of the demo's providers. The preview route changes the attributes when a framing
 * page sends a new design; React leaves them, as their props do not change.
 */
function PreviewDocument({
  design,
  children,
}: {
  design: NonNullable<ReturnType<typeof Route.useRouteContext>["preview"]>
  children: React.ReactNode
}) {
  const { mode } = useTheme()
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
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
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
