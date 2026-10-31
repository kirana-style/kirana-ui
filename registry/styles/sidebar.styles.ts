/**
 * Sidebar, in every style: shadcn/ui's `bases/base/ui/sidebar.tsx` and `bases/aria/ui/sidebar.tsx`
 * with the `cn-sidebar-*` rules of its style files (MIT), at commit `481d523`. Nova is the base
 * look; the other styles override what differs.
 *
 * The desktop sidebar anchors `sidebarScope` (upstream's `group peer`): its parts read it for the
 * collapsed state, the side and the variant (`group-data-[collapsible=icon]:`), and the inset
 * beside it reads it as a sibling (`peer-data-[variant=inset]:`). The provider's wrapper anchors
 * `sidebarWrapper` (`group/sidebar-wrapper`), for a page that follows the collapse. A row anchors
 * `sidebarMenuItem`, its button `sidebarMenuButton`, which the action and the badge after it read
 * (`peer/menu-button`). On a small screen the sidebar is a sheet, outside the scope, so none of
 * those reads hold there, as upstream.
 *
 * Maia, Luma, Rhea and Sera re-base the corners inside the header and the content
 * (`[--radius:var(--radius-xl)]`, Sera's `[--radius:0]`): each radius token is reassigned there
 * from the root's base, so a part's `radius.lg` is the root's `radius.xl`.
 *
 * Upstream's `!` (`group-data-[collapsible=icon]:size-8!`) is the collapsed value restated under
 * each style that sets the property, so it wins wherever both hold.
 *
 * Different from upstream on purpose: `transition-all` is written as the properties that move, and
 * the sides that follow the reading direction are logical (`right-1` is `insetInlineEnd`,
 * `text-left` is `start`), as shadcn/ui's RTL transform writes them; the panel's own side stays
 * physical, as its `data-side` says.
 */
import { css, relation, select } from "@kirana-style/core"

import { axes } from "../core/axes"
import { ctx, sidebarCtx } from "../core/context"
import {
  breakpoint,
  duration,
  easing,
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
  shadow,
  space,
  zIndex,
} from "../core/scales"
import { orientation, when } from "../core/states"
import { alpha, radius, radiusBase, surface, theme } from "../core/tokens"

const { nova, vega, lyra, maia, mira, luma, rhea, sera } = axes.style

/** The desktop sidebar (`group peer`). */
export const sidebarScope = relation("sidebar")
/** The provider's wrapper (`group/sidebar-wrapper`). */
export const sidebarWrapper = relation("sidebar-wrapper")
/** A menu row (`group/menu-item`). */
export const sidebarMenuItem = relation("sidebar-menu-item")
/** A menu row's button (`peer/menu-button`). */
export const sidebarMenuButton = relation("sidebar-menu-button")

/** Collapsed to its icons, and slid out of view. */
export const COLLAPSED = sidebarScope.within('[data-collapsible="icon"]')
const OFFCANVAS = sidebarScope.within('[data-collapsible="offcanvas"]')
const ON_LEFT = sidebarScope.within('[data-side="left"]')
const ON_RIGHT = sidebarScope.within('[data-side="right"]')
const FLOATING = sidebarScope.within('[data-variant="floating"]')
/** Anything in a sidebar that is collapsed to its icons, read from the wrapper. */
export const WRAPPER_COLLAPSED = sidebarWrapper.within(
  ':has([data-collapsible="icon"])'
)

const LEFT = '[data-side="left"]'
const RIGHT = '[data-side="right"]'

/** `w-(--sidebar-width-icon)`, plus the padding of a floating or inset panel. */
const ICON_PADDED = `calc(${sidebarCtx.widthIcon} + ${space[4]})`

/** A part's own focus ring: `ring-sidebar-ring focus-visible:ring-2`, Rhea's `ring-3`. */
const RING = {
  ":focus-visible": {
    base: `0 0 0 2px ${theme.sidebarRing}`,
    [rhea]: `0 0 0 3px ${theme.sidebarRing}`,
  },
}

