/// <reference types="vite/client" />
/**
 * What `/preview/vue/ark/<item>` can show: every example in `examples/`, by its file's name, and
 * every block in `blocks/`, by its folder's (its `page.vue`), and every chart in `charts/`, each loaded only on its own page (a page that loaded the whole map would download every item). The
 * site lists the same names from the folder (`virtual:preview-names`).
 */
import type { Component } from "vue"

const examples = import.meta.glob<{ default: Component }>("./examples/*.vue")
const blocks = import.meta.glob<{ default: Component }>("./blocks/*/page.vue")
const charts = import.meta.glob<{ default: Component }>("./charts/*.vue")

export const previews: Record<string, () => Promise<{ default: Component }>> =
  Object.fromEntries([
    ...Object.entries(examples).map(([path, load]) => [
      path.slice("./examples/".length, -".vue".length),
      load,
    ]),
    ...Object.entries(blocks).map(([path, load]) => [
      path.slice("./blocks/".length, -"/page.vue".length),
      load,
    ]),
    ...Object.entries(charts).map(([path, load]) => [
      path.slice("./charts/".length, -".vue".length),
      load,
    ]),
  ])
