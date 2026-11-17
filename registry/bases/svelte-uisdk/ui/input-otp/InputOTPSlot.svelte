<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { OTPInputSlot } from "@ui-sdk/svelte/otp-input"

  import UisdkPart from "../../../../lib/svelte/UisdkPart.svelte"
  import { inputOtp } from "../../../../styles/input-otp.styles"

  let {
    index,
    class: className,
    children,
    ...rest
  }: {
   index: number 
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<UisdkPart part={OTPInputSlot} slotName="input-otp-slot" tag="div" index={index} {...rest} sx={[inputOtp.slot, className as Sx]} />
