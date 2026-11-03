<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { RadioGroupItemProps } from "@ark-ui/svelte"

  import {
    RadioGroupItem,
    RadioGroupItemContext,
    RadioGroupItemControl,
    RadioGroupItemHiddenInput,
  } from "@ark-ui/svelte"

  import { radioGroup } from "../../../../styles/radio-group.styles"

  let {
    value, id, asChild,
    class: className,
    ...rest
  }: {
    value: string; id?: string
    asChild?: RadioGroupItemProps["asChild"]
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()

  // Ark's required `value` is declared here and passed on. `id` names the hidden input, so a
  // `<Label for>` beside the item reaches it, as React's `htmlFor`.

  // `aria-invalid`, as upstream's demos mark an invalid radio: Ark marks only a whole group invalid,
  // so the item marks its own radio as Ark would.
  const invalid = $derived.by(() => [true, "true", ""].includes(rest["aria-invalid"] as never)
  )
</script>

<RadioGroupItem {asChild} value={value} {...rest} sx={radioGroup.itemWrapper}>
  <!-- A span, as Base UI's radio. -->
  <RadioGroupItemControl>
    {#snippet asChild(props)}
      <span {...props()} class={props().class} style={props().style} data-slot="radio-group-item" data-invalid={invalid ? '' : undefined} sx={[radioGroup.item, className as Sx]}>
        <RadioGroupItemContext>
          {#snippet render(item)}
            {#if item().checked}
              <span data-slot="radio-group-indicator" sx={radioGroup.indicator}>
                <span sx={radioGroup.dot}></span>
              </span>
            {/if}
          {/snippet}
        </RadioGroupItemContext>
      </span>
    {/snippet}
  </RadioGroupItemControl>
  <RadioGroupItemHiddenInput id={id} />
</RadioGroupItem>
