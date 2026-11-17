<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { RadioGroup } from "@ui-sdk/svelte/radio"

  import UisdkPart from "../../../../lib/svelte/UisdkPart.svelte"
  import { radioGroup } from "../../../../styles/radio-group.styles"

  /** ui-sdk's radio group, taking Svelte's Ark UI parts' props: `value`, `defaultValue`, and `onValueChange` called with `{ value }`. */
  let {
    onValueChange,
    class: className,
    children,
    ...rest
  }: {
    defaultValue?: string
    value?: string
    onValueChange?: (details: { value: string }) => void
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<UisdkPart
  part={RadioGroup}
  slotName="radio-group"
  {...rest}
  onValueChange={(value: string | null) => onValueChange?.({ value: value as string })}
  sx={[radioGroup.root, className as Sx]}
>
  {@render children?.()}
</UisdkPart>
