<script lang="ts">
  import type { Snippet } from "svelte"
  import type { ClassValue } from "svelte/elements"

  import { codeBlock } from "../../../../styles/code-block.styles"
  import CodeBlockLine from "./CodeBlockLine.svelte"

  let {
    wrap = false,
    lineNumbers = false,
    startLine = 1,
    code,
    class: className,
    children,
    ...rest
  }: {
    wrap?: boolean
    lineNumbers?: boolean
    startLine?: number
    /**
     * The code as text, numbered a line each: Svelte gives a component its children as a snippet,
     * which it cannot read, where React's and Vue's read their text children.
     */
    code?: string
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  const lines = $derived(
    lineNumbers && code !== undefined ? code.replace(/\n$/, "").split("\n") : undefined
  )
</script>

<pre
  data-slot="code-block-content"
  data-wrap={wrap || undefined}
  data-numbered={lineNumbers || undefined}
  dir="ltr"
  tabindex="0"
  style:counter-reset={`line ${startLine - 1}`}
  {...rest}
  class={className} sx={[codeBlock.content, wrap && codeBlock.contentWrap]}
><code data-slot="code-block-code" sx={codeBlock.code}>{#if lines}{#each lines as line, index (index)}<CodeBlockLine
        >{line || "\n"}</CodeBlockLine
      >{/each}{:else if code !== undefined}{code}{:else}{@render children?.()}{/if}</code
  ></pre>
