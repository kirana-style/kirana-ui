<script lang="ts">
  import { onMount } from "svelte"
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"

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

  // The chips are the element the popup is placed against: Base UI's `anchor`.
  const ctx = useCombobox()
  let element = $state<HTMLElement | null>(null)
  onMount(() => {
    ctx.chips = true
    ctx.anchor = element
    return () => {
      if (ctx.anchor === element) ctx.anchor = null
    }
  })
</script>

<div bind:this={element} data-slot="combobox-chips" {...rest} sx={[combobox.chips, className as Sx]}>
  {@render children?.()}
</div>
