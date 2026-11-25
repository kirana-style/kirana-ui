<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ChangeDetails } from "@kirana-ui/svelte"
  import { ToggleGroup } from "@kirana-ui/svelte/toggle-group"
  import { setContext, untrack } from "svelte"
  import type { Snippet } from "svelte"
  import type { ClassValue } from "svelte/elements"

  import { segmentedControl } from "../../../../styles/segmented-control.styles"
  import { tabs } from "../../../../styles/tabs.styles"
  import { SEGMENTED_CONTROL } from "./context"
  import type { SegmentedControlContext, SegmentedControlSize } from "./context"

  /**
   * One value chosen from a few, on Kirana UI's toggle group: `value` (or `bind:value`) and
   * `defaultValue`, read once, hold one value, not the group's list; `onValueChange(value)`.
   */
  let {
    size = "default",
    value = $bindable(),
    defaultValue,
    onValueChange,
    class: className,
    children,
    ...rest
  }: {
    size?: SegmentedControlSize
    value?: string
    defaultValue?: string
    onValueChange?: (value: string) => void
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  let own = $state(untrack(() => defaultValue))
  const current = $derived(value ?? own)
  const change = (next: unknown[], details: ChangeDetails) => {
    // One item is always chosen: pressing the chosen one again would leave none, so it is refused.
    if (next.length === 0) {
      details.cancel()
      return
    }
    const chosen = next[0] as string
    own = chosen
    if (value !== undefined) value = chosen
    onValueChange?.(chosen)
  }

  setContext<SegmentedControlContext>(SEGMENTED_CONTROL, {
    get size() {
      return size
    },
  })
</script>

<ToggleGroup
  data-slot="segmented-control"
  data-size={size}
  {...rest}
  value={current === undefined ? [] : [current]}
  onValueChange={change}
  sx={[tabs.list, tabs.listDefault, segmentedControl.root, className as Sx]}
>
  {@render children?.()}
</ToggleGroup>
