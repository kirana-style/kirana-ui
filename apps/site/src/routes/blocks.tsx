import { Link, Outlet, createFileRoute } from "@tanstack/react-router"
import { css } from "@kirana-style/core"

import { LISTED_CATEGORIES, BlocksNav } from "@/components/blocks/blocks-nav"
import { Customizer } from "@/components/customizer"
import { SiteDocsProvider } from "@/components/docs-config"
import { PageHeader } from "@/components/page-header"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
// The reset and fonts, with the code colours the viewers need for their code.
import docsCss from "@/styles/docs.css?url"
import { breakpoint, space } from "@workspace/registry/core/scales"
import { theme } from "@workspace/registry/core/tokens"
import { Button } from "@workspace/registry/bases/react-base/ui/button"

const TITLE = "Building Blocks for the Web"
const DESCRIPTION =
  "Clean, modern building blocks, in every style and on every base. Install them into your project with kirana-style ui or shadcn/ui's CLI."

/**
 * `/blocks` and `/blocks/<category>`, as upstream's: the page's header, the categories in a row of
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
    marginInline: "auto",
    maxWidth: "80rem",
    paddingInline: { base: space[2], [breakpoint.md]: space[4] },
    paddingBlock: space[2],
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
    marginInline: "auto",
    maxWidth: "80rem",
    paddingInline: { base: space[4], [breakpoint.md]: space[6] },
  }),
}

function Blocks() {
  const first = LISTED_CATEGORIES[0]
  return (
    <SiteDocsProvider>
      <SiteHeader />
      <main>
        <PageHeader
          heading={TITLE}
          description={DESCRIPTION}
          actions={
            <>
              <Button render={<a href="#blocks" />} nativeButton={false}>
                Browse Blocks
              </Button>
              <Button
                variant="secondary"
                render={<Link to="/docs/$" params={{ _splat: "components" }} />}
                nativeButton={false}
              >
                View Components
              </Button>
            </>
          }
        />
        <div id="blocks" sx={styles.nav}>
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
        </div>
        <section sx={styles.section}>
          <div sx={styles.list}>
            <Outlet />
          </div>
        </section>
      </main>
      <SiteFooter />
      <Customizer />
    </SiteDocsProvider>
  )
}
