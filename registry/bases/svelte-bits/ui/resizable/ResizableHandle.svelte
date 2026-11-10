<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import { PaneResizer } from "paneforge"

  import { resizable } from "../../../../styles/resizable.styles"

  /**
   * paneforge's resizer, a div that never shrinks, as react-resizable-panels' handle (its inline
   * `flex-shrink`). `id` names the two panels it sits between on the Ark UI parts (`"a:b"`);
   * paneforge finds them from the handle's place, so it is the element's own id here.
   */
  let {
    id,
    withHandle = false,
    class: className,
    ...rest
  }: {
    id?: `${string}:${string}`
    withHandle?: boolean
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()
</script>

<PaneResizer
  data-slot="resizable-handle"
  {id}
  style="flex-shrink: 0"
  {...rest}
  sx={[resizable.handle, className as Sx]}
>
  {#if withHandle}
    <div sx={resizable.grip}></div>
  {/if}
</PaneResizer>
