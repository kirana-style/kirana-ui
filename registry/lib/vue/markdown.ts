/**
 * TanStack Markdown on Vue: its React adapter (`@tanstack/markdown/react`, MIT) rendered with
 * Vue's `h()` over the same parser, since the package has none for Vue (LF-008). A page passes
 * `components` to draw an element its own way, as React's does; each is called with the element's
 * attributes and its children as the default slot.
 */
import { parseMarkdown } from "@tanstack/markdown/parser"
import type {
  BlockNode,
  InlineNode,
  MarkdownInput,
  RenderOptions,
} from "@tanstack/markdown"
import { defineComponent, h as vh } from "vue"
import type { Component, PropType, VNodeChild } from "vue"

export type MarkdownComponents = Partial<Record<string, string | Component>>

export interface MarkdownVueOptions extends RenderOptions {
  components?: MarkdownComponents
}

type Node = BlockNode | InlineNode
type Props = Record<string, unknown> | null

/** `@tanstack/markdown`'s own, which its package does not export. */
const footnoteReferenceId = (id: string, index = 1) =>
  index > 1 ? `${id}-${index}` : id

function h(
  options: MarkdownVueOptions,
  tag: string,
  props: Props,
  ...children: VNodeChild[]
) {
  const component = options.components?.[tag] ?? tag
  const flat = children.flat() as VNodeChild[]
  if (typeof component === "string")
    return vh(component, props, flat.length ? flat : undefined)
  // A component takes its children as its default slot.
  return vh(component, props, flat.length ? { default: () => flat } : undefined)
}

export function renderMarkdownVue(
  input: MarkdownInput,
  options: MarkdownVueOptions = {}
): VNodeChild[] {
  const document =
    typeof input === "string" ? parseMarkdown(input, options) : input
  return document.children.map((node, index) =>
    renderBlock(node, options, `b:${index}`)
  )
}

function renderBlock(
  node: BlockNode,
  options: MarkdownVueOptions,
  key: string
): VNodeChild {
  switch (node.type) {
    case "heading":
      return h(
        options,
        `h${node.depth}`,
        {
          key,
          ...(node.id && { id: node.id }),
          ...(node.framework && { "data-framework": node.framework }),
        },
        renderInlines(node.children, options),
        renderHeadingAnchor(node.id, options)
      )
    case "paragraph":
      return h(options, "p", { key }, renderInlines(node.children, options))
    case "code":
      return renderCodeBlock(node, options, key)
    case "list": {
      const tag = node.ordered ? "ol" : "ul"
      return h(
        options,
        tag,
        {
          key,
          ...(node.ordered &&
            node.start !== undefined &&
            node.start !== 1 && { start: node.start }),
        },
        node.items.map((item, index) =>
          h(
            options,
            "li",
            { key: index },
            renderListItemChildren(
              item.children,
              item.checked,
              node.loose,
              options,
              `${index}`
            )
          )
        )
      )
    }
    case "blockquote":
      return h(
        options,
        "blockquote",
        { key },
        node.children.map((child, index) =>
          renderBlock(child, options, `${key}:${index}`)
        )
      )
    case "table":
      return h(
        options,
        "table",
        { key },
        h(
          options,
          "thead",
          null,
          h(
            options,
            "tr",
            null,
            node.header.map((cell, index) =>
              renderTableCell("th", cell, node.align[index], options, index)
            )
          )
        ),
        node.rows.length
          ? h(
              options,
              "tbody",
              null,
              node.rows.map((row, rowIndex) =>
                h(
                  options,
                  "tr",
                  { key: rowIndex },
                  row.map((cell, index) =>
                    renderTableCell(
                      "td",
                      cell,
                      node.align[index],
                      options,
                      index
                    )
                  )
                )
              )
            )
          : null
      )
    case "footnotes":
      return renderFootnotes(node.items, options, key)
    case "thematicBreak":
      return h(options, "hr", { key })
    case "html":
      return options.allowHtml
        ? h(options, "div", { key, innerHTML: node.value })
        : h(options, "p", { key }, node.value)
    case "callout":
      return h(
        options,
        "div",
        {
          key,
          class: `markdown-alert markdown-alert-${node.kind.toLowerCase()}`,
        },
        h(options, "p", { class: "markdown-alert-title" }, node.title),
        h(
          options,
          "div",
          { class: "markdown-alert-content" },
          node.children.map((child, index) =>
            renderBlock(child, options, `${key}:${index}`)
          )
        )
      )
    case "component":
      return renderComponent(node, options, key)
  }
}