/** The highlight a part takes on hover, press or when current. */
const HIGHLIGHT = {
  ":hover": theme.sidebarAccent,
  ":active": theme.sidebarAccent,
  "[data-active]": theme.sidebarAccent,
}
const HIGHLIGHT_TEXT = {
  ":hover": theme.sidebarAccentForeground,
  ":active": theme.sidebarAccentForeground,
  "[data-active]": theme.sidebarAccentForeground,
}

/** `[&>svg]:size-4`, Sera's `size-3.5`, never shrunk. */
const childIcons = {
  [select.child("svg")]: {
    flexShrink: 0,
    width: { base: space[4], [sera]: space["3.5"] },
    height: { base: space[4], [sera]: space["3.5"] },
  },
}

/** `[&>span:last-child]:truncate`. */
const truncateLabel = {
  [select.child("span:last-child")]: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
}

/** `disabled:` and `aria-disabled:`: half visible, not clickable. */
const disabled = {
  pointerEvents: { ":disabled": "none", '[aria-disabled="true"]': "none" },
  opacity: { ":disabled": 0.5, '[aria-disabled="true"]': 0.5 },
} as const

/**
 * The radii re-based in Maia, Luma and Rhea (on the root's `radius.xl`) and in Sera (on none): each
 * radius token at its factor of the new base.
 */
const XL = `calc(${radiusBase.value} * 1.4)`
const rebased = (factor: string) => ({
  [maia]: `calc(${XL} * ${factor})`,
  [luma]: `calc(${XL} * ${factor})`,
  [rhea]: `calc(${XL} * ${factor})`,
  [sera]: "0px",
})
const REBASED_RADII = {
  [radius.sm]: rebased("0.6"),
  [radius.md]: rebased("0.8"),
  [radius.lg]: rebased("1"),
  [radius.xl]: rebased("1.4"),
  [radius["2xl"]]: rebased("1.8"),
  [radius["3xl"]]: rebased("2.2"),
  [radius["4xl"]]: rebased("2.6"),
}

/** A menu button's corners, and its action's and badge's. */
const MENU_BUTTON_RADIUS = {
  base: radius.md,
  [lyra]: "0",
  [maia]: radius.lg,
  [mira]: `calc(${radius.sm} + 2px)`,
  [luma]: radius.xl,
  [rhea]: radius.xl,
  [sera]: "0",
}
const SMALL_PART_RADIUS = {
  base: radius.md,
  [lyra]: "0",
  [mira]: `calc(${radius.sm} - 2px)`,
  [luma]: radius.xl,
  [rhea]: radius.xl,
  [sera]: "0",
}

/**
 * A menu button's inline padding: `p-2`, `px-3` from Maia on, Rhea's `pl-2.5` or `pr-2.5` beside an
 * icon (`iconSide`), `pr-8` at the end of a row with an action (`action`), and `collapsed` when the
 * sidebar is (`p-2!`, the large button's `p-0!`): the end side's. The row's action is read inside
 * each style, so it wins there.
 */
/** The button before an action or a badge, by its size (`peer-data-[size=*]/menu-button:`). */
const AFTER_DEFAULT = sidebarMenuButton.after('[data-size="default"]')
const AFTER_LG = sidebarMenuButton.after('[data-size="lg"]')
const AFTER_SM = sidebarMenuButton.after('[data-size="sm"]')

const HAS_ACTION = sidebarMenuItem.within(':has([data-sidebar="menu-action"])')
const inlinePadding = (
  iconSide: string,
  action: string,
  collapsed: string
) => ({
  base: space[2],
  [HAS_ACTION]: { base: action, [COLLAPSED]: collapsed },
  [COLLAPSED]: collapsed,
  [maia]: {
    base: space[3],
    [HAS_ACTION]: { base: action, [COLLAPSED]: collapsed },
    [COLLAPSED]: collapsed,
  },
  [luma]: {
    base: space[3],
    [HAS_ACTION]: { base: action, [COLLAPSED]: collapsed },
    [COLLAPSED]: collapsed,
  },
  [rhea]: {
    base: space[3],
    [iconSide]: {
      base: space["2.5"],
      [HAS_ACTION]: { base: action, [COLLAPSED]: collapsed },
      [COLLAPSED]: collapsed,
    },
    [HAS_ACTION]: { base: action, [COLLAPSED]: collapsed },
    [COLLAPSED]: collapsed,
  },
  [sera]: {
    base: space[3],
    [HAS_ACTION]: { base: action, [COLLAPSED]: collapsed },
    [COLLAPSED]: collapsed,
  },
})

