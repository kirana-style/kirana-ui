<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import { RadioGroup } from "@kirana-ui/svelte/radio-group"

  import { radioGroup } from "../../../../styles/radio-group.styles"

  let {
    value,
    class: className,
    ...rest
  }: {
    value: string
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()
</script>

<RadioGroup.Item data-slot="radio-group-item" {value} {...rest} sx={[radioGroup.item, className as Sx]}>
  <RadioGroup.Indicator data-slot="radio-group-indicator" sx={radioGroup.indicator}>
    <span sx={radioGroup.dot}></span>
  </RadioGroup.Indicator>
</RadioGroup.Item>
