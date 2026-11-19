<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { Avatar } from "@kirana-ui/svelte/avatar"
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

<Avatar.Fallback data-slot="avatar-fallback" {...rest} sx={[avatar.fallback, className as Sx]}>
  {@render children?.()}
</Avatar.Fallback>
