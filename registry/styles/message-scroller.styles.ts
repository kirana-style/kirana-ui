/**
 * Message Scroller, in every style: shadcn/ui's `bases/base/ui/message-scroller.tsx` and
 * `bases/aria/ui/message-scroller.tsx` over `@shadcn/react/message-scroller`, with the
 * `cn-message-scroller*` rules of its style files (MIT). Only the content's gap differs by style.
 *
 * The scroll button is a Button the part renders, sliding in from the edge it scrolls to while
 * there is more to scroll (`data-active`).
 */
import { css, select } from "@kirana-style/core"

import { axes } from "../core/axes"
import { duration, space } from "../core/scales"
import { theme } from "../core/tokens"
import { scrollFadeB } from "./scroll-fade.styles"

const { vega, maia, luma, rhea, sera } = axes.style

const ACTIVE = '[data-active="true"]'
const IDLE = '[data-active="false"]'
const AT_END = '[data-direction="end"]'
const AT_START = '[data-direction="start"]'

/**
 * Its slide: centred on the scroller, off its edge while idle, and pressed in 1px as Button is
 * (`active:translate-y-px`, which Tailwind composes with the centring and Kirana would not: the
 * Button's own pressed `translate` would drop the `-50%`, and the button jump sideways).
 */
const slide = (x: string) => ({
  base: `${x} 0`,
  ":active": `${x} 1px`,
  [IDLE]: { [AT_END]: `${x} 100%`, [AT_START]: `${x} -100%` },
})

export const messageScroller = {
  // cn-message-scroller
  root: css({
    position: "relative",
    display: "flex",
    width: "100%",
    height: "100%",
    minHeight: "0",
    flexDirection: "column",
    overflow: "hidden",
  }),
  // cn-message-scroller-viewport
  viewport: css(scrollFadeB, {
    width: "100%",
    height: "100%",
    minHeight: "0",
    minWidth: "0",
    scrollbarWidth: "thin",
    scrollbarGutter: "stable",
    scrollbarColor: { "[data-autoscrolling]": "transparent transparent" },
    overflowY: "auto",
    overscrollBehavior: "contain",
    contain: "content",
    visibility: { "[data-pending-scroll]": "hidden" },
  }),
  // cn-message-scroller-content
  content: css({
    display: "flex",
    height: "max-content",
    minHeight: "100%",
    flexDirection: "column",
    gap: {
      base: space[6],
      [vega]: space[8],
      [maia]: space[8],
      [luma]: space[8],
      [rhea]: space[8],
      [sera]: space[8],
    },
  }),
  // cn-message-scroller-item
  item: css({
    minWidth: "0",
    flexShrink: 0,
    containIntrinsicSize: "auto 10rem",
    contentVisibility: "auto",
  }),
  // cn-message-scroller-button, over the Button it renders.
  button: css({
    position: "absolute",
    insetInlineStart: "50%",
    translate: { "*": null, ...slide("-50%"), ":dir(rtl)": slide("50%") },
    scale: { [IDLE]: "0.95", [ACTIVE]: "1" },
    opacity: { [IDLE]: 0, [ACTIVE]: 1 },
    pointerEvents: { [IDLE]: "none" },
    bottom: { [AT_END]: space[4] },
    top: { [AT_START]: space[4] },
    borderColor: { "*": null, base: theme.border },
    backgroundColor: {
      "*": null,
      base: theme.background,
      ":hover": theme.muted,
    },
    color: { "*": null, base: theme.foreground, ":hover": theme.foreground },
    transitionProperty: { "*": null, base: "translate, scale, opacity" },
    transitionDuration: { "*": null, base: duration[200], [IDLE]: "400ms" },
    transitionTimingFunction: {
      "*": null,
      [IDLE]: "cubic-bezier(0.7, 0, 0.84, 0)",
      [ACTIVE]: "cubic-bezier(0.23, 1, 0.32, 1)",
    },
    // `data-[direction=start]:[&_svg]:rotate-180`: the arrow points up.
    [select.descendant("svg")]: { rotate: { [AT_START]: "180deg" } },
  }),
}
