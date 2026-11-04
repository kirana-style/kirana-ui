<script lang="ts">
  /**
   * TanStack Markdown on Svelte: `<Markdown source={text} {components} {extensions} />`, React's
   * `<Markdown>{text}</Markdown>`, drawn from the framework-free tree (`lib/markdown-tree.ts`),
   * since the package has no Svelte adapter (LF-008). A page passes `components` to draw an element
   * its own way, each given the element's attributes, its children and the element itself (`node`).
   */
  import type { MarkdownInput, RenderOptions } from "@tanstack/markdown"
  import type { Component } from "svelte"

  import { markdownTree } from "../markdown-tree"
  import MarkdownNode from "./MarkdownNode.svelte"

  let {
    source,
    components,
    extensions,
    highlighter,
    allowHtml = false,
  }: {
    source: MarkdownInput
    // `any`: each component takes its own element's attributes.
    // oxlint-disable-next-line no-explicit-any
    components?: Partial<Record<string, Component<any>>>
    extensions?: RenderOptions["extensions"]
    highlighter?: RenderOptions["highlighter"]
    allowHtml?: boolean
  } = $props()

  const tree = $derived(markdownTree(source, { extensions, highlighter, allowHtml }))
</script>

{#each tree as node, index (index)}<MarkdownNode {node} {components} />{/each}
