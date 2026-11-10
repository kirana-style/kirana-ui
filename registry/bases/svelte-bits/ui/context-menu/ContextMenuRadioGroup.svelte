<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import { untrack } from "svelte"
  import type { Snippet } from "svelte"
  import { ContextMenu } from "bits-ui"

  /**
   * `bind:value` (or `value` with `onValueChange`, which gets `{ value }`, as Ark UI's), or
   * `defaultValue`. A radio item finds it through any group between them, as Base UI's does.
   */
  let {
    value = $bindable(),
    defaultValue = "",
    onValueChange,
    class: className,
    children,
    ...rest
  }: {
    value?: string
    defaultValue?: string
    onValueChange?: (details: { value: string }) => void
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  // Read once, as Base UI reads a default.
  let own = $state(untrack(() => defaultValue))
  const get = () => value ?? own
  const set = (next: string) => {
    own = next
    value = next
    onValueChange?.({ value: next })
  }
</script>

<ContextMenu.RadioGroup data-slot="context-menu-radio-group" bind:value={get, set} {...rest} sx={className as Sx}>
  {@render children?.()}
</ContextMenu.RadioGroup>
