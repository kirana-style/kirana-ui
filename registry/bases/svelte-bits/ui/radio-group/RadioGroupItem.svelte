<script lang="ts">
  import type { ClassValue } from "svelte/elements"
  import { RadioGroup } from "bits-ui"

  import { radioGroup } from "../../../../styles/radio-group.styles"

  // Bits' required `value` is declared here and passed on. The item is the radio itself, so its
  // `id` is the one a `<Label for>` beside it names, and an `aria-invalid` lands on it.
  let {
    value,
    class: className,
    ...rest
  }: {
    value: string
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()
</script>

<RadioGroup.Item {value} {...rest}>
  <!-- A `span`, as Base UI's radio, where Bits draws a button: Bits' roving focus makes it
       focusable, and Bits presses it with Space. -->
  {#snippet child({ props, checked })}
    <!-- Bits' `type` is a button's. -->
    {@const { type: _button, ...own } = props}
    <span
      {...own}
      data-slot="radio-group-item"
      class={className}
      sx={radioGroup.item}
    >
      {#if checked}
        <span data-slot="radio-group-indicator" sx={radioGroup.indicator}>
          <span sx={radioGroup.dot}></span>
        </span>
      {/if}
    </span>
  {/snippet}
</RadioGroup.Item>
