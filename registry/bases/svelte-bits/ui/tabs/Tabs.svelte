<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { Tabs } from "bits-ui"
  import { untrack } from "svelte"

  import { tabs } from "../../../../styles/tabs.styles"

  /** Bits UI's tabs, taking Svelte's Ark UI parts' props: `value`, `defaultValue`, `onValueChange` with `{ value }`. */
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

<Tabs.Root
  data-slot="tabs"
  {...rest}
  value={value ?? own}
  onValueChange={(next) => {
    own = next
    onValueChange?.({ value: next })
  }}
  sx={[tabs.root, className as Sx]}
>
  {@render children?.()}
</Tabs.Root>
