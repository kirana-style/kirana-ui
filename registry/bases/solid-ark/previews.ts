/// <reference types="vite/client" />
/**
 * What `/preview/solid/ark/<item>` can show: every example in `examples/`, by its file's name, each
 * loaded only on its own page (a page that loaded the whole map would download every item), as
 * Svelte's `previews.ts`. The site lists the same names from the folder (`virtual:preview-names`).
 */
import type { Component } from "solid-js"

const examples = import.meta.glob<{ default: Component }>("./examples/*.tsx")

export const previews: Record<string, () => Promise<{ default: Component }>> =
  Object.fromEntries(
    Object.entries(examples).map(([path, load]) => [
      path.slice("./examples/".length, -".tsx".length),
      load,
    ])
  )
