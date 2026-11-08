<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import { getContext } from "svelte"
  import type { Snippet } from "svelte"
  import type { SelectTriggerProps } from "@ark-ui/svelte"

  import { SelectIndicator, SelectTrigger } from "@ark-ui/svelte"

  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import { select } from "../../../../styles/select.styles"
  import { TRIGGER_ID } from "./placement"
  import type { TriggerIdState } from "./placement"

  let {
    size = "default",
    id,
    asChild,
    class: className,
    children,
    ...rest
  }: {
    size?: "sm" | "default"
    /** A label's `for`: handed to the root, which writes it here as Zag's own. */
    id?: string
    asChild?: SelectTriggerProps["asChild"]
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  const trigger = getContext<TriggerIdState | undefined>(TRIGGER_ID)
  $effect(() => {
    if (trigger) trigger.id = id
  })
</script>

<SelectTrigger {asChild} data-slot="select-trigger" data-size={size} {...rest} sx={[select.trigger, select.triggerArk, className as Sx]}>
  {@render children?.()}
  <SelectIndicator>
    {#snippet asChild(props)}
      <!-- Ark's props as a record: an installed icon's own prop types (lucide's `color`) refuse Ark's nullable attributes. -->
      <IconPlaceholder {...(props() as Record<string, unknown>)} class={props().class} style={props().style} lucide="ChevronDownIcon" tabler="IconSelector" hugeicons="UnfoldMoreIcon" phosphor="CaretDownIcon" remixicon="RiArrowDownSLine" sx={select.triggerIcon} />
    {/snippet}
  </SelectIndicator>
</SelectTrigger>
