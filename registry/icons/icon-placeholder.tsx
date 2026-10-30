/**
 * `IconPlaceholder` for React, and the library it draws. The library is the design system's
 * (`IconLibraryProvider`, set by the page from the preset); the size is the control's
 * (`controlIcons` in `styles/control.ts`).
 *
 * It stands for the project's own icon once installed: shadcn/ui's CLI replaces each
 * `<IconPlaceholder … />` with the icon library's component (`<XIcon />`), keeping every other
 * attribute, and drops the import of any module whose path holds `icon-placeholder`, hence this
 * file's name. So a placeholder takes only what an icon component takes: no `sx`, which an icon
 * library does not read; a style is spread as `{...props(…)}`.
 */
import {
  createContext,
  createElement,
  useContext,
  useSyncExternalStore,
} from "react"
import type { ComponentProps, ReactNode } from "react"

import { DEFAULT_DESIGN_SYSTEM } from "../core/config"
import type { IconLibrary } from "../core/config"
import { iconDataVersion, resolveIcon, subscribeIconData } from "./data"
import type { IconNames } from "./data"

const IconLibraryContext = createContext<IconLibrary>(
  DEFAULT_DESIGN_SYSTEM.iconLibrary
)

export function IconLibraryProvider({
  library,
  children,
}: {
  library: IconLibrary
  children: ReactNode
}) {
  return (
    <IconLibraryContext.Provider value={library}>
      {children}
    </IconLibraryContext.Provider>
  )
}

/** `stroke-linecap` → `strokeLinecap`, the name React expects. */
const reactName = (name: string) =>
  name.replace(/-([a-z])/g, (_, letter: string) => letter.toUpperCase())

const reactAttributes = (
  attributes: Readonly<Record<string, string | number>>
) =>
  Object.fromEntries(
    Object.entries(attributes).map(([key, value]) => [reactName(key), value])
  )

export type IconPlaceholderProps = IconNames & ComponentProps<"svg">

export function IconPlaceholder({
  lucide,
  hugeicons,
  tabler,
  phosphor,
  remixicon,
  ...props
}: IconPlaceholderProps) {
  const library = useContext(IconLibraryContext)
  // Draws again when a library's data arrives (Tabler, Phosphor and Remix Icon load on demand).
  useSyncExternalStore(subscribeIconData, iconDataVersion, () => 0)
  const resolved = resolveIcon(library, {
    lucide,
    hugeicons,
    tabler,
    phosphor,
    remixicon,
  })
  if (!resolved) return null
  return (
    <svg aria-hidden {...reactAttributes(resolved.svg)} {...props}>
      {resolved.nodes.map(([tag, attributes], index) =>
        createElement(tag, { key: index, ...reactAttributes(attributes) })
      )}
    </svg>
  )
}
