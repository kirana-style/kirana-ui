<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"

  import { inputOtp } from "../../../../styles/input-otp.styles"
  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"

  let {
    class: className,
    ...rest
  }: {
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()
</script>

<div data-slot="input-otp-separator" role="separator" {...rest} sx={[inputOtp.separator, className as Sx]}>
  <IconPlaceholder lucide="MinusIcon" tabler="IconMinus" hugeicons="MinusSignIcon" phosphor="MinusIcon" remixicon="RiSubtractLine" />
</div>
