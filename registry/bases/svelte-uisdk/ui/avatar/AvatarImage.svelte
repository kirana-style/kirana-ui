<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { AvatarImage } from "@ui-sdk/svelte/avatar"

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

<UisdkPart part={AvatarImage} slotName="avatar-image" tag="img" {...rest} sx={[avatar.image, className as Sx]} />
