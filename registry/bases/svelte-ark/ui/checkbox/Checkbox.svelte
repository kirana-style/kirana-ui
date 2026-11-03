<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { CheckboxRootProps } from "@ark-ui/svelte"

  import {
    CheckboxContext,
    CheckboxControl,
    CheckboxHiddenInput,
    CheckboxIndicator,
    CheckboxRoot,
  } from "@ark-ui/svelte"

  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import { checkbox } from "../../../../styles/checkbox.styles"

  let {
    id, defaultChecked, asChild,
    class: className,
    ...rest
  }: {
    id?: string
    /** Base UI's boolean: Ark's own takes `"indeterminate"` too, so a bare attribute would not read as `true`. */
    defaultChecked?: boolean
    asChild?: CheckboxRootProps["asChild"]
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()

  // `id` names the hidden input, so a `<Label for>` beside the box reaches it, as React's `htmlFor`.

  // `aria-invalid`, as upstream's demos mark an invalid control: Ark's `invalid`, which marks the box.
  const invalid = $derived.by(() => [true, "true", ""].includes(rest["aria-invalid"] as never)
  )
</script>

<CheckboxRoot {asChild} defaultChecked={defaultChecked} invalid={invalid || undefined} {...rest} ids={id ? { hiddenInput: id } : undefined} sx={checkbox.wrapper}>
  <!-- Spans, as Base UI's box and indicator, the indicator there only while checked or
         indeterminate, as Base UI mounts it. -->
  <CheckboxControl>
    {#snippet asChild(props)}
      <span {...props()} class={props().class} style={props().style} data-slot="checkbox" sx={[checkbox.root, className as Sx]}>
        <CheckboxContext>
          {#snippet render(state)}
            {#if state().checked || state().indeterminate}
              <CheckboxIndicator indeterminate={state().indeterminate}>
                {#snippet asChild(props)}
                  <span {...props()} class={props().class} style={props().style} data-slot="checkbox-indicator" sx={checkbox.indicator}>
                    <IconPlaceholder lucide="CheckIcon" tabler="IconCheck" hugeicons="Tick02Icon" phosphor="CheckIcon" remixicon="RiCheckLine" />
                  </span>
                {/snippet}
              </CheckboxIndicator>
            {/if}
          {/snippet}
        </CheckboxContext>
      </span>
    {/snippet}
  </CheckboxControl>
  <CheckboxHiddenInput />
</CheckboxRoot>
