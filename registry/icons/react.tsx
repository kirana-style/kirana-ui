/**
 * `IconPlaceholder` for React, and the library it draws. The library is the design system's
 * (`IconLibraryProvider`, set by the page from the preset); the size is the control's
 * (`ctx.iconSize`, read by `icon.styles.ts`).
 */
import { createContext, createElement, useContext } from "react"
import type { ComponentProps, ReactNode } from "react"

import { DEFAULT_DESIGN_SYSTEM } from "../core/config"
import type { IconLibrary } from "../core/config"
import type { Sx } from "../lib/sx"
import { icon } from "../styles/icon.styles"
import { resolveIcon } from "./data"
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

export type IconPlaceholderProps = IconNames &
  Omit<ComponentProps<"svg">, "className"> & { sx?: Sx }

export function IconPlaceholder({
  lucide,
  hugeicons,
  tabler,
  phosphor,
  remixicon,
  sx,
  ...props
}: IconPlaceholderProps) {
  const library = useContext(IconLibraryContext)
  const resolved = resolveIcon(library, {
    lucide,
    hugeicons,
    tabler,
    phosphor,
    remixicon,
  })
  if (!resolved) return null
  return (
    <svg
      aria-hidden
      {...reactAttributes(resolved.svg)}
      {...props}
      sx={[icon, sx]}
    >
      {resolved.nodes.map(([tag, attributes], index) =>
        createElement(tag, { key: index, ...reactAttributes(attributes) })
      )}
    </svg>
  )
}
