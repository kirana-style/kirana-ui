<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import { ResizableHandle } from "@ui-sdk/svelte/resizable"

  import UisdkPart from "../../../../lib/svelte/UisdkPart.svelte"
  import { resizable } from "../../../../styles/resizable.styles"

  /**
   * ui-sdk's handle, which finds its panels from its place: Ark UI's `id` (`"a1:a2"`) is taken and
   * not needed. It writes react-resizable-panels' `data-separator`, which the state keys read.
   */
  let {
    id: _id,
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

<UisdkPart
  part={ResizableHandle}
  slotName="resizable-handle"
  data-separator=""
  {...rest}
  sx={[resizable.handle, className as Sx]}
>
  {#if withHandle}
    <div sx={resizable.grip}></div>
  {/if}
</UisdkPart>
