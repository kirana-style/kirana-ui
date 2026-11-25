<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import { Toggle } from "@kirana-ui/svelte/toggle"
  import { getContext } from "svelte"
  import type { Snippet } from "svelte"
  import type { ClassValue } from "svelte/elements"

  import { segmentedControl } from "../../../../styles/segmented-control.styles"
  import { tabs } from "../../../../styles/tabs.styles"
  import { SEGMENTED_CONTROL } from "./context"
  import type { SegmentedControlContext } from "./context"

  /** One choice: Kirana UI's toggle with a `value`, which the control holds while it is chosen. */
  let {
    value,
    class: className,
    children,
    ...rest
  }: {
    value: string
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  const context = getContext<SegmentedControlContext | undefined>(SEGMENTED_CONTROL)
</script>

<Toggle
  data-slot="segmented-control-item"
  data-size={context?.size ?? "default"}
  {value}
  {...rest}
  sx={[tabs.trigger, segmentedControl.item, className as Sx]}
>
  {@render children?.()}
</Toggle>
