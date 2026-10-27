/**
 * The frame the site's project pages share, as the Kirana site's `page.tsx`: the header and the
 * footer, a hero with the page's scene dissolving into the page beside the words, and numbered
 * chapters below (`chapter.tsx`), the headlines in Kirana's display face. Not the docs layout: these
 * pages are the project's, read once, not looked up.
 */
import { css } from "@kirana-style/core"

import { DISPLAY, SERIF } from "@/components/kirana-type"
import type { SceneId } from "@/components/header/nav"
import { ScenePixels } from "@/components/scenery/scene-pixels"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { breakpoint, fontFamily, space } from "@workspace/registry/core/scales"
import { theme } from "@workspace/registry/core/tokens"

import { Chapter } from "./chapter"

const styles = {
  hero: css({
    position: "relative",
    overflow: "hidden",
    borderBlockEndWidth: "1px",
    borderBlockEndStyle: "solid",
    borderBlockEndColor: theme.border,
  }),
  heroRail: css({ display: "grid", gridTemplateColumns: "minmax(0, 1fr)" }),
  // Beside the words from `lg` up, dissolving left into them; a band under them on a phone.
  scene: css({
    position: { base: "relative", [breakpoint.lg]: "absolute" },
    order: { base: 2, [breakpoint.lg]: 0 },
    insetBlock: { [breakpoint.lg]: 0 },
    insetInlineEnd: { [breakpoint.lg]: 0 },
    insetInlineStart: { [breakpoint.lg]: "auto" },
    width: { base: "100%", [breakpoint.lg]: "50%", [breakpoint.xl]: "54%" },
    height: {
      base: "12rem",
      [breakpoint.sm]: "15rem",
      [breakpoint.lg]: "auto",
    },
  }),
  inner: css({
    position: "relative",
    display: "grid",
    gap: space[6],
    justifyItems: "start",
    // The words keep to the half the scene leaves them.
    maxWidth: {
      [breakpoint.lg]: "min(37rem, 50%)",
      [breakpoint.xl]: "min(37rem, 46%)",
    },
    paddingInline: { base: space[5], [breakpoint.md]: space[10] },
    paddingBlockStart: { base: space[14], [breakpoint.md]: space[24] },
    paddingBlockEnd: { base: space[8], [breakpoint.lg]: space[24] },
  }),
  label: css({
    display: "inline-flex",
    alignItems: "center",
    gap: space["2.5"],
    fontFamily: fontFamily.mono,
    fontSize: "0.6875rem",
    lineHeight: "1.45",
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    color: theme.foreground,
  }),
  pixel: css({
    width: "0.5rem",
    height: "0.5rem",
    backgroundColor: theme.primary,
  }),
  title: css({
    fontFamily: SERIF,
    fontSize: DISPLAY.display2.fontSize,
    lineHeight: DISPLAY.display2.lineHeight,
    letterSpacing: DISPLAY.display2.letterSpacing,
    fontWeight: 400,
    textWrap: "balance",
  }),
  accent: css({ fontStyle: "italic", color: theme.primary }),
  lede: css({
    fontSize: DISPLAY.lede.fontSize,
    lineHeight: DISPLAY.lede.lineHeight,
    color: theme.mutedForeground,
    textWrap: "pretty",
  }),
  actions: css({ display: "flex", flexWrap: "wrap", gap: space[3] }),
  section: css({
    scrollMarginBlockStart: "4rem",
    borderBlockEndWidth: "1px",
    borderBlockEndStyle: "solid",
    borderBlockEndColor: theme.border,
  }),
  sectionInner: css({
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr)",
    gap: { base: space[8], [breakpoint.md]: space[12] },
    paddingInline: { base: space[5], [breakpoint.md]: space[10] },
    paddingBlock: { base: space[14], [breakpoint.md]: space[20] },
  }),
}

/** The header, the page, the footer. */
export function Page({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </>
  )
}

export function PageHero({
  scene,
  label,
  title,
  lede,
  actions,
}: {
  scene: SceneId
  /** The page's name, above its headline. */
  label: string
  title: React.ReactNode
  lede?: React.ReactNode
  actions?: React.ReactNode
}) {
  return (
    <header sx={styles.hero}>
      <div sx={styles.heroRail}>
        <ScenePixels
          scene={scene}
          dissolve="hero"
          fade={0.72}
          sx={styles.scene}
        />
        <div sx={styles.inner}>
          <p sx={styles.label}>
            <span sx={styles.pixel} aria-hidden="true" />
            {label}
          </p>
          <h1 sx={styles.title}>{title}</h1>
          {lede ? <p sx={styles.lede}>{lede}</p> : null}
          {actions ? <div sx={styles.actions}>{actions}</div> : null}
        </div>
      </div>
    </header>
  )
}

/** The one word of a page's headline set in italic, in the design's primary colour. */
export function Accent({ children }: { children: React.ReactNode }) {
  return <em sx={styles.accent}>{children}</em>
}

export function PageSection({
  id,
  number,
  label,
  title,
  lede,
  children,
}: {
  id?: string
  /** The chapter's number on its page: "01". */
  number?: string
  /** The chapter's name, in two or three words. */
  label?: React.ReactNode
  title?: React.ReactNode
  lede?: React.ReactNode
  children?: React.ReactNode
}) {
  return (
    <section id={id} sx={styles.section}>
      <div sx={styles.sectionInner}>
        {title ? (
          <Chapter number={number} label={label} title={title} lede={lede} />
        ) : null}
        {children}
      </div>
    </section>
  )
}
