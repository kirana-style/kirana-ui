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
  // A demo's frame on its preview page, in every framework, as upstream's component preview
  // frames one (`flex w-full justify-center items-center p-10`): the demo in the middle of the
  // page, its own width (`w-full max-w-sm`) filling the frame. A block brings its own.
  example: css({
    display: "flex",
    width: "100%",
    minHeight: "100dvh",
    alignItems: "center",
    justifyContent: "center",
    padding: space[10],
  }),
}
