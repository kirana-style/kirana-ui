/**
 * The icon library a Vue page draws, provided once at its root:
 * `app.provide(ICON_LIBRARY, ref("hugeicons"))`. `IconPlaceholder.vue` reads it.
 */
import type { InjectionKey, Ref } from "vue"

import type { IconLibrary } from "../core/config"

export const ICON_LIBRARY: InjectionKey<Ref<IconLibrary>> =
  Symbol("icon-library")
