/**
 * What `<html>` takes in a project that installs the design system: the colour scheme (every colour
 * is a `light-dark()` pair), the page's background, text colour and font, as shadcn/ui's base layer
 * sets them, the root tokens for every axis (`root.ts`) and the anchor the components' axis reads
 * resolve against (`axes.ts`). `kirana-style ui init` puts it on `<html>`.
 */
import { css } from "@kirana-style/core"

import { axes } from "./axes"
import { root } from "./root"
import { font, theme } from "./tokens"

const html = css({
  // The system's scheme unless the page chose one (`data-mode`, as the site's colour mode writes it).
  colorScheme: {
    base: "light dark",
    '[data-mode="light"]': "light",
    '[data-mode="dark"]': "dark",
  },
  backgroundColor: theme.background,
  color: theme.foreground,
  fontFamily: font.sans,
})

export const htmlStyles = [html, root, axes.anchor]
