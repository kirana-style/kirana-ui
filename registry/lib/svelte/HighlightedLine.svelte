<script lang="ts">
  /**
   * One line's tokens, each coloured; an empty line holds a newline, as `CodeBlockLine` gives
   * React's, so copying a selection keeps blank lines.
   */
  import type { HighlightToken } from "@tanstack/highlight/core"

  import { highlight } from "../../styles/highlight.styles"

  let { tokens }: { tokens: HighlightToken[] } = $props()
</script>

{#if tokens.length === 0}{"\n"}{:else}{#each tokens as token, index (index)}{#if token.className}<span
        sx={highlight[token.className as keyof typeof highlight]}>{token.value}</span
      >{:else}{token.value}{/if}{/each}{/if}
