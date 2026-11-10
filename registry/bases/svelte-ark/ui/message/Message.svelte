<script lang="ts">
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"

  import { message } from "../../../../styles/message.styles"

  let {
    align = "start",
    class: className,
    children,
    ...rest
  }: {
    align?: "start" | "end"
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<div data-slot="message" data-align={align} {...rest} class={className} sx={message.root}>
  {@render children?.()}
</div>
