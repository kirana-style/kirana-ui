/**
 * The site's calls to action, as the Kirana site's `cta.tsx`: one shape everywhere, its corners the
 * design's (the registry's Button's, which follow the style and the radius). "Create" is a
 * raised pill with a round chip at its end, in the page's hue (`page/hue.ts`), as Kirana puts its
 * scene's, the arrow in it growing a little on hover; the secondary one beside it is the same pill
 * outlined, with no chip. Both come in the header's size (`sm`, 32 px) and a hero's (`lg`, 40 px),
 * and grow to a finger's size (44 px) on a touch screen. Every "start a project" on the site is
 * this "Create", to `/create`.
 */
import type { ReactElement, ReactNode } from "react"
import { css } from "@kirana-style/core"
import { Link } from "@tanstack/react-router"
import { ArrowRight01Icon } from "@hugeicons/core-free-icons"

import {
  breakpoint,
  duration,
  easing,
  fontSize,
  fontWeight,
  space,
} from "@workspace/registry/core/scales"
import { alpha, theme } from "@workspace/registry/core/tokens"
import type { Sx } from "@workspace/registry/lib/sx"
import { hue } from "@/components/page/hue"
import { Button } from "@workspace/registry/bases/react-base/ui/button"
import { Icon } from "@workspace/shell/icon"

type Size = "sm" | "lg"

const COARSE = "@media (pointer: coarse)"
const REDUCED = "@media (prefers-reduced-motion: reduce)"

const styles = {
  pill: css({
    display: "inline-flex",
    alignItems: "center",
    minHeight: "auto",
    gap: space["2.5"],
    lineHeight: 1,
    fontWeight: fontWeight.medium,
  }),
  sm: css({
    height: { "*": null, base: space[8], [COARSE]: space[11] },
    paddingInlineStart: { "*": null, base: space["3.5"] },
    fontSize: fontSize.sm,
  }),
  lg: css({
    height: { "*": null, base: space[10], [COARSE]: space[11] },
    paddingInlineStart: { "*": null, base: space[4] },
    fontSize: fontSize.sm,
  }),
  // Room for the chip at the end of the primary: its inset, less the border.
  primarySmEnd: css({
    paddingInlineEnd: { "*": null, base: "4px", [COARSE]: "5px" },
  }),
  primaryLgEnd: css({ paddingInlineEnd: { "*": null, base: "5px" } }),
  secondarySm: css({ paddingInlineEnd: { "*": null, base: space["3.5"] } }),
  secondaryLg: css({ paddingInlineEnd: { "*": null, base: space[4] } }),
  // A shade off the page, a hairline border that darkens on hover, no shadow: the chip is the
  // brightest thing in it.
  primary: css({
    borderWidth: "1px",
    borderStyle: "solid",
    backgroundColor: {
      "*": null,
      base: `light-dark(${theme.card}, color-mix(in oklab, ${theme.foreground} 12%, ${theme.background}))`,
      ":hover": `light-dark(color-mix(in oklab, ${theme.foreground} 4%, ${theme.card}), color-mix(in oklab, ${theme.foreground} 17%, ${theme.background}))`,
    },
    borderColor: {
      "*": null,
      base: `light-dark(color-mix(in oklab, ${theme.foreground} 16%, transparent), ${alpha.foreground10})`,
      ":hover": `color-mix(in oklab, ${theme.foreground} 26%, transparent)`,
    },
    color: { "*": null, base: theme.foreground },
    boxShadow: { "*": null, base: "none" },
    transitionProperty: "background-color, border-color",
    transitionDuration: duration[200],
  }),
  secondary: css({
    backgroundColor: {
      "*": null,
      base: `color-mix(in oklab, ${theme.background} 60%, transparent)`,
      ":hover": alpha.muted50,
    },
    boxShadow: { "*": null, base: "none" },
  }),
  // The chip takes the pill's corner, so it is round in a round style and square in a square one.
  chip: css({
    display: "inline-grid",
    placeItems: "center",
    flexShrink: 0,
    borderRadius: "inherit",
    backgroundColor: hue.base,
    color: hue.on,
  }),
  chipSm: css({
    width: { base: "1.375rem", [COARSE]: space[8] },
    height: { base: "1.375rem", [COARSE]: space[8] },
  }),
  chipLg: css({
    width: { base: space[7], [COARSE]: space[8] },
    height: { base: space[7], [COARSE]: space[8] },
  }),
  // A small zoom in place: an arrow that steps sideways reads as the pill shifting.
  arrow: css({
    scale: { base: "1", ":is(a:hover *)": "1.2" },
    transitionProperty: "scale",
    transitionDuration: { base: duration[200], [REDUCED]: "0s" },
    transitionTimingFunction: easing.inOut,
  }),
  // The header's copy hides on the narrowest screens, where the menu sheet leads to it.
  fromSm: css({ display: { base: "none", [breakpoint.sm]: "inline-flex" } }),
}

/** "Create", to `/create`: the raised pill with its chip. */
export function CreateCta({
  size = "lg",
  hideOnPhone = false,
  children = "Create",
  sx,
}: {
  size?: Size
  /** Hidden below `sm`, as in the header. */
  hideOnPhone?: boolean
  children?: ReactNode
  sx?: Sx
}) {
  return (
    <PrimaryCta
      size={size}
      sx={[hideOnPhone && styles.fromSm, sx]}
      render={<Link to="/create" />}
    >
      {children}
    </PrimaryCta>
  )
}

/** The raised pill with its chip, to any destination: a page hero's first action. */
export function PrimaryCta({
  size = "lg",
  render,
  children,
  sx,
}: {
  size?: Size
  render: ReactElement
  children: ReactNode
  sx?: Sx
}) {
  return (
    <Button
      nativeButton={false}
      sx={[
        styles.pill,
        styles[size],
        size === "sm" ? styles.primarySmEnd : styles.primaryLgEnd,
        styles.primary,
        sx,
      ]}
      render={render}
    >
      {children}
      <span sx={[styles.chip, size === "sm" ? styles.chipSm : styles.chipLg]}>
        <Icon
          icon={ArrowRight01Icon}
          size={size === "sm" ? "0.8125rem" : "0.9375rem"}
          sx={styles.arrow}
        />
      </span>
    </Button>
  )
}

/** The action beside "Create": the same pill, outlined. `render` is the link it draws on. */
export function SecondaryCta({
  size = "lg",
  render,
  children,
  sx,
}: {
  size?: Size
  render: ReactElement
  children: ReactNode
  sx?: Sx
}) {
  return (
    <Button
      variant="outline"
      nativeButton={false}
      sx={[
        styles.pill,
        styles[size],
        size === "sm" ? styles.secondarySm : styles.secondaryLg,
        styles.secondary,
        sx,
      ]}
      render={render}
    >
      {children}
    </Button>
  )
}
