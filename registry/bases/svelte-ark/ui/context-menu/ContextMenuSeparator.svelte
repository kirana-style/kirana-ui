<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"

  import { MenuSeparator } from "@ark-ui/svelte"

  import { menuSeparator } from "../../../../styles/menu.styles"

  let {
    class: className,
    ...rest
  }: {
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()
</script>

<!-- A div, as Base UI's separator; Ark's is an `hr`. -->
<MenuSeparator>
  {#snippet asChild(props)}
    <div {...props()} class={props().class} style={props().style} data-slot="context-menu-separator" {...rest} sx={[menuSeparator, className as Sx]}></div>
  {/snippet}
</MenuSeparator>
