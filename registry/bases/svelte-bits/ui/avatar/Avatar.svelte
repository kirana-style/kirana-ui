<script lang="ts">
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { Avatar } from "bits-ui"

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

<Avatar.Root {...rest}>
  <!-- A span, as Base UI's avatar, where Bits draws a `div`. -->
  {#snippet child({ props })}
    <span {...props} data-slot="avatar" data-size={size} class={className} sx={avatar.root}>
      {@render children?.()}
    </span>
  {/snippet}
</Avatar.Root>
