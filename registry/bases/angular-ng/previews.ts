/// <reference types="vite/client" />
/**
 * What `/preview/angular/ng/<item>` can show: every example in `examples/`, by its file's name,
 * every block in `blocks/`, by its folder's (its `page.ts`), and every chart in `charts/`, each loaded only on its own page (a page that loaded the whole map would
 * download every item), as Vue's `previews.ts`. The site lists the same names from the folder
 * (`virtual:preview-names`).
 */
import type { Type } from "@angular/core"

const examples = import.meta.glob<{ default: Type<unknown> }>("./examples/*.ts")
const blocks = import.meta.glob<{ default: Type<unknown> }>(
  "./blocks/*/page.ts"
)
const charts = import.meta.glob<{ default: Type<unknown> }>("./charts/*.ts")

export const previews: Record<
  string,
  () => Promise<{ default: Type<unknown> }>
> = Object.fromEntries([
  ...Object.entries(examples).map(([path, load]) => [
    path.slice("./examples/".length, -".ts".length),
    load,
  ]),
  ...Object.entries(blocks).map(([path, load]) => [
    path.slice("./blocks/".length, -"/page.ts".length),
    load,
  ]),
  ...Object.entries(charts).map(([path, load]) => [
    path.slice("./charts/".length, -".ts".length),
    load,
  ]),
])
