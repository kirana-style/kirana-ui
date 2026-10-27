import { Link, Outlet, createFileRoute } from "@tanstack/react-router"
import { css } from "@kirana-style/core"

import { ChartsCombination } from "@/components/charts/chart-grid"
import { ChartsNav } from "@/components/charts/charts-nav"
import { Customizer } from "@/components/customizer"
import { SiteDocsProvider } from "@/components/docs-config"
import { PageHeader } from "@/components/page-header"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
// The reset and fonts, with the code colours the code sheets need.
import docsCss from "@/styles/docs.css?url"
import { breakpoint, space } from "@workspace/registry/core/scales"
import { theme } from "@workspace/registry/core/tokens"
import { Button } from "@workspace/registry/bases/react-base/ui/button"

const TITLE = "Beautiful Charts & Graphs"
const DESCRIPTION =
  "A collection of ready-to-use chart components built with TanStack Charts. From basic charts to rich data displays, in every style and on every base."

/**
 * `/charts` and `/charts/<type>`, as upstream's: the page's header, the chart types in a row of
 * their own with the framework and base at its end, then the type's charts in a grid
 * (`components/charts/`). The design is the site's, so the customizer changes every chart at once.
 */
export const Route = createFileRoute("/charts")({
  head: () => ({
    meta: [
      { title: "Charts · kirana/ui" },
      { name: "description", content: DESCRIPTION },
    ],
    links: [{ rel: "stylesheet", href: docsCss }],
  }),
  component: Charts,
})

const styles = {
  // `PageNav`: the types, the framework and base at the row's end.
  nav: css({
    display: "flex",
    alignItems: "center",
    gap: space[4],
    marginInline: "auto",
    maxWidth: "80rem",
    paddingInline: { base: space[2], [breakpoint.md]: space[4] },
    paddingBlock: space[2],
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: theme.border,
  }),
  section: css({
    marginInline: "auto",
    maxWidth: "80rem",
    paddingInline: { base: space[4], [breakpoint.md]: space[6] },
    paddingBlock: { base: space[6], [breakpoint.md]: space[10] },
  }),
}

function Charts() {
  return (
    <SiteDocsProvider>
      <SiteHeader />
      <main>
        <PageHeader
          heading={TITLE}
          description={DESCRIPTION}
          actions={
            <>
              <Button render={<a href="#charts" />} nativeButton={false}>
                Browse Charts
              </Button>
              <Button
                variant="secondary"
                render={
                  <Link to="/docs/$" params={{ _splat: "components/chart" }} />
                }
                nativeButton={false}
              >
                Documentation
              </Button>
            </>
          }
        />
        <div id="charts" sx={styles.nav}>
          <ChartsNav />
          <ChartsCombination />
        </div>
        <section sx={styles.section}>
          <Outlet />
        </section>
      </main>
      <SiteFooter />
      <Customizer />
    </SiteDocsProvider>
  )
}
