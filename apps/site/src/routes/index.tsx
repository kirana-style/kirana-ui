import { css } from "@kirana-style/core"
import { Link, createFileRoute } from "@tanstack/react-router"

import { REPOSITORY, SiteHeader } from "@/components/site-header"
import registryCss from "@/styles/registry.css?url"
import {
  breakpoint,
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
  space,
} from "@workspace/registry/core/scales"
import { theme } from "@workspace/registry/core/tokens"
import { Button } from "@workspace/registry/bases/react-base/ui/button"

/**
 * The home page: what the registry is and the two ways in. The showcase of live cards in the
 * reader's design joins it with the customizer.
 */
export const Route = createFileRoute("/")({
  head: () => ({ links: [{ rel: "stylesheet", href: registryCss }] }),
  component: Home,
})

const styles = {
  hero: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: space[4],
    marginInline: "auto",
    maxWidth: "48rem",
    paddingInline: space[4],
    paddingBlock: { base: space[16], [breakpoint.md]: space[24] },
    textAlign: "center",
  }),
  title: css({
    fontSize: { base: fontSize["3xl"], [breakpoint.md]: fontSize["5xl"] },
    lineHeight: 1.1,
    fontWeight: fontWeight.semibold,
    letterSpacing: letterSpacing.tight,
    textWrap: "balance",
  }),
  lead: css({
    maxWidth: "40rem",
    fontSize: fontSize.lg,
    lineHeight: lineHeight.lg,
    color: theme.mutedForeground,
    textWrap: "balance",
  }),
  actions: css({
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: space[2],
    paddingTop: space[2],
  }),
}

function Home() {
  return (
    <>
      <SiteHeader />
      <main sx={styles.hero}>
        <h1 sx={styles.title}>
          shadcn/ui&apos;s components, styled with Kirana
        </h1>
        <p sx={styles.lead}>
          Every component, block and style of shadcn/ui, rebuilt on
          Kirana&apos;s compiled styles for React, Vue and more. Choose a design
          and install it into your own project.
        </p>
        <div sx={styles.actions}>
          <Button render={<Link to="/demo" />} nativeButton={false}>
            See the demo
          </Button>
          <Button
            variant="outline"
            render={<a href={REPOSITORY} />}
            nativeButton={false}
          >
            GitHub
          </Button>
        </div>
      </main>
    </>
  )
}
