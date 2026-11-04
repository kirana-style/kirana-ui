<script lang="ts">
  import { onMount } from "svelte"
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"

  import { ComboboxControl } from "@ark-ui/svelte"

  import { combobox } from "../../../../styles/combobox.styles"
  import { useCombobox } from "./context"

  let {
    class: className,
    children,
    ...rest
  }: {
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  // Ark anchors the popup to its control, which the chips are: Base UI's `anchor`.
  const ctx = useCombobox()
  onMount(() => {
    ctx.chips = true
  })
</script>

<ComboboxControl>
  {#snippet asChild(props)}
    <div {...props()} class={props().class} style={props().style} data-slot="combobox-chips" {...rest} sx={[combobox.chips, className as Sx]}>
      {@render children?.()}
    </div>
  {/snippet}
</ComboboxControl>
