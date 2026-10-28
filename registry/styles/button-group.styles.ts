/**
 * Button Group, in every style: shadcn/ui's `bases/base/ui/button-group.tsx` and
 * `bases/aria/ui/button-group.tsx` with the `cn-button-group*` rules of its style files (MIT). Nova
 * is the base look; the other styles override what differs.
 *
 * The group joins what it holds: square where two parts meet, its own corners at the ends, one
 * border between. Upstream's group reaches into its parts for that; here each part that can be
 * grouped (Button, Input, Select's trigger, Input Group, the group's text) reads where it sits
 * (`joinedInButtonGroup`, `./scope.styles.ts`), since Kirana writes a reach into children below the
 * child's own style. React Aria's group reaches into every descendant upstream (`**:`); here it
 * joins its own children, as Base UI's.
 */
import { css, recipe, select } from "@kirana-style/core"

import { axes } from "../core/axes"
import {
  fontSize,
  fontWeight,
  leading,
  lineHeight,
  shadow,
  space,
  spacing,
} from "../core/scales"
import { orientation, when } from "../core/states"
import { radius, theme } from "../core/tokens"
import { fillInField } from "./field-scope.styles"
import { FOCUSED_IN_BUTTON_GROUP, joinedInButtonGroup } from "./scope.styles"

const { vega, lyra, maia, mira, luma, rhea, sera } = axes.style

export const buttonGroup = {
  // cn-button-group and its orientations: apart when it holds groups of its own.
  root: recipe({
    base: {
      display: "flex",
      alignItems: "stretch",
      // A group inside a group joins its neighbours too.
      ...joinedInButtonGroup,
      gap: { ':has(> [data-slot="button-group"])': space[2] },
    },
    variants: {
      // The parts' corners and borders of both are `joinedInButtonGroup`'s.
      orientation: {
        // cn-button-group-orientation-horizontal
        horizontal: {},
        // cn-button-group-orientation-vertical
        vertical: { flexDirection: "column" },
      },
    },
    defaultVariants: { orientation: "horizontal" },
  }),

  // `w-fit`, filling a vertical Field as its child (the field's `*:w-full`): a handle of its own,
  // since a recipe cannot read another module's relation.
  width: css({ width: fillInField }),

  // cn-button-group-text: Sera's is a line under the text, in small spaced capitals.
  text: css({
    display: "flex",
    alignItems: "center",
    gap: space[2],
    paddingInline: space["2.5"],
    borderWidth: "1px",
    // Sera's `group-has-[>[data-variant=outline]]/button-group:border-border` names a group the
    // ButtonGroup never declares, so upstream never applies it: the line stays the input's.
    borderColor: { base: theme.border, [sera]: "transparent" },
    borderBottomColor: { [sera]: theme.input },
    borderRadius: {
      base: radius.lg,
      [vega]: radius.md,
      [lyra]: "0",
      [maia]: radius["4xl"],
      [mira]: radius.md,
      [luma]: radius["4xl"],
      [rhea]: radius["2xl"],
      [sera]: "0",
    },
    ...joinedInButtonGroup,
    ...FOCUSED_IN_BUTTON_GROUP,
    backgroundColor: { base: theme.muted, [sera]: "transparent" },
    boxShadow: { [vega]: shadow.xs },
    fontSize: {
      base: fontSize.sm,
      [lyra]: fontSize.xs,
      [mira]: fontSize.xs,
      [sera]: fontSize.xs,
    },
    lineHeight: {
      base: lineHeight.sm,
      [lyra]: lineHeight.xs,
      [mira]: leading.relaxed,
      [sera]: lineHeight.xs,
    },
    fontWeight: { base: fontWeight.medium, [sera]: fontWeight.semibold },
    textTransform: { [sera]: "uppercase" },
    [select.descendant("svg")]: {
      pointerEvents: "none",
      width: { base: space[4], [sera]: spacing(3.5) },
      height: { base: space[4], [sera]: spacing(3.5) },
    },
  }),

  // cn-button-group-separator, over the separator's own look.
  separator: css({
    position: "relative",
    alignSelf: "stretch",
    backgroundColor: theme.input,
    marginInline: { ...when(orientation.horizontal, "1px") },
    width: { ...when(orientation.horizontal, "auto") },
    marginBlock: { ...when(orientation.vertical, "1px") },
    height: { ...when(orientation.vertical, "auto") },
  }),
}
