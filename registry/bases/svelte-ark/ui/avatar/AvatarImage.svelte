<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { AvatarImageProps } from "@ark-ui/svelte"

  import { AvatarImage } from "@ark-ui/svelte"

  import { avatar } from "../../../../styles/avatar.styles"

  let {
    asChild,
    class: className,
    ...rest
  }: {
    asChild?: AvatarImageProps["asChild"]
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()
</script>

<AvatarImage {asChild} data-slot="avatar-image" {...rest} sx={[avatar.image, className as Sx]} />
