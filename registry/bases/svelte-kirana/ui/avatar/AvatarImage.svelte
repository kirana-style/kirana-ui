<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import { Avatar } from "@kirana-ui/svelte/avatar"

  import { avatar } from "../../../../styles/avatar.styles"

  let {
    src,
    class: className,
    ...rest
  }: {
    src: string
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()
</script>

<Avatar.Image data-slot="avatar-image" {src} {...rest} sx={[avatar.image, className as Sx]} />
