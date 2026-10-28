import "@fontsource-variable/inter"
import "@fontsource-variable/geist"
import "@kirana-style/core/stylesheet.css"
import "@workspace/registry/styles/reset.css"
import { css, props } from "@kirana-style/core"
import { previews } from "@workspace/registry/bases/solid-ark/previews.ts"
import { axes } from "@workspace/registry/core/axes.ts"
import { followPageDesign } from "@workspace/registry/core/preview.ts"
import { root } from "@workspace/registry/core/root.ts"
import { space } from "@workspace/registry/core/scales.ts"
import { page } from "@workspace/registry/styles/page.styles.ts"
import { For } from "solid-js"
import { render } from "solid-js/web"

import { Showcase } from "./showcase"

/**
 * The class a `props()` call gives: in a Solid module Kirana compiles it to `{ class }`, while its
 * type names `className` (KF-047, Kirana 0.3.4). Remove with the release that fixes it.
 */
const classOf = (styleProps: ReturnType<typeof props>) =>
  (styleProps as { class?: string }).class ?? styleProps.className ?? ""

// The design system lives on `<html>`: its tokens (`root`), the anchor the styles read the visual
// style through, the colour scheme, and the attributes the design names.
document.documentElement.className = classOf(
  props(root, axes.anchor, page.document)
)
document.body.className = classOf(props(page.body))
followPageDesign()

const list = css({
  display: "flex",
  flexDirection: "column",
  gap: space[2],
  padding: space[6],
})

/** One page per item, as `/preview/solid/ark/<item>`, and the showcase; anything else lists them. */
const item = location.pathname.match(/\/ark\/([a-z0-9-]+?)(?:\.html)?\/?$/)?.[1]
const Current =
  item && item in previews ? previews[item as keyof typeof previews] : undefined

render(
  () =>
    item === "showcase" ? (
      <Showcase />
    ) : Current ? (
      <Current />
    ) : (
      <nav sx={list}>
        <For each={[...Object.keys(previews), "showcase"]}>
          {(name) => <a href={`/preview/solid/ark/${name}`}>{name}</a>}
        </For>
      </nav>
    ),
  document.getElementById("app")!
)