function renderInline(
  node: InlineNode,
  options: MarkdownVueOptions,
  key: string
): VNodeChild {
  switch (node.type) {
    case "text":
      return node.value
    case "inlineCode":
      return h(options, "code", { key }, node.value)
    case "strong":
      return h(
        options,
        "strong",
        { key },
        renderInlines(node.children, options)
      )
    case "emphasis":
      return h(options, "em", { key }, renderInlines(node.children, options))
    case "strike":
      return h(options, "del", { key }, renderInlines(node.children, options))
    case "footnoteReference":
      return h(
        options,
        "sup",
        { key },
        h(
          options,
          "a",
          {
            id: `user-content-fnref-${footnoteReferenceId(node.id, node.referenceIndex)}`,
            "data-footnote-ref": "",
            "aria-describedby": "footnote-label",
            href: `#user-content-fn-${node.id}`,
          },
          String(node.number)
        )
      )
    case "link":
      return h(
        options,
        "a",
        { key, href: node.href, ...(node.title && { title: node.title }) },
        renderInlines(node.children, options)
      )
    case "image":
      return h(options, "img", {
        key,
        src: node.src,
        alt: node.alt,
        ...(node.title && { title: node.title }),
      })
    case "break":
      return h(options, "br", { key })
    case "inlineHtml":
      return options.allowHtml
        ? h(options, "span", { key, innerHTML: node.value })
        : node.value
    case "inlineComponent":
      return renderComponent(node, options, key)
  }
}

function renderInlines(nodes: InlineNode[], options: MarkdownVueOptions) {
  return nodes.map((node, index) => renderInline(node, options, `i:${index}`))
}

function renderCodeBlock(
  node: Extract<BlockNode, { type: "code" }>,
  options: MarkdownVueOptions,
  key: string
) {
  const lang = node.lang ?? "plaintext"
  const highlighter = options.highlighter
  const code = highlighter
    ? vh("code", {
        class: `language-${lang}`,
        innerHTML: highlighter(node.value, lang, {
          ...(node.meta && { meta: node.meta }),
          ...(node.highlightLines && { highlightLines: node.highlightLines }),
          ...(options.codeLineNumbers !== undefined && {
            lineNumbers: options.codeLineNumbers,
          }),
        }),
      })
    : h(options, "code", { class: `language-${lang}` }, node.value)
  const pre = h(
    options,
    "pre",
    {
      key,
      class: `tm-code${options.codeLineNumbers ? " tm-code--line-numbers" : ""}`,
      "data-lang": lang,
      ...(node.meta && { "data-meta": node.meta }),
      ...(node.title && { "data-code-title": node.title }),
      ...(node.file && { "data-filename": node.file }),
      ...(node.framework && { "data-framework": node.framework }),
    },
    code
  )
  if (!node.title) return pre
  return h(
    options,
    "figure",
    { key, class: "tm-code-frame", "data-lang": lang },
    h(options, "figcaption", null, node.title),
    pre
  )
}

function renderListItemChildren(
  children: BlockNode[],
  checked: boolean | undefined,
  loose: boolean | undefined,
  options: MarkdownVueOptions,
  key: string
) {
  let result: VNodeChild[] =
    checked === undefined
      ? []
      : [
          h(options, "input", {
            key: `${key}:checkbox`,
            type: "checkbox",
            disabled: true,
            checked,
            readonly: true,
          }),
          " ",
        ]
  for (let index = 0; index < children.length; index++) {
    const child = children[index]
    if (child.type === "paragraph" && (!loose || index === 0)) {
      result.push(...renderInlines(child.children, options))
      if (loose) result = [h(options, "p", { key: `${key}:paragraph` }, result)]
    } else result.push(renderBlock(child, options, `${key}:${index}`))
  }
  return result
}

function renderTableCell(
  tag: "th" | "td",
  cell: { children: InlineNode[] },
  align: string | null | undefined,
  options: MarkdownVueOptions,
  key: number
) {
  return h(
    options,
    tag,
    { key, ...(align && { style: { textAlign: align } }) },
    renderInlines(cell.children, options)
  )
}

