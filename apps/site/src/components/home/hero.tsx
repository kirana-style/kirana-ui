/**
 * The home page's hero, as the Kirana site's: the claim and the ways in on the left; on the right
 * the heritage street in pixels (not Kirana's highlands), dissolving towards the words, and on them Kirana's "one engine" drawing:
 * every framework the plan covers and the hosts it installs into, wired into Kirana, marks only.
 * The headline is set as Kirana's, in EB Garamond with its italic.
 */
import { Link } from "@tanstack/react-router"
import { css, props as styleProps } from "@kirana-style/core"

import { Rail } from "@/components/page/rail"
import { CreateCta, SecondaryCta } from "@/components/cta"
import { DISPLAY, SERIF } from "@/components/kirana-type"
import { At, Scene, Stage, Tile } from "@/components/scenery/kit"
import { ScenePixels } from "@/components/scenery/scene-pixels"
import {
  breakpoint,
  fontFamily,
  fontSize,
  lineHeight,
  space,
} from "@workspace/registry/core/scales"
import { theme } from "@workspace/registry/core/tokens"
import angularLogo from "@workspace/docs-ui/brands/angular.svg?url"
import reactDark from "@workspace/docs-ui/brands/react_dark.svg?url"
import reactLight from "@workspace/docs-ui/brands/react_light.svg?url"
import solidLogo from "@workspace/docs-ui/brands/solidjs.svg?url"
import svelteLogo from "@workspace/docs-ui/brands/svelte.svg?url"
import vueLogo from "@workspace/docs-ui/brands/vue.svg?url"
import { hue } from "@/components/page/hue"

/**
 * The frameworks, wired from the engine: React, on Base UI and React Aria, and Vue, on Ark UI;
 * Svelte and Solid (Ark UI) and Angular (ng-primitives), with their first components (Button, Card,
 * Skeleton). Frameworks only: a meta-framework is its framework's (Next.js and TanStack Start are
 * React, Nuxt is Vue), and a build tool (Vite) belongs to none.
 */
const FRAMEWORKS = [
  {
    title: "React: Base UI and React Aria",
    url: "https://react.dev",
    route: { light: reactLight, dark: reactDark },
  },
  { title: "Vue: Ark UI", url: "https://vuejs.org", route: vueLogo },
  {
    title: "Svelte: Ark UI, its first components",
    url: "https://svelte.dev",
    route: svelteLogo,
  },
  {
    title: "Solid: Ark UI, its first components",
    url: "https://www.solidjs.com",
    route: solidLogo,
  },
  {
    title: "Angular: ng-primitives, its first components",
    url: "https://angular.dev",
    route: angularLogo,
  },
] as const

/** The frameworks' row under the engine, in percent of the scene's width, as the Kirana site's fan of agents. */
const XS = [10, 30, 50, 70, 90] as const

/** Each framework's name under its mark. */
const NAMES = ["React", "Vue", "Svelte", "Solid", "Angular"] as const

const styles = {
  hero: css({
    position: "relative",
    overflow: "hidden",
    "--hero-ground": theme.background,
    borderBlockEndWidth: "1px",
    borderBlockEndStyle: "solid",
    borderBlockEndColor: theme.border,
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
    paddingBlockStart: { base: space[12], [breakpoint.md]: space[16] },
    paddingBlockEnd: { base: space[6], [breakpoint.lg]: space[16] },
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
    backgroundColor: hue.base,
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
    color: hue.base,
  }),
  lede: css({
    fontSize: fontSize.lg,
    lineHeight: lineHeight.lg,
    color: theme.mutedForeground,
    textWrap: "pretty",
  }),
  actions: css({ display: "flex", flexWrap: "wrap", gap: space[3] }),

  // The drawing, enlarged where the column has room, shrunk on a phone.
  art: css({ height: { base: "18rem", [breakpoint.sm]: "22rem" } }),
  artScene: css({
    scale: { base: "0.82", [breakpoint.sm]: "1.1", [breakpoint.xl]: "1.25" },
  }),
}

/**
 * One engine, as the Kirana site's drawings: kirana/ui's engine on top, the frameworks in a row
 * under it, a wire fanning down to each.
 */
function Art() {
  const wires = XS.map((x) => {
    const to = (x / 100) * 360
    return `M 180 48 C 180 76, ${to} 70, ${to} 100`
  })
  return (
    <Stage sx={styles.art}>
      <Scene
        width={360}
        height={140}
        wires={wires.slice(1)}
        live={[wires[0]!]}
        sx={styles.artScene}
      >
        <At x={50} y={24}>
          <Tile mark primary size={50} caption="kirana ui" title="kirana/ui" />
        </At>
        {FRAMEWORKS.map((brand, index) => (
          <At key={brand.title} x={XS[index]!} y={82}>
            <Tile
              brand={brand}
              size={36}
              caption={NAMES[index]}
              title={brand.title}
            />
          </At>
        ))}
      </Scene>
    </Stage>
  )
}

export function Hero() {
  return (
    <header sx={styles.hero}>
      <Rail>
        <ScenePixels
          scene="heritage-street"
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
              <em sx={styles.titleAccent}>styled by kirana.</em>
            </h1>
            <p sx={styles.lede}>
              Every component, block and style of shadcn/ui, rebuilt on
              Kirana&apos;s compiled styles: React and Vue today, Svelte, Solid
              and Angular next.
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
          </div>
          <Art />
        </div>
      </Rail>
    </header>
  )
}
