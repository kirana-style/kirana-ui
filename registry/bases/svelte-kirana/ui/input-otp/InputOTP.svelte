<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { Otp } from "@kirana-ui/svelte/otp"

  import { inputOtp } from "../../../../styles/input-otp.styles"

  /**
   * Kirana UI's code input, with Svelte's Ark UI parts' props (`maxLength`, `value`, `defaultValue`,
   * `type`, `onValueChange({ value, valueAsString })`): one input the code is typed in, laid over
   * the cells as React's `input-otp` lays it, which carries the slot React's does.
   */
  let {
    maxLength,
    defaultValue,
    value = $bindable(),
    type = "alphanumeric",
    disabled = false,
    onValueChange,
    class: className,
    children,
    ...rest
  }: {
    maxLength: number
    defaultValue?: string
    value?: string
    type?: "numeric" | "alphabetic" | "alphanumeric"
    disabled?: boolean
    onValueChange?: (details: { value: string; valueAsString: string }) => void
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  // The container's height, which the input's font follows (`--root-height`), as `input-otp`
  // measures it.
  let height = $state(0)
</script>

<Otp.Root
  length={maxLength}
  mode={type}
  {defaultValue}
  {value}
  {disabled}
  onValueChange={(next: string) => {
    value = next
    onValueChange?.({ value: next, valueAsString: next })
  }}
  sx={[inputOtp.container, inputOtp.containerKirana]}
>
  {#snippet child({ props })}
    <div {...props} bind:offsetHeight={height} style={`--root-height: ${height}px`}>
      {@render children?.()}
      <Otp.Input
        data-slot="input-otp"
        spellcheck={false}
        {...rest}
        sx={[inputOtp.input, inputOtp.inputKirana, className as Sx]}
      />
    </div>
  {/snippet}
</Otp.Root>
