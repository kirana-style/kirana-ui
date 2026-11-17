<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { OTPInput } from "@ui-sdk/svelte/otp-input"

  import UisdkPart from "../../../../lib/svelte/UisdkPart.svelte"
  import { inputOtp } from "../../../../styles/input-otp.styles"

  /**
   * ui-sdk's code input: `maxLength`, `value` (bound, or with `onValueChange` called with
   * `{ value, valueAsString }`) and `defaultValue` as one string, as Svelte's Ark UI part takes
   * them.
   */
  let {
    value = $bindable(),
    onValueChange,
    type: _type,
    class: className,
    children,
    ...rest
  }: {
    maxLength: number
    defaultValue?: string
    value?: string
    type?: "numeric" | "alphabetic" | "alphanumeric"
    onValueChange?: (details: { value: string; valueAsString: string }) => void
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<UisdkPart
  part={OTPInput}
  slotName="input-otp"
  {value}
  {...rest}
  onValueChange={(next: string) => {
    value = next
    onValueChange?.({ value: next, valueAsString: next })
  }}
  sx={[inputOtp.container, inputOtp.containerUisdk, className as Sx]}
>
  {@render children?.()}
</UisdkPart>
