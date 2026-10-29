/**
 * Input Group, in every style: shadcn/ui's `bases/base/ui/input-group.tsx` and
 * `bases/aria/ui/input-group.tsx` with the `cn-input-group*` rules of its style files (MIT). Nova
 * is the base look; the other styles override what differs.
 *
 * The group draws the field (border, fill, rings) around an Input or a Textarea that draws none,
 * and the addons, buttons and text beside it. Upstream's group reaches into its input
 * (`has-[>[data-align=inline-end]]:[&>input]:pr-1.5`), which Kirana would write below the input's
 * own padding, so the input reads the group instead (`inputGroupScope.parent(…)`); a Kbd in an
 * addon reads the addon the same way (`kbd.styles.ts`). Upstream's `[.border-b]` and `[.border-t]`
 * rules read a class a caller adds, which a Kirana style has no name for, and are left out. The
 * group's look inside a combobox's popup is Combobox's (`combobox.input`), and inside a command,
 * Command's (`command.inputGroup`).
 */
import { css, recipe, select } from "@kirana-style/core"

import { axes } from "../core/axes"
import { ctx } from "../core/context"
import {
  duration,
  easing,
  fontSize,
  fontWeight,
  leading,
  lineHeight,
  shadow,
  space,
  spacing,
} from "../core/scales"
import { alpha, radius, radiusBase, surface, theme } from "../core/tokens"
import {
  IN_OUTLINE_BUTTON_GROUP,
  inputGroupAddonScope,
  inputGroupScope,
  joinedInButtonGroup,
} from "./scope.styles"

const { nova, vega, lyra, maia, mira, luma, rhea, sera } = axes.style

/** The group holds a focused control, or an invalid one. */
const FOCUSED = ':has([data-slot="input-group-control"]:focus-visible)'
const INVALID = ':has([data-slot][aria-invalid="true"])'
/** An addon on that side of the group, as its own child. */
const HAS = (align: string) => `:has(> [data-align="${align}"])`
const BLOCK = `:is(${HAS("block-start")}, ${HAS("block-end")})`
/** An addon above or below, at any depth (`has-data-[align=block-*]`). */
const BLOCK_INSIDE =
  ':has([data-align="block-start"], [data-align="block-end"])'
const DISABLED_GROUP = inputGroupScope.within('[data-disabled="true"]')

/** `{ "*": null, base }`: the value over every entry of the part it restyles. */
const only = <T>(value: T) => ({ "*": null, base: value })

/** A focused group's ring of `width` in `color`, and the invalid one over it. */
const rings = (width: string, color: string) => ({
  base: `0 0 0 ${width} ${color}`,
  [INVALID]: `0 0 0 ${width} ${surface.ringInvalid}`,
})

/** The same, over Vega's `shadow-xs`. */
const ringsOverShadow = (width: string, color: string) => ({
  base: `0 0 0 ${width} ${color}, ${shadow.xs}`,
  [INVALID]: `0 0 0 ${width} ${surface.ringInvalid}, ${shadow.xs}`,
})

