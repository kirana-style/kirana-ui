/**
 * Command, in every style: shadcn/ui's `bases/base/ui/command.tsx` (on cmdk) and
 * `bases/aria/ui/command.tsx` (on React Aria's Autocomplete and Menu) with the `cn-command-*` rules
 * of its style files (MIT). Nova is the base look; the other styles override what differs.
 *
 * Its input sits in an InputGroup and its dialog is Dialog's content, so `inputGroup` and `dialog`
 * restyle those parts: what upstream's `cn-command-input-group` and `cn-command-dialog` change of
 * them, where they win. They win where they are `!important` (Nova's `h-8!`, `rounded-lg!`,
 * `shadow-none!`), and in Luma and Rhea, whose command rules follow the input group's; elsewhere
 * the input group's own rules come later and keep their values.
 *
 * cmdk writes `data-selected` and `data-disabled` as `"true"` or `"false"` on every row, so its keys
 * name the value; React Aria highlights a row with `data-focused` (`cn-command-item-aria`).
 */
import { css, relation, select } from "@kirana-style/core"

import { axes } from "../core/axes"
import { ctx } from "../core/context"
import {
  fontSize,
  fontWeight,
  leading,
  letterSpacing,
  lineHeight,
  space,
} from "../core/scales"
import { alpha, radius, surface, theme } from "../core/tokens"
import { controlIcons } from "./control"

const { nova, vega, lyra, maia, mira, luma, rhea, sera } = axes.style

/** A row, read by its shortcut and its check (`group/command-item`). */
export const commandItemScope = relation("command-item")

/** A row inside a dialog's content (`in-data-[slot=dialog-content]:`). */
const IN_DIALOG = ':is([data-slot="dialog-content"] *)'

/** A highlighted row: cmdk's `data-selected="true"`, React Aria's `data-focused`. */
const SELECTED = '[data-selected="true"]'
const FOCUSED = "[data-focused]"

/** The group holds an addon at its start (`has-[>[data-align=inline-start]]:[&>input]:pl-1.5`). */
const AFTER_START_ADDON =
  ':is([data-slot="input-group"]:has(> [data-align="inline-start"]) > *)'

