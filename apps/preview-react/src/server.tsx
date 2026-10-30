/**
 * The prerender's entry (`vite.config.ts`): each item's page, from the built `index.html`, with the
 * item's HTML in its root, `<html>` and `<body>` as the design system writes them in the default
 * design, and the script that puts the URL's design on `<html>` before the first paint.
 */
import { text } from "node:stream/consumers"
import { props } from "@kirana-style/core"
import { prerenderToNodeStream } from "react-dom/static"
import designScript from "virtual:design-script"

import { axes } from "@workspace/registry/core/axes"
import {
  documentAttributes,
  readPageDesign,
} from "@workspace/registry/core/preview"
import { root } from "@workspace/registry/core/root"
import { page } from "@workspace/registry/styles/page.styles"

import { Preview, frame, loadItem, previewPages } from "./preview"

export { previewPages }

const escape = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")

/** Attributes as HTML, without the absent ones. */
const attributes = (values: Record<string, string | undefined>) =>
  Object.entries(values)
    .filter((entry): entry is [string, string] => entry[1] !== undefined)
    .map(([name, value]) => ` ${name}="${escape(value)}"`)
    .join("")

/** `<html>` in the default design and the system's colour mode, as `preview-script.ts` finds it. */
const documentElement = attributes({
  ...documentAttributes(readPageDesign("", "")),
  "data-mode": "system",
  class: props(root, axes.anchor, page.document).className,
})

/** One item's page; `template` is the built `index.html`. */
export async function renderPage(
  template: string,
  base: string,
  item: string
): Promise<string> {
  const Item = await loadItem(base, item)
  if (!Item) throw new Error(`preview-react: no item ${base}/${item}`)
  const { prelude } = await prerenderToNodeStream(
    <Preview base={base} Item={Item} />
  )
  const parts: [string, string][] = [
    ['<html lang="en">', `<html lang="en"${documentElement}>`],
    ["<!--design-script-->", `<script>${designScript}</script>`],
    [
      "<title>Preview · React</title>",
      `<title>${escape(item)} · Preview</title>`,
    ],
    ["<body>", `<body${attributes({ class: props(page.body).className })}>`],
    [
      '<div id="root"><!--item--></div>',
      `<div id="root"${attributes({ class: props(frame).className })}>${await text(prelude)}</div>`,
    ],
  ]
  return parts.reduce((html, [from, to]) => {
    if (!html.includes(from))
      throw new Error(`preview-react: no ${from} in index.html`)
    return html.replace(from, () => to)
  }, template)
}
