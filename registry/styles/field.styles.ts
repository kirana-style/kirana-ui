/**
 * Field and its parts, in every style: shadcn/ui's `bases/base/ui/field.tsx` (`bases/aria`'s differs
 * only in the checked state it reads) with the `cn-field-*` rules of its style files (MIT), at
 * commit `25af02b`. Nova is the base look; the other styles override what differs.
 *
 * Upstream draws its style rules in a layer below its components' own classes, so where both set a
 * property the component's class wins: a description's `leading-normal` over Lyra's `/relaxed`, its
 * `last:mt-0` over the legend's pull. The values here are the ones that win.
 *
 * Different from upstream on purpose:
 * - `*:w-full` reaches a vertical field's children as a contextual style, which a child's own width
 *   overrides; the label and title, whose own width is `w-fit`, ask whether they are its child;
 * - `has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px` arrives with the
 *   checkbox and radio, which will read it.
 */
import { css, relation, select } from "@kirana-style/core"

import { axes } from "../core/axes"
import {
  fontSize,
  fontWeight,
  leading,
  letterSpacing,
  lineHeight,
  space,
} from "../core/scales"
import { alpha, radius, surface, theme } from "../core/tokens"
import { GROUP_MD, focusRing, laterRings } from "./control"
import {
  CHILD_OF_RESPONSIVE,
  fieldScope,
  fillInField,
} from "./field-scope.styles"

const { nova, vega, lyra, maia, mira, luma, rhea, sera } = axes.style

/** A legend, read by the description that follows it (`[[data-variant=legend]+&]`). */
export const fieldLegend = relation("field-legend")
/** A FieldGroup, read by a group directly inside it (`*:data-[slot=field-group]:`). */
export const fieldGroup = relation("field-group")

const VERTICAL = '[data-orientation="vertical"]'
const HORIZONTAL = '[data-orientation="horizontal"]'
const RESPONSIVE = '[data-orientation="responsive"]'
/** A field holding a FieldContent block aligns to the top of it. */
const HAS_CONTENT = ':has(> [data-slot="field-content"])'
/** A label wrapping a whole Field: a choice card. */
const CARD = ':has(> [data-slot="field"])'
/**
 * A part that is a field's own child, by the field's orientation (the field's `*:` rules, asked of
 * the part): it fills a vertical field (`CHILD_OF_VERTICAL`, `fillInField`, in `field-scope.styles.ts`) and
 * grows in a horizontal one.
 */
const CHILD_OF_HORIZONTAL = fieldScope.parent(HORIZONTAL)

const inDisabledField = fieldScope.within('[data-disabled="true"]')

