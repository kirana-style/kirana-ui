<script lang="ts">
  import type { ClassValue } from "svelte/elements"
  import { Switch } from "bits-ui"
  import { untrack } from "svelte"

  import { switchStyles } from "../../../../styles/switch.styles"

  /**
   * Bits UI's switch, taking Svelte's Ark UI parts' props: `checked`, Base UI's `defaultChecked`,
   * and `onCheckedChange` called with `{ checked }`.
   */
  let {
    defaultChecked,
    checked,
    onCheckedChange,
    disabled,
    size = "default",
    class: className,
    ...rest
  }: {
    defaultChecked?: boolean
    checked?: boolean
    onCheckedChange?: (details: { checked: boolean }) => void
    disabled?: boolean
    size?: "sm" | "default"
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()

  let own = $state(untrack(() => defaultChecked ?? false))
  const current = $derived(checked ?? own)
</script>

<Switch.Root
  {...rest}
  {disabled}
  checked={current}
  onCheckedChange={(next) => {
    own = next
    onCheckedChange?.({ checked: next })
  }}
>
  <!-- A `span`, as Base UI's switch, where Bits draws a button: focusable, pressed with Space. -->
  {#snippet child({ props })}
    <!-- Bits' `type` is a button's. -->
    {@const { type: _button, ...own } = props}
    <span
      {...own}
      tabindex={disabled ? undefined : 0}
      data-slot="switch"
      data-size={size}
      class={className}
      sx={switchStyles.root}
    >
      <Switch.Thumb data-slot="switch-thumb" sx={switchStyles.thumb} />
    </span>
  {/snippet}
</Switch.Root>
