/**
 * Resizable, in every style: shadcn/ui's `bases/base/ui/resizable.tsx` and
 * `bases/aria/ui/resizable.tsx` (the same on both, over `react-resizable-panels`) with the
 * `cn-resizable*` rules of its style files (MIT). Only the handle's grip differs by style: square in
 * Lyra and Sera.
 *
 * A group of stacked panels, and the handle between them, which lies across, its wider hit area
 * too: each base marks them in its own way (`resizable`, in `core/states.ts`).
 */
import { css, select } from "@kirana-style/core"

import { axes } from "../core/axes"
import { space } from "../core/scales"
import { resizable as orientation, when } from "../core/states"
import { radius, theme } from "../core/tokens"

const { lyra, sera } = axes.style

export const resizable = {
  // cn-resizable-panel-group
  group: css({
    display: "flex",
    height: "100%",
    width: "100%",
    flexDirection: when(orientation.stacked, "column"),
  }),
  // cn-resizable-handle
  handle: css({
    position: "relative",
    display: "flex",
    width: { base: "1px", ...when(orientation.across, "100%") },
    height: when(orientation.across, "1px"),
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
      left: { base: "50%", ...when(orientation.across, "0") },
      width: { base: space[1], ...when(orientation.across, "100%") },
      height: when(orientation.across, space[1]),
      translate: { base: "-50% 0", ...when(orientation.across, "0 -50%") },
    },
    // The grip turns with the handle.
    [select.child("div")]: { rotate: when(orientation.across, "90deg") },
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
