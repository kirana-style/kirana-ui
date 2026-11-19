import "@fontsource-variable/inter"
import "@fontsource-variable/geist"
import "@kirana-style/core/stylesheet.css"
import "@workspace/registry/styles/reset.css"
// Code Block's typeset demo draws in the `typeset` layer, as React's preview loads it.
import "@workspace/registry/styles/typeset.css"
import { css, props } from "@kirana-style/core"
import { LanguageContext } from "@workspace/registry/bases/solid-ark/components/language-selector.tsx"
import { previews as arkPreviews } from "@workspace/registry/bases/solid-ark/previews.ts"
import { LanguageContext as KiranaLanguageContext } from "@workspace/registry/bases/solid-kirana/components/language-selector.tsx"
import { previews as kiranaPreviews } from "@workspace/registry/bases/solid-kirana/previews.ts"
import { IconLibraryContext as KiranaIconLibraryContext } from "@workspace/registry/bases/solid-kirana/ui/icon-placeholder.tsx"
import { axes } from "@workspace/registry/core/axes.ts"
import { root } from "@workspace/registry/core/root.ts"
import { space } from "@workspace/registry/core/scales.ts"
import { IconLibraryContext } from "@workspace/registry/bases/solid-ark/ui/icon-placeholder.tsx"
import { page } from "@workspace/registry/styles/page.styles.ts"
import { For, lazy, Show } from "solid-js"
import { render } from "solid-js/web"

import { design, followDesign } from "./design"
import { Charts } from "./charts"
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

/**
 * One page per item, as `/preview/solid/<base>/<item>` (Ark UI's or Kirana UI's), the showcase and
 * `/create`'s charts (Ark UI's); anything else lists them.
 */
const route = location.pathname.match(
  /\/(ark|kirana)\/([a-z0-9-]+?)(?:\.html)?\/?$/
)
const base = route?.[1] === "kirana" ? "kirana" : "ark"
const item = route?.[2]
const previews = base === "kirana" ? kiranaPreviews : arkPreviews
// Loaded only on its own page, as the Svelte preview's.
const load = item ? previews[item] : undefined
const Current = load ? lazy(load) : undefined
// Sonner's toaster, as upstream's site mounts it on every page (`top-center`): loaded after the
// page, since only the items that call `toast()` need it. Each base's own, since its items call
// their own `toast()`.
const Toaster = lazy(() =>
  (base === "kirana"
    ? import("@workspace/registry/bases/solid-kirana/ui/sonner.tsx")
    : import("@workspace/registry/bases/solid-ark/ui/sonner.tsx")
  ).then((module) => ({ default: module.Toaster }))
)
// The toast's toaster (the base's own), as React's preview mounts Base UI's beside every item.
const ToastToaster = lazy(() =>
  (base === "kirana"
    ? import("@workspace/registry/bases/solid-kirana/ui/toast.tsx")
    : import("@workspace/registry/bases/solid-ark/ui/toast.tsx")
  ).then((module) => ({ default: module.Toaster }))
)

render(
  () => (
    <IconLibraryContext.Provider value={() => design().system.iconLibrary}>
      {/* Each base's copy of the icon library's and the language's contexts. */}
      <KiranaIconLibraryContext.Provider
        value={() => design().system.iconLibrary}
      >
        {/* A right-to-left demo's language, from `?lang=` and the docs page's selector. */}
        <LanguageContext.Provider value={() => design().options.language}>
          <KiranaLanguageContext.Provider
            value={() => design().options.language}
          >
            <Show when={item !== "showcase"} fallback={<Showcase />}>
              {item === "charts" ? (
                <Charts />
              ) : Current ? (
                <>
                  <Current />
                  <Toaster position="top-center" />
                  <ToastToaster />
                </>
              ) : (
                <nav sx={list}>
                  <For
                    each={[
                      ...Object.keys(previews),
                      ...(base === "ark" ? ["showcase"] : []),
                    ]}
                  >
                    {(name) => (
                      <a href={`/preview/solid/${base}/${name}`}>{name}</a>
                    )}
                  </For>
                </nav>
              )}
            </Show>
          </KiranaLanguageContext.Provider>
        </LanguageContext.Provider>
      </KiranaIconLibraryContext.Provider>
    </IconLibraryContext.Provider>
  ),
  document.getElementById("app")!
)
