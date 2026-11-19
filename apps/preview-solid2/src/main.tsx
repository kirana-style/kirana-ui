import "@fontsource-variable/inter"
import "@fontsource-variable/geist"
import "@kirana-style/core/stylesheet.css"
import "@workspace/registry/styles/reset.css"
// Code Block's typeset demo draws in the `typeset` layer, as React's preview loads it.
import "@workspace/registry/styles/typeset.css"
import { css, props } from "@kirana-style/core"
import { LanguageContext } from "@workspace/registry/bases/solid-uisdk/components/language-selector.tsx"
import { previews } from "@workspace/registry/bases/solid-uisdk/previews.ts"
import { IconLibraryContext } from "@workspace/registry/bases/solid-uisdk/ui/icon-placeholder.tsx"
import { axes } from "@workspace/registry/core/axes.ts"
import { root } from "@workspace/registry/core/root.ts"
import { space } from "@workspace/registry/core/scales.ts"
import { page } from "@workspace/registry/styles/page.styles.ts"
import { render } from "@solidjs/web"
import { For, Loading, lazy } from "solid-js"

import { design, followDesign } from "./design"

// The design system lives on `<html>`: its tokens (`root`), the anchor the styles read the visual
// style through, the colour scheme, and the attributes the design names.
document.documentElement.className =
  props(root, axes.anchor, page.document).class ?? ""
document.body.className = props(page.body).class ?? ""
// The design: its families loaded when it names them, and followed as the framing page changes it.
followDesign()

const list = css({
  display: "flex",
  flexDirection: "column",
  gap: space[2],
  padding: space[6],
})

/**
 * Solid on ui-sdk, on Solid 2: ui-sdk's Solid adapter needs Solid 2, which Solid's other bases (Ark
 * UI, Kirana UI Primitives) do not run on yet, so it is an app of its own. One page per item, as
 * `/preview/solid/uisdk/<item>` (the site's `_redirects` serves this app's page there); anything
 * else lists them.
 */
const item = location.pathname.match(
  /\/uisdk\/([a-z0-9-]+?)(?:\.html)?\/?$/
)?.[1]
const load = item ? previews[item] : undefined
const Current = load ? lazy(load) : undefined
// Sonner's toaster (`top-center`, as upstream's site mounts it) and the toast's, after the page.
const Toaster = lazy(() =>
  import("@workspace/registry/bases/solid-uisdk/ui/sonner.tsx").then(
    (module) => ({ default: module.Toaster })
  )
)
const ToastToaster = lazy(() =>
  import("@workspace/registry/bases/solid-uisdk/ui/toast.tsx").then(
    (module) => ({ default: module.Toaster })
  )
)

render(
  () => (
    <IconLibraryContext value={() => design().system.iconLibrary}>
      {/* A right-to-left demo's language, from `?lang=` and the docs page's selector. */}
      <LanguageContext value={() => design().options.language}>
        {Current ? (
          // Solid 2 reads a lazy component's module as an async value, which needs a boundary.
          <Loading>
            <Current />
            <Toaster position="top-center" />
            <ToastToaster />
          </Loading>
        ) : (
          <nav sx={list}>
            <For each={Object.keys(previews)}>
              {(name) => <a href={`/preview/solid/uisdk/${name}`}>{name}</a>}
            </For>
          </nav>
        )}
      </LanguageContext>
    </IconLibraryContext>
  ),
  document.getElementById("app")!
)
