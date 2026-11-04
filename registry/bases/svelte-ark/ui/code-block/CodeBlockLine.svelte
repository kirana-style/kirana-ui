<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { Snippet } from "svelte"
  import type { ClassValue } from "svelte/elements"

  import { codeBlock } from "../../../../styles/code-block.styles"

  let {
    variant = "default",
    class: className,
    children,
    ...rest
  }: {
    variant?: "default" | "added" | "removed" | "highlighted"
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<span data-slot="code-block-line" data-variant={variant} {...rest} sx={[codeBlock.line, className as Sx]}
  ><span data-slot="code-block-line-content" sx={codeBlock.lineContent}
    >{#if children}{@render children()}{:else}{"\n"}{/if}</span
  ></span
>
