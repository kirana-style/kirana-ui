<script lang="ts">
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { Avatar } from "bits-ui"

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

<Avatar.Fallback {...rest}>
  <!-- A span, as Base UI's fallback, gone once the picture has loaded, as Base UI's is. -->
  {#snippet child({ props })}
    {#if props["data-status"] !== "loaded"}
      <span {...props} style={undefined} data-slot="avatar-fallback" class={className} sx={avatar.fallback}>
        {@render children?.()}
      </span>
    {/if}
  {/snippet}
</Avatar.Fallback>
