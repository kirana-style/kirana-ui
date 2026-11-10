<script lang="ts">
  import type { ClassValue } from "svelte/elements"
  import { Checkbox } from "bits-ui"
  import { untrack } from "svelte"

  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import { checkbox } from "../../../../styles/checkbox.styles"

  /**
   * Bits UI's checkbox, taking Svelte's Ark UI parts' props: `checked` (`true`, `false` or
   * `"indeterminate"`), Base UI's `defaultChecked`, and `onCheckedChange` called with
   * `{ checked }`. A caller's `sx` arrives as `class`, merged after the box's own.
   */
  let {
    defaultChecked,
    checked,
    onCheckedChange,
    disabled,
    class: className,
    ...rest
  }: {
    defaultChecked?: boolean
    checked?: boolean | "indeterminate"
    onCheckedChange?: (details: { checked: boolean | "indeterminate" }) => void
    disabled?: boolean
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()

  let own = $state<boolean | "indeterminate">(untrack(() => defaultChecked ?? false))
  const current = $derived(checked ?? own)
</script>

<Checkbox.Root
  {...rest}
  {disabled}
  checked={current === true}
  indeterminate={current === "indeterminate"}
  onCheckedChange={(next) => {
    own = next
    onCheckedChange?.({ checked: next })
  }}
>
  <!-- A `span`, as Base UI's box, where Bits draws a button: focusable, and Bits presses it with
       Space. Its indicator is there only while checked or indeterminate, as Base UI mounts it. -->
  {#snippet child({ props, checked: on, indeterminate })}
    <!-- Bits' `type` is a button's. -->
    {@const { type: _button, ...own } = props}
    <span
      {...own}
      tabindex={disabled ? undefined : 0}
      data-slot="checkbox"
      class={className}
      sx={checkbox.root}
    >
      {#if on || indeterminate}
        <span data-slot="checkbox-indicator" sx={checkbox.indicator}>
          <IconPlaceholder lucide="CheckIcon" tabler="IconCheck" hugeicons="Tick02Icon" phosphor="CheckIcon" remixicon="RiCheckLine" />
        </span>
      {/if}
    </span>
  {/snippet}
</Checkbox.Root>
