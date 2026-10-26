/**
 * Select, in every style: shadcn/ui's `bases/base/ui/select.tsx` and `bases/aria/ui/select.tsx`
 * with the `cn-select-*` rules of its style files (MIT), at commit `25af02b`. Nova is the base look;
 * the other styles override what differs.
 *
 * The popup is a menu (`menu.styles.ts`): the component composes
 * `[popupMotion, menuSurface, select.content]`, and each item `[menuRowBase,
 * menuCheckableRowPadding, select.item]`. A label is `menuLabel`, a separator `menuSeparator`.
 *
 * Different from upstream on purpose:
 * - the value's `line-clamp-1` is an ellipsis on one line, and the value styles itself rather than
 *   being reached into from the trigger (`*:data-[slot=select-value]:…`);
 * - `[&_svg:not([class*='size-'])]:size-4` is `controlIcons` (`./control.ts`), without the guard;
 * - Lyra's `text-left` is `start`, and `right-2` is `insetInlineEnd`, as shadcn/ui's RTL transform
 *   writes them.
 *
 * The trigger is `w-fit` on Base UI. On React Aria it is `w-full` (`triggerFill`) inside a root that
 * is itself `w-fit` (`root`), so it lands the same. Either way, the part that is a vertical field's
 * child fills it (`fillInField`), as upstream's `*:w-full` beats the trigger's own `w-fit`.
 */
import { css, relation, select as target } from "@kirana-style/core"

import { axes } from "../core/axes"
import { ctx } from "../core/context"
import {
  duration,
  fontSize,
  fontWeight,
  leading,
  letterSpacing,
  lineHeight,
  space,
  zIndex,
} from "../core/scales"
import { placeholder, when } from "../core/states"
import { alpha, radius, surface, theme } from "../core/tokens"
import { ANCHOR_WIDTH } from "./overlay.styles"
import {
  controlIcons,
  controlShadow,
  controlTransition,
  fillInField,
  laterRings,
} from "./control"

const { nova, vega, lyra, maia, mira, luma, rhea, sera } = axes.style

/** React Aria's list box, read by the empty state it shows (`group/select-list`). */
export const selectList = relation("select-list")

const SMALL = '[data-size="sm"]'

