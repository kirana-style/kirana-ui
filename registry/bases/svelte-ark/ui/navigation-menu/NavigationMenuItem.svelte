<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"

  import { NavigationMenuItem } from "@ark-ui/svelte/navigation-menu"

  import { navigationMenu } from "../../../../styles/navigation-menu.styles"

  const id = $props.id()

  let {
    value = id,
    class: className,
    children,
    ...rest
  }: {
    value?: string
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  // Base UI's `value` is optional: one is made when it is not given.
</script>

<NavigationMenuItem value={value}>
  {#snippet asChild(props)}
    <li {...props()} class={props().class} style={props().style} data-slot="navigation-menu-item" {...rest} sx={[navigationMenu.item, className as Sx]}>
      {@render children?.()}
    </li>
  {/snippet}
</NavigationMenuItem>
