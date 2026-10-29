/**
 * Combobox, in every style: shadcn/ui's `bases/base/ui/combobox.tsx` and
 * `bases/aria/ui/combobox.tsx` with the `cn-combobox-*` rules of its style files (MIT). Nova is the
 * base look; the other styles override what differs.
 *
 * The popup is a menu (`menu.styles.ts`): the component composes
 * `[popupMotion, menuSurface, combobox.content]`, each item `[menuRowBase, menuCheckableRowPadding,
 * combobox.item]`, its check `[menuIndicator, combobox.indicator]`, a label `[menuLabel,
 * combobox.label]`, a separator `menuSeparator`. The input is an InputGroup (`combobox.input` over
 * it), drawn otherwise when it sits in the popup itself; the chips are a field of their own.
 *
 * Different from upstream, as Select's: a row's content inherits its colour, and icons are sized as
 * any icon in a control (`controlIcons`).
 */
import { css, relation } from "@kirana-style/core"

import { axes } from "../core/axes"
import { ctx } from "../core/context"
import {
  duration,
  easing,
  fontSize,
  fontWeight,
  leading,
  letterSpacing,
  lineHeight,
  shadow,
  space,
  spacing,
} from "../core/scales"
import { alpha, radius, surface, theme } from "../core/tokens"
import { controlIcons, focusRing, laterRings } from "./control"
import { ANCHOR_WIDTH } from "./overlay.styles"
import { inputGroupScope } from "./scope.styles"

const { nova, vega, lyra, maia, mira, luma, rhea, sera } = axes.style

/**
 * What lists the items, read by its empty state (`group/combobox-content`): Base UI's popup, React
 * Aria's list box.
 */
export const comboboxContentScope = relation("combobox-content")

/** The popup, read by an InputGroup put in it (`*:data-[slot=input-group]:`). */
export const comboboxPopupScope = relation("combobox-popup")
const IN_POPUP = comboboxPopupScope.parent()

/** An InputGroup's focused control, as the group reads it. */
const FOCUSED = ':has([data-slot="input-group-control"]:focus-visible)'

/** The field holds an invalid control (`has-aria-invalid:`). */
const INVALID = ':has([aria-invalid="true"])'

/** A border at `input/30` until focused, as the group's own once focused or invalid. */
const FAINT_BORDER = {
  base: alpha.input30,
  [FOCUSED]: { base: theme.ring, [INVALID]: theme.destructive },
  [INVALID]: theme.destructive,
}

/** A ring of `width` in `color`. */
const ring = (width: string, color: string) => `0 0 0 ${width} ${color}`

