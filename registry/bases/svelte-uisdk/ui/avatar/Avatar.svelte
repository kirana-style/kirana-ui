<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { Avatar } from "@ui-sdk/svelte/avatar"

  import UisdkPart from "../../../../lib/svelte/UisdkPart.svelte"
  import { avatar } from "../../../../styles/avatar.styles"

  let {
    size = "default",
    class: className,
    children,
    ...rest
  }: {
   size?: "default" | "sm" | "lg" 
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<UisdkPart part={Avatar} slotName="avatar" tag="span" data-size={size} {...rest} sx={[avatar.root, className as Sx]}>
  {@render children?.()}
</UisdkPart>
