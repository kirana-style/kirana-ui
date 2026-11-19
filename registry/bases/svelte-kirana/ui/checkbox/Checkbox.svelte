<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import { Checkbox } from "@kirana-ui/svelte/checkbox"
  import { untrack } from "svelte"

  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import { checkbox } from "../../../../styles/checkbox.styles"

  /**
   * Kirana UI's checkbox, taking Svelte's Ark UI parts' props: `checked` (`true`, `false` or
   * `"indeterminate"`), Base UI's `defaultChecked`, and `onCheckedChange` called with
   * `{ checked }`. A caller's `sx` arrives as `class`, merged after the box's own.
   */
  let {
    defaultChecked,
    checked,
    onCheckedChange,
    class: className,
    ...rest
  }: {
    defaultChecked?: boolean
    checked?: boolean | "indeterminate"
    onCheckedChange?: (details: { checked: boolean | "indeterminate" }) => void
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()

  let own = $state<boolean | "indeterminate">(untrack(() => defaultChecked ?? false))
  const current = $derived(checked ?? own)
</script>

<Checkbox.Root
  data-slot="checkbox"
  {...rest}
  checked={current === true}
  indeterminate={current === "indeterminate"}
  onCheckedChange={(next: boolean) => {
    own = next
    onCheckedChange?.({ checked: next })
  }}
  sx={[checkbox.root, className as Sx]}
>
  <Checkbox.Indicator data-slot="checkbox-indicator" sx={checkbox.indicator}>
    <IconPlaceholder lucide="CheckIcon" tabler="IconCheck" hugeicons="Tick02Icon" phosphor="CheckIcon" remixicon="RiCheckLine" />
  </Checkbox.Indicator>
</Checkbox.Root>
