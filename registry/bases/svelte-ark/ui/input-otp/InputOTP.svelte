<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import { PinInputControl, PinInputHiddenInput, PinInputRoot } from "@ark-ui/svelte"
  import type { Snippet } from "svelte"

  import { inputOtp } from "../../../../styles/input-otp.styles"

  /**
   * `maxLength`, upstream's name for how many slots there are: Ark's `count`. `bind:value` is the
   * code as one string, as upstream's `value`; Ark's own is a character per slot. Any character, as
   * upstream's, unless `type` (Ark's `numeric`, `alphabetic`) narrows it: upstream's `pattern`.
   */
  let {
    maxLength,
    defaultValue,
    value = $bindable(),
    class: className,
    children,
    ...rest
  }: {
    maxLength: number
    /** Upstream's, one string: Ark's is a character per slot. */
    defaultValue?: string
    value?: string
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<PinInputRoot
  data-slot="input-otp"
  count={maxLength}
  type="alphanumeric"
  defaultValue={defaultValue === undefined ? undefined : [...defaultValue]}
  value={value === undefined ? undefined : [...value]}
  otp
  {...rest}
  sx={[inputOtp.container, className as Sx]}
  onValueChange={(details) => (value = details.valueAsString)}
>
  <PinInputControl sx={inputOtp.controlArk}>
    {@render children?.()}
  </PinInputControl>
  <PinInputHiddenInput sx={inputOtp.input} />
</PinInputRoot>
