/**
 * The page a component sits on: `<html>` carries the colour scheme (every colour is a `light-dark()`
 * pair), `<body>` the background, text colour and font, as shadcn/ui's base layer sets them. A page
 * applies them with `root` (`core/root.ts`) and `axes.anchor` on `<html>`.
 */
import { css } from "@kirana-style/core"

import { space } from "../core/scales"
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
  body: css({
    backgroundColor: theme.background,
    color: theme.foreground,
    fontFamily: font.sans,
  }),
  // A demo's frame on its preview page, in every framework; a block brings its own.
  example: css({ padding: space[6] }),
  // Around a demo on its preview page, as upstream's component previews centre theirs: the page's
  // height, the demo in its middle. The preview route adds it; an installed demo does not have it.
  demo: css({
    display: "flex",
    minHeight: "100dvh",
    alignItems: "center",
    justifyContent: "center",
  }),
}
