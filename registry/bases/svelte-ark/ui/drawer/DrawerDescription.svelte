<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"

  import { DrawerDescription } from "@ark-ui/svelte"

  import { drawer } from "../../../../styles/drawer.styles"

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

<!-- A paragraph, as Base UI's description. -->
<DrawerDescription>
  {#snippet asChild(props)}
    <p {...props()} class={props().class} style={props().style} data-slot="drawer-description" {...rest} sx={[drawer.description, className as Sx]}>
      {@render children?.()}
    </p>
  {/snippet}
</DrawerDescription>
