<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"

  import { AvatarContext, AvatarFallback } from "@ark-ui/svelte"

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

<!-- A span, as Base UI's fallback, and gone once the picture has loaded, as Base UI's is. -->
<AvatarContext>
  {#snippet render(state)}
    {#if !state().loaded}
      <AvatarFallback>
        {#snippet asChild(props)}
          <span {...props()} class={props().class} style={props().style} data-slot="avatar-fallback" {...rest} sx={[avatar.fallback, className as Sx]}>
            {@render children?.()}
          </span>
        {/snippet}
      </AvatarFallback>
    {/if}
  {/snippet}
</AvatarContext>
