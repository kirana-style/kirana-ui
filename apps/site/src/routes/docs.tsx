import { Outlet, createFileRoute, useRouterState } from "@tanstack/react-router"

import { Customizer } from "@/components/customizer"
import { DesktopNav, MobileNav } from "@/components/header/site-nav"
import { Brand, CREATE, HeaderActions } from "@/components/site-header"
import { SiteDocsProvider } from "@/components/docs-config"
import docsCss from "@/styles/docs.css?url"
import { DocsLayout } from "@workspace/docs-ui/docs-layout.tsx"
import { css } from "@kirana-style/core"
import { breakpoint } from "@workspace/registry/core/scales"
import { ThemeMenu } from "@workspace/docs-ui/theme-menu.tsx"

const styles = {
  // The docs' brand column is the sidebar's width, so the links and menus fit beside it from xl;
  // between lg and xl they are the site's sheet, and below lg the docs' own menu holds the docs.
  nav: css({ display: { "*": null, base: "none", [breakpoint.xl]: "flex" } }),
  sheet: css({
    display: {
      "*": null,
      base: "none",
      [breakpoint.lg]: "inline-flex",
      [breakpoint.xl]: "none",
    },
  }),
}

/**
 * The documentation chrome, for `/docs` and everything under it: docs-ui's frame with the site's
 * brand and its links and menus after it, the colour mode, GitHub, the heart and Create, as the site's header
 * has them; the docs' own sections are the tab row. A layout route rather than a wrapper inside the page,
 * so the sidebar keeps its scroll position and open sections between pages.
 */
export const Route = createFileRoute("/docs")({
  head: () => ({ links: [{ rel: "stylesheet", href: docsCss }] }),
  component: Docs,
})

function Docs() {
  const path = useRouterState({ select: (state) => state.location.pathname })
  const current = path.replace(/\/+$/, "") || "/docs"
  return (
    <SiteDocsProvider>
      <DocsLayout
        current={current}
        logo={<Brand />}
        nav={<DesktopNav sx={styles.nav} />}
        actions={
          <>
            <ThemeMenu />
            <HeaderActions />
            <MobileNav extra={[CREATE]} sx={styles.sheet} />
          </>
        }
      >
        <Outlet />
      </DocsLayout>
      <Customizer />
    </SiteDocsProvider>
  )
}
