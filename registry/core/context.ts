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

/**
 * A toast's stack (`toast.styles.ts`): the gap between toasts and how much of each one behind the
 * front peeks out, upstream's `[--gap:0.75rem] [--peek:0.75rem]`. The rest are inert placeholders:
 * each is composed from a variable Base UI writes on the toast (`--toast-index`, `--toast-height`,
 * `--toast-offset-y`), so the toast assigns the real formula on itself.
 */
export const toastCtx = defineTokens(
  "toastCtx",
  {
    gap: "0.75rem",
    peek: "0.75rem",
    /** The height the stack draws against: the front toast's (`--height`). */
    height: "auto",
    /** The scale of a toast further back (`--scale`). */
    scale: "1",
    /** How much that scale shrank it (`--shrink`). */
    shrink: "0",
    /** Its offset once the stack is expanded (`--offset-y`). */
    offsetY: "0px",
  },
  { variable: true }
)

/** A calendar's cell (`--cell-size`, `--cell-radius`): every part of its grid agrees on them. */
export const calendarCtx = defineTokens(
  "calendarCtx",
  { cellSize: "1.75rem", cellRadius: "0" },
  { variable: true }
)

/**
 * A scrolling region's fade (`styles/scroll-fade.styles.ts`). Its knobs, set on the region, are
 * upstream's variables: `size` (`--scroll-fade-size`, every edge's depth), `topSize` …
 * `endSize` (`--scroll-fade-t-size` …, one edge's), and `reveal` (`--scroll-fade-reveal`, how far
 * the region scrolls while a fade eases in). Each starts unset and is read with `fallback()`, one
 * edge's size, then every edge's, then upstream's default.
 *
 * `top` … `end` are the depth each edge is drawn at, registered so the reveal its scrolling drives
 * eases them from nothing instead of jumping, and the region's own (`inherits: false`), so a region
 * inside another fades on its own.
 */
export const scrollFadeCtx = defineTokens("scrollFadeCtx", {
  size: { syntax: "*" },
  topSize: { syntax: "*" },
  bottomSize: { syntax: "*" },
  startSize: { syntax: "*" },
  endSize: { syntax: "*" },
  reveal: { syntax: "*" },
  top: { value: "0px", syntax: "<length-percentage>", inherits: false },
  bottom: { value: "0px", syntax: "<length-percentage>", inherits: false },
  start: { value: "0px", syntax: "<length-percentage>", inherits: false },
  end: { value: "0px", syntax: "<length-percentage>", inherits: false },
})

/**
 * A shimmer's knobs (`styles/shimmer.styles.ts`), set on the text: upstream's `--shimmer-color`
 * (the highlight), `--shimmer-duration` (one sweep), `--shimmer-spread` (the band's width), unset
 * until set and read with `fallback()`, and `--shimmer-angle` (the band's tilt), registered at
 * upstream's 20deg. `highlight` is the shimmer's own: the colour it sweeps, by scheme.
 */
export const shimmerCtx = defineTokens("shimmerCtx", {
  color: { syntax: "*" },
  duration: { syntax: "*" },
  spread: { syntax: "*" },
  angle: { value: "20deg", syntax: "<angle>" },
  highlight: { syntax: "*" },
})
