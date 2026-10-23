/**
 * What every app's `<html>` needs for the colour mode: its classes in a mode, and a script that
 * puts the saved mode on it before the first paint.
 */
import { props as styleProps } from "@kirana-style/core"

import { schemeMarker } from "@workspace/ui/theme/scheme-marker"
import { themeStyles } from "@workspace/ui/theme/theme-provider"
import { THEME_MODES } from "@workspace/ui/theme/themes"
import type { ThemeMode } from "@workspace/ui/theme/themes"

import { THEME_COOKIE } from "./theme-mode"

/**
 * `<html>`'s classes in a mode: its theme (`color-scheme`) and the anchor the theme controls read.
 * Spread with `data-mode={mode}`.
 */
export function themeDocumentProps(mode: ThemeMode) {
  return styleProps(themeStyles(mode), schemeMarker.anchor)
}

/**
 * Puts the saved mode on `<html>` before the first paint. A prerendered page (the demo) is written
 * in the system mode, and the provider applies the saved one only once the page's scripts run, so
 * without this a reader who chose dark would see the light page first on a slow connection. A
 * preview frame's `?theme=` comes first: the block viewer names the mode it shows. It writes the
 * classes the document renders for that mode, so React finds them as it renders them; render
 * `<html>` with `suppressHydrationWarning`. It swaps the mode's classes and leaves the others: a preview page's
`<html>` also carries the registry's design.
 */
export const THEME_SCRIPT = `(() => {
  const classes = ${JSON.stringify(Object.fromEntries(THEME_MODES.map((mode) => [mode, themeDocumentProps(mode).className ?? ""])))}
  const asked = new URLSearchParams(location.search).get("theme")
  const saved = asked ?? document.cookie.split(";").map((part) => part.trim()).find((part) => part.startsWith("${THEME_COOKIE}="))?.slice(${THEME_COOKIE.length + 1})
  if (!saved || !(saved in classes)) return
  const list = document.documentElement.classList
  for (const name of Object.values(classes).join(" ").split(" ")) if (name) list.remove(name)
  for (const name of classes[saved].split(" ")) if (name) list.add(name)
  document.documentElement.dataset.mode = saved
})()`
