/**
 * The icon library a Svelte page draws, set once at its root as a getter, so it follows the
 * design: `setContext(ICON_LIBRARY, () => design.system.iconLibrary)`.
 * `IconPlaceholder.svelte` reads it.
 */
import type { IconLibrary } from "../core/config"

export const ICON_LIBRARY = Symbol("icon-library")

export type IconLibraryContext = () => IconLibrary
