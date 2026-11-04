import "@fontsource-variable/inter"
import "@fontsource-variable/geist"
import "@kirana-style/core/stylesheet.css"
import "@workspace/registry/styles/reset.css"
import { css, props } from "@kirana-style/core"
import { LanguageContext } from "@workspace/registry/bases/solid-ark/components/language-selector.tsx"
import { previews } from "@workspace/registry/bases/solid-ark/previews.ts"
import { axes } from "@workspace/registry/core/axes.ts"
import { root } from "@workspace/registry/core/root.ts"
import { space } from "@workspace/registry/core/scales.ts"
import { IconLibraryContext } from "@workspace/registry/bases/solid-ark/ui/icon-placeholder.tsx"
import { page } from "@workspace/registry/styles/page.styles.ts"
import { For, lazy, Show } from "solid-js"
import { render } from "solid-js/web"

import { design, followDesign } from "./design"
import { Showcase } from "./showcase"

// The design system lives on `<html>`: its tokens (`root`), the anchor the styles read the visual
// style through, the colour scheme, and the attributes the design names.
document.documentElement.className =
  props(root, axes.anchor, page.document).class ?? ""
document.body.className = props(page.body).class ?? ""
// The design: its families loaded when it names them (the page links Inter and Geist only), and
// followed as the framing page changes it.
followDesign()

const list = css({
  display: "flex",
  flexDirection: "column",
  gap: space[2],
  padding: space[6],
})

/** One page per item, as `/preview/solid/ark/<item>`, and the showcase; anything else lists them. */
const item = location.pathname.match(/\/ark\/([a-z0-9-]+?)(?:\.html)?\/?$/)?.[1]
// Loaded only on its own page, as the Svelte preview's.
const load = item ? previews[item] : undefined
const Current = load ? lazy(load) : undefined

render(
  () => (
    <IconLibraryContext.Provider value={() => design().system.iconLibrary}>
      {/* A right-to-left demo's language, from `?lang=` and the docs page's selector. */}
      <LanguageContext.Provider value={() => design().options.language}>
        <Show when={item !== "showcase"} fallback={<Showcase />}>
          {Current ? (
            <Current />
          ) : (
            <nav sx={list}>
              <For each={[...Object.keys(previews), "showcase"]}>
                {(name) => <a href={`/preview/solid/ark/${name}`}>{name}</a>}
              </For>
            </nav>
          )}
        </Show>
      </LanguageContext.Provider>
    </IconLibraryContext.Provider>
  ),
  document.getElementById("app")!
)
