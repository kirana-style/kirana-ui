<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"

  import { popover } from "../../../../styles/popover.styles"
  import { PopoverDescription } from "@ark-ui/svelte"

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
<PopoverDescription>
  {#snippet asChild(props)}
    <p {...props()} class={props().class} style={props().style} data-slot="popover-description" {...rest} sx={[popover.description, className as Sx]}>
      {@render children?.()}
    </p>
  {/snippet}
</PopoverDescription>
