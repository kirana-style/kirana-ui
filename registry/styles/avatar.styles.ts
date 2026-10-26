/**
 * Avatar, in every style: shadcn/ui's `bases/base/ui/avatar.tsx` and `bases/aria/ui/avatar.tsx`
 * with the `cn-avatar-*` rules of its style files (MIT), at commit `481d523`. The styles draw it
 * alike but for the group's count, whose text is smaller in Lyra and Mira.
 *
 * The root anchors `avatarScope`, read by the fallback and the badge for the size
 * (`group-data-[size=sm]/avatar:`); the group anchors `avatarGroup`, read by the avatars in it and by
 * its count (`group-has-data-[size=lg]/avatar-group:`). React Aria has no avatar: its image marks a
 * failed load with `data-state="error"` and hides itself, and the fallback beside it shows only then
 * (`peer-data-[state=error]:flex peer-[*]:hidden`).
 */
import { css, relation, select } from "@kirana-style/core"

import { axes, DARK_SCHEME } from "../core/axes"
import { ctx } from "../core/context"
import { fontSize, leading, lineHeight, space } from "../core/scales"
import { radius, theme } from "../core/tokens"

const { lyra, mira } = axes.style

/** The avatar, read by its fallback and badge (`group/avatar`). */
export const avatarScope = relation("avatar")
/** A group of avatars, read by the avatars in it and its count (`group/avatar-group`). */
export const avatarGroup = relation("avatar-group")
/** React Aria's image, read by the fallback after it (`peer`). */
export const avatarImage = relation("avatar-image")

const SM = avatarScope.within('[data-size="sm"]')
const LG = avatarScope.within('[data-size="lg"]')
const DEFAULT = avatarScope.within('[data-size="default"]')
const GROUP_HAS_SM = avatarGroup.within(
  ':has([data-slot="avatar"][data-size="sm"])'
)
const GROUP_HAS_LG = avatarGroup.within(
  ':has([data-slot="avatar"][data-size="lg"])'
)
/** A child of a group: `*:` on the group. */
const IN_GROUP = avatarGroup.parent()

/** `ring-2 ring-background`. */
const RING = `0 0 0 2px ${theme.background}`

export const avatar = {
  // cn-avatar and the component's own classes: a hairline drawn over the image, blended so it
  // reads on any picture (`after:mix-blend-darken dark:after:mix-blend-lighten`).
  root: css(avatarScope.anchor, {
    position: "relative",
    display: "flex",
    flexShrink: 0,
    userSelect: "none",
    borderRadius: radius.full,
    width: {
      base: space[8],
      '[data-size="lg"]': space[10],
      '[data-size="sm"]': space[6],
    },
    height: {
      base: space[8],
      '[data-size="lg"]': space[10],
      '[data-size="sm"]': space[6],
    },
    // `*:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background` and `-space-x-2` on the
    // group: each avatar over the one after it.
    boxShadow: { [IN_GROUP]: RING },
    marginInlineEnd: {
      [IN_GROUP]: { base: `calc(${space[2]} * -1)`, ":last-child": "0" },
    },
    "::after": {
      content: "''",
      position: "absolute",
      inset: 0,
      borderRadius: radius.full,
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: theme.border,
      mixBlendMode: {
        base: "darken",
        [DARK_SCHEME]: { base: "lighten", [axes.mode.light]: "darken" },
        [axes.mode.dark]: "lighten",
      },
    },
  }),

  // cn-avatar-image and the component's own classes.
  image: css(avatarImage.anchor, {
    aspectRatio: "1 / 1",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: radius.full,
    // React Aria's: a picture that failed to load gives way to the fallback.
    display: { '[data-state="error"]': "none" },
  }),

  // cn-avatar-fallback and the component's own classes.
  fallback: css({
    display: "flex",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.full,
    backgroundColor: theme.muted,
    color: theme.mutedForeground,
    fontSize: { base: fontSize.sm, [SM]: fontSize.xs },
    lineHeight: { base: lineHeight.sm, [SM]: lineHeight.xs },
  }),

  /** React Aria's fallback: shown only once the image beside it failed. */
  fallbackAfterImage: css({
    display: {
      [avatarImage.after()]: {
        base: "none",
        [avatarImage.after('[data-state="error"]')]: "flex",
      },
    },
  }),

  // cn-avatar-badge and the component's own classes: a dot at the corner, with room for an icon
  // from the default size up.
  badge: css({
    position: "absolute",
    right: 0,
    bottom: 0,
    zIndex: 10,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.full,
    backgroundColor: theme.primary,
    color: theme.primaryForeground,
    backgroundBlendMode: "color",
    boxShadow: RING,
    userSelect: "none",
    width: { [SM]: space[2], [DEFAULT]: space["2.5"], [LG]: space[3] },
    height: { [SM]: space[2], [DEFAULT]: space["2.5"], [LG]: space[3] },
    [select.child("svg")]: {
      display: { [SM]: "none" },
      width: { [DEFAULT]: space[2], [LG]: space[2] },
      height: { [DEFAULT]: space[2], [LG]: space[2] },
    },
  }),

  // cn-avatar-group and the component's own classes.
  group: css(avatarGroup.anchor, { display: "flex" }),

  // cn-avatar-group-count and the component's own classes, sized like the group's avatars.
  // A group with small avatars sizes its count small, even beside large ones, as upstream's order
  // does.
  groupCount: css({
    marginInlineEnd: {
      [IN_GROUP]: { base: `calc(${space[2]} * -1)`, ":last-child": "0" },
    },
    position: "relative",
    display: "flex",
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.full,
    backgroundColor: theme.muted,
    color: theme.mutedForeground,
    boxShadow: RING,
    fontSize: { base: fontSize.sm, [lyra]: fontSize.xs, [mira]: fontSize.xs },
    lineHeight: {
      base: lineHeight.sm,
      [lyra]: lineHeight.xs,
      [mira]: leading.relaxed,
    },
    width: {
      base: space[8],
      [GROUP_HAS_LG]: { base: space[10], [GROUP_HAS_SM]: space[6] },
      [GROUP_HAS_SM]: space[6],
    },
    height: {
      base: space[8],
      [GROUP_HAS_LG]: { base: space[10], [GROUP_HAS_SM]: space[6] },
      [GROUP_HAS_SM]: space[6],
    },
    [ctx.iconSize]: {
      base: "1rem",
      [GROUP_HAS_LG]: { base: "1.25rem", [GROUP_HAS_SM]: "0.75rem" },
      [GROUP_HAS_SM]: "0.75rem",
    },
    [select.child("svg")]: { width: ctx.iconSize, height: ctx.iconSize },
  }),
}
