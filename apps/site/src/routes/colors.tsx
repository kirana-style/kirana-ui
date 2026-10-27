import * as React from "react"
import { Link, createFileRoute } from "@tanstack/react-router"
import { css } from "@kirana-style/core"

import { ColorPalette } from "@/components/colors/color-palette"
import { Customizer } from "@/components/customizer"
import { PageHeader } from "@/components/page-header"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { PALETTES } from "@/lib/scale-colors"
import registryCss from "@/styles/registry.css?url"
import { breakpoint, space } from "@workspace/registry/core/scales"
import { Button } from "@workspace/registry/bases/react-base/ui/button"

const TITLE = "Tailwind Colors in Every Format"
const DESCRIPTION =
  "The complete Tailwind color palette as Kirana tokens, oklch() values and hex, from @kirana-style/preset-scales. Ready to copy into your styles."

/**
 * `/colors`, as upstream's: the page's header, then every palette of `@kirana-style/preset-scales`
 * (`components/colors/`), each shade copied in the format the reader chose (`color.red[500]`,
 * `oklch()`, hex). These are the fixed scales; the design's own colours are the theme's tokens
 * (`/docs/design-system/theming`).
 */
export const Route = createFileRoute("/colors")({
  head: () => ({
    meta: [
      { title: "Colors · kirana/ui" },
      { name: "description", content: DESCRIPTION },
    ],
    links: [{ rel: "stylesheet", href: registryCss }],
  }),
  component: Colors,
})

const styles = {
  // `container py-6`, the palettes `grid gap-8 lg:gap-16 xl:gap-20`.
  section: css({
    display: "grid",
    gap: {
      base: space[8],
      [breakpoint.lg]: space[16],
      [breakpoint.xl]: space[20],
    },
    marginInline: "auto",
    maxWidth: "80rem",
    paddingInline: { base: space[2], [breakpoint.md]: space[4] },
    paddingBlock: space[6],
    scrollMarginTop: space[20],
  }),
}

function Colors() {
  const [lastCopied, setLastCopied] = React.useState<string | null>(null)
  return (
    <>
      <SiteHeader />
      <main>
        <PageHeader
          heading={TITLE}
          description={DESCRIPTION}
          actions={
            <>
              <Button render={<a href="#colors" />} nativeButton={false}>
                Browse Colors
              </Button>
              <Button
                variant="secondary"
                render={
                  <Link
                    to="/docs/$"
                    params={{ _splat: "design-system/theming" }}
                  />
                }
                nativeButton={false}
              >
                Documentation
              </Button>
            </>
          }
        />
        <section id="colors" sx={styles.section}>
          {PALETTES.map((palette) => (
            <ColorPalette
              key={palette.name}
              palette={palette}
              lastCopied={lastCopied}
              onCopied={setLastCopied}
            />
          ))}
        </section>
      </main>
      <SiteFooter />
      <Customizer />
    </>
  )
}
