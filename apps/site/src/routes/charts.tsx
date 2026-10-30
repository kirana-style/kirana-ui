import { Link, Outlet, createFileRoute } from "@tanstack/react-router"
import { css } from "@kirana-style/core"

import { ChartsCombination } from "@/components/charts/chart-grid"
import { ChartsNav } from "@/components/charts/charts-nav"
import { Customizer } from "@/components/customizer"
import { SiteDocsProvider } from "@/components/docs-config"
import { PrimaryCta, SecondaryCta } from "@/components/cta"
import { Accent, Page, PageHero } from "@/components/page/page"
import { Rail } from "@/components/page/rail"
// The reset and fonts, with the code colours the code sheets need.
import docsCss from "@/styles/docs.css?url"
import { breakpoint, space } from "@workspace/registry/core/scales"
import { theme } from "@workspace/registry/core/tokens"

const DESCRIPTION =
  "A collection of ready-to-use chart components built with TanStack Charts. From basic charts to rich data displays, in every style and on every base."

/**
 * `/charts` and `/charts/<type>`: Kirana's page hero by still water, then as upstream's: the chart types in a row of
 * their own with the framework and base at its end (held under the header as the page scrolls), then the type's charts in a grid
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
    paddingInline: { base: space[2], [breakpoint.md]: space[4] },
    paddingBlock: space[2],
  }),
  // The row's rule runs across the page, as every section's does. It stays under the header while
  // the charts scroll by, frosted as the header is (the blur on a layer of its own, so the row
  // does not hold its popups).
  band: css({
    position: "sticky",
    top: `calc(${space[16]} + 1px)`,
    zIndex: 30,
    isolation: "isolate",
    scrollMarginTop: `calc(${space[16]} + 1px)`,
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: theme.border,
    "::before": {
      content: "''",
      position: "absolute",
      inset: 0,
      zIndex: -1,
      backgroundColor: `color-mix(in oklab, ${theme.background} 72%, transparent)`,
      backdropFilter: "blur(14px) saturate(1.5)",
    },
  }),
  section: css({
    paddingInline: { base: space[4], [breakpoint.md]: space[6] },
    paddingBlock: { base: space[6], [breakpoint.md]: space[10] },
  }),
}

function Charts() {
  return (
    <SiteDocsProvider>
      <Page scene="still-water">
        <PageHero
          label="Charts"
          title={
            <>
              Beautiful charts <Accent>and graphs.</Accent>
            </>
          }
          lede={DESCRIPTION}
          actions={
            <>
              <PrimaryCta render={<a href="#charts" />}>
                Browse charts
              </PrimaryCta>
              <SecondaryCta
                render={
                  <Link to="/docs/$" params={{ _splat: "components/chart" }} />
                }
              >
                Documentation
              </SecondaryCta>
            </>
          }
        />
        <div id="charts" sx={styles.band}>
          <Rail sx={styles.nav}>
            <ChartsNav />
            <ChartsCombination />
          </Rail>
        </div>
        <section>
          <Rail sx={styles.section}>
            <Outlet />
          </Rail>
        </section>
      </Page>
      <Customizer />
    </SiteDocsProvider>
  )
}