export const combobox = {
  // cn-combobox-content-logical: the logical sides' slide, in `popupMotion` (`overlay.styles.ts`).
  // cn-combobox-separator: `menuSeparator`; cn-combobox-group has no rules of its own.
  // cn-combobox-clear, cn-combobox-clear-icon, cn-combobox-item-indicator-icon,
  // cn-combobox-chip-indicator-icon: no rules of their own; their icons are sized as any icon in a
  // control.
  // cn-combobox-content and the component's own classes, after `menuSurface`: as wide as its
  // anchor and a little more, the anchor's width alone beside chips; it does not scroll, its list does.
  content: css(comboboxContentScope.anchor, comboboxPopupScope.anchor, {
    position: "relative",
    // Its positioner is `z-50`; the popup itself is not.
    zIndex: "auto",
    overflowY: "hidden",
    width: ANCHOR_WIDTH,
    maxWidth: "var(--available-width)",
    minWidth: {
      base: `calc(var(--anchor-width) + ${space[7]})`,
      '[data-chips="true"]': "var(--anchor-width)",
    },
  }),

  // cn-combobox-content-aria, after `menuSurface`: React Aria's popover keeps the content's
  // `min-w-36` and gives its height in its own style.
  contentAria: css(comboboxPopupScope.anchor, {
    position: "relative",
    overflowY: "hidden",
    width: ANCHOR_WIDTH,
    minWidth: { base: space[36], [mira]: space[32] },
  }),

  // cn-combobox-list and the component's own classes: it scrolls without a bar, short of the
  // popup's height by an input's.
  list: css({
    maxHeight: `min(calc(${space[72]} - ${space[9]}), calc(var(--available-height) - ${space[9]}))`,
    scrollPaddingBlock: {
      base: space[1],
      [luma]: space["1.5"],
      [sera]: space["1.5"],
    },
    overflowY: "auto",
    overscrollBehavior: "contain",
    scrollbarWidth: "none",
    "::-webkit-scrollbar": { display: "none" },
    padding: {
      base: space[1],
      [lyra]: "0",
      [luma]: space["1.5"],
      [sera]: space["1.5"],
      "[data-empty]": "0",
    },
  }),

  // React Aria's list box lists the items, and fills the popover's height.
  listAria: css(comboboxContentScope.anchor, { maxHeight: "inherit" }),

  // cn-combobox-item and the component's own classes, after `menuRowBase` and its padding: Nova's
  // gap is `gap-2`; Mira's row keeps no room for the check, Sera's is the plain `text-sm` row.
  item: css({
    width: "100%",
    gap: { [nova]: space[2] },
    paddingInlineEnd: { [mira]: space[2] },
    paddingBlock: { [mira]: space[1] },
    lineHeight: { [mira]: leading.relaxed, [sera]: lineHeight.sm },
    fontSize: { [sera]: fontSize.sm },
    fontWeight: { [sera]: fontWeight.normal },
    textTransform: { [sera]: "none" },
    letterSpacing: { [sera]: letterSpacing.normal },
  }),

  // cn-combobox-item-indicator, after `menuIndicator`: `size-4`, but not Mira's.
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

  // cn-combobox-label, after `menuLabel`.
  label: css({
    paddingInlineStart: { [nova]: space[2], [maia]: spacing(3.5) },
    paddingInlineEnd: { [nova]: space[2], [maia]: spacing(3.5) },
    paddingBlock: { [nova]: space["1.5"], [rhea]: space["1.5"] },
  }),

  // cn-combobox-empty: shown only while there is nothing to list.
  empty: css({
    display: {
      base: "none",
      [comboboxContentScope.within("[data-empty]")]: "flex",
    },
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

  // cn-combobox-input, over the InputGroup: `w-auto`. Put in the popup, the group sits inset at its
  // top, `h-8` (Maia's `h-9`, Mira's `h-7`), filled, with no shadow of its own; Maia's and Mira's
  // draw no border, the others' a faint one until focused.
  input: css({
    width: "auto",
    marginInline: {
      [IN_POPUP]: {
        base: space[1],
        [luma]: space["1.5"],
        [sera]: space["1.5"],
      },
    },
    marginTop: {
      [IN_POPUP]: {
        base: space[1],
        [luma]: space["1.5"],
        [sera]: space["1.5"],
      },
    },
    marginBottom: { [IN_POPUP]: "0" },
    height: {
      [IN_POPUP]: { base: space[8], [maia]: space[9], [mira]: space[7] },
    },
    paddingInline: { [IN_POPUP]: { [sera]: space["2.5"] } },
    borderStyle: { [IN_POPUP]: { [maia]: "none", [mira]: "none" } },
    borderColor: {
      [IN_POPUP]: {
        [nova]: FAINT_BORDER,
        [vega]: FAINT_BORDER,
        [lyra]: FAINT_BORDER,
        [luma]: FAINT_BORDER,
        [rhea]: FAINT_BORDER,
      },
    },
    backgroundColor: {
      [IN_POPUP]: {
        [nova]: alpha.input30,
        [vega]: alpha.input30,
        [lyra]: alpha.input30,
      },
    },
    boxShadow: {
      [IN_POPUP]: {
        [vega]: { base: "none", [FOCUSED]: ring("3px", alpha.ring50) },
      },
    },
  }),

  // cn-combobox-trigger: its icon's size.
  triggerOwn: css({
    ...controlIcons,
    [ctx.iconSize]: { base: "1rem", [mira]: "0.875rem", [sera]: "0.875rem" },
  }),

  // The trigger at the input's end, over the InputGroup's button: hidden beside a clear button, and
  // never filled while pressed.
  trigger: css({
    [ctx.iconSize]: { base: "1rem", [mira]: "0.875rem", [sera]: "0.875rem" },
    display: {
      [inputGroupScope.within(':has([data-slot="combobox-clear"])')]: "none",
    },
    // Over the ghost Button's colours, open or hovered (React Aria keeps it pressed while open).
    backgroundColor: {
      "[data-pressed]": {
        base: "transparent",
        ":hover": "transparent",
        '[aria-expanded="true"]': {
          base: "transparent",
          ":hover": "transparent",
        },
      },
    },
  }),

  // cn-combobox-trigger-icon
  triggerIcon: css({ pointerEvents: "none", color: theme.mutedForeground }),

  // cn-combobox-chips: a field of chips and their input.
  chips: css({
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    borderWidth: "1px",
    borderStyle: "solid",
    backgroundClip: "padding-box",
    minHeight: {
      base: space[8],
      [vega]: space[9],
      [maia]: space[9],
      [mira]: space[7],
      [luma]: space[9],
      [sera]: space[10],
    },
    gap: {
      base: space[1],
      [vega]: space["1.5"],
      [maia]: space["1.5"],
      [luma]: space["1.5"],
      [sera]: space["1.5"],
    },
    borderRadius: {
      base: radius.lg,
      [vega]: radius.md,
      [lyra]: "0",
      [maia]: radius["4xl"],
      [mira]: radius.md,
      [luma]: radius["3xl"],
      [rhea]: radius["2xl"],
      [sera]: "0",
    },
    // Closer to its chips once it holds one.
    paddingInline: {
      base: space["2.5"],
      [mira]: space[2],
      [luma]: space[3],
      [sera]: "0",
      ':has([data-slot="combobox-chip"])': {
        base: space[1],
        [vega]: space["1.5"],
        [maia]: space["1.5"],
        [luma]: space["1.5"],
        [sera]: "0",
      },
    },
    paddingBlock: {
      base: space[1],
      [vega]: space["1.5"],
      [maia]: space["1.5"],
      [mira]: space["0.5"],
      [luma]: space["1.5"],
      [sera]: space["1.5"],
    },
    fontSize: { base: fontSize.sm, [lyra]: fontSize.xs, [mira]: fontSize.xs },
    lineHeight: {
      base: lineHeight.sm,
      [lyra]: lineHeight.xs,
      [mira]: leading.relaxed,
    },
    backgroundColor: {
      base: surface.control,
      [maia]: alpha.input30,
      [mira]: surface.controlSoft,
      [luma]: alpha.input50,
      [rhea]: alpha.input50,
      [sera]: "transparent",
    },
    // Invalid outranks focused; Luma and Rhea draw no border until then, Sera only its bottom one.
    borderColor: {
      base: theme.input,
      ":focus-within": { base: theme.ring, [INVALID]: surface.borderInvalid },
      [INVALID]: surface.borderInvalid,
      [luma]: {
        base: "transparent",
        ":focus-within": { base: theme.ring, [INVALID]: surface.borderInvalid },
        [INVALID]: surface.borderInvalid,
      },
      [rhea]: {
        base: "transparent",
        ":focus-within": { base: theme.ring, [INVALID]: surface.borderInvalid },
        [INVALID]: surface.borderInvalid,
      },
      [sera]: {
        base: "transparent",
        ":focus-within": { base: "transparent", [INVALID]: "transparent" },
        [INVALID]: "transparent",
      },
    },
    borderBottomColor: {
      [sera]: {
        base: theme.input,
        ":focus-within": { base: theme.ring, [INVALID]: surface.borderInvalid },
        [INVALID]: surface.borderInvalid,
      },
    },
    // The focus ring, the invalid one over it, and Vega's `shadow-xs` under both.
    boxShadow: {
      [vega]: shadow.xs,
      ":focus-within": {
        ...focusRing(alpha.ring50, laterRings(alpha.ring30, { sera: "none" })),
        [vega]: `${ring("3px", alpha.ring50)}, ${shadow.xs}`,
        [INVALID]: {
          ...focusRing(
            surface.ringInvalid,
            laterRings(surface.ringInvalid, { sera: "none" })
          ),
          [vega]: `${ring("3px", surface.ringInvalid)}, ${shadow.xs}`,
        },
      },
      [INVALID]: {
        ...focusRing(
          surface.ringInvalid,
          laterRings(surface.ringInvalid, { sera: "none" })
        ),
        [vega]: `${ring("3px", surface.ringInvalid)}, ${shadow.xs}`,
      },
    },
    transitionProperty: {
      base: "color, background-color, border-color",
      [vega]: "color, box-shadow",
      [luma]: "color, box-shadow, background-color",
      [rhea]: "color, box-shadow",
      [sera]: "color, border-color",
    },
    transitionDuration: { base: duration[150], [rhea]: duration[200] },
    transitionTimingFunction: easing.inOut,
  }),

  // cn-combobox-chip and the component's own classes.
  chip: css({
    display: "flex",
    width: "fit-content",
    alignItems: "center",
    justifyContent: "center",
    gap: space[1],
    whiteSpace: "nowrap",
    color: theme.foreground,
    fontSize: fontSize.xs,
    lineHeight: { base: lineHeight.xs, [mira]: leading.relaxed },
    fontWeight: fontWeight.medium,
    height: {
      base: spacing(5.25),
      [vega]: spacing(5.5),
      [maia]: spacing(5.5),
      [mira]: spacing(4.75),
      [luma]: spacing(5.5),
      [sera]: spacing(5.5),
    },
    borderRadius: {
      base: radius.sm,
      [lyra]: "0",
      [maia]: radius["4xl"],
      [mira]: `calc(${radius.sm} - 2px)`,
      [luma]: radius["3xl"],
      [rhea]: radius["2xl"],
      [sera]: "0",
    },
    paddingInlineStart: {
      base: space["1.5"],
      [maia]: space[2],
      [luma]: space[2],
      [sera]: space[2],
    },
    // Its remove button sits at its end.
    paddingInlineEnd: {
      base: space["1.5"],
      [maia]: space[2],
      [luma]: space[2],
      [sera]: space[2],
      ':has([data-slot="combobox-chip-remove"])': {
        base: "0",
        [rhea]: space["0.5"],
      },
    },
    backgroundColor: {
      base: theme.muted,
      [maia]: `color-mix(in oklab, ${theme.mutedForeground} 10%, transparent)`,
      [mira]: `color-mix(in oklab, ${theme.mutedForeground} 10%, transparent)`,
      [luma]: `light-dark(${theme.input}, color-mix(in oklab, ${theme.input} 60%, transparent))`,
      [rhea]: `light-dark(${theme.input}, color-mix(in oklab, ${theme.input} 60%, transparent))`,
    },
    pointerEvents: { ":has(:disabled)": "none" },
    cursor: { ":has(:disabled)": "not-allowed" },
    opacity: { ":has(:disabled)": 0.5 },
  }),

  // cn-combobox-chip-remove, over a ghost `icon-xs` Button: faint until hovered.
  chipRemove: css({
    marginInlineStart: {
      base: `calc(${space[1]} * -1)`,
      [rhea]: `calc(${space["0.5"]} * -1)`,
    },
    opacity: { base: 0.5, ":hover": 1 },
    width: { [rhea]: spacing(4.5) },
    height: { [rhea]: spacing(4.5) },
    pointerEvents: { [rhea]: { '[aria-disabled="true"]': "none" } },
  }),

  // React Aria's chip list and its parts lay their chips out in the field (`contents`).
  contents: css({ display: "contents" }),

  // cn-combobox-chip-input and the component's own classes.
  chipInput: css({
    minWidth: space[16],
    flex: 1,
    outlineStyle: "none",
  }),
}
