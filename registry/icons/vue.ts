/**
 * The icon library a Vue page draws, provided once at its root:
 * `app.provide(ICON_LIBRARY, ref("hugeicons"))`, or a `computed` that follows the design. `IconPlaceholder.vue` reads it.
 */
import type { InjectionKey, Ref } from "vue"

import type { IconLibrary } from "../core/config"

export const ICON_LIBRARY: InjectionKey<Readonly<Ref<IconLibrary>>> =
  Symbol("icon-library")
