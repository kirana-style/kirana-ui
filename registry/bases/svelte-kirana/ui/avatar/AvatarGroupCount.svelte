<script lang="ts">
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"

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

<div data-slot="avatar-group-count" {...rest} class={className} sx={avatar.groupCount}>
  {@render children?.()}
</div>
