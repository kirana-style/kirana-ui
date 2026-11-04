/**
 * TanStack Markdown on Solid: `<Markdown source={text} components={…} extensions={…} />`, React's
 * `<Markdown>{text}</Markdown>`, drawn from the framework-free tree (`lib/markdown-tree.ts`), since
 * the package has no Solid adapter (LF-008). A page passes `components` to draw an element its own
 * way, each given the element's attributes, its children and the element itself (`node`).
 */
import type { MarkdownInput, RenderOptions } from "@tanstack/markdown"
import { For, Match, Switch, createMemo } from "solid-js"
import type { Component, JSX } from "solid-js"
import { Dynamic } from "solid-js/web"

import { markdownTree } from "../markdown-tree"
import type { MarkdownElement, MarkdownTree } from "../markdown-tree"

// `any`: each component takes its own element's attributes.
// oxlint-disable-next-line no-explicit-any
export type MarkdownComponents = Partial<Record<string, Component<any>>>

/** A table cell's alignment arrives as `{ textAlign }`; Solid's `style` takes CSS names. */
function attributes(props: Record<string, unknown>) {
  const { style, ...rest } = props
  if (!style || typeof style !== "object") return props
  return {
    ...rest,
    style: Object.fromEntries(
      Object.entries(style).map(([key, value]) => [
        key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`),
        value,
      ])
    ),
  }
}

function MarkdownNode(props: {
  node: MarkdownTree
  components?: MarkdownComponents
}): JSX.Element {
  return (
    <Switch>
      <Match when={typeof props.node === "string" && props.node}>
        {(text) => text()}
      </Match>
      <Match when={props.node && typeof props.node === "object" && props.node}>
        {(element) => {
          const node = element() as MarkdownElement
          const custom = props.components?.[node.tag]
          const children = () => (
            <For each={node.children}>
              {(child) => (
                <MarkdownNode node={child} components={props.components} />
              )}
            </For>
          )
          if (custom)
            return (
              <Dynamic component={custom} {...node.props} node={node}>
                {children()}
              </Dynamic>
            )
          if (node.html !== undefined)
            return (
              <Dynamic
                component={node.tag}
                {...attributes(node.props)}
                innerHTML={node.html}
              />
            )
          return (
            <Dynamic component={node.tag} {...attributes(node.props)}>
              {node.children.length ? children() : undefined}
            </Dynamic>
          )
        }}
      </Match>
    </Switch>
  )
}

export function Markdown(props: {
  source: MarkdownInput
  components?: MarkdownComponents
  extensions?: RenderOptions["extensions"]
  highlighter?: RenderOptions["highlighter"]
  allowHtml?: boolean
}) {
  const tree = createMemo(() =>
    markdownTree(props.source, {
      extensions: props.extensions,
      highlighter: props.highlighter,
      allowHtml: props.allowHtml ?? false,
    })
  )
  return (
    <For each={tree()}>
      {(node) => <MarkdownNode node={node} components={props.components} />}
    </For>
  )
}
