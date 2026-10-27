import {
  Link,
  Outlet,
  createFileRoute,
  useRouterState,
} from "@tanstack/react-router"
import { css, props as styleProps } from "@kirana-style/core"

import { Customizer } from "@/components/customizer"
import { NewButton, REPOSITORY } from "@/components/site-header"
import { SITE_LINKS, SiteDocsProvider } from "@/components/docs-config"
import docsCss from "@/styles/docs.css?url"
import {
  breakpoint,
  fontSize,
  fontWeight,
} from "@workspace/registry/core/scales"
import { theme } from "@workspace/registry/core/tokens"
import { Button } from "@workspace/registry/bases/react-base/ui/button"
import { DocsLayout } from "@workspace/docs-ui/docs-layout.tsx"
import { ThemeMenu } from "@workspace/docs-ui/theme-menu.tsx"

const styles = {
  brand: css({
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    color: theme.foreground,
    textDecorationLine: "none",
  }),
  // New is a tab from lg up; below it, where the tabs are in the menu, it is in the bar.
  narrow: css({ display: { base: "contents", [breakpoint.lg]: "none" } }),
}

/**
 * The documentation chrome, for `/docs` and everything under it: docs-ui's frame with the site's
 * name, the GitHub link and the colour mode, and Blocks and New as tabs after Registry, as the site's header has it. A layout route rather than a wrapper inside the page,
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
        logo={
          <Link to="/" {...styleProps(styles.brand)}>
            kirana/ui
          </Link>
        }
        actions={
          <>
            <Button
              variant="ghost"
              size="sm"
              render={<a href={REPOSITORY} />}
              nativeButton={false}
            >
              GitHub
            </Button>
            <ThemeMenu />
            <span sx={styles.narrow}>
              <NewButton />
            </span>
          </>
        }
        links={SITE_LINKS}
      >
        <Outlet />
      </DocsLayout>
      <Customizer />
    </SiteDocsProvider>
  )
}
