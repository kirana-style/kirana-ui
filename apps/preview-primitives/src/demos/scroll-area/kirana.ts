import { css } from "@kirana-style/core"

import { theme } from "../../tokens.ts"

export default {
  root: css({
    position: "relative",
    width: "16rem",
    height: "10rem",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: theme.line,
    borderRadius: "0.5rem",
  }),
  // The element that scrolls: the keyboard reaches it when there is more to see.
  viewport: css({
    height: "100%",
    borderRadius: "0.5rem",
    overscrollBehavior: "contain",
    outlineWidth: "2px",
    outlineStyle: { base: "none", ":focus-visible": "solid" },
    outlineColor: theme.ring,
    outlineOffset: "2px",
  }),
  content: css({
    display: "grid",
    gap: "0.5rem",
    paddingBlock: "0.75rem",
    paddingInline: "1rem",
  }),
  title: css({ margin: "0", fontWeight: "500" }),
  text: css({ margin: "0", color: theme.quiet }),
  // Shown while the pointer is over the area, and while it scrolls.
  scrollbar: css({
    position: "absolute",
    insetBlock: "0.25rem",
    insetInlineEnd: "0.25rem",
    width: "0.25rem",
    opacity: { base: "0", "[data-hovering]": "1", "[data-scrolling]": "1" },
    transitionProperty: "opacity",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
  }),
  // Its height and its place are the component's to write.
  thumb: css({
    width: "100%",
    borderRadius: "9999px",
    backgroundColor: theme.quiet,
  }),
}
