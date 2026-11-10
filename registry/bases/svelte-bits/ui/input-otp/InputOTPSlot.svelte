<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import { PinInput } from "bits-ui"
  import { getContext } from "svelte"
  import type { Snippet } from "svelte"

  import { inputOtp } from "../../../../styles/input-otp.styles"
  import { CELLS } from "./context"
  import type { CellsContext } from "./context"

  /**
   * One slot, its cell from the root by `index`, as React's slot reads input-otp's: its character
   * and, active and empty, the fake caret. `data-active` is `"true"` or `"false"`, as React writes
   * it, where Bits writes it only while active. `asChild` as the Ark UI parts', a snippet given the
   * slot's props.
   */
  let {
    index,
    asChild,
    class: className,
    ...rest
  }: {
    index: number
    asChild?: Snippet<[() => Record<string, unknown>]>
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()

  const cells = getContext<CellsContext>(CELLS)
  const cell = $derived(cells?.()[index] ?? { char: null, isActive: false, hasFakeCaret: false })
</script>

<PinInput.Cell {cell} data-slot="input-otp-slot" {...rest} sx={[inputOtp.slot, className as Sx]}>
  {#snippet child({ props })}
    {#if asChild}
      {@render asChild(() => ({ ...props, "data-active": String(cell.isActive) }))}
    {:else}
      <div {...props} data-active={String(cell.isActive)}>
        {cell.char}
        {#if cell.hasFakeCaret}
          <div sx={inputOtp.caret}>
            <div sx={inputOtp.caretLine}></div>
          </div>
        {/if}
      </div>
    {/if}
  {/snippet}
</PinInput.Cell>
