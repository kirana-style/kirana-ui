<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import { props as styleProps } from "@kirana-style/core"
  import { PinInput } from "bits-ui"
  import type { Snippet } from "svelte"

  import { inputOtp } from "../../../../styles/input-otp.styles"
  import CellsProvider from "./CellsProvider.svelte"

  /**
   * Bits UI's PinInput, input-otp's model as React's is: one input over the slots, drawn from its
   * cells. `maxLength`, upstream's name for how many slots there are. `value` is the code as one
   * string, as upstream's, and `onValueChange` gets it as `details.value` (the Ark UI parts'
   * shape). Any character, as upstream's, unless `type` narrows it: upstream's `pattern`. The
   * caller's `class` is the container's, as on the Ark UI parts; what else it passes (`id`,
   * `required`, `dir`) goes to the input, as React's.
   */
  let {
    maxLength,
    defaultValue,
    value = $bindable(),
    type,
    onValueChange,
    class: className,
    children: slots,
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

  const PATTERNS = {
    numeric: "^\\d+$",
    alphabetic: "^[a-zA-Z]+$",
    alphanumeric: "^[a-zA-Z0-9]+$",
  }

  // The first value only, as upstream's `defaultValue`.
  // svelte-ignore state_referenced_locally
  let own = $state(defaultValue ?? "")
  const code = $derived(value ?? own)

  // The input's own class (`cn-input-otp-input`): Bits gives `class` to the container and the rest
  // to the input, so the input's is attached to it.
  const inputClass = (styleProps(inputOtp.input).className ?? "").split(" ").filter(Boolean)
  const styleInput = (node: HTMLElement) => {
    node.classList.add(...inputClass)
  }
</script>

<PinInput.Root
  data-slot="input-otp"
  spellcheck={false}
  maxlength={maxLength}
  pattern={type ? PATTERNS[type] : undefined}
  value={code}
  onValueChange={(next: string) => {
    own = next
    value = next
    onValueChange?.({ value: next, valueAsString: next })
  }}
  {...rest}
  sx={[inputOtp.container, className as Sx]}
  {@attach styleInput}
>
  {#snippet children({ cells })}
    <CellsProvider {cells}>
      {@render slots?.()}
    </CellsProvider>
  {/snippet}
</PinInput.Root>
