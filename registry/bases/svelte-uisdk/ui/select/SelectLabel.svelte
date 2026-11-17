<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { SelectGroupLabel } from "@ui-sdk/svelte/select"

  import UisdkPart from "../../../../lib/svelte/UisdkPart.svelte"
  import { menuLabel } from "../../../../styles/menu.styles"

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

<UisdkPart part={SelectGroupLabel} slotName="select-label" tag="div" {...rest} sx={[menuLabel, className as Sx]}>
  {@render children?.()}
</UisdkPart>