type Footnote = Extract<BlockNode, { type: "footnotes" }>["items"][number]

function renderFootnotes(
  items: Footnote[],
  options: MarkdownVueOptions,
  key: string
) {
  return h(
    options,
    "section",
    { key, "data-footnotes": "", class: "footnotes" },
    h(
      options,
      "h2",
      { id: "footnote-label", class: "sr-only" },
      "Footnotes",
      renderHeadingAnchor("footnote-label", options)
    ),
    h(
      options,
      "ol",
      null,
      items.map((item) =>
        h(
          options,
          "li",
          { key: item.id, id: `user-content-fn-${item.id}` },
          renderFootnoteItem(item, options)
        )
      )
    )
  )
}

function renderFootnoteItem(item: Footnote, options: MarkdownVueOptions) {
  const lastIndex = item.children.length - 1
  const backrefs = renderFootnoteBackrefs(item, options)
  const result: VNodeChild[] = item.children.map((child, index) => {
    if (index === lastIndex && child.type === "paragraph")
      return h(
        options,
        "p",
        { key: index },
        renderInlines(child.children, options),
        backrefs
      )
    return renderBlock(child, options, `${index}`)
  })
  if (item.children[lastIndex]?.type !== "paragraph")
    result.push(h(options, "p", { key: "backref-wrapper" }, backrefs.slice(1)))
  return result
}

function renderFootnoteBackrefs(item: Footnote, options: MarkdownVueOptions) {
  const result: VNodeChild[] = []
  for (let index = 1; index <= (item.referenceCount ?? 1); index++) {
    const referenceId = footnoteReferenceId(item.id, index)
    const label = index === 1 ? `${item.number}` : `${item.number}-${index}`
    result.push(
      " ",
      h(
        options,
        "a",
        {
          key: index,
          "data-footnote-backref": "",
          "aria-label": `Back to reference ${label}`,
          class: "data-footnote-backref",
          href: `#user-content-fnref-${referenceId}`,
        },
        "↩"
      )
    )
  }
  return result
}

function renderComponent(
  node: Extract<Node, { type: "component" | "inlineComponent" }>,
  options: MarkdownVueOptions,
  key: string
) {
  const tag =
    node.tagName ??
    (node.type === "inlineComponent" ? "span" : "md-comment-component")
  const props: Record<string, unknown> = { ...node.properties }
  if (!node.tagName) {
    props["data-component"] = node.name
    if (!props["data-attributes"])
      props["data-attributes"] = JSON.stringify(node.attributes)
  }
  return h(
    options,
    tag,
    { key, ...props },
    node.type === "inlineComponent"
      ? renderInlines(node.children, options)
      : node.children.map((child, index) =>
          renderBlock(child, options, `${key}:${index}`)
        )
  )
}

function renderHeadingAnchor(
  id: string | undefined,
  options: MarkdownVueOptions
) {
  if (!id || !options.headingAnchors) return null
  const anchor =
    typeof options.headingAnchors === "object" ? options.headingAnchors : {}
  return h(
    options,
    "a",
    {
      href: `#${id}`,
      "aria-hidden": anchor.ariaHidden ?? true,
      class: anchor.className ?? "anchor-heading anchor-heading-link",
      tabindex: anchor.tabIndex ?? -1,
    },
    anchor.content ?? "#"
  )
}

/** `<Markdown :source="text" :components :extensions />`: React's `<Markdown>{text}</Markdown>`. */
export const Markdown = defineComponent({
  name: "Markdown",
  props: {
    source: {
      type: [String, Object] as PropType<MarkdownInput>,
      required: true,
    },
    components: {
      type: Object as PropType<MarkdownComponents>,
      default: undefined,
    },
    extensions: {
      type: Array as PropType<RenderOptions["extensions"]>,
      default: undefined,
    },
    highlighter: {
      type: Function as PropType<RenderOptions["highlighter"]>,
      default: undefined,
    },
    allowHtml: { type: Boolean, default: false },
  },
  setup(props) {
    return () =>
      renderMarkdownVue(props.source, {
        components: props.components,
        extensions: props.extensions,
        highlighter: props.highlighter,
        allowHtml: props.allowHtml,
      })
  },
})
