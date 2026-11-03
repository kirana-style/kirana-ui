/// <reference types="vite/client" />
/**
 * What `/preview/svelte/ark/<item>` can show: every example in `examples/`, by its file's name, and
 * every block in `blocks/`, by its folder's (its `page.svelte`), and every chart in `charts/`, each loaded only on its own page (a page that loaded the whole map would download every item). The
 * site lists the same names from the folder (`virtual:preview-names`).
 */
import type { Component } from "svelte"

const examples = import.meta.glob<{ default: Component }>("./examples/*.svelte")
const blocks = import.meta.glob<{ default: Component }>(
  "./blocks/*/page.svelte"
)
const charts = import.meta.glob<{ default: Component }>("./charts/*.svelte")

export const previews: Record<string, () => Promise<{ default: Component }>> =
  Object.fromEntries([
    ...Object.entries(examples).map(([path, load]) => [
      path.slice("./examples/".length, -".svelte".length),
      load,
    ]),
    ...Object.entries(blocks).map(([path, load]) => [
      path.slice("./blocks/".length, -"/page.svelte".length),
      load,
    ]),
    ...Object.entries(charts).map(([path, load]) => [
      path.slice("./charts/".length, -".svelte".length),
      load,
    ]),
  ])