export const command = {
  // cn-command and the component's own classes. Nova's and Vega's corners are `rounded-xl!`, which a
  // caller's own corners do not change.
  root: css({
    display: "flex",
    width: "100%",
    height: "100%",
    flexDirection: "column",
    overflow: "hidden",
    backgroundColor: theme.popover,
    color: theme.popoverForeground,
    borderRadius: {
      base: radius.xl,
      [lyra]: "0",
      [maia]: radius["4xl"],
      [luma]: radius["4xl"],
      [rhea]: radius["3xl"],
      [sera]: "0",
    },
    padding: { base: space[1], [lyra]: "0", [sera]: "0" },
  }),

  // cn-command-dialog and the component's own classes, over Dialog's content: a third of the way
  // down, with no padding of its own.
  dialog: css({
    top: "calc(100% / 3)",
    translate: "-50% 0",
    overflow: "hidden",
    padding: "0",
    borderRadius: { [rhea]: radius["3xl"] },
  }),

  // cn-command-input-wrapper
  inputWrapper: css({
    paddingInline: { base: space[1], [lyra]: "0" },
    paddingTop: { base: space[1], [lyra]: "0" },
    paddingBottom: { base: "0", [sera]: space[1] },
    borderBottomWidth: { [lyra]: "1px" },
    borderBottomStyle: { [lyra]: "solid" },
    borderBottomColor: { [lyra]: theme.border },
  }),

  // cn-command-input-group, over the InputGroup: filled, and in Nova, Vega and Lyra without its
  // shadow. Its focus ring reads an `input-group-control`, which the command's input is not.
  inputGroup: css({
    height: { [vega]: space[8], [mira]: space[8] },
    borderRadius: { [vega]: radius.lg },
    borderStyle: { [lyra]: "none" },
    boxShadow: { [vega]: "none" },
    backgroundColor: {
      "*": null,
      base: alpha.input30,
      [mira]: surface.controlSoft,
      [luma]: alpha.input50,
      [rhea]: alpha.input50,
      [sera]: "transparent",
    },
    paddingInline: { [sera]: space[3] },
  }),

  // cn-command-input-icon: the addon sizes it.
  inputIcon: css({ flexShrink: 0, opacity: 0.5 }),

  // cn-command-input and the component's own classes. Beside the addon at its start the group
  // draws its side in, as it does an InputGroup's input; Sera's group does not, and its input is
  // `px-2`.
  input: css({
    width: "100%",
    outlineStyle: "none",
    backgroundColor: "transparent",
    cursor: { ":disabled": "not-allowed" },
    opacity: { ":disabled": 0.5 },
    fontSize: { base: fontSize.sm, [lyra]: fontSize.xs, [mira]: fontSize.xs },
    lineHeight: {
      base: lineHeight.sm,
      [lyra]: lineHeight.xs,
      [mira]: leading.relaxed,
    },
    paddingInlineStart: {
      [AFTER_START_ADDON]: space["1.5"],
      [sera]: { base: space[2], [AFTER_START_ADDON]: space[2] },
    },
    paddingInlineEnd: { [sera]: space[2] },
    // React Aria's search field draws no clear button of its own (`[&::-webkit-search-cancel-button]:hidden`).
    "::-webkit-search-cancel-button": { display: "none" },
  }),

  // cn-command-list and the component's own classes: it scrolls without a bar (`no-scrollbar`).
  list: css({
    maxHeight: space[72],
    scrollPaddingBlock: { base: space[1], [lyra]: "0" },
    overflowX: "hidden",
    overflowY: "auto",
    outlineStyle: "none",
    scrollbarWidth: "none",
    "::-webkit-scrollbar": { display: "none" },
  }),

  // cn-command-empty
  empty: css({
    paddingBlock: space[6],
    textAlign: "center",
    fontSize: { base: fontSize.sm, [lyra]: fontSize.xs, [mira]: fontSize.xs },
    lineHeight: {
      base: lineHeight.sm,
      [lyra]: lineHeight.xs,
      [mira]: leading.relaxed,
    },
  }),

  // cn-command-group, and its heading, which cmdk renders itself (`[cmdk-group-heading]`; React
  // Aria's is a Header given the same attribute).
  group: css({
    overflow: "hidden",
    color: theme.foreground,
    padding: {
      base: space[1],
      [lyra]: "0",
      [luma]: space["1.5"],
      [sera]: space["1.5"],
    },
    [select.descendant("[cmdk-group-heading]")]: {
      color: theme.mutedForeground,
      fontSize: fontSize.xs,
      lineHeight: lineHeight.xs,
      fontWeight: {
        base: fontWeight.medium,
        [lyra]: "inherit",
        [sera]: fontWeight.semibold,
      },
      textTransform: { [sera]: "uppercase" },
      letterSpacing: { [sera]: letterSpacing.wider },
      paddingInline: {
        base: space[2],
        [maia]: space[3],
        [mira]: space["2.5"],
        [luma]: space[3],
        [sera]: space[3],
      },
      paddingBlock: {
        base: space["1.5"],
        [maia]: space[2],
        [luma]: space[2],
        [sera]: space[2],
      },
    },
  }),

  // cn-command-separator
  separator: css({
    height: "1px",
    width: { [vega]: "auto" },
    backgroundColor: {
      base: alpha.border50,
      [nova]: theme.border,
      [vega]: theme.border,
      [lyra]: theme.border,
    },
    marginInline: {
      base: `calc(${space[1]} * -1)`,
      [maia]: "0",
      [luma]: "0",
      [rhea]: "0",
      [sera]: `calc(${space["1.5"]} * -1)`,
    },
    marginBlock: {
      [maia]: space[1],
      [mira]: space[1],
      [luma]: space["1.5"],
      [rhea]: space[1],
      [sera]: space["1.5"],
    },
  }),

  // cn-command-item, cn-command-item-aria and the component's own classes. Rounder inside a dialog.
  item: css(commandItemScope.anchor, {
    position: "relative",
    display: "flex",
    cursor: "default",
    alignItems: "center",
    gap: space[2],
    outlineStyle: "none",
    userSelect: "none",
    ...controlIcons,
    [ctx.iconSize]: { base: "1rem", [mira]: "0.875rem", [sera]: "0.875rem" },
    borderRadius: {
      base: radius.sm,
      [IN_DIALOG]: radius.lg,
      [lyra]: { base: "0", [IN_DIALOG]: "0" },
      [maia]: { base: radius.lg, [IN_DIALOG]: radius["2xl"] },
      [mira]: { base: radius.md, [IN_DIALOG]: radius.md },
      [luma]: { base: radius["2xl"], [IN_DIALOG]: radius["3xl"] },
      [rhea]: { base: radius.xl, [IN_DIALOG]: radius["2xl"] },
      [sera]: { base: "0", [IN_DIALOG]: "0" },
    },
    paddingInline: {
      base: space[2],
      [maia]: space[3],
      [mira]: space["2.5"],
      [luma]: space[3],
      [sera]: space[3],
    },
    paddingBlock: {
      base: space["1.5"],
      [lyra]: space[2],
      [maia]: space[2],
      [luma]: space[2],
      [sera]: space[2],
    },
    minHeight: { [mira]: space[7], [rhea]: space[7] },
    fontSize: { base: fontSize.sm, [lyra]: fontSize.xs, [mira]: fontSize.xs },
    lineHeight: {
      base: lineHeight.sm,
      [lyra]: lineHeight.xs,
      [mira]: leading.relaxed,
    },
    fontWeight: { [luma]: fontWeight.medium },
    backgroundColor: { [SELECTED]: theme.muted, [FOCUSED]: theme.muted },
    color: { [SELECTED]: theme.foreground, [FOCUSED]: theme.foreground },
    pointerEvents: { '[data-disabled="true"]': "none" },
    opacity: { '[data-disabled="true"]': 0.5 },
  }),

  // cn-command-item-indicator (no rules of its own) and the component's own classes: the check at a
  // row's end, shown on a checked row, left out beside a shortcut.
  itemIndicator: css({
    marginInlineStart: "auto",
    opacity: { base: 0, [commandItemScope.within('[data-checked="true"]')]: 1 },
    display: {
      [commandItemScope.within(':has([data-slot="command-shortcut"])')]: "none",
    },
  }),

  // cn-command-shortcut, cn-command-shortcut-aria: in the row's colour while it is highlighted.
  shortcut: css({
    marginInlineStart: "auto",
    fontSize: { base: fontSize.xs, [mira]: "0.625rem" },
    lineHeight: { base: lineHeight.xs, [mira]: "inherit" },
    letterSpacing: letterSpacing.widest,
    color: {
      base: theme.mutedForeground,
      [commandItemScope.within(SELECTED)]: theme.foreground,
      [commandItemScope.within(FOCUSED)]: theme.foreground,
    },
  }),
}
