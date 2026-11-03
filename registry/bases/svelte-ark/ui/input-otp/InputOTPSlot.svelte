<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { PinInputInputProps } from "@ark-ui/svelte"

  import { PinInputInput } from "@ark-ui/svelte"

  import { inputOtp } from "../../../../styles/input-otp.styles"

  let {
    index, asChild,
    class: className,
    ...rest
  }: {
    index: number
    asChild?: PinInputInputProps["asChild"]
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()

  // The slot holding the focus is the active one, as React's slot marks it.
  let active = $state(false)
</script>

<PinInputInput {asChild} data-slot="input-otp-slot" index={index} data-active={active} {...rest} sx={[inputOtp.slot, inputOtp.slotArk, className as Sx]} onfocus={() => { active = true }} onblur={() => { active = false }} />
