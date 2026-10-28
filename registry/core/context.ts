/**
 * Values a parent hands its children, as variable tokens the parent assigns on itself
 * (`css({ [ctx.iconSize]: "0.75rem" })`) and the children read. They replace Tailwind's reaches into
 * descendants (`[&_svg]:size-4`, `**:data-[slot$=-item]:focus:bg-foreground/10`), which need class
 * names Kirana does not keep. A default is evaluated on `:root`: it may read the colours there,
 * never a variable a library writes on an element.
 */
import { defineTokens } from "@kirana-style/core"

import { surface, theme } from "./tokens"

export const ctx = defineTokens(
  "ctx",
  {
    /** The size of an icon inside a control; every control that sized its `svg` sets it. */
    iconSize: "1rem",
  },
  { variable: true }
)

/**
 * The colours a menu's rows use, set by the menu's surface: solid by default, glass when the menu
 * colour is translucent. A row never knows which surface it is on.
 */
export const menuCtx = defineTokens(
  "menuCtx",
  {
    highlight: theme.accent,
    destructive: theme.destructive,
    destructiveHighlight: surface.destructiveSoft,
    separator: theme.border,
  },
  { variable: true }
)

/**
 * A checkbox's, a radio's or a switch's look, set on the control itself for its style (`check.styles.ts` reads
 * it), so its states read one value instead of restating every style: its edge and fill at rest
 * and checked, its ring's width and focus colour, and the shadow under the ring (Vega's
 * `shadow-xs`). `stateEdge` is the edge its state gives before checking, which a control whose
 * edge does not change when checked takes as its checked edge.
 */
export const checkCtx = defineTokens(
  "checkCtx",
  {
    edge: theme.input,
    checkedEdge: theme.primary,
    stateEdge: theme.input,
    fill: "transparent",
    checkedFill: theme.primary,
    ringWidth: "3px",
    ringFocus: theme.ring,
    shadow: "0 0 #0000",
  },
  { variable: true }
)

/** A card's inner rhythm (`--card-spacing`): its padding and gaps, set by the card's size. */
export const cardCtx = defineTokens(
  "cardCtx",
  { spacing: "1rem" },
  { variable: true }
)

/**
 * A sidebar's widths (`--sidebar-width`, `--sidebar-width-icon`): expanded, and collapsed to its
 * icons. The mobile sheet sets its own expanded width.
 */
export const sidebarCtx = defineTokens(
  "sidebarCtx",
  { width: "16rem", widthIcon: "3rem" },
  { variable: true }
)
