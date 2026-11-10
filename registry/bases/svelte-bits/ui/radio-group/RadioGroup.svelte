<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { RadioGroup } from "bits-ui"
  import { untrack } from "svelte"

  import { radioGroup } from "../../../../styles/radio-group.styles"

  /**
   * Bits UI's radio group, taking Svelte's Ark UI parts' props: `value`, `defaultValue`, and
   * `onValueChange` called with `{ value }`.
   */
  let {
    defaultValue,
    value,
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

  let own = $state(untrack(() => defaultValue ?? ""))
</script>

<RadioGroup.Root
  data-slot="radio-group"
  {...rest}
  value={value ?? own}
  onValueChange={(next) => {
    own = next
    onValueChange?.({ value: next })
  }}
  sx={[radioGroup.root, className as Sx]}
>
  {@render children?.()}
</RadioGroup.Root>
