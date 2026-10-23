/**
 * Select, in every style: shadcn/ui's `bases/base/ui/select.tsx` and `bases/aria/ui/select.tsx`
 * with the `cn-select-*` rules of its style files (MIT), at commit `25af02b`. Nova is the base look;
 * Vega, Lyra and Maia override what differs.
 *
 * The popup is a menu (`menu.styles.ts`): the component composes
 * `[popupMotion, menuSurface, select.content]`, and each item `[menuRowBase,
 * menuCheckableRowPadding, select.item]`. A label is `menuLabel`, a separator `menuSeparator`.
 *
 * Different from upstream on purpose:
 * - the value's `line-clamp-1` is an ellipsis on one line, and the value styles itself rather than
 *   being reached into from the trigger (`*:data-[slot=select-value]:…`);
 * - `[&_svg:not([class*='size-'])]:size-4` became `ctx.iconSize`, read by the `Icon` primitive;
 * - Lyra's `text-left` is `start`, and `right-2` is `insetInlineEnd`, as shadcn/ui's RTL transform
 *   writes them.
 *
 * The trigger is `w-fit` on Base UI. On React Aria it is `w-full` (`triggerFill`) inside a root that
 * is itself `w-fit` (`root`), so it lands the same.
 */
import { css, relation, select as target } from "@kirana-style/core"

import { axes } from "../core/axes"
import { ctx } from "../core/context"
import { fontSize, lineHeight, space, zIndex } from "../core/scales"
import { placeholder, when } from "../core/states"
import { alpha, radius, surface, theme } from "../core/tokens"
import { ANCHOR_WIDTH } from "./overlay.styles"
import { controlShadow, controlTransition } from "./control"

const { vega, lyra, maia } = axes.style

/** React Aria's list box, read by the empty state it shows (`group/select-list`). */
export const selectList = relation("select-list")

const SMALL = '[data-size="sm"]'

export const select = {
  // cn-select-trigger and the component's own classes.
  trigger: css({
    display: "flex",
    width: "fit-content",
    alignItems: "center",
    justifyContent: "space-between",
    gap: space["1.5"],
    whiteSpace: "nowrap",
    outlineStyle: "none",
    userSelect: { base: "none", [vega]: "auto", [maia]: "auto" },
    cursor: { ":disabled": "not-allowed" },
    opacity: { ":disabled": 0.5 },
    [ctx.iconSize]: "1rem",
    ...controlTransition,

    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: {
      base: theme.input,
      ":focus-visible": theme.ring,
      '[aria-invalid="true"]': surface.borderInvalid,
    },
    boxShadow: controlShadow(alpha.ring50, surface.ringInvalid),
    // `dark:bg-input/30 dark:hover:bg-input/50`; Maia fills with `input/30` in both modes.
    backgroundColor: {
      base: surface.control,
      ":hover": surface.controlHover,
      [maia]: {
        base: alpha.input30,
        ":hover": `light-dark(${alpha.input30}, ${alpha.input50})`,
      },
    },
    color: { ...when(placeholder.trigger, theme.mutedForeground) },
    paddingBlock: space[2],
    paddingInlineStart: { base: space["2.5"], [maia]: space[3] },
    paddingInlineEnd: { base: space[2], [maia]: space[3] },
    fontSize: { base: fontSize.sm, [lyra]: fontSize.xs },
    lineHeight: { base: lineHeight.sm, [lyra]: lineHeight.xs },

    // `data-[size=default]:h-*` and `data-[size=sm]:h-*`.
    height: {
      base: space[8],
      [vega]: space[9],
      [maia]: space[9],
      [SMALL]: { base: space[7], [vega]: space[8], [maia]: space[8] },
    },
    // Nova caps the small trigger's corners (`rounded-[min(var(--radius-md),10px)]`); the other
    // styles keep their own.
    borderRadius: {
      base: radius.lg,
      [vega]: radius.md,
      [lyra]: "0",
      [maia]: radius["4xl"],
      [SMALL]: {
        base: `min(${radius.md}, 10px)`,
        [vega]: radius.md,
        [lyra]: "0",
        [maia]: radius["4xl"],
      },
    },
  }),

  // React Aria's Select, which wraps the trigger and the hidden form control.
  root: css({ width: "fit-content" }),
  // React Aria's trigger fills that root.
  triggerFill: css({ width: "100%" }),

  // cn-select-trigger-icon
  triggerIcon: css({
    pointerEvents: "none",
    flexShrink: 0,
    color: theme.mutedForeground,
  }),

  // cn-select-value and what the trigger gave it (`flex items-center gap-1.5 line-clamp-1`).
  value: css({
    display: "flex",
    flex: 1,
    alignItems: "center",
    gap: space["1.5"],
    textAlign: "start",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    // cn-select-value-aria: React Aria marks the value, not the trigger.
    color: { ...when(placeholder.value, theme.mutedForeground) },
  }),

  // cn-select-content and the component's own classes, after `menuSurface`. A popup aligned with
  // its trigger's item opens in place, without motion (`data-[align-trigger=true]:animate-none`).
  content: css({
    position: "relative",
    isolation: "isolate",
    width: ANCHOR_WIDTH,
    minWidth: space[36],
    transitionProperty: { '[data-align-trigger="true"]': "none" },
  }),

  // React Aria's popup does not scroll: its list box does.
  popover: css({ overflowY: "hidden" }),

  // The list inside the popup (React Aria's list box, Ark UI's list), which scrolls in its place
  // and draws no focus ring: both libraries focus it while the arrow keys move the highlight.
  list: css(selectList.anchor, {
    maxHeight: "inherit",
    overflowX: "hidden",
    overflowY: "auto",
    padding: 0,
    outlineStyle: "none",
  }),

  // cn-select-group: Lyra's rows meet the popup's edges.
  group: css({
    scrollMarginBlock: space[1],
    padding: { base: space[1], [lyra]: "0" },
  }),

  // cn-select-item and the component's own classes, after `menuRowBase` and its padding. A last
  // `span` given as content lays out its icon and text in a row.
  item: css({
    width: "100%",
    [target.child("span:last-child")]: {
      display: "flex",
      alignItems: "center",
      gap: space[2],
    },
  }),

  // cn-select-item-text
  itemText: css({
    display: "flex",
    flex: 1,
    flexShrink: 0,
    gap: space[2],
    whiteSpace: "nowrap",
  }),

  // cn-select-item-indicator, after `menuIndicator`.
  indicator: css({ width: space[4], height: space[4] }),

  // cn-select-scroll-up-button and -down-button.
  scrollButton: css({
    zIndex: zIndex.raised,
    display: "flex",
    width: "100%",
    cursor: "default",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.popover,
    paddingBlock: space[1],
    [ctx.iconSize]: "1rem",
  }),
  scrollUp: css({ top: 0 }),
  scrollDown: css({ bottom: 0 }),

  // cn-select-empty-aria: shown only while the list box has nothing to list.
  empty: css({
    display: { base: "none", [selectList.within("[data-empty]")]: "flex" },
    width: "100%",
    justifyContent: "center",
    paddingBlock: space[2],
    textAlign: "center",
    color: theme.mutedForeground,
    fontSize: { base: fontSize.sm, [lyra]: fontSize.xs },
    lineHeight: { base: lineHeight.sm, [lyra]: lineHeight.xs },
  }),
}
