<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"

  import { MenuContextTrigger } from "@ark-ui/svelte"

  import { contextMenu } from "../../../../styles/context-menu.styles"

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

<!-- A div, as Base UI's trigger: a region, not a button. -->
<MenuContextTrigger>
  {#snippet asChild(props)}
    <div {...props()} class={props().class} style={props().style} data-slot="context-menu-trigger" {...rest} sx={[contextMenu.trigger, className as Sx]}>
      {@render children?.()}
    </div>
  {/snippet}
</MenuContextTrigger>
