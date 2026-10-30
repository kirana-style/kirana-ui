/**
 * Questionnaire, in every style: shadcn/ui's `bases/base/ui/questionnaire.tsx` and
 * `bases/aria/ui/questionnaire.tsx` over `@shadcn/react/questionnaire`, with the `cn-questionnaire*`
 * rules of its style files (MIT). Nova is the base look; the other styles override what differs.
 *
 * A choice is a card around a hidden native input: it writes its type (`data-type`), whether it is
 * checked, invalid or disabled, and anchors `questionnaireChoiceScope`, which its indicator and
 * shortcut read. Its free-text input draws as Input (`input.styles.ts`, whose rules upstream's
 * repeat), and its actions as Buttons.
 */
import { css, relation } from "@kirana-style/core"

import { DARK_SCHEME, axes } from "../core/axes"
import { ctx } from "../core/context"
import {
  breakpoint,
  duration,
  easing,
  fontFamily,
  fontSize,
  fontWeight,
  leading,
  letterSpacing,
  lineHeight,
  shadow,
  space,
  spacing,
} from "../core/scales"
import { alpha, font, radius, surface, theme } from "../core/tokens"

const { vega, lyra, maia, mira, luma, rhea, sera } = axes.style

/** A choice, read by its indicator and shortcut (`group/questionnaire-choice`). */
export const questionnaireChoiceScope = relation("questionnaire-choice")

const CHECKED = questionnaireChoiceScope.within("[data-checked]")
const RADIO = questionnaireChoiceScope.within('[data-type="radio"]')
const CHECKBOX = questionnaireChoiceScope.within('[data-type="checkbox"]')
const WITH_DESCRIPTION = questionnaireChoiceScope.within(
  ':has([data-slot="questionnaire-choice-description"])'
)
const WITH_SHORTCUT = questionnaireChoiceScope.within("[data-shortcut]")

const INPUT_FOCUSED = ":has(> input:focus-visible)"

/** `translate-y-[--spacing(0.45)]`, `translate-y-0.5` beside a description: level with the text. */
const LEVEL = {
  base: `0 ${spacing(0.45)}`,
  [WITH_DESCRIPTION]: `0 ${spacing(0.5)}`,
}

/** `light-dark(<light>, <dark>)`. */
const mode = (light: string, dark: string) => `light-dark(${light}, ${dark})`

/** `size-2 dark:size-2.5`: in the dark, by the system's scheme or the design's mode. */
const DARK_DOT = {
  [DARK_SCHEME]: { base: spacing(2.5), [axes.mode.light]: space[2] },
  [axes.mode.dark]: spacing(2.5),
}

/** A choice's fill for the styles that tint with the input colour. */
const INPUT_HOVER = {
  base: "transparent",
  ":hover": alpha.input40,
  "[data-checked]": { base: alpha.primary10, ":hover": alpha.primary10 },
}

/** An action Button's place in the row: `min-h-11 sm:min-h-0`. */
const action = (column: number, justify: "start" | "end") =>
  ({
    gridColumnStart: column,
    gridRowStart: 1,
    justifySelf: justify,
    minHeight: { base: space[11], [breakpoint.sm]: "0" },
  }) as const

