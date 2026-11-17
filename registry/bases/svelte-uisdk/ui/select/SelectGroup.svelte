<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { SelectGroup } from "@ui-sdk/svelte/select"

  import UisdkPart from "../../../../lib/svelte/UisdkPart.svelte"
  import { select } from "../../../../styles/select.styles"

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

<UisdkPart part={SelectGroup} slotName="select-group" tag="div" {...rest} sx={[select.group, className as Sx]}>
  {@render children?.()}
</UisdkPart>
