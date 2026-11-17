<script lang="ts">
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { createAttachmentKey } from "svelte/attachments"
  import { ComboboxTrigger } from "@ui-sdk/svelte/combobox"

  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import { mergeProps, propsFn } from "../../../../lib/svelte/as-child"
  import type { PropsFn } from "../../../../lib/svelte/as-child"
  import { combobox } from "../../../../styles/combobox.styles"
  import { useAnchors } from "./context"

  /**
   * ui-sdk's trigger. As Base UI's `render`, an `asChild` snippet is given the trigger's props and
   * its chevron, which it draws inside its own element. Without an input outside the popup, the
   * trigger places it.
   */
  let {
    asChild,
    class: className,
    children,
    ...rest
  }: {
    asChild?: Snippet<[PropsFn<"button">, Snippet]>
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  const anchors = useAnchors()
  const anchor = (el: HTMLElement) => {
    if (anchors) anchors.trigger = el
    return () => {
      if (anchors && anchors.trigger === el) anchors.trigger = null
    }
  }
  const attached = { [createAttachmentKey()]: anchor }
</script>

{#snippet icon()}
  <IconPlaceholder
    lucide="ChevronDownIcon"
    tabler="IconChevronDown"
    hugeicons="ArrowDown01Icon"
    phosphor="CaretDownIcon"
    remixicon="RiArrowDownSLine"
    sx={combobox.triggerIcon}
  />
{/snippet}

<ComboboxTrigger {...rest}>
  {#snippet render({ props }: { props: Record<PropertyKey, unknown> })}
    {#if asChild}
      {@render asChild(
        propsFn(mergeProps(props, { "data-slot": "combobox-trigger" }, attached)),
        icon
      )}
    {:else}
      <button
        type="button"
        {...props}
        data-slot="combobox-trigger"
        {@attach anchor}
        class={className}
        sx={combobox.triggerOwn}
      >
        {@render children?.()}
        {@render icon()}
      </button>
    {/if}
  {/snippet}
</ComboboxTrigger>
