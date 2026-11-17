<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { AvatarFallback } from "@ui-sdk/svelte/avatar"

  import UisdkPart from "../../../../lib/svelte/UisdkPart.svelte"
  import { avatar } from "../../../../styles/avatar.styles"

  let {
    class: className,
    children,
    ...rest
  }: {
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<UisdkPart part={AvatarFallback} slotName="avatar-fallback" tag="span" {...rest} sx={[avatar.fallback, className as Sx]}>
  {@render children?.()}
</UisdkPart>
