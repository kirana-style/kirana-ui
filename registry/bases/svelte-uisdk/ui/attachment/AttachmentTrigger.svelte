<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import type { PropsFn } from "../../../../lib/svelte/as-child"

  import Element from "../../../../lib/svelte/Element.svelte"

  import { attachment } from "../../../../styles/attachment.styles"

  let {
    asChild, type,
    class: className,
    children,
    ...rest
  }: {
  
    type?: "button" | "submit" | "reset"
    asChild?: Snippet<[PropsFn<"button">]>
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<Element as="button" data-slot="attachment-trigger" type={asChild ? type : (type ?? 'button')} {...rest} sx={[attachment.trigger, className as Sx]} {asChild}>
  {@render children?.()}
</Element>
