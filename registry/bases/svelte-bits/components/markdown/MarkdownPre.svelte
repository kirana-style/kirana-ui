<script lang="ts">
  /** A fenced block: TanStack Markdown names its language in `data-lang`. */
  import { textOf } from "../../../../lib/markdown-tree"
  import type { MarkdownElement } from "../../../../lib/markdown-tree"
  import MarkdownCodeBlock from "./MarkdownCodeBlock.svelte"

  let {
    node,
    "data-lang": language = "",
  }: { node: MarkdownElement; "data-lang"?: string; [attribute: string]: unknown } = $props()

  // The fence's text, its `code` element's, as React's reads `children.props.children`.
  const code = $derived(textOf(node.children))
</script>

<MarkdownCodeBlock {code} language={String(language)} />
