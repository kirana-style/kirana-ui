import { Link, Outlet, createFileRoute } from "@tanstack/react-router"
import { css } from "@kirana-style/core"

import { LISTED_CATEGORIES, BlocksNav } from "@/components/blocks/blocks-nav"
import { Customizer } from "@/components/customizer"
import { SiteDocsProvider } from "@/components/docs-config"
import { PrimaryCta, SecondaryCta } from "@/components/cta"
import { Accent, Page, PageHero } from "@/components/page/page"
import { Rail } from "@/components/page/rail"
// The reset and fonts, with the code colours the viewers need for their code.
import docsCss from "@/styles/docs.css?url"
import { breakpoint, space } from "@workspace/registry/core/scales"
import { theme } from "@workspace/registry/core/tokens"
import { Button } from "@workspace/registry/bases/react-base/ui/button"

const DESCRIPTION =
  "Clean, modern building blocks, in every style and on every base. Install them into your project with kirana-style ui or shadcn/ui's CLI."

/**
 * `/blocks` and `/blocks/<category>`: Kirana's page hero in the rock garden (many stones, one
 * garden), then as upstream's: the categories in a row of
 * their own, then each block in its viewer (`components/blocks/`) on a soft ground. The design is
 * the site's, so the customizer at the bottom changes every block's frame at once.
 */
export const Route = createFileRoute("/blocks")({
  head: () => ({
    meta: [
      { title: "Blocks · kirana/ui" },
      { name: "description", content: DESCRIPTION },
    ],
    links: [{ rel: "stylesheet", href: docsCss }],
  }),
  component: Blocks,
})

const styles = {
  // `PageNav`: the categories, and a link to every block at the row's end.
  nav: css({
    display: "flex",
    alignItems: "center",
    gap: space[4],
    paddingInline: { base: space[2], [breakpoint.md]: space[4] },
    paddingBlock: space[2],
  }),
  // The row's rule runs across the page, as every section's does.
  band: css({
    scrollMarginTop: space[16],
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: theme.border,
  }),
  all: css({
    display: { base: "none", [breakpoint.lg]: "inline-flex" },
    marginInlineStart: "auto",
  }),
  // `section-soft md:py-12`: the blocks on the muted ground, under the navigation.
  section: css({
    backgroundColor: `light-dark(color-mix(in oklab, ${theme.muted} 50%, ${theme.background}), ${theme.background})`,
    paddingBlock: { base: space[6], [breakpoint.md]: space[12] },
  }),
  list: css({
    display: "flex",
    flexDirection: "column",
    gap: { base: space[12], [breakpoint.md]: space[24] },
    paddingInline: { base: space[4], [breakpoint.md]: space[6] },
  }),
}

function Blocks() {
  const first = LISTED_CATEGORIES[0]
  return (
    <SiteDocsProvider>
      <Page scene="rock-garden">
        <PageHero
          label="Blocks"
          title={
            <>
              Building blocks <Accent>for the web.</Accent>
            </>
          }
          lede={DESCRIPTION}
          actions={
            <>
              <PrimaryCta render={<a href="#blocks" />}>
                Browse blocks
              </PrimaryCta>
              <SecondaryCta
                render={<Link to="/docs/$" params={{ _splat: "components" }} />}
              >
                View components
              </SecondaryCta>
            </>
          }
        />
        <div id="blocks" sx={styles.band}>
          <Rail sx={styles.nav}>
            <BlocksNav />
            {first ? (
              <Button
                variant="secondary"
                size="sm"
                sx={styles.all}
                render={
                  <Link
                    to="/blocks/$category"
                    params={{ category: first.slug }}
                  />
                }
                nativeButton={false}
              >
                Browse all blocks
              </Button>
            ) : null}
          </Rail>
        </div>
        <section>
          <Rail sx={[styles.section, styles.list]}>
            <Outlet />
          </Rail>
        </section>
      </Page>
      <Customizer />
    </SiteDocsProvider>
  )
}
