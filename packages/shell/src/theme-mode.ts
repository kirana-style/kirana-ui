/**
 * The reader's colour mode, kept in a cookie by `ThemeProvider`: read from the request on the
 * server, so a server-rendered page is written in the saved mode, and from `document.cookie` in the
 * browser, so a client-side navigation asks nothing of the server. The same system as the Kirana
 * site's (its `apps/docs/src/lib/theme-mode.ts`).
 */
import { createIsomorphicFn } from "@tanstack/react-start"
import { getCookie } from "@tanstack/react-start/server"

import {
  isThemeMode,
  readThemeCookie,
} from "@workspace/ui/theme/theme-provider"
import type { ThemeMode } from "@workspace/ui/theme/themes"

/** One name on every Kirana site, so a shared cookie can carry the choice between them later. */
export const THEME_COOKIE = "kirana-theme"

export const readThemeMode = createIsomorphicFn()
  .server((): ThemeMode => {
    const value = getCookie(THEME_COOKIE)
    return isThemeMode(value) ? value : "system"
  })
  .client(
    (): ThemeMode => readThemeCookie(document.cookie, THEME_COOKIE) ?? "system"
  )
