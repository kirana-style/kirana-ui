/**
 * The page a component sits on: `<html>` carries the colour scheme (every colour is a `light-dark()`
 * pair), `<body>` the background, text colour and font, as shadcn/ui's base layer sets them. A page
 * applies them with `root` (`core/root.ts`) and `axes.anchor` on `<html>`.
 */
import { css } from "@kirana-style/core"

import { containerSize, space } from "../core/scales"
import { font, theme } from "../core/tokens"

export const page = {
  // The system's scheme unless the page chose one (`data-mode`, as the site's colour mode writes it).
  document: css({
    colorScheme: {
      base: "light dark",
      '[data-mode="light"]': "light",
      '[data-mode="dark"]': "dark",
    },
  }),
  // Upstream's `bg-surface dark:bg-background` where a preview asks for its surface: the site's
  // `oklch(0.98 0 0)` between the background and the muted fill, the background in the dark.
  body: css({
    backgroundColor: {
      base: theme.background,
      ":is([data-surface] *)": `light-dark(color-mix(in oklab, ${theme.muted} 66%, ${theme.background}), ${theme.background})`,
    },
    color: theme.foreground,
    // A charts gallery's frame: the chart's card 1px in, so its edge shows (`CHARTS_ATTRIBUTE`).
    padding: { ":is([data-charts] *)": "1px" },
    // Upstream reads its right-to-left demos in Noto Sans Arabic and Hebrew (`[data-lang]`); a
    // preview page loads the family with the language.
    fontFamily: {
      base: font.sans,
      ":lang(he)": {
        base: `"Noto Sans Hebrew Variable", ${font.sans}`,
        ":lang(ar)": `"Noto Sans Arabic Variable", ${font.sans}`,
      },
      ":lang(ar)": `"Noto Sans Arabic Variable", ${font.sans}`,
    },
  }),
  // A demo's frame on its preview page, in every framework, as upstream's component preview
  // frames one (`flex w-full justify-center items-center p-10`): the demo in the middle of the
  // page, its own width (`w-full max-w-sm`) filling the frame. A block brings its own.
  example: css({
    display: "flex",
    width: "100%",
    // A demo the React showcase draws among its cards (`data-showcase`) takes only its own size.
    minHeight: { base: "100dvh", ":is([data-showcase] *)": "auto" },
    alignItems: "center",
    justifyContent: "center",
    padding: { base: space[10], ":is([data-showcase] *)": 0 },
  }),
  // A docs demo's width in that frame where upstream's preview narrows it (`*:max-w-xs`).
  narrow: css({ width: "100%", maxWidth: containerSize.xs }),
}