export const select = {
  // cn-select-trigger and the component's own classes.
  trigger: css({
    display: "flex",
    width: fillInField,
    alignItems: "center",
    justifyContent: "space-between",
    gap: space["1.5"],
    whiteSpace: "nowrap",
    outlineStyle: "none",
    // Only Nova and Lyra make the trigger `select-none`.
    userSelect: { [nova]: "none", [lyra]: "none" },
    cursor: { ":disabled": "not-allowed" },
    opacity: { ":disabled": 0.5 },
    ...controlIcons,
    [ctx.iconSize]: { base: "1rem", [mira]: "0.875rem", [sera]: "0.875rem" },
    ...controlTransition,
    // Luma's and Rhea's fill changes too; Sera's underline only moves its colour.
    transitionProperty: {
      base: "color, background-color, border-color",
      [vega]: "color, box-shadow",
      [luma]: "color, box-shadow, background-color",
      [rhea]: "color, box-shadow",
      [sera]: "color, border-color",
    },
    transitionDuration: { base: duration[150], [rhea]: duration[200] },

    borderWidth: "1px",
    borderStyle: "solid",
    // Luma and Rhea draw no border until focused; Sera only the bottom one.
    borderColor: {
      base: theme.input,
      ":focus-visible": theme.ring,
      '[aria-invalid="true"]': surface.borderInvalid,
      [luma]: {
        base: "transparent",
        ":focus-visible": theme.ring,
        '[aria-invalid="true"]': surface.borderInvalid,
      },
      [rhea]: {
        base: "transparent",
        ":focus-visible": theme.ring,
        '[aria-invalid="true"]': surface.borderInvalid,
      },
      // Sera's focus and invalid colours are the bottom border's alone.
      [sera]: {
        base: "transparent",
        ":focus-visible": "transparent",
        '[aria-invalid="true"]': "transparent",
      },
    },
    borderBottomColor: {
      [sera]: {
        base: theme.input,
        ":focus-visible": theme.ring,
        '[aria-invalid="true"]': surface.borderInvalid,
      },
    },
    boxShadow: controlShadow(
      alpha.ring50,
      surface.ringInvalid,
      { ...laterRings(alpha.ring30), sera: "none" },
      { ...laterRings(surface.ringInvalid), sera: "none" }
    ),
    // `dark:bg-input/30 dark:hover:bg-input/50`; Maia fills with `input/30` in both modes.
    backgroundColor: {
      base: surface.control,
      ":hover": surface.controlHover,
      [maia]: {
        base: alpha.input30,
        ":hover": `light-dark(${alpha.input30}, ${alpha.input50})`,
      },
      // Mira fills with `input/20` (`/30` in dark, `/50` on hover there), Luma and Rhea with `/50`.
      [mira]: {
        base: surface.controlSoft,
        ":hover": `light-dark(${alpha.input20}, ${alpha.input50})`,
      },
      [luma]: { base: alpha.input50, ":hover": alpha.input50 },
      [rhea]: { base: alpha.input50, ":hover": alpha.input50 },
      [sera]: { base: "transparent", ":hover": "transparent" },
    },
    color: { ...when(placeholder.trigger, theme.mutedForeground) },
    paddingBlock: { base: space[2], [mira]: space["1.5"] },
    paddingInlineStart: {
      base: space["2.5"],
      [maia]: space[3],
      [mira]: space[2],
      [luma]: space[3],
      [rhea]: space[3],
      [sera]: "0",
    },
    paddingInlineEnd: {
      base: space[2],
      [maia]: space[3],
      [mira]: space[2],
      [luma]: space[3],
      [rhea]: space[3],
      [sera]: "0",
    },
    fontSize: { base: fontSize.sm, [lyra]: fontSize.xs, [mira]: fontSize.xs },
    lineHeight: {
      base: lineHeight.sm,
      [lyra]: lineHeight.xs,
      [mira]: leading.relaxed,
    },

    // `data-[size=default]:h-*` and `data-[size=sm]:h-*`.
    height: {
      base: space[8],
      [vega]: space[9],
      [maia]: space[9],
      [mira]: space[7],
      [luma]: space[9],
      [sera]: space[10],
      [SMALL]: {
        base: space[7],
        [vega]: space[8],
        [maia]: space[8],
        [mira]: space[6],
        [luma]: space[8],
        [sera]: space[9],
      },
    },
    // Nova caps the small trigger's corners (`rounded-[min(var(--radius-md),10px)]`); the other
    // styles keep their own.
    borderRadius: {
      base: radius.lg,
      [vega]: radius.md,
      [lyra]: "0",
      [maia]: radius["4xl"],
      [mira]: radius.md,
      [luma]: radius["3xl"],
      [rhea]: radius["2xl"],
      [sera]: "0",
      [SMALL]: {
        base: `min(${radius.md}, 10px)`,
        [vega]: radius.md,
        [lyra]: "0",
        [maia]: radius["4xl"],
        [mira]: radius.md,
        [luma]: radius["3xl"],
        [rhea]: radius["2xl"],
        [sera]: "0",
      },
    },
  }),

  // React Aria's Select, which wraps the trigger and the hidden form control.
  root: css({ width: fillInField }),
  // The separator's own class, over `menuSeparator`: upstream's select separator ignores the
  // pointer; its dropdown menu's does not.
  separator: css({ pointerEvents: "none" }),
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
    minWidth: { base: space[36], [mira]: space[32] },
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
    // `p-1`, but not Lyra's; `p-1.5` in Luma and Sera.
    padding: {
      [nova]: space[1],
      [vega]: space[1],
      [maia]: space[1],
      [mira]: space[1],
      [luma]: space["1.5"],
      [rhea]: space[1],
      [sera]: space["1.5"],
    },
  }),

  // cn-select-item and the component's own classes, after `menuRowBase` and its padding. A last
  // `span` given as content lays out its icon and text in a row.
  // Mira's row is `px-2`, with no room kept for the check, and `text-xs/relaxed`; Sera's is the
  // plain `text-sm` row the menu rows are not.
  item: css({
    width: "100%",
    paddingInlineEnd: { [mira]: space[2] },
    paddingBlock: { [mira]: space[1] },
    lineHeight: { [mira]: leading.relaxed, [sera]: lineHeight.sm },
    fontSize: { [sera]: fontSize.sm },
    fontWeight: { [sera]: fontWeight.normal },
    textTransform: { [sera]: "none" },
    letterSpacing: { [sera]: letterSpacing.normal },
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

  // cn-select-item-indicator, after `menuIndicator`; its icon (cn-select-item-indicator-icon) is
  // sized as any icon in a control.
  // Mira's has no size of its own.
  indicator: css({
    width: {
      [nova]: space[4],
      [vega]: space[4],
      [lyra]: space[4],
      [maia]: space[4],
      [luma]: space[4],
      [rhea]: space[4],
      [sera]: space[4],
    },
    height: {
      [nova]: space[4],
      [vega]: space[4],
      [lyra]: space[4],
      [maia]: space[4],
      [luma]: space[4],
      [rhea]: space[4],
      [sera]: space[4],
    },
  }),

  // cn-select-scroll-up-button and cn-select-scroll-down-button.
  scrollButton: css({
    zIndex: zIndex.raised,
    display: "flex",
    width: "100%",
    cursor: "default",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.popover,
    paddingBlock: space[1],
    ...controlIcons,
    [ctx.iconSize]: { base: "1rem", [mira]: "0.875rem", [sera]: "0.875rem" },
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
    fontSize: { base: fontSize.sm, [lyra]: fontSize.xs, [mira]: fontSize.xs },
    lineHeight: {
      base: lineHeight.sm,
      [lyra]: lineHeight.xs,
      [mira]: leading.relaxed,
    },
  }),
}
