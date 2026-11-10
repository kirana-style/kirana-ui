<script lang="ts">
  import type { ClassValue } from "svelte/elements"
  import { Avatar } from "bits-ui"

  import { avatar } from "../../../../styles/avatar.styles"

  let {
    src,
    class: className,
    ...rest
  }: {
    src?: string
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()
</script>

<Avatar.Image {src} {...rest}>
  <!-- In the page once the picture has loaded, as Base UI's: Bits loads it apart and keeps its
       element, hidden, until then. -->
  {#snippet child({ props })}
    {#if props["data-status"] === "loaded"}
      <img {...props} style={undefined} alt={rest.alt as string | undefined} data-slot="avatar-image" class={className} sx={avatar.image} />
    {/if}
  {/snippet}
</Avatar.Image>
