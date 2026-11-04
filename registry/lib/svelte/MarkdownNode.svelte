<script lang="ts">
  /** One node of the markdown tree: text, an HTML element, or the page's component for its tag. */
  import type { Component } from "svelte"

  import type { MarkdownTree } from "../markdown-tree"
  import Self from "./MarkdownNode.svelte"

  let {
    node,
    components,
  }: {
    node: MarkdownTree
    // `any`: each component takes its own element's attributes.
    // oxlint-disable-next-line no-explicit-any
    components?: Partial<Record<string, Component<any>>>
  } = $props()

  const VOID = new Set(["br", "hr", "img", "input"])

  /** A table cell's alignment arrives as a style object; an element takes it as text. */
  const attributes = (props: Record<string, unknown>) => {
    const { style, ...rest } = props
    if (!style || typeof style !== "object") return props
    const text = Object.entries(style)
      .map(([key, value]) => `${key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)}: ${value}`)
      .join("; ")
    return { ...rest, style: text }
  }
</script>

{#if typeof node === "string"}{node}{:else if node}
  {@const Custom = components?.[node.tag]}
  {#if Custom}
    <!-- The element itself too (`node`), so a component can read its text. -->
    <Custom {...node.props} {node}>
      {#each node.children as child, index (index)}<Self node={child} {components} />{/each}
    </Custom>
  {:else if VOID.has(node.tag)}
    <svelte:element this={node.tag} {...attributes(node.props)} />
  {:else if node.html !== undefined}
    <svelte:element this={node.tag} {...attributes(node.props)}>{@html node.html}</svelte:element>
  {:else}
    <svelte:element this={node.tag} {...attributes(node.props)}
      >{#each node.children as child, index (index)}<Self node={child} {components} />{/each}</svelte:element
    >
  {/if}
{/if}