export const questionnaire = {
  // cn-questionnaire
  root: css({
    display: "flex",
    width: "100%",
    minWidth: "0",
    flexDirection: "column",
    gap: {
      base: space[4],
      [vega]: space[6],
      [maia]: space[6],
      [luma]: space[6],
      [rhea]: space[6],
      [sera]: space[6],
    },
  }),
  // cn-questionnaire-progress
  progress: css({
    minHeight: "1lh",
    width: "fit-content",
    minWidth: "14ch",
    fontWeight: fontWeight.medium,
    color: theme.mutedForeground,
    fontVariantNumeric: "tabular-nums",
    fontSize: { base: fontSize.xs, [mira]: "0.625rem" },
    lineHeight: { base: lineHeight.xs, [mira]: "inherit" },
    textTransform: { [sera]: "uppercase" },
    letterSpacing: { [sera]: letterSpacing.wide },
  }),
  // cn-questionnaire-item
  item: css({
    minWidth: "0",
    borderWidth: "0",
    padding: "0",
    outlineStyle: "none",
    display: "flex",
    flexDirection: "column",
    gap: {
      base: space[4],
      [vega]: space[5],
      [maia]: space[5],
      [mira]: space[3],
      [luma]: space[5],
      [rhea]: space[5],
      [sera]: space[5],
    },
  }),
  // cn-questionnaire-title and cn-font-heading
  title: css({
    fontFamily: font.heading,
    textWrap: "pretty",
    fontSize: {
      base: fontSize.base,
      [lyra]: fontSize.sm,
      [mira]: fontSize.sm,
      [sera]: fontSize.xs,
    },
    lineHeight: {
      base: leading.snug,
      [vega]: lineHeight.base,
      [lyra]: lineHeight.sm,
      [maia]: lineHeight.base,
      [mira]: lineHeight.sm,
      [luma]: lineHeight.base,
      [rhea]: lineHeight.base,
      [sera]: lineHeight.xs,
    },
    fontWeight: {
      base: fontWeight.medium,
      [vega]: fontWeight.semibold,
      [maia]: fontWeight.semibold,
      [mira]: fontWeight.semibold,
      [luma]: fontWeight.semibold,
      [rhea]: fontWeight.semibold,
      [sera]: fontWeight.semibold,
    },
    textTransform: { [sera]: "uppercase" },
    letterSpacing: { [sera]: letterSpacing.wide },
    // Spaced from the choices when no description follows.
    marginBottom: {
      ':not(:has(~ [data-slot="questionnaire-description"]))': {
        base: space[4],
        [vega]: space[5],
        [maia]: space[5],
        [mira]: space[3],
        [luma]: space[5],
        [rhea]: space[5],
        [sera]: space[5],
      },
    },
  }),
  // cn-questionnaire-description
  description: css({
    textWrap: "pretty",
    color: theme.mutedForeground,
    fontSize: { base: fontSize.sm, [lyra]: fontSize.xs, [mira]: fontSize.xs },
    lineHeight: {
      base: lineHeight.sm,
      [lyra]: leading.relaxed,
      [mira]: leading.relaxed,
    },
    textTransform: { [sera]: "none" },
    letterSpacing: { [sera]: letterSpacing.normal },
  }),
  // cn-questionnaire-choices
  choices: css({
    display: "grid",
    minWidth: "0",
    gap: {
      base: space[2],
      [vega]: space[3],
      [maia]: space[3],
      [mira]: spacing(1.5),
      [luma]: space[3],
      [rhea]: space[3],
      [sera]: space[3],
    },
  }),
  // cn-questionnaire-choice
  choice: css(questionnaireChoiceScope.anchor, {
    position: "relative",
    display: "flex",
    minHeight: space[11],
    cursor: { base: "pointer", "[data-disabled]": "not-allowed" },
    alignItems: "flex-start",
    textAlign: "start",
    outlineStyle: "none",
    userSelect: "none",
    pointerEvents: { "[data-disabled]": "none" },
    opacity: { "[data-disabled]": 0.5 },
    transitionProperty: "color, background-color, border-color",
    transitionDuration: duration[150],
    transitionTimingFunction: easing.inOut,
    gap: {
      base: spacing(2.5),
      [vega]: space[3],
      [maia]: space[3],
      [rhea]: space[3],
      [sera]: space[3],
    },
    paddingInline: {
      base: space[3],
      [vega]: space[4],
      [maia]: space[4],
      [luma]: space[4],
      [rhea]: space[4],
      [sera]: space[4],
    },
    paddingBlock: {
      base: spacing(2.5),
      [vega]: spacing(3.5),
      [maia]: spacing(3.5),
      [luma]: space[3],
      [rhea]: space[3],
      [sera]: space[4],
    },
    fontSize: { base: fontSize.sm, [lyra]: fontSize.xs, [mira]: fontSize.xs },
    lineHeight: {
      base: lineHeight.sm,
      [lyra]: lineHeight.xs,
      [mira]: leading.relaxed,
    },
    borderRadius: {
      base: radius.lg,
      [vega]: radius.md,
      [lyra]: "0",
      [maia]: radius["4xl"],
      [mira]: radius.xl,
      [luma]: radius["3xl"],
      [rhea]: radius["2xl"],
      [sera]: "0",
    },
    borderWidth: "1px",
    borderColor: {
      base: theme.input,
      "[data-checked]": {
        base: alpha.primary40,
        [lyra]: `color-mix(in oklab, ${theme.foreground} 30%, transparent)`,
        [sera]: surface.checkedSoftBorder,
        "[data-invalid]": theme.destructive,
      },
      "[data-invalid]": theme.destructive,
      // Focus outlines in the ring's colour, over an invalid edge; Sera draws no focus edge, so its
      // invalid one stays.
      [INPUT_FOCUSED]: {
        base: theme.ring,
        [sera]: { base: theme.input, "[data-invalid]": theme.destructive },
      },
    },
    backgroundColor: {
      base: mode("transparent", alpha.input20),
      ":hover": alpha.muted50,
      "[data-checked]": { base: theme.muted, ":hover": theme.muted },
      [lyra]: {
        base: "transparent",
        ":hover": alpha.muted50,
        "[data-checked]": { base: theme.muted, ":hover": theme.muted },
      },
      [maia]: INPUT_HOVER,
      [mira]: INPUT_HOVER,
      [luma]: INPUT_HOVER,
      [rhea]: INPUT_HOVER,
      [sera]: {
        base: "transparent",
        ":hover": alpha.muted50,
        "[data-checked]": {
          base: surface.checkedSoft,
          ":hover": surface.checkedSoft,
        },
      },
    },
    boxShadow: {
      [vega]: shadow.xs,
      [INPUT_FOCUSED]: {
        base: `0 0 0 3px ${alpha.ring50}`,
        [vega]: `0 0 0 3px ${alpha.ring50}, ${shadow.xs}`,
        [lyra]: `0 0 0 1px ${alpha.ring50}`,
        [mira]: `0 0 0 2px ${alpha.ring30}`,
        [sera]: `0 0 0 2px ${alpha.ring30}`,
      },
    },
  }),
  // cn-questionnaire-choice-input: the native input, invisible over the card.
  choiceInput: css({
    position: "absolute",
    inset: "0",
    zIndex: 10,
    width: "100%",
    height: "100%",
    cursor: "pointer",
    opacity: 0,
  }),
  // cn-questionnaire-choice-indicator: a box, or a circle for a radio.
  indicator: css({
    pointerEvents: "none",
    position: "relative",
    display: "flex",
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    width: { base: space[4], [sera]: spacing(4.5) },
    height: { base: space[4], [sera]: spacing(4.5) },
    translate: LEVEL,
    borderWidth: "1px",
    borderColor: {
      base: theme.input,
      [CHECKED]: { base: theme.primary, [sera]: theme.foreground },
      [luma]: { base: "transparent", [CHECKED]: theme.primary },
      [rhea]: { base: "transparent", [CHECKED]: theme.primary },
      [sera]: { [CHECKBOX]: { [CHECKED]: theme.primary } },
    },
    borderRadius: {
      base: "4px",
      [RADIO]: radius.full,
      [lyra]: { base: "0", [RADIO]: radius.full },
      [maia]: { base: "6px", [RADIO]: radius.full },
      [luma]: { base: "5px", [RADIO]: radius.full },
      [rhea]: { base: "5px", [RADIO]: radius.full },
      [sera]: { base: "0", [RADIO]: radius.full },
    },
    backgroundColor: {
      base: mode("transparent", alpha.input30),
      [CHECKED]: theme.primary,
      [lyra]: { base: "transparent", [CHECKED]: theme.primary },
      [luma]: { base: alpha.input90, [CHECKED]: theme.primary },
      [rhea]: { base: alpha.input90, [CHECKED]: theme.primary },
      [sera]: {
        base: "transparent",
        [CHECKED]: "transparent",
        [CHECKBOX]: { [CHECKED]: theme.primary },
      },
    },
    color: {
      [CHECKED]: theme.primaryForeground,
      [sera]: { [CHECKBOX]: { [CHECKED]: theme.primaryForeground } },
    },
  }),
  // cn-questionnaire-choice-indicator-dot: a checked radio's dot.
  dot: css({
    display: {
      base: "none",
      [CHECKED]: { base: "block", [CHECKBOX]: "none" },
    },
    borderRadius: radius.full,
    width: space[2],
    height: space[2],
    backgroundColor: {
      base: theme.primaryForeground,
      [sera]: theme.foreground,
    },
  }),
  // Luma's and Rhea's dot grows in the dark: `dark:size-2.5`.
  dotDark: css({
    width: { [luma]: DARK_DOT, [rhea]: DARK_DOT },
    height: { [luma]: DARK_DOT, [rhea]: DARK_DOT },
  }),
  // cn-questionnaire-choice-indicator-check: a checked box's tick.
  check: css({
    display: {
      base: "none",
      [CHECKED]: { base: "block", [RADIO]: "none" },
    },
    width: spacing(3.5),
    height: spacing(3.5),
  }),
  // cn-questionnaire-choice-label and cn-questionnaire-choice-content
  label: css({
    display: "flex",
    minWidth: "0",
    flex: "1 1 0%",
    flexDirection: "column",
    lineHeight: leading.snug,
    gap: {
      base: spacing(0.5),
      [vega]: space[1],
      [maia]: space[1],
      [luma]: space[1],
      [rhea]: space[1],
      [sera]: space[1],
    },
  }),
  // cn-questionnaire-choice-shortcut and cn-questionnaire-shortcut: the key that picks it.
  shortcut: css({
    pointerEvents: "none",
    marginInlineStart: "auto",
    display: { base: "none", [WITH_SHORTCUT]: "inline-flex" },
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    width: { base: space[5], [lyra]: space[4], [mira]: space[4] },
    height: { base: space[5], [lyra]: space[4], [mira]: space[4] },
    translate: LEVEL,
    borderWidth: "1px",
    borderColor: {
      base: theme.input,
      [luma]: alpha.primary10,
      [rhea]: alpha.primary10,
    },
    borderRadius: {
      base: radius.md,
      [lyra]: "0",
      [maia]: radius.full,
      [mira]: radius.sm,
      [luma]: radius.full,
      [rhea]: radius.full,
      [sera]: "0",
    },
    backgroundColor: {
      base: theme.background,
      [maia]: `color-mix(in oklab, ${theme.background} 80%, transparent)`,
      [mira]: `color-mix(in oklab, ${theme.background} 80%, transparent)`,
      [luma]: `color-mix(in oklab, ${theme.background} 80%, transparent)`,
      [rhea]: `color-mix(in oklab, ${theme.background} 80%, transparent)`,
    },
    boxShadow: { [vega]: shadow.xs },
    color: theme.mutedForeground,
    fontFamily: fontFamily.mono,
    fontSize: { base: "0.625rem", [mira]: "0.5625rem" },
    fontWeight: fontWeight.medium,
    lineHeight: "1",
  }),
  // cn-questionnaire-choice-description
  choiceDescription: css({ color: theme.mutedForeground }),
  // cn-questionnaire-input-wrapper
  inputWrapper: css({ position: "relative", minWidth: "0", width: "100%" }),
  // cn-questionnaire-input, over Input's look: `min-h-11 sm:min-h-0`, its own transition.
  input: css({
    minHeight: { base: space[11], [breakpoint.sm]: "0" },
    width: "100%",
    minWidth: "0",
    transitionProperty: {
      "*": null,
      base: "color, box-shadow, background-color",
    },
    pointerEvents: { ":disabled": "none" },
    cursor: { ":disabled": "not-allowed" },
    opacity: { ":disabled": 0.5 },
  }),
  // cn-questionnaire-error
  error: css({
    color: theme.destructive,
    marginTop: { base: space[2], [vega]: "0" },
    fontSize: { base: fontSize.sm, [lyra]: fontSize.xs, [mira]: fontSize.xs },
    lineHeight: {
      base: lineHeight.sm,
      [lyra]: lineHeight.xs,
      [mira]: leading.relaxed,
    },
  }),
  // cn-questionnaire-actions
  actions: css({
    display: "grid",
    // The component's own `min-h-11` outranks each style's `sm:min-h-*`.
    minHeight: space[11],
    width: "100%",
    gridTemplateColumns: "minmax(0, 1fr) auto auto",
    alignItems: "center",
    gap: { base: space[2], [lyra]: spacing(1.5), [mira]: spacing(1.5) },
  }),
  // cn-questionnaire-previous
  previous: css(action(1, "start")),
  // cn-questionnaire-skip
  skip: css(action(2, "end")),
  // cn-questionnaire-next and cn-questionnaire-submit
  next: css(action(3, "end")),
  // The tick's size inside the indicator.
  checkIcon: css({ [ctx.iconSize]: spacing(3.5) }),
}
