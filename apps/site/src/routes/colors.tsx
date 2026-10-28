import * as React from "react"
import { Link, createFileRoute } from "@tanstack/react-router"
import { css } from "@kirana-style/core"

import { ColorPalette } from "@/components/colors/color-palette"
import { Customizer } from "@/components/customizer"
import { PrimaryCta, SecondaryCta } from "@/components/cta"
import { Accent, Page, PageHero } from "@/components/page/page"
import { Rail } from "@/components/page/rail"
import { PALETTES } from "@/lib/scale-colors"
import registryCss from "@/styles/registry.css?url"
import { breakpoint, space } from "@workspace/registry/core/scales"

const DESCRIPTION =
  "The complete Tailwind color palette as Kirana tokens, oklch() values and hex, from @kirana-style/preset-scales. Ready to copy into your styles."

/**
 * `/colors`: Kirana's page hero at city dusk, then every palette of `@kirana-style/preset-scales`
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
    paddingInline: { base: space[2], [breakpoint.md]: space[4] },
    paddingBlock: space[6],
    scrollMarginTop: space[20],
  }),
}

function Colors() {
  const [lastCopied, setLastCopied] = React.useState<string | null>(null)
  return (
    <>
      <Page scene="city-dusk">
        <PageHero
          label="Colors"
          title={
            <>
              Tailwind colors <Accent>in every format.</Accent>
            </>
          }
          lede={DESCRIPTION}
          actions={
            <>
              <PrimaryCta render={<a href="#colors" />}>
                Browse colors
              </PrimaryCta>
              <SecondaryCta
                render={
                  <Link
                    to="/docs/$"
                    params={{ _splat: "design-system/theming" }}
                  />
                }
              >
                Documentation
              </SecondaryCta>
            </>
          }
        />
        <section id="colors">
          <Rail sx={styles.section}>
            {PALETTES.map((palette) => (
              <ColorPalette
                key={palette.name}
                palette={palette}
                lastCopied={lastCopied}
                onCopied={setLastCopied}
              />
            ))}
          </Rail>
        </section>
      </Page>
      <Customizer />
    </>
  )
}
