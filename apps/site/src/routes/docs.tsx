import { Outlet, createFileRoute, useRouterState } from "@tanstack/react-router"

import { Customizer } from "@/components/customizer"
import { Brand, HeaderActions } from "@/components/site-header"
import { SiteDocsProvider } from "@/components/docs-config"
import docsCss from "@/styles/docs.css?url"
import { DocsLayout } from "@workspace/docs-ui/docs-layout.tsx"
import { ThemeMenu } from "@workspace/docs-ui/theme-menu.tsx"

/**
 * The documentation chrome, for `/docs` and everything under it: docs-ui's frame with the site's
 * brand, then the colour mode, GitHub, the heart and Create, as the Kirana site's docs keep their
 * bar to the brand and its actions; the site's menus are on its other pages, the docs' own sections
 * are the tab row. A layout route rather than a wrapper inside the page,
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
        actions={
          <>
            <ThemeMenu />
            <HeaderActions />
          </>
        }
      >
        <Outlet />
      </DocsLayout>
      <Customizer />
    </SiteDocsProvider>
  )
}
