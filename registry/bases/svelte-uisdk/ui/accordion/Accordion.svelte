<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { Accordion } from "@ui-sdk/svelte/accordion"

  import UisdkPart from "../../../../lib/svelte/UisdkPart.svelte"
  import { accordion } from "../../../../styles/accordion.styles"

  /** ui-sdk's accordion, taking Svelte's Ark UI parts' props: `value`, `defaultValue`, `multiple`, and `onValueChange` called with `{ value }`. */
  let {
    onValueChange,
    class: className,
    children,
    ...rest
  }: {
    multiple?: boolean
    defaultValue?: string[]
    value?: string[]
    onValueChange?: (details: { value: string[] }) => void
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<UisdkPart
  part={Accordion}
  slotName="accordion"
  {...rest}
  onValueChange={(value: string[] | null) => onValueChange?.({ value: value as string[] })}
  sx={[accordion.root, className as Sx]}
>
  {@render children?.()}
</UisdkPart>
