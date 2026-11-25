import "@fontsource-variable/inter"
import "@fontsource-variable/geist"
import "@kirana-style/core/stylesheet.css"
import "@workspace/registry/styles/reset.css"
// Code Block's typeset demo draws in the `typeset` layer, as React's preview loads it.
import "@workspace/registry/styles/typeset.css"
import { css, props } from "@kirana-style/core"
import { LanguageContext as KiranaLanguageContext } from "@workspace/registry/bases/solid-kirana/components/language-selector.tsx"
import { previews as kiranaPreviews } from "@workspace/registry/bases/solid-kirana/previews.ts"
import { IconLibraryContext as KiranaIconLibraryContext } from "@workspace/registry/bases/solid-kirana/ui/icon-placeholder.tsx"
import { LanguageContext } from "@workspace/registry/bases/solid-uisdk/components/language-selector.tsx"
import { previews as uisdkPreviews } from "@workspace/registry/bases/solid-uisdk/previews.ts"
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
 * Solid's bases on Solid 2: ui-sdk's, whose Solid adapter needs it, and Kirana UI Primitives', whose
 * adapter does too. Ark UI's is Solid 1's, in its own app (`apps/preview-solid`). One page per item,
 * as `/preview/solid/<base>/<item>` (the site's `_redirects` serves this app's page there); anything
 * else lists them.
 */
const route = location.pathname.match(
  /\/(uisdk|kirana)\/([a-z0-9-]+?)(?:\.html)?\/?$/
)
const base = route?.[1] === "kirana" ? "kirana" : "uisdk"
const item = route?.[2]
const previews = base === "kirana" ? kiranaPreviews : uisdkPreviews
const load = item ? previews[item] : undefined
const Current = load ? lazy(load) : undefined
// Sonner's toaster (`top-center`, as upstream's site mounts it) and the toast's, after the page:
// each base's own, since its items call their own `toast()`.
const Toaster = lazy(() =>
  (base === "kirana"
    ? import("@workspace/registry/bases/solid-kirana/ui/sonner.tsx")
    : import("@workspace/registry/bases/solid-uisdk/ui/sonner.tsx")
  ).then((module) => ({ default: module.Toaster }))
)
const ToastToaster = lazy(() =>
  (base === "kirana"
    ? import("@workspace/registry/bases/solid-kirana/ui/toast.tsx")
    : import("@workspace/registry/bases/solid-uisdk/ui/toast.tsx")
  ).then((module) => ({ default: module.Toaster }))
)
// Each base reads its own contexts (a part's module is the base's own copy).
const Icons = base === "kirana" ? KiranaIconLibraryContext : IconLibraryContext
const Language = base === "kirana" ? KiranaLanguageContext : LanguageContext

render(
  () => (
    <Icons value={() => design().system.iconLibrary}>
      {/* A right-to-left demo's language, from `?lang=` and the docs page's selector. */}
      <Language value={() => design().options.language}>
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
              {(name) => <a href={`/preview/solid/${base}/${name}`}>{name}</a>}
            </For>
          </nav>
        )}
      </Language>
    </Icons>
  ),
  document.getElementById("app")!
)
