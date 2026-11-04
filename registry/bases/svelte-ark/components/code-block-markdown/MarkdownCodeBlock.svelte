<script lang="ts">
  import { getContext } from "svelte"

  import HighlightedLine from "../../../../lib/svelte/HighlightedLine.svelte"
  import { useHighlightedCode } from "../../../../lib/svelte/use-highlighted-code"
  import {
    CodeBlock,
    CodeBlockActions,
    CodeBlockContent,
    CodeBlockCopyButton,
    CodeBlockHeader,
    CodeBlockLine,
    CodeBlockTitle,
  } from "../../ui/code-block"
  import { FENCE_OPEN } from "./context"
  import type { FenceOpenContext } from "./context"

  let { code, language }: { code: string; language: string } = $props()

  // True while the closing fence has not arrived yet.
  const open = getContext<FenceOpenContext | undefined>(FENCE_OPEN)
  const incomplete = $derived(open?.value ?? false)
  const lines = $derived(useHighlightedCode(code, language))
</script>

<CodeBlock>
  <CodeBlockHeader>
    <CodeBlockTitle>{language || "text"}</CodeBlockTitle>
    <CodeBlockActions>
      <CodeBlockCopyButton value={code} disabled={incomplete} />
    </CodeBlockActions>
  </CodeBlockHeader>
  <CodeBlockContent>
    {#each lines as line, index (index)}
      <CodeBlockLine><HighlightedLine tokens={line} /></CodeBlockLine>
    {/each}
  </CodeBlockContent>
</CodeBlock>
