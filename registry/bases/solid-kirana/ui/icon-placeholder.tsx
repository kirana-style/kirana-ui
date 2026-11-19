/**
 * `IconPlaceholder` for Solid, over the same data as React's (`icon-placeholder.tsx`). The library
 * is the design system's, provided as an accessor under `IconLibraryContext`, so it follows the
 * design; the size is the control's (`controlIcons` in `styles/control.ts`). As on React, a style
 * is spread on it (`{...styleProps(…)}`), never given as `sx`, which an icon library would not read.
 */
import {
  createContext,
  createMemo,
  createSignal,
  For,
  onCleanup,
  Show,
  splitProps,
  useContext,
} from "solid-js"
import type { Accessor, JSX } from "solid-js"
import { Dynamic } from "solid-js/web"

import { DEFAULT_DESIGN_SYSTEM } from "../../../core/config"
import type { IconLibrary } from "../../../core/config"
import {
  iconDataVersion,
  resolveIcon,
  subscribeIconData,
} from "../../../icons/data"

/** The icon library a Solid page draws, set once at its root. */
export const IconLibraryContext = createContext<Accessor<IconLibrary>>(
  () => DEFAULT_DESIGN_SYSTEM.iconLibrary
)

type Names = {
  lucide: string
  hugeicons: string
  tabler: string
  phosphor: string
  remixicon: string
}

export function IconPlaceholder(
  props: Names & Omit<JSX.SvgSVGAttributes<SVGSVGElement>, keyof Names>
) {
  const [names, rest] = splitProps(props, [
    "lucide",
    "hugeicons",
    "tabler",
    "phosphor",
    "remixicon",
  ])
  const library = useContext(IconLibraryContext)
  // Draws again when a library's data arrives (Tabler, Phosphor and Remix Icon load on demand).
  const [version, setVersion] = createSignal(iconDataVersion())
  onCleanup(subscribeIconData(() => setVersion(iconDataVersion())))
  const resolved = createMemo(
    () => (void version(), resolveIcon(library(), { ...names }))
  )
  return (
    <Show when={resolved()}>
      {(icon) => (
        <svg aria-hidden="true" {...icon().svg} {...rest}>
          <For each={icon().nodes}>
            {([tag, attributes]) => <Dynamic component={tag} {...attributes} />}
          </For>
        </svg>
      )}
    </Show>
  )
}
