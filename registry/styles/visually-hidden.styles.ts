/**
 * Text only a screen reader reaches, replacing Tailwind's `sr-only`: the name of an icon-only
 * control, such as a dialog's close button.
 */
import { css } from "@kirana-style/core"

export const visuallyHidden = css({
  position: "absolute",
  width: "1px",
  height: "1px",
  // Caps the box where a parent sets its children's width, as a vertical Field does.
  maxWidth: "1px",
  padding: 0,
  margin: "-1px",
  overflow: "hidden",
  // `rect(0 0 0 0)` rather than `display: none`, so the text stays in the accessibility tree.
  clipPath: "rect(0 0 0 0)",
  whiteSpace: "nowrap",
  borderWidth: 0,
})
