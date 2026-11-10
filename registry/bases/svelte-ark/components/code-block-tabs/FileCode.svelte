<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"

  import {
    HighlightedLine,
    useHighlightedCode,
  } from "../../../../lib/svelte/use-highlighted-code"
  import { CodeBlockContent, CodeBlockLine } from "../../ui/code-block"

  let {
    code, language,
    class: className,
    ...rest
  }: {
    code: string
    language: string
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()

  const lines = $derived(useHighlightedCode(code, language))
</script>

<CodeBlockContent lineNumbers {...rest} sx={className as Sx}>{#each lines as line, index (index)}<CodeBlockLine><HighlightedLine tokens={line} /></CodeBlockLine>{/each}</CodeBlockContent>