/** The start side's: the same, with no room for an action, which sits at the end. */
const startPadding = (collapsed: string) => ({
  base: space[2],
  [COLLAPSED]: collapsed,
  [maia]: { base: space[3], [COLLAPSED]: collapsed },
  [luma]: { base: space[3], [COLLAPSED]: collapsed },
  [rhea]: {
    base: space[3],
    ":has(> svg:first-child)": { base: space["2.5"], [COLLAPSED]: collapsed },
    [COLLAPSED]: collapsed,
  },
  [sera]: { base: space[3], [COLLAPSED]: collapsed },
})

/**
 * A size's height (`h-*`), and `size-8!` collapsed: `base` for the styles that keep Nova's, `tall`
 * for Maia, Luma and Sera.
 */
const height = (base: string, tall: string) => ({
  base,
  [COLLAPSED]: space[8],
  [maia]: { base: tall, [COLLAPSED]: space[8] },
  [luma]: { base: tall, [COLLAPSED]: space[8] },
  [sera]: { base: tall, [COLLAPSED]: space[8] },
})

export const sidebar = {
  // The provider's wrapper: the page's row, filled with the sidebar's colour behind an inset.
  wrapper: css(sidebarWrapper.anchor, {
    display: "flex",
    minHeight: "100svh",
    width: "100%",
    backgroundColor: { ':has([data-variant="inset"])': theme.sidebar },
  }),

  // `collapsible="none"`: a plain column.
  static: css({
    display: "flex",
    height: "100%",
    width: sidebarCtx.width,
    flexDirection: "column",
    backgroundColor: theme.sidebar,
    color: theme.sidebarForeground,
  }),

  // On a small screen: the sheet, at the mobile width. Upstream hides its close button with
  // `[&>button]:hidden`; on Base UI, where the button is the sheet's child, the sidebar asks for
  // none instead, since a style on a child ranks below the child's own `display`. React Aria's
  // close button sits inside the dialog, which upstream's rule never reaches, so it shows there.
  mobile: css({
    [sidebarCtx.width]: "18rem",
    width: sidebarCtx.width,
    padding: 0,
    backgroundColor: theme.sidebar,
    color: theme.sidebarForeground,
  }),
  mobileInner: css({
    display: "flex",
    height: "100%",
    width: "100%",
    flexDirection: "column",
  }),

  // The desktop sidebar.
  root: css(sidebarScope.anchor, {
    display: { base: "none", [breakpoint.md]: "block" },
    color: theme.sidebarForeground,
  }),

  // cn-sidebar-gap and the component's own classes: holds the room the fixed panel takes.
  gap: css({
    position: "relative",
    width: {
      base: sidebarCtx.width,
      [OFFCANVAS]: "0",
      [COLLAPSED]: sidebarCtx.widthIcon,
    },
    backgroundColor: "transparent",
    transitionProperty: "width",
    transitionDuration: duration[200],
    transitionTimingFunction: "linear",
    rotate: { [ON_RIGHT]: "180deg" },
  }),
  gapPadded: css({
    width: {
      base: sidebarCtx.width,
      [OFFCANVAS]: "0",
      [COLLAPSED]: ICON_PADDED,
    },
  }),

  // The fixed panel, slid past its edge when off canvas.
  container: css({
    position: "fixed",
    top: 0,
    bottom: 0,
    zIndex: zIndex.raised,
    display: { base: "none", [breakpoint.md]: "flex" },
    height: "100svh",
    width: { base: sidebarCtx.width, [COLLAPSED]: sidebarCtx.widthIcon },
    transitionProperty: "left, right, width",
    transitionDuration: duration[200],
    transitionTimingFunction: "linear",
    left: {
      [LEFT]: { base: 0, [OFFCANVAS]: `calc(${sidebarCtx.width} * -1)` },
    },
    right: {
      [RIGHT]: { base: 0, [OFFCANVAS]: `calc(${sidebarCtx.width} * -1)` },
    },
    borderColor: theme.border,
    borderRightWidth: { [ON_LEFT]: "1px" },
    borderLeftWidth: { [ON_RIGHT]: "1px" },
  }),
  // Floating and inset: padded, with no border.
  containerPadded: css({
    padding: space[2],
    width: {
      base: sidebarCtx.width,
      [COLLAPSED]: `calc(${sidebarCtx.widthIcon} + ${space[4]} + 2px)`,
    },
    borderRightWidth: { [ON_LEFT]: "0" },
    borderLeftWidth: { [ON_RIGHT]: "0" },
  }),

  // cn-sidebar-inner and the component's own classes; a floating panel is a raised card.
  inner: css({
    display: "flex",
    width: "100%",
    height: "100%",
    flexDirection: "column",
    backgroundColor: theme.sidebar,
    borderRadius: {
      [FLOATING]: {
        base: radius.lg,
        [lyra]: "0",
        [luma]: radius["2xl"],
        [rhea]: radius["2xl"],
        [sera]: "0",
      },
    },
    boxShadow: {
      [FLOATING]: `0 0 0 1px ${theme.sidebarBorder}, ${shadow.sm}`,
    },
  }),

  // cn-sidebar-rail and the component's own classes: the strip along the panel's edge that
  // toggles it, its line drawn on hover.
  rail: css({
    position: "absolute",
    top: 0,
    bottom: 0,
    zIndex: 20,
    display: { base: "none", [breakpoint.sm]: "flex" },
    width: space[4],
    transitionProperty: "translate, background-color",
    transitionDuration: duration[150],
    transitionTimingFunction: "linear",
    translate: { base: "-50% 0", [OFFCANVAS]: "0" },
    right: {
      [ON_LEFT]: {
        base: `calc(${space[4]} * -1)`,
        [OFFCANVAS]: `calc(${space[2]} * -1)`,
      },
    },
    left: {
      [ON_RIGHT]: { base: 0, [OFFCANVAS]: `calc(${space[2]} * -1)` },
    },
    cursor: {
      [ON_LEFT]: {
        base: "w-resize",
        [sidebarScope.within('[data-state="collapsed"]')]: "e-resize",
      },
      [ON_RIGHT]: {
        base: "e-resize",
        [sidebarScope.within('[data-state="collapsed"]')]: "w-resize",
      },
    },
    backgroundColor: { [OFFCANVAS]: { ":hover": theme.sidebar } },
    "::after": {
      content: "''",
      position: "absolute",
      top: 0,
      bottom: 0,
      insetInlineStart: { base: "50%", [OFFCANVAS]: "100%" },
      width: "2px",
      backgroundColor: { ":hover": theme.sidebarBorder },
    },
  }),

  // cn-sidebar-inset and the component's own classes: the page beside the sidebar, a raised card
  // beside an inset one from `md`.
  inset: css({
    position: "relative",
    display: "flex",
    width: "100%",
    flex: 1,
    flexDirection: "column",
    backgroundColor: theme.background,
    margin: {
      [breakpoint.md]: {
        [sidebarScope.after('[data-variant="inset"]')]: space[2],
      },
    },
    marginLeft: {
      [breakpoint.md]: {
        [sidebarScope.after('[data-variant="inset"]')]: {
          base: "0",
          [sidebarScope.after('[data-state="collapsed"]')]: space[2],
        },
      },
    },
    borderRadius: {
      [breakpoint.md]: {
        [sidebarScope.after('[data-variant="inset"]')]: {
          base: radius.xl,
          [lyra]: "0",
          [luma]: radius["2xl"],
          [rhea]: radius["2xl"],
          [sera]: "0",
        },
      },
    },
    boxShadow: {
      [breakpoint.md]: {
        [sidebarScope.after('[data-variant="inset"]')]: shadow.sm,
      },
    },
  }),

  // cn-sidebar-input, over Input's own look. Upstream's `bg-background` loses to Input's
  // `dark:bg-input/30` in the dark scheme; Input's fill is one `light-dark()` pair here, so the
  // sidebar's is too.
  input: css({
    // `h-8` in every style, over Input's own height in each.
    height: { "*": null, base: space[8] },
    width: "100%",
    backgroundColor: {
      base: `light-dark(${theme.background}, ${alpha.input30})`,
      // Maia's Input fills with `bg-input/30` in both schemes, which the background replaces.
      [maia]: theme.background,
      [mira]: surface.mutedSoft,
      [luma]: alpha.input50,
      [rhea]: alpha.input50,
      [sera]: "transparent",
    },
    borderColor: { [mira]: theme.input, [sera]: theme.input },
    // Every style but Mira drops the input's shadow.
    boxShadow: {
      [nova]: "none",
      [vega]: "none",
      [lyra]: "none",
      [maia]: "none",
      [luma]: "none",
      [rhea]: "none",
      [sera]: "none",
    },
  }),

  // cn-sidebar-header and cn-sidebar-footer, with the component's own classes.
  header: css({
    display: "flex",
    flexDirection: "column",
    gap: space[2],
    padding: space[2],
    ...REBASED_RADII,
  }),
  footer: css({
    display: "flex",
    flexDirection: "column",
    gap: space[2],
    padding: space[2],
  }),

  // cn-sidebar-separator, over Separator's own width.
  separator: css({
    marginInline: space[2],
    // Under Separator's own conditions, so it replaces its `100%`.
    width: { ...when(orientation.horizontal, "auto"), ":is(hr)": "auto" },
    backgroundColor: theme.sidebarBorder,
  }),

  // cn-sidebar-content and the component's own classes: the scrolling middle, no scroll bar.
  content: css({
    display: "flex",
    minHeight: 0,
    flex: 1,
    flexDirection: "column",
    overflow: { base: "auto", [COLLAPSED]: "hidden" },
    scrollbarWidth: "none",
    "::-webkit-scrollbar": { display: "none" },
    gap: {
      base: "0",
      [vega]: space[2],
      [maia]: space[2],
      [luma]: space[2],
      [rhea]: space[2],
      [sera]: space[2],
    },
    ...REBASED_RADII,
  }),

  // cn-sidebar-group and the component's own classes.
  group: css({
    position: "relative",
    display: "flex",
    width: "100%",
    minWidth: 0,
    flexDirection: "column",
    paddingInline: space[2],
    paddingBlock: { base: space[2], [mira]: space[1] },
  }),

  // cn-sidebar-group-label and the component's own classes: slides up and fades when collapsed.
  groupLabel: css({
    display: "flex",
    height: space[8],
    flexShrink: 0,
    alignItems: "center",
    outlineStyle: "none",
    color: alpha.sidebarForeground70,
    paddingInline: {
      base: space[2],
      [maia]: space[3],
      [luma]: space[3],
      [rhea]: space[3],
      [sera]: space[3],
    },
    borderRadius: {
      base: radius.md,
      [lyra]: "0",
      [luma]: radius.xl,
      [rhea]: radius.xl,
      [sera]: "0",
    },
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    fontWeight: {
      base: fontWeight.medium,
      [lyra]: fontWeight.normal,
      [mira]: fontWeight.normal,
      [sera]: fontWeight.semibold,
    },
    textTransform: { [sera]: "uppercase" },
    letterSpacing: { [sera]: letterSpacing.wider },
    transitionProperty: "margin, opacity",
    transitionDuration: duration[200],
    transitionTimingFunction: "linear",
    marginTop: { [COLLAPSED]: `calc(${space[8]} * -1)` },
    opacity: { [COLLAPSED]: 0 },
    boxShadow: RING,
    ...childIcons,
  }),

  // cn-sidebar-group-action and the component's own classes: a square at the label's end.
  groupAction: css({
    position: "absolute",
    top: space["3.5"],
    insetInlineEnd: space[3],
    display: { base: "flex", [COLLAPSED]: "none" },
    aspectRatio: "1 / 1",
    width: space[5],
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    outlineStyle: "none",
    transitionProperty: "transform, translate, scale, rotate",
    transitionDuration: duration[150],
    transitionTimingFunction: easing.inOut,
    color: {
      base: theme.sidebarForeground,
      ":hover": theme.sidebarAccentForeground,
    },
    backgroundColor: { ":hover": theme.sidebarAccent },
    borderRadius: {
      base: radius.md,
      [lyra]: "0",
      [luma]: radius.xl,
      [rhea]: radius.xl,
      [sera]: "0",
    },
    boxShadow: RING,
    ...childIcons,
    // A wider target where the pointer is coarse (`after:-inset-2 md:after:hidden`).
    "::after": {
      content: "''",
      position: "absolute",
      inset: `calc(${space[2]} * -1)`,
      display: { [breakpoint.md]: "none" },
    },
  }),

  // cn-sidebar-group-content and the component's own classes.
  groupContent: css({
    width: "100%",
    fontSize: { base: fontSize.sm, [lyra]: fontSize.xs, [mira]: fontSize.xs },
    lineHeight: {
      base: lineHeight.sm,
      [lyra]: lineHeight.xs,
      [mira]: lineHeight.xs,
    },
  }),

  // cn-sidebar-menu and the component's own classes.
  menu: css({
    display: "flex",
    width: "100%",
    minWidth: 0,
    flexDirection: "column",
    gap: {
      base: "0",
      [vega]: space[1],
      [maia]: space[1],
      [mira]: "1px",
      [luma]: space["0.5"],
      [rhea]: space["0.5"],
      [sera]: space["0.5"],
    },
  }),
  menuItem: css(sidebarMenuItem.anchor, { position: "relative" }),

  // cn-sidebar-menu-button and the component's own classes, either variant and size. A square
  // icon when collapsed.
  menuButton: css(sidebarMenuButton.anchor, {
    display: "flex",
    width: { base: "100%", [COLLAPSED]: space[8] },
    alignItems: "center",
    gap: space[2],
    overflow: "hidden",
    outlineStyle: "none",
    textAlign: "start",
    whiteSpace: { [rhea]: "nowrap" },
    borderRadius: MENU_BUTTON_RADIUS,
    paddingBlock: space[2],
    paddingInlineStart: startPadding(space[2]),
    paddingInlineEnd: inlinePadding(
      ":has(> svg:last-child)",
      space[8],
      space[2]
    ),
    transitionProperty: "width, height, padding",
    transitionDuration: { base: duration[150], [rhea]: duration[200] },
    transitionTimingFunction: easing.inOut,
    backgroundColor: {
      ...HIGHLIGHT,
      "[data-open]": { ":hover": theme.sidebarAccent },
    },
    color: {
      ...HIGHLIGHT_TEXT,
      "[data-open]": { ":hover": theme.sidebarAccentForeground },
    },
    fontWeight: { "[data-active]": fontWeight.medium },
    boxShadow: RING,
    ...disabled,
    [ctx.iconSize]: "1rem",
    [select.descendant("svg")]: {
      width: ctx.iconSize,
      height: ctx.iconSize,
      flexShrink: 0,
    },
    ...truncateLabel,
  }),
  /** cn-sidebar-menu-button-aria: React Aria's open menu marks its trigger `aria-expanded`. */
  menuButtonAria: css({
    backgroundColor: {
      '[aria-expanded="true"]': { ":hover": theme.sidebarAccent },
    },
    color: {
      '[aria-expanded="true"]': { ":hover": theme.sidebarAccentForeground },
    },
  }),

  // cn-sidebar-menu-button-variant-outline: a bordered button on the page's colour. Rhea's border
  // is `hsl(var(--sidebar-border))` over an `oklch()` colour, which no browser reads, so Rhea's
  // outline button draws no shadow at all, its focus ring included.
  menuButtonOutline: css({
    backgroundColor: { base: theme.background, ":hover": theme.sidebarAccent },
    boxShadow: {
      base: `0 0 0 1px ${theme.sidebarBorder}`,
      ":hover": `0 0 0 1px ${theme.sidebarAccent}`,
      ":focus-visible": `0 0 0 2px ${theme.sidebarRing}, 0 0 0 1px ${theme.sidebarBorder}`,
      [rhea]: "none",
    },
  }),

  // cn-sidebar-menu-button-size-*: Maia, Luma and Sera are taller; the large button loses its
  // padding when collapsed.
  menuButtonDefault: css({
    height: height(space[8], space[9]),
    fontSize: { base: fontSize.sm, [lyra]: fontSize.xs, [mira]: fontSize.xs },
    lineHeight: {
      base: lineHeight.sm,
      [lyra]: lineHeight.xs,
      [mira]: lineHeight.xs,
    },
  }),
  menuButtonSm: css({
    height: height(space[7], space[8]),
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
  }),
  menuButtonLg: css({
    height: height(space[12], space[14]),
    fontSize: { base: fontSize.sm, [lyra]: fontSize.xs, [mira]: fontSize.xs },
    lineHeight: {
      base: lineHeight.sm,
      [lyra]: lineHeight.xs,
      [mira]: lineHeight.xs,
    },
    paddingBlock: { base: space[2], [COLLAPSED]: "0" },
    paddingInlineStart: startPadding("0"),
    paddingInlineEnd: inlinePadding(":has(> svg:last-child)", space[8], "0"),
  }),

  // cn-sidebar-menu-action and the component's own classes: a square at the row's end, lined up
  // with the button's size.
  menuAction: css({
    position: "absolute",
    insetInlineEnd: space[1],
    display: { base: "flex", [COLLAPSED]: "none" },
    aspectRatio: "1 / 1",
    width: space[5],
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    outlineStyle: "none",
    transitionProperty: "transform, translate, scale, rotate",
    transitionDuration: duration[150],
    transitionTimingFunction: easing.inOut,
    // Restated under each size, so a style's value never meets another size's.
    top: {
      base: space["1.5"],
      [AFTER_DEFAULT]: {
        base: space["1.5"],
        [maia]: space[2],
        [luma]: space[2],
        [sera]: space[2],
      },
      [AFTER_LG]: {
        base: space["2.5"],
        [maia]: space["2.5"],
        [luma]: space["2.5"],
        [sera]: space["2.5"],
      },
      [AFTER_SM]: {
        base: space[1],
        [maia]: space[1],
        [luma]: space[1],
        [sera]: space[1],
      },
    },
    color: {
      base: theme.sidebarForeground,
      ":hover": theme.sidebarAccentForeground,
      [sidebarMenuButton.after(":hover")]: theme.sidebarAccentForeground,
    },
    backgroundColor: { ":hover": theme.sidebarAccent },
    borderRadius: SMALL_PART_RADIUS,
    boxShadow: RING,
    ...childIcons,
    "::after": {
      content: "''",
      position: "absolute",
      inset: `calc(${space[2]} * -1)`,
      display: { [breakpoint.md]: "none" },
    },
  }),
  /** `showOnHover`: hidden from `md` until its row is hovered or focused, or its menu is open. */
  menuActionOnHover: css({
    color: {
      base: theme.sidebarForeground,
      ":hover": theme.sidebarAccentForeground,
      [sidebarMenuButton.after(":hover")]: theme.sidebarAccentForeground,
      [sidebarMenuButton.after("[data-active]")]: theme.sidebarAccentForeground,
    },
    opacity: {
      [breakpoint.md]: {
        base: 0,
        [sidebarMenuItem.within(":hover")]: 1,
        [sidebarMenuItem.within(":focus-within")]: 1,
        '[aria-expanded="true"]': 1,
      },
    },
  }),

  // cn-sidebar-menu-badge and the component's own classes.
  menuBadge: css({
    pointerEvents: "none",
    position: "absolute",
    insetInlineEnd: space[1],
    display: { base: "flex", [COLLAPSED]: "none" },
    height: space[5],
    minWidth: space[5],
    alignItems: "center",
    justifyContent: "center",
    paddingInline: space[1],
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    fontWeight: fontWeight.medium,
    fontVariantNumeric: "tabular-nums",
    userSelect: "none",
    borderRadius: SMALL_PART_RADIUS,
    top: {
      [AFTER_DEFAULT]: space["1.5"],
      [AFTER_LG]: space["2.5"],
      [AFTER_SM]: space[1],
    },
    color: {
      base: theme.sidebarForeground,
      [sidebarMenuButton.after(":hover")]: theme.sidebarAccentForeground,
      [sidebarMenuButton.after("[data-active]")]: theme.sidebarAccentForeground,
    },
  }),

  // cn-sidebar-menu-skeleton and its parts.
  menuSkeleton: css({
    display: "flex",
    height: space[8],
    alignItems: "center",
    gap: space[2],
    paddingInline: space[2],
    borderRadius: {
      base: radius.md,
      [lyra]: "0",
      [luma]: radius.xl,
      [rhea]: radius.xl,
      [sera]: "0",
    },
  }),
  menuSkeletonIcon: css({
    width: { base: space[4], [sera]: space["3.5"] },
    height: { base: space[4], [sera]: space["3.5"] },
    borderRadius: {
      base: radius.md,
      [lyra]: "0",
      [luma]: radius.xl,
      [rhea]: radius.xl,
      [sera]: "0",
    },
  }),
  menuSkeletonText: css({ height: space[4], flex: 1 }),

  // cn-sidebar-menu-sub and the component's own classes: an indented list along a line.
  menuSub: css({
    display: { base: "flex", [COLLAPSED]: "none" },
    minWidth: 0,
    flexDirection: "column",
    gap: space[1],
    marginInline: space["3.5"],
    paddingInline: space["2.5"],
    paddingBlock: space["0.5"],
    translate: "1px",
    borderLeftWidth: "1px",
    borderColor: theme.sidebarBorder,
  }),
  menuSubItem: css({ position: "relative" }),

  // cn-sidebar-menu-sub-button and the component's own classes.
  menuSubButton: css({
    display: { base: "flex", [COLLAPSED]: "none" },
    height: space[7],
    minWidth: 0,
    alignItems: "center",
    gap: space[2],
    overflow: "hidden",
    outlineStyle: "none",
    translate: "-1px",
    paddingInline: {
      base: space[2],
      [luma]: space[3],
      [rhea]: space[3],
      [sera]: space[3],
    },
    borderRadius: {
      base: radius.md,
      [lyra]: "0",
      [luma]: radius.xl,
      [rhea]: radius.xl,
      [sera]: "0",
    },
    color: { base: theme.sidebarForeground, ...HIGHLIGHT_TEXT },
    backgroundColor: HIGHLIGHT,
    boxShadow: RING,
    fontSize: {
      '[data-size="md"]': {
        base: fontSize.sm,
        [lyra]: fontSize.xs,
        [mira]: fontSize.xs,
      },
      '[data-size="sm"]': fontSize.xs,
    },
    lineHeight: {
      '[data-size="md"]': {
        base: lineHeight.sm,
        [lyra]: lineHeight.xs,
        [mira]: lineHeight.xs,
      },
      '[data-size="sm"]': lineHeight.xs,
    },
    ...disabled,
    ...truncateLabel,
    [select.child("svg")]: {
      flexShrink: 0,
      color: theme.sidebarAccentForeground,
      width: { base: space[4], [sera]: space["3.5"] },
      height: { base: space[4], [sera]: space["3.5"] },
    },
  }),
}
