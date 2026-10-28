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
import nextLogo from "@workspace/docs-ui/brands/nextjs_icon_dark.svg?url"
import nuxtLogo from "@workspace/docs-ui/brands/nuxt.svg?url"
import reactDark from "@workspace/docs-ui/brands/react_dark.svg?url"
import reactLight from "@workspace/docs-ui/brands/react_light.svg?url"
import solidLogo from "@workspace/docs-ui/brands/solidjs.svg?url"
import svelteLogo from "@workspace/docs-ui/brands/svelte.svg?url"
import tanstackDark from "@workspace/docs-ui/brands/tanstack_dark.svg?url"
import tanstackLight from "@workspace/docs-ui/brands/tanstack_light.svg?url"
import viteLogo from "@workspace/docs-ui/brands/vite.svg?url"
import vueLogo from "@workspace/docs-ui/brands/vue.svg?url"
import { hue } from "@/components/page/hue"

/**
 * The frameworks the plan covers, above the engine: React today, on Base UI and React Aria; Vue
 * today, on Ark UI; Svelte and Solid with Ark UI's components for them. Below it, the hosts: Vite
 * and TanStack Start install today; Next.js and Nuxt are the plan's.
 */
const FRAMEWORKS = [
  {
    title: "React: Base UI and React Aria",
    url: "https://react.dev",
    route: { light: reactLight, dark: reactDark },
  },
  { title: "Vue: Ark UI", url: "https://vuejs.org", route: vueLogo },
  {
    title: "Svelte: Ark UI, planned",
    url: "https://svelte.dev",
    route: svelteLogo,
  },
  {
    title: "Solid: Ark UI, planned",
    url: "https://www.solidjs.com",
    route: solidLogo,
  },
] as const
const HOSTS = [
  { title: "Vite", url: "https://vite.dev", route: viteLogo },
  {
    title: "TanStack Start",
    url: "https://tanstack.com/start",
    route: { light: tanstackLight, dark: tanstackDark },
  },
  { title: "Next.js, planned", url: "https://nextjs.org", route: nextLogo },
  { title: "Nuxt, planned", url: "https://nuxt.com", route: nuxtLogo },
] as const

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

/** One engine, as the Kirana site's ecosystem drawing: every framework and host wired into Kirana. */
function Art() {
  const xs = [10, 30, 70, 90]
  const marks = [...FRAMEWORKS, ...HOSTS]
  const wires = marks.map((_, index) => {
    const x = (xs[index % 4]! / 100) * 360
    const y = index < 4 ? 26 : 114
    return `M ${x} ${y} C ${x} 70, 180 ${y < 70 ? 40 : 100}, 180 70`
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
        {marks.map((brand, index) => (
          <At key={brand.title} x={xs[index % 4]!} y={index < 4 ? 18 : 82}>
            <Tile brand={brand} size={36} title={brand.title} />
          </At>
        ))}
        <At x={50} y={50}>
          <Tile mark primary size={50} caption="kirana ui" title="kirana/ui" />
        </At>
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
