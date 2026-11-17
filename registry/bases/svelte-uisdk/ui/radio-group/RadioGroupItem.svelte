<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { Radio, RadioIndicator } from "@ui-sdk/svelte/radio"

  import UisdkPart from "../../../../lib/svelte/UisdkPart.svelte"
  import { radioGroup } from "../../../../styles/radio-group.styles"

  let {
    value,
    class: className,
    children,
    ...rest
  }: {
   value: string 
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<UisdkPart part={Radio} slotName="radio-group-item" tag="span" value={value} {...rest} sx={[radioGroup.item, className as Sx]}>
  <UisdkPart part={RadioIndicator} slotName="radio-group-indicator" tag="span" sx={radioGroup.indicator}>
    <span sx={radioGroup.dot}></span>
  </UisdkPart>
</UisdkPart>
