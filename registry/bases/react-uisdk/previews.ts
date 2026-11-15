/// <reference types="vite/client" />
/**
 * What `/preview/react/uisdk/<item>` can show: every example in `examples/`, by its file's name,
 * every block in `blocks/`, by its folder's (its `page.tsx`), and every chart in `charts/`, each
 * loaded only on its own page. A glob rather than React's other bases' list, as the base is ported
 * part by part (P9): an example appears once its parts are written. The site lists the same names
 * from the folders (`virtual:preview-names`).
 */
import { createElement } from "react"
import type { ComponentType, ReactNode } from "react"

import { DirectionProvider } from "./ui/direction"
import { TooltipProvider } from "./ui/tooltip"

type Loader = () => Promise<{ default: ComponentType }>

const examples = import.meta.glob<{ default: ComponentType }>(
  "./examples/*.tsx"
)
const blocks = import.meta.glob<{ default: ComponentType }>(
  "./blocks/*/page.tsx"
)
const charts = import.meta.glob<{ default: ComponentType }>("./charts/*.tsx")

export const previews: Record<string, Loader> = Object.fromEntries([
  ...Object.entries(examples).map(([path, load]) => [
    path.slice("./examples/".length, -".tsx".length),
    load,
  ]),
  ...Object.entries(blocks).map(([path, load]) => [
    path.slice("./blocks/".length, -"/page.tsx".length),
    load,
  ]),
  ...Object.entries(charts).map(([path, load]) => [
    path.slice("./charts/".length, -".tsx".length),
    load,
  ]),
])

/**
 * What each item renders in: the base's direction (ui-sdk's parts read the registry's provider)
 * and its tooltips' delay, `0` as upstream's site wraps every page.
 */
export function Frame({
  direction,
  children,
}: {
  direction: "ltr" | "rtl"
  children: ReactNode
}) {
  return createElement(
    DirectionProvider,
    { direction },
    createElement(TooltipProvider, { delay: 0 }, children)
  )
}
