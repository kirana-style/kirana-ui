<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"

  // `code-block-streaming`'s block, a component of its own as React's file declares it beside the
  // example: a code that grows, highlighted again as it does.

  import {
    HighlightedLine,
    useHighlightedCode,
  } from "../../../lib/svelte/use-highlighted-code"
  import {
    CodeBlock,
    CodeBlockActions,
    CodeBlockContent,
    CodeBlockCopyButton,
    CodeBlockHeader,
    CodeBlockLine,
    CodeBlockTitle,
  } from "../ui/code-block"

  let {
    block, code,
    class: className,
    ...rest
  }: {
    block: StreamingBlockData
    code: string
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()

  type StreamingBlockData = {
    title?: string
    language: string
    code: string
    lineNumbers?: boolean
    highlight?: number[]
    diff?: boolean
  }

  const rows = $derived.by(() => code.split("\n"))
  // A diff row starts with +, - or a space. The marker is not part of the code.
  const source = $derived.by(() => block.diff ? rows.map((row) => row.slice(1)).join("\n") : code
  )
  const lines = $derived(useHighlightedCode(source, block.language))

  function variant(index: number) {
    if (block.diff) {
      const row = rows[index]
      return row?.startsWith("+")
        ? "added"
        : row?.startsWith("-")
          ? "removed"
          : "default"
    }
    return block.highlight?.includes(index) ? "highlighted" : "default"
  }
</script>

<CodeBlock {...rest} sx={className as Sx}>
  {#if block.title}
    <CodeBlockHeader>
      <CodeBlockTitle>{block.title}</CodeBlockTitle>
      <CodeBlockActions>
        <CodeBlockCopyButton value={source} disabled={code.length < block.code.length} />
      </CodeBlockActions>
    </CodeBlockHeader>
  {/if}
  <CodeBlockContent lineNumbers={block.lineNumbers}>{#each lines as line, index (index)}<CodeBlockLine variant={variant(index)}><HighlightedLine tokens={line} /></CodeBlockLine>{/each}</CodeBlockContent>
</CodeBlock>