export const field = {
  // cn-field-set
  set: css({
    display: "flex",
    flexDirection: "column",
    gap: {
      base: space[4],
      [vega]: space[6],
      [maia]: space[6],
      [luma]: space[6],
      [rhea]: space[6],
      [sera]: space[6],
      ':has(> [data-slot="checkbox-group"])': space[3],
      ':has(> [data-slot="radio-group"])': space[3],
    },
  }),

  // cn-field-legend: a legend, or a legend drawn as a label.
  legend: css(fieldLegend.anchor, {
    marginBottom: {
      base: space["1.5"],
      [vega]: space[3],
      [lyra]: space["2.5"],
      [maia]: space[3],
      [mira]: space[2],
      [luma]: space[3],
      [rhea]: space[3],
      [sera]: space[3],
    },
    // Sera's legend is a semibold `text-xs` in capitals, whichever its variant.
    fontWeight: { base: fontWeight.medium, [sera]: fontWeight.semibold },
    textTransform: { [sera]: "uppercase" },
    fontSize: {
      '[data-variant="legend"]': {
        base: fontSize.base,
        [lyra]: fontSize.sm,
        [mira]: fontSize.sm,
        [sera]: fontSize.xs,
      },
      '[data-variant="label"]': {
        base: fontSize.sm,
        [lyra]: fontSize.xs,
        [mira]: fontSize.xs,
        [sera]: fontSize.xs,
      },
    },
    lineHeight: {
      '[data-variant="legend"]': {
        base: lineHeight.base,
        [lyra]: lineHeight.sm,
        [mira]: lineHeight.sm,
        [sera]: lineHeight.xs,
      },
      '[data-variant="label"]': {
        base: lineHeight.sm,
        [lyra]: lineHeight.xs,
        [mira]: leading.relaxed,
        [sera]: lineHeight.xs,
      },
    },
  }),

  // cn-field-group: its width is the container the responsive orientation asks about.
  group: css(fieldGroup.anchor, {
    containerType: "inline-size",
    containerName: "field-group",
    display: "flex",
    width: "100%",
    flexDirection: "column",
    // A group inside a group is `gap-4` in every style.
    gap: {
      base: space[5],
      [fieldGroup.parent()]: space[4],
      [vega]: space[7],
      [maia]: space[7],
      [mira]: space[4],
      [luma]: space[7],
      [rhea]: space[6],
      [sera]: space[10],
      '[data-slot="checkbox-group"]': space[3],
    },
  }),

  // cn-field and its orientations (cn-field-orientation-vertical, cn-field-orientation-horizontal,
  // cn-field-orientation-responsive).
  root: css(fieldScope.anchor, {
    display: "flex",
    width: "100%",
    gap: {
      base: space[2],
      [vega]: space[3],
      [maia]: space[3],
      [luma]: space[3],
      [rhea]: space[3],
      [sera]: space[3],
    },
    color: { '[data-invalid="true"]': theme.destructive },
    flexDirection: {
      [VERTICAL]: "column",
      [HORIZONTAL]: "row",
      [RESPONSIVE]: { base: "column", [GROUP_MD]: "row" },
    },
    alignItems: {
      [HORIZONTAL]: { base: "center", [HAS_CONTENT]: "flex-start" },
      [RESPONSIVE]: {
        [GROUP_MD]: { base: "center", [HAS_CONTENT]: "flex-start" },
      },
    },
    // `*:w-full`. The conditions are the field's: a target's own state goes in its selector.
    [select.child(":not([hidden])")]: {
      width: {
        [VERTICAL]: "100%",
        [RESPONSIVE]: { base: "100%", [GROUP_MD]: "auto" },
      },
    },
  }),

  // cn-field-content
  content: css({
    display: "flex",
    flex: 1,
    flexDirection: "column",
    gap: {
      base: space["0.5"],
      [vega]: space[1],
      [maia]: space[1],
      [luma]: space[1],
      [rhea]: space[1],
      [sera]: space[1],
    },
    lineHeight: leading.snug,
  }),

  // cn-field-label, over Label's own style. A label holding a whole Field is a choice card.
  label: css({
    display: "flex",
    gap: space[2],
    lineHeight: { base: leading.snug, [sera]: leading.relaxed },
    width: { ...fillInField, [CARD]: "100%" },
    flex: {
      [CHILD_OF_HORIZONTAL]: "auto",
      [CHILD_OF_RESPONSIVE]: { [GROUP_MD]: "auto" },
    },
    opacity: { [inDisabledField]: 0.5 },
    flexDirection: { [CARD]: "column" },
    borderRadius: {
      [CARD]: {
        base: radius.lg,
        [vega]: radius.md,
        [lyra]: "0",
        [maia]: radius.xl,
        [mira]: radius.md,
        [luma]: radius["2xl"],
        [rhea]: radius["2xl"],
        [sera]: "0",
      },
    },
    borderWidth: { [CARD]: "1px" },
    borderStyle: { [CARD]: "solid" },
    borderColor: {
      [CARD]: {
        base: theme.border,
        // A chosen card keeps its edge while focused.
        ":has(:focus-visible)": {
          base: theme.ring,
          ":has([data-checked])": surface.checkedSoftBorder,
          ":has([data-selected])": surface.checkedSoftBorder,
        },
        ":has([data-checked])": surface.checkedSoftBorder,
        ":has([data-selected])": surface.checkedSoftBorder,
        // Mira, Luma and Rhea keep the plain edge when chosen; Sera's does not turn on focus.
        [mira]: { base: theme.border, ":has(:focus-visible)": theme.ring },
        [luma]: { base: theme.border, ":has(:focus-visible)": theme.ring },
        [rhea]: { base: theme.border, ":has(:focus-visible)": theme.ring },
        [sera]: {
          base: theme.border,
          ":has([data-checked])": surface.checkedSoftBorder,
          ":has([data-selected])": surface.checkedSoftBorder,
        },
      },
    },
    backgroundColor: {
      [CARD]: {
        // Hovered while nothing inside is disabled; a chosen card keeps its tint.
        ":not(:has(:disabled, [data-disabled])):hover": {
          base: alpha.muted50,
          [maia]: alpha.input40,
          [mira]: alpha.input40,
          [luma]: alpha.input40,
          [rhea]: alpha.input40,
          ":has([data-checked])": surface.checkedSoft,
          ":has([data-selected])": surface.checkedSoft,
        },
        ":has([data-checked])": surface.checkedSoft,
        ":has([data-selected])": surface.checkedSoft,
        // Luma and Rhea tint a chosen card with `input/30`.
        [luma]: {
          ":has([data-checked])": alpha.input30,
          ":has([data-selected])": alpha.input30,
          ":not(:has(:disabled, [data-disabled])):hover": {
            base: alpha.input40,
            ":has([data-checked])": alpha.input30,
            ":has([data-selected])": alpha.input30,
          },
        },
        [rhea]: {
          ":has([data-checked])": alpha.input30,
          ":has([data-selected])": alpha.input30,
          ":not(:has(:disabled, [data-disabled])):hover": {
            base: alpha.input40,
            ":has([data-checked])": alpha.input30,
            ":has([data-selected])": alpha.input30,
          },
        },
      },
    },
    // Luma and Rhea keep the first four's `ring-ring/50` here.
    boxShadow: {
      [CARD]: {
        ":has(:focus-visible)": focusRing(
          alpha.ring50,
          laterRings(alpha.ring30, {
            luma: `0 0 0 3px ${alpha.ring50}`,
            rhea: `0 0 0 3px ${alpha.ring50}`,
          })
        ),
      },
    },
    // `*:data-[slot=field]:p-2.5`: a Field child exists only on a card, so no card condition.
    [select.child('[data-slot="field"]')]: {
      padding: {
        base: space["2.5"],
        [vega]: space[3],
        [lyra]: space[2],
        [maia]: space[4],
        [mira]: space[2],
        [luma]: space[4],
        [rhea]: space[4],
        [sera]: space[4],
      },
    },
  }),

  // cn-field-title: a label's look on a `div`.
  title: css({
    display: "flex",
    width: fillInField,
    flex: { [CHILD_OF_HORIZONTAL]: "auto" },
    alignItems: "center",
    gap: space[2],
    fontSize: {
      base: fontSize.sm,
      [lyra]: fontSize.xs,
      [mira]: fontSize.xs,
      [sera]: fontSize.xs,
    },
    // Sera's `leading-normal` comes before its `text-xs`, which `cn` keeps.
    lineHeight: {
      base: leading.snug,
      [lyra]: leading.relaxed,
      [mira]: leading.relaxed,
      [sera]: lineHeight.xs,
    },
    // Lyra's title has no weight of its own; Sera's is semibold, in capitals.
    fontWeight: {
      [nova]: fontWeight.medium,
      [vega]: fontWeight.medium,
      [maia]: fontWeight.medium,
      [mira]: fontWeight.medium,
      [luma]: fontWeight.medium,
      [rhea]: fontWeight.medium,
      [sera]: fontWeight.semibold,
    },
    textTransform: { [sera]: "uppercase" },
    opacity: { [inDisabledField]: 0.5 },
  }),

  // cn-field-description and the component's own classes: `leading-normal` wins in every style.
  description: css({
    textAlign: "start",
    color: theme.mutedForeground,
    fontSize: { base: fontSize.sm, [lyra]: fontSize.xs, [mira]: fontSize.xs },
    lineHeight: leading.normal,
    fontWeight: fontWeight.normal,
    // Plain text inside Sera's capitalised labels.
    textTransform: { [sera]: "none" },
    letterSpacing: { [sera]: letterSpacing.normal },
    textWrap: {
      [fieldScope.within(':has([data-orientation="horizontal"])')]: "balance",
    },
    // Pulled up under a legend; tightened above the control it describes, flush at the end.
    marginTop: {
      [fieldLegend.after('[data-variant="legend"]')]:
        `calc(${space["1.5"]} * -1)`,
      ":nth-last-child(2)": `calc(${space[1]} * -1)`,
      ":last-child": "0",
    },
    [select.child("a")]: {
      textDecorationLine: "underline",
      textUnderlineOffset: "4px",
    },
    [select.child("a:hover")]: { color: theme.primary },
  }),

  // cn-field-separator: a rule across the group, with optional text over its middle.
  separator: css({
    position: "relative",
    marginBlock: `calc(${space[2]} * -1)`,
    height: space[5],
    fontSize: { base: fontSize.sm, [lyra]: fontSize.xs, [mira]: fontSize.xs },
    lineHeight: {
      base: lineHeight.sm,
      [lyra]: lineHeight.xs,
      [mira]: leading.relaxed,
    },
  }),
  separatorLine: css({ position: "absolute", inset: 0, top: "50%" }),
  // cn-field-separator-content
  separatorContent: css({
    position: "relative",
    marginInline: "auto",
    display: "block",
    width: "fit-content",
    backgroundColor: theme.background,
    paddingInline: space[2],
    color: theme.mutedForeground,
  }),

  // cn-field-error
  error: css({
    color: theme.destructive,
    fontSize: { base: fontSize.sm, [lyra]: fontSize.xs, [mira]: fontSize.xs },
    lineHeight: {
      base: lineHeight.sm,
      [lyra]: lineHeight.xs,
      [mira]: leading.relaxed,
    },
    fontWeight: fontWeight.normal,
  }),
  errorList: css({
    marginInlineStart: space[4],
    display: "flex",
    flexDirection: "column",
    gap: space[1],
    listStyleType: "disc",
  }),
}
