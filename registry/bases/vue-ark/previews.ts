/// <reference types="vite/client" />
/**
 * What `/preview/vue/ark/<item>` can show: every example in `examples/`, by its file's name, each
 * loaded only on its own page (a page that loaded the whole map would download every item). The
 * site lists the same names from the folder (`virtual:preview-names`).
 */
import type { Component } from "vue"

const modules = import.meta.glob<{ default: Component }>("./examples/*.vue")

export const previews: Record<string, () => Promise<{ default: Component }>> =
  Object.fromEntries(
    Object.entries(modules).map(([path, load]) => [
      path.slice("./examples/".length, -".vue".length),
      load,
    ])
  )
