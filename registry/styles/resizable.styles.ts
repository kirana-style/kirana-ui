/**
 * Resizable, in every style: shadcn/ui's `bases/base/ui/resizable.tsx` and
 * `bases/aria/ui/resizable.tsx` (the same on both, over `react-resizable-panels`) with the
 * `cn-resizable*` rules of its style files (MIT). Only the handle's grip differs by style: square in
 * Lyra and Sera.
 *
 * The library marks a vertical group `aria-orientation="vertical"`, and a handle between stacked
 * panels `aria-orientation="horizontal"`: the handle lies across, its wider hit area too.
 */
import { css, select } from "@kirana-style/core"

import { axes } from "../core/axes"
import { space } from "../core/scales"
import { radius, theme } from "../core/tokens"

const { lyra, sera } = axes.style

const VERTICAL = '[aria-orientation="vertical"]'
const ACROSS = '[aria-orientation="horizontal"]'

export const resizable = {
  // cn-resizable-panel-group
  group: css({
    display: "flex",
    height: "100%",
    width: "100%",
    flexDirection: { [VERTICAL]: "column" },
  }),
  // cn-resizable-handle
  handle: css({
    position: "relative",
    display: "flex",
    width: { base: "1px", [ACROSS]: "100%" },
    height: { [ACROSS]: "1px" },
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.border,
    outlineStyle: { ":focus-visible": "none" },
    boxShadow: { ":focus-visible": `0 0 0 1px ${theme.ring}` },
    // A wider area to grab, centred on the line.
    "::after": {
      content: "''",
      position: "absolute",
      top: "0",
      bottom: "0",
      left: { base: "50%", [ACROSS]: "0" },
      width: { base: space[1], [ACROSS]: "100%" },
      height: { [ACROSS]: space[1] },
      translate: { base: "-50% 0", [ACROSS]: "0 -50%" },
    },
    // The grip turns with the handle.
    [select.child("div")]: { rotate: { [ACROSS]: "90deg" } },
  }),
  // cn-resizable-handle-icon
  grip: css({
    zIndex: 10,
    display: "flex",
    flexShrink: 0,
    height: space[6],
    width: space[1],
    borderRadius: { base: radius.lg, [lyra]: "0", [sera]: "0" },
    backgroundColor: theme.border,
  }),
}
