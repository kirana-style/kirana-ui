/**
 * The home page's hero, as the Kirana site's: the claim and the ways in on the left; on the right
 * the highlands in pixels, dissolving towards the words, and on them Kirana's mark between the
 * frameworks kirana/ui installs into, the ones the registry has (React and Vue), marks only. The
 * headline is set as Kirana's, in EB Garamond with its italic.
 */
import { Link } from "@tanstack/react-router"
import { css, props as styleProps } from "@kirana-style/core"

import { CreateCta, SecondaryCta } from "@/components/cta"
import { KiranaMark } from "@/components/header/brand"
import { REPOSITORY } from "@/components/header/nav"
import { DISPLAY, SERIF } from "@/components/kirana-type"
import { ScenePixels } from "@/components/scenery/scene-pixels"
import {
  breakpoint,
  fontFamily,
  fontSize,
  lineHeight,
  space,
} from "@workspace/registry/core/scales"
import { alpha, theme } from "@workspace/registry/core/tokens"
import { BrandIcon } from "@workspace/docs-ui/brand-icon.tsx"
import reactDark from "@workspace/docs-ui/brands/react_dark.svg?url"
import reactLight from "@workspace/docs-ui/brands/react_light.svg?url"
import vueLogo from "@workspace/docs-ui/brands/vue.svg?url"

const REACT = {
  title: "React",
  url: "https://react.dev",
  route: { light: reactLight, dark: reactDark },
}
const VUE = { title: "Vue", url: "https://vuejs.org", route: vueLogo }

const LIFT =
  "0 0 0 2px var(--hero-ground), 0 1px 2px rgb(0 0 0 / 0.06), 0 18px 40px -18px rgb(0 0 0 / 0.3)"

const styles = {
  hero: css({
    position: "relative",
    overflow: "hidden",
    "--hero-ground": theme.background,
  }),
  // Under the art on a phone, the right half of the hero from `lg` up.
  scene: css({
    position: "absolute",
    insetInline: { base: 0, [breakpoint.lg]: "auto 0" },
    insetBlockEnd: 0,
    insetBlockStart: { base: "auto", [breakpoint.lg]: 0 },
    insetInlineStart: { [breakpoint.lg]: "auto" },
    width: { base: "100%", [breakpoint.lg]: "50%" },
    height: { base: "26rem", [breakpoint.lg]: "auto" },
  }),
  grid: css({
    position: "relative",
    display: "grid",
    gap: space[12],
    alignItems: "center",
    paddingInline: { base: space[5], [breakpoint.md]: space[10] },
    paddingBlockStart: { base: space[14], [breakpoint.md]: space[24] },
    paddingBlockEnd: { base: space[6], [breakpoint.lg]: space[24] },
    gridTemplateColumns: {
      base: "minmax(0, 1fr)",
      [breakpoint.lg]: "minmax(0, 1fr) minmax(0, 1fr)",
    },
  }),
  copy: css({
    display: "grid",
    gap: space[7],
    justifyItems: "start",
    maxWidth: "34rem",
  }),
  label: css({
    display: "inline-flex",
    alignItems: "center",
    gap: space["2.5"],
    fontFamily: fontFamily.mono,
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: theme.foreground,
  }),
  pixel: css({
    width: "0.5rem",
    height: "0.5rem",
    backgroundColor: theme.primary,
  }),
  // The Kirana site's headline: EB Garamond at its regular weight, the accent its drawn italic.
  title: css({
    fontFamily: SERIF,
    fontSize: DISPLAY.display1.fontSize,
    lineHeight: DISPLAY.display1.lineHeight,
    letterSpacing: DISPLAY.display1.letterSpacing,
    fontWeight: 400,
    textWrap: "balance",
  }),
  titleAccent: css({
    display: "block",
    fontStyle: "italic",
    color: theme.primary,
  }),
  lede: css({
    fontSize: fontSize.lg,
    lineHeight: lineHeight.lg,
    color: theme.mutedForeground,
    textWrap: "pretty",
  }),
  actions: css({ display: "flex", flexWrap: "wrap", gap: space[3] }),
  status: css({
    display: "flex",
    flexWrap: "wrap",
    columnGap: space[2],
    rowGap: space[1],
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  }),
  statusLink: css({
    color: theme.foreground,
    textDecorationLine: "underline",
    textDecorationColor: alpha.foreground10,
    textUnderlineOffset: "4px",
  }),

  // The art: the frameworks' marks either side of Kirana's, on raised tiles over the scene.
  art: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: { base: space[6], [breakpoint.md]: space[10] },
    paddingBlock: { base: space[10], [breakpoint.lg]: 0 },
  }),
  tile: css({
    display: "grid",
    placeItems: "center",
    width: "4.5rem",
    height: "4.5rem",
    borderRadius: "1.25rem",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: theme.border,
    backgroundColor: theme.card,
    boxShadow: LIFT,
  }),
  kirana: css({
    width: "6rem",
    height: "6rem",
    borderRadius: "1.75rem",
    color: theme.primary,
  }),
  mark: css({ height: "40px" }),
}

/** The frameworks kirana/ui installs into, React and Vue, either side of Kirana: marks only. */
function Art() {
  return (
    <div sx={styles.art}>
      <span sx={styles.tile} title="React, on Base UI and React Aria">
        <BrandIcon icon={REACT} size="2.25rem" />
      </span>
      <span sx={[styles.tile, styles.kirana]} title="Kirana">
        <KiranaMark sx={styles.mark} />
      </span>
      <span sx={styles.tile} title="Vue, on Ark UI">
        <BrandIcon icon={VUE} size="2.25rem" />
      </span>
    </div>
  )
}

export function Hero() {
  return (
    <header sx={styles.hero}>
      <ScenePixels
        scene="highlands"
        priority
        dissolve="hero"
        fade={0.62}
        sx={styles.scene}
      />
      <div sx={styles.grid}>
        <div sx={styles.copy}>
          <p sx={styles.label}>
            <span sx={styles.pixel} aria-hidden="true" />
            Components, compiled
          </p>
          <h1 sx={styles.title}>
            shadcn/ui&apos;s components,
            <em sx={styles.titleAccent}>styled by Kirana.</em>
          </h1>
          <p sx={styles.lede}>
            Every component, block and style of shadcn/ui, written as typed
            styles that Kirana compiles into one stylesheet: on Base UI and
            React Aria for React, on Ark UI for Vue. Install them into your
            project, and they are yours to change.
          </p>
          <div sx={styles.actions}>
            <CreateCta />
            <SecondaryCta
              render={
                <Link
                  to="/docs/$"
                  params={{ _splat: "installation" }}
                  {...styleProps()}
                />
              }
            >
              Get started
            </SecondaryCta>
          </div>
          <p sx={styles.status}>
            <span>Eight styles, three bases</span>
            <span aria-hidden="true">·</span>
            <span>MIT licensed</span>
            <span aria-hidden="true">·</span>
            <a
              href={REPOSITORY}
              target="_blank"
              rel="noreferrer"
              sx={styles.statusLink}
            >
              On GitHub
            </a>
          </p>
        </div>
        <Art />
      </div>
    </header>
  )
}
