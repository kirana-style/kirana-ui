import "@fontsource-variable/inter"
import "@fontsource-variable/geist"
import "@kirana-style/core/stylesheet.css"
import "@workspace/registry/styles/reset.css"
import "@workspace/registry/styles/typeset.css"
import { css, props } from "@kirana-style/core"
import { createRoot, hydrateRoot } from "react-dom/client"

import { axes } from "@workspace/registry/core/axes"
import { root } from "@workspace/registry/core/root"
import { space } from "@workspace/registry/core/scales"
import { page } from "@workspace/registry/styles/page.styles"

import { Preview, frame, loadItem, previewPages } from "./preview"

const list = css({
  display: "flex",
  flexDirection: "column",
  gap: space[2],
  padding: space[6],
})

const [base = "", item = ""] = location.pathname
  .replace(/\.html$/, "")
  .split("/")
  .slice(-2)
const container = document.getElementById("root")!

// The item's chunk first, then the page: hydration then finds nothing to wait for, and the
// prerendered item stays as it is.
const Item = await loadItem(base, item)

if (!import.meta.env.DEV && Item) {
  hydrateRoot(container, <Preview base={base} Item={Item} />)
} else {
  // In development nothing is prerendered: the page takes what the prerender writes, and draws.
  // A name no base has lists every page.
  document.documentElement.className = props(root, axes.anchor, page.document)
    .className as string
  document.body.className = props(page.body).className as string
  container.className = props(frame).className as string
  createRoot(container).render(
    Item ? (
      <Preview base={base} Item={Item} />
    ) : (
      <Pages pages={await previewPages()} />
    )
  )
}

function Pages({ pages }: { pages: [string, string][] }) {
  return (
    <nav sx={list}>
      {pages.map(([folder, name]) => (
        <a key={`${folder}/${name}`} href={`/preview/react/${folder}/${name}`}>
          {folder}/{name}
        </a>
      ))}
    </nav>
  )
}