export const inputGroup = {
  // cn-input-group and the component's own classes.
  root: css(inputGroupScope.anchor, {
    position: "relative",
    display: "flex",
    width: "100%",
    minWidth: 0,
    alignItems: "center",
    outlineStyle: "none",
    flexDirection: { [BLOCK]: "column" },
    height: {
      base: space[8],
      [vega]: space[9],
      [maia]: space[9],
      [mira]: space[7],
      [luma]: space[9],
      [sera]: space[10],
      ":has(> textarea)": "auto",
      [BLOCK]: "auto",
    },
    borderWidth: "1px",
    borderStyle: "solid",
    borderRadius: {
      base: radius.lg,
      [vega]: radius.md,
      [lyra]: "0",
      [maia]: {
        base: radius["4xl"],
        // An addon above or below outranks a textarea, as upstream's rules order them.
        ":has(textarea)": radius.xl,
        [BLOCK_INSIDE]: {
          base: radius["2xl"],
          ":has(textarea)": radius["2xl"],
        },
      },
      [mira]: radius.md,
      [luma]: {
        base: radius["4xl"],
        ":has(textarea)": radius["2xl"],
        [BLOCK_INSIDE]: {
          base: radius["3xl"],
          ":has(textarea)": radius["3xl"],
        },
      },
      [rhea]: radius["2xl"],
      [sera]: "0",
    },
    ...joinedInButtonGroup,
    // Beside an outline part in a ButtonGroup, Sera's has room (`*:data-[slot=input-group]:px-2.5`).
    paddingInline: { [sera]: { [IN_OUTLINE_BUTTON_GROUP]: space["2.5"] } },
    // Invalid outranks focused; Luma and Rhea draw no border until then, Sera only its bottom one.
    borderColor: {
      base: theme.input,
      [FOCUSED]: { base: theme.ring, [INVALID]: theme.destructive },
      [INVALID]: theme.destructive,
      [luma]: {
        base: "transparent",
        // Beside an outline part, upstream's `has-[>[data-variant=outline]]:` border.
        [IN_OUTLINE_BUTTON_GROUP]: {
          base: theme.border,
          [FOCUSED]: { base: theme.ring, [INVALID]: theme.destructive },
          [INVALID]: theme.destructive,
        },
        [FOCUSED]: { base: theme.ring, [INVALID]: theme.destructive },
        [INVALID]: theme.destructive,
      },
      [rhea]: {
        base: "transparent",
        [IN_OUTLINE_BUTTON_GROUP]: {
          base: theme.border,
          [FOCUSED]: { base: theme.ring, [INVALID]: theme.destructive },
          [INVALID]: theme.destructive,
        },
        [FOCUSED]: { base: theme.ring, [INVALID]: theme.destructive },
        [INVALID]: theme.destructive,
      },
      [sera]: {
        base: "transparent",
        [IN_OUTLINE_BUTTON_GROUP]: {
          base: theme.border,
          [FOCUSED]: { base: theme.ring, [INVALID]: "transparent" },
          [INVALID]: "transparent",
        },
        [FOCUSED]: { base: "transparent", [INVALID]: "transparent" },
        [INVALID]: "transparent",
      },
    },
    borderBottomColor: {
      [sera]: {
        base: theme.input,
        [FOCUSED]: { base: theme.ring, [INVALID]: surface.borderInvalid },
        [INVALID]: surface.borderInvalid,
      },
    },
    // The focus ring, the invalid one over it, and Vega's `shadow-xs` under both.
    boxShadow: {
      [vega]: shadow.xs,
      [FOCUSED]: {
        ...rings("3px", alpha.ring50),
        [vega]: ringsOverShadow("3px", alpha.ring50),
        [lyra]: rings("1px", alpha.ring50),
        [mira]: rings("2px", alpha.ring30),
        [luma]: rings("3px", alpha.ring30),
        [rhea]: rings("3px", alpha.ring30),
        [sera]: { base: "none", [INVALID]: "none" },
      },
      [INVALID]: {
        base: `0 0 0 3px ${surface.ringInvalid}`,
        [vega]: `0 0 0 3px ${surface.ringInvalid}, ${shadow.xs}`,
        [lyra]: `0 0 0 1px ${surface.ringInvalid}`,
        [mira]: `0 0 0 2px ${surface.ringInvalid}`,
        [sera]: "none",
      },
    },
    // `dark:bg-input/30`, filled while it holds a disabled control in Nova and Lyra.
    backgroundColor: {
      base: surface.control,
      ":has(:disabled)": surface.controlDisabled,
      [vega]: { ":has(:disabled)": surface.control },
      [maia]: { base: alpha.input30, ":has(:disabled)": alpha.input30 },
      [mira]: {
        base: surface.controlSoft,
        ":has(:disabled)": surface.controlSoft,
      },
      [luma]: { base: alpha.input50, ":has(:disabled)": alpha.input50 },
      [rhea]: { base: alpha.input50, ":has(:disabled)": alpha.input50 },
      [sera]: { base: "transparent", ":has(:disabled)": "transparent" },
    },
    opacity: {
      [nova]: { ":has(:disabled)": 0.5 },
      [lyra]: { ":has(:disabled)": 0.5 },
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

  // The addon, read by a Kbd inside it (`kbd.styles.ts`).
  addonScope: css(inputGroupAddonScope.anchor),

  // cn-input-group-addon and its `align` variant.
  addon: recipe({
    base: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "text",
      userSelect: "none",
      height: "auto",
      gap: { base: space[2], [mira]: space[1] },
      paddingBlock: {
        base: spacing(1.5),
        [maia]: space[2],
        [mira]: space[2],
        [luma]: space[2],
        [sera]: space[2],
      },
      color: theme.mutedForeground,
      fontSize: {
        base: fontSize.sm,
        [lyra]: fontSize.xs,
        [mira]: fontSize.xs,
      },
      lineHeight: {
        base: lineHeight.sm,
        [lyra]: lineHeight.xs,
        [mira]: leading.relaxed,
      },
      fontWeight: fontWeight.medium,
      opacity: { [DISABLED_GROUP]: 0.5 },
      // `[&>svg:not([class*='size-'])]:size-4`, `size-3.5` in Mira and Sera.
      [select.child("svg")]: {
        width: { base: space[4], [mira]: spacing(3.5), [sera]: spacing(3.5) },
        height: { base: space[4], [mira]: spacing(3.5), [sera]: spacing(3.5) },
      },
    },
    variants: {
      align: {
        // cn-input-group-addon-align-inline-start (Sera's inline rules are commented out upstream: none)
        "inline-start": {
          order: -9999,
          paddingInlineStart: {
            base: space[2],
            [maia]: space[3],
            [luma]: space[3],
            [sera]: "0",
          },
          marginInlineStart: {
            ":has(> button)": {
              base: "-0.3rem",
              [vega]: `calc(${space[1]} * -1)`,
              [maia]: `calc(${space[1]} * -1)`,
              [mira]: "-0.275rem",
              [luma]: `calc(${space[1]} * -1)`,
              [sera]: "0",
              // Beside a button and a Kbd both, the button's.
              ":has(> kbd)": {
                base: "-0.3rem",
                [vega]: `calc(${space[1]} * -1)`,
                [maia]: `calc(${space[1]} * -1)`,
                [mira]: "-0.275rem",
                [luma]: `calc(${space[1]} * -1)`,
                [sera]: "0",
              },
            },
            ":has(> kbd)": {
              base: "-0.15rem",
              [mira]: "-0.275rem",
              [luma]: `calc(${space[1]} * -1)`,
              [sera]: "0",
            },
          },
        },
        // cn-input-group-addon-align-inline-end
        "inline-end": {
          order: 9999,
          paddingInlineEnd: {
            base: space[2],
            [maia]: space[3],
            [luma]: space[3],
            [sera]: "0",
          },
          marginInlineEnd: {
            ":has(> button)": {
              base: "-0.3rem",
              [vega]: `calc(${space[1]} * -1)`,
              [maia]: `calc(${space[1]} * -1)`,
              [mira]: "-0.275rem",
              [luma]: `calc(${space[1]} * -1)`,
              [sera]: "0",
              // Beside a button and a Kbd both, the button's.
              ":has(> kbd)": {
                base: "-0.3rem",
                [vega]: `calc(${space[1]} * -1)`,
                [maia]: `calc(${space[1]} * -1)`,
                [mira]: "-0.275rem",
                [luma]: `calc(${space[1]} * -1)`,
                [sera]: "0",
              },
            },
            ":has(> kbd)": {
              base: "-0.15rem",
              [mira]: "-0.275rem",
              [luma]: `calc(${space[1]} * -1)`,
              [sera]: "0",
            },
          },
        },
        // cn-input-group-addon-align-block-start
        "block-start": {
          order: -9999,
          width: "100%",
          justifyContent: "flex-start",
          paddingInline: {
            base: space["2.5"],
            [maia]: space[3],
            [mira]: space[2],
            [luma]: space[3],
            [sera]: "0",
          },
          paddingBlockStart: {
            base: space[2],
            [maia]: space[3],
            [luma]: space[3],
            [sera]: space[3],
            [inputGroupScope.parent(":has(> input)")]: {
              base: space[2],
              [maia]: space[3],
              [luma]: spacing(3.5),
              [sera]: spacing(3.5),
            },
          },
        },
        // cn-input-group-addon-align-block-end
        "block-end": {
          order: 9999,
          width: "100%",
          justifyContent: "flex-start",
          paddingInline: {
            base: space["2.5"],
            [maia]: space[3],
            [mira]: space[2],
            [luma]: space[3],
            [sera]: "0",
          },
          paddingBlockEnd: {
            base: space[2],
            [maia]: space[3],
            [luma]: space[3],
            [sera]: space[3],
            [inputGroupScope.parent(":has(> input)")]: {
              base: space[2],
              [maia]: space[3],
              [luma]: spacing(3.5),
              [sera]: spacing(3.5),
            },
          },
        },
      },
    },
    defaultVariants: { align: "inline-start" },
  }),

  // cn-input-group-button and its sizes, over a ghost Button: each replaces the Button's own.
  button: recipe({
    base: {
      display: "flex",
      alignItems: "center",
      boxShadow: only("none"),
      gap: only(space[2]),
      fontSize: {
        "*": null,
        base: fontSize.sm,
        [lyra]: fontSize.xs,
        [mira]: fontSize.xs,
      },
      lineHeight: {
        "*": null,
        base: lineHeight.sm,
        [lyra]: lineHeight.xs,
        [mira]: leading.relaxed,
      },
      borderRadius: {
        [maia]: radius["4xl"],
        [mira]: radius.md,
        [luma]: radius["4xl"],
        [rhea]: radius["2xl"],
        [sera]: "0",
      },
    },
    variants: {
      size: {
        // cn-input-group-button-size-xs
        xs: {
          height: { "*": null, base: space[6], [mira]: space[5] },
          [ctx.iconSize]: { base: "0.875rem", [mira]: "0.75rem" },
          gap: only(space[1]),
          paddingInline: { "*": null, base: spacing(1.5), [mira]: space[1] },
          borderRadius: {
            "*": null,
            base: `calc(${radiusBase.value} - 3px)`,
            [vega]: `calc(${radiusBase.value} - 5px)`,
            [lyra]: "0",
            [maia]: radius["4xl"],
            [mira]: `calc(${radius.sm} - 2px)`,
            [luma]: radius.xl,
            [rhea]: radius.xl,
            [sera]: "0",
          },
          fontSize: { [sera]: fontSize.xs },
          lineHeight: { [sera]: lineHeight.xs },
        },
        // cn-input-group-button-size-sm: the Button's own size, with Lyra's and Mira's gap.
        sm: { gap: { [lyra]: space[1], [mira]: space[1] } },
        // cn-input-group-button-size-icon-xs
        "icon-xs": {
          width: only(space[6]),
          height: only(space[6]),
          paddingInlineStart: only("0"),
          paddingInlineEnd: only("0"),
          paddingBlock: only("0"),
          borderRadius: {
            "*": null,
            base: `calc(${radiusBase.value} - 3px)`,
            [vega]: `calc(${radiusBase.value} - 5px)`,
            [lyra]: "0",
            [maia]: radius["4xl"],
            [mira]: radius.md,
            [luma]: radius.xl,
            [rhea]: radius.xl,
            [sera]: "0",
          },
          fontSize: { [sera]: fontSize.xs },
          lineHeight: { [sera]: lineHeight.xs },
        },
        // cn-input-group-button-size-icon-sm
        "icon-sm": {
          width: {
            "*": null,
            base: space[8],
            [lyra]: space[7],
            [mira]: space[7],
          },
          height: {
            "*": null,
            base: space[8],
            [lyra]: space[7],
            [mira]: space[7],
          },
          paddingInlineStart: only("0"),
          paddingInlineEnd: only("0"),
          paddingBlock: only("0"),
        },
      },
    },
    defaultVariants: { size: "xs" },
  }),

  // cn-input-group-text
  text: css({
    display: "flex",
    alignItems: "center",
    gap: space[2],
    color: theme.mutedForeground,
    fontSize: { base: fontSize.sm, [lyra]: fontSize.xs, [mira]: fontSize.xs },
    lineHeight: {
      base: lineHeight.sm,
      [lyra]: lineHeight.xs,
      [mira]: leading.relaxed,
    },
    [select.descendant("svg")]: {
      pointerEvents: "none",
      width: { base: space[4], [sera]: spacing(3.5) },
      height: { base: space[4], [sera]: spacing(3.5) },
    },
  }),

  // cn-input-group-input, over the Input: the group draws the field. Beside an addon, its side
  // draws in (the group's `[&>input]:p*-*`; Sera's own `group-has-[…]:p*-2`).
  input: css({
    flex: 1,
    borderWidth: only("0"),
    borderRadius: only("0"),
    backgroundColor: only("transparent"),
    boxShadow: only("none"),
    paddingInlineStart: {
      [inputGroupScope.parent(HAS("inline-start"))]: {
        base: spacing(1.5),
        [sera]: space[2],
      },
    },
    paddingInlineEnd: {
      [inputGroupScope.parent(HAS("inline-end"))]: {
        base: spacing(1.5),
        [sera]: space[2],
      },
    },
    paddingBlockStart: {
      [inputGroupScope.parent(HAS("block-end"))]: space[3],
    },
    paddingBlockEnd: {
      [inputGroupScope.parent(HAS("block-start"))]: space[3],
    },
  }),

  // cn-input-group-textarea, over the Textarea.
  textarea: css({
    flex: 1,
    resize: only("none"),
    borderWidth: only("0"),
    borderRadius: only("0"),
    backgroundColor: only("transparent"),
    boxShadow: only("none"),
    paddingBlock: {
      "*": null,
      base: space[2],
      [luma]: spacing(2.5),
      [sera]: spacing(2.5),
    },
  }),
}
