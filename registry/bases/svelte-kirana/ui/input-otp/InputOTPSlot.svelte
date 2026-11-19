<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import { Otp } from "@kirana-ui/svelte/otp"

  import { inputOtp } from "../../../../styles/input-otp.styles"

  let {
    index,
    class: className,
    ...rest
  }: {
    index: number
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()
</script>

<!-- The cell writes its character; the caret is drawn while it is the active, empty one. -->
<Otp.Slot data-slot="input-otp-slot" {index} {...rest} sx={[inputOtp.slot, className as Sx]}>
  <Otp.Caret sx={inputOtp.caret}>
    <div sx={inputOtp.caretLine}></div>
  </Otp.Caret>
</Otp.Slot>
