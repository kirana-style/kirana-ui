import { css } from "@kirana-style/core"

import { theme } from "../../tokens.ts"

export default {
  root: css({ display: "grid", gap: "0.5rem", width: "14rem" }),
  header: css({ display: "flex", justifyContent: "space-between" }),
  label: css({ fontWeight: "500" }),
  value: css({ color: theme.quiet, fontVariantNumeric: "tabular-nums" }),
  // What a pointer presses and drags on: taller than the track, so it is easy to hit.
  control: css({
    display: "flex",
    height: "1rem",
    alignItems: "center",
    cursor: "pointer",
  }),
  track: css({
    position: "relative",
    width: "100%",
    height: "0.25rem",
    borderRadius: "9999px",
    backgroundColor: theme.line,
  }),
  // Its length is the component's to write.
  indicator: css({ borderRadius: "9999px", backgroundColor: theme.accent }),
  // Its place on the track is the component's to write.
  thumb: css({
    width: "1rem",
    height: "1rem",
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: theme.accent,
    borderRadius: "9999px",
    backgroundColor: theme.surface,
    outlineWidth: "2px",
    outlineStyle: { base: "none", ":focus-visible": "solid" },
    outlineColor: theme.ring,
    outlineOffset: "2px",
  }),
}
