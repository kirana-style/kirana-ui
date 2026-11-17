<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import { Checkbox, CheckboxIndicator } from "@ui-sdk/svelte/checkbox"

  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import UisdkPart from "../../../../lib/svelte/UisdkPart.svelte"
  import { checkbox } from "../../../../styles/checkbox.styles"

  /**
   * ui-sdk's checkbox: its root is the box (a `span`, as Base UI's), its indicator there while
   * checked or indeterminate. Svelte's Ark UI parts' props: `checked` (`true`, `false` or
   * `"indeterminate"`), Base UI's `defaultChecked`, and `onCheckedChange` called with `{ checked }`.
   */
  let {
    onCheckedChange,
    class: className,
    ...rest
  }: {
    defaultChecked?: boolean
    checked?: boolean | "indeterminate"
    onCheckedChange?: (details: { checked: boolean | "indeterminate" }) => void
    disabled?: boolean
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()
</script>

<UisdkPart
  part={Checkbox}
  slotName="checkbox"
  tag="span"
  {...rest}
  onCheckedChange={(checked: boolean | "indeterminate") => onCheckedChange?.({ checked })}
  sx={[checkbox.root, className as Sx]}
>
  <UisdkPart part={CheckboxIndicator} slotName="checkbox-indicator" tag="span" sx={checkbox.indicator}>
    <IconPlaceholder
      lucide="CheckIcon"
      tabler="IconCheck"
      hugeicons="Tick02Icon"
      phosphor="CheckIcon"
      remixicon="RiCheckLine"
    />
  </UisdkPart>
</UisdkPart>
