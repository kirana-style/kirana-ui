<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { Tabs } from "@ui-sdk/svelte/tabs"

  import UisdkPart from "../../../../lib/svelte/UisdkPart.svelte"
  import { tabs } from "../../../../styles/tabs.styles"

  /** ui-sdk's tabs, taking Svelte's Ark UI parts' props: `value`, `defaultValue`, and `onValueChange` called with `{ value }`. */
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
  part={Tabs}
  slotName="tabs"
  {...rest}
  onValueChange={(value: string | null) => onValueChange?.({ value: value as string })}
  sx={[tabs.root, className as Sx]}
>
  {@render children?.()}
</UisdkPart>
