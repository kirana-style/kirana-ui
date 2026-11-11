<script lang="ts">
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { createAttachmentKey } from "svelte/attachments"
  import { Combobox } from "bits-ui"

  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import { propsFn } from "../../../../lib/svelte/as-child"
  import type { PropsFn } from "../../../../lib/svelte/as-child"
  import { combobox } from "../../../../styles/combobox.styles"
  import { useCombobox } from "./context"

  let {
    asChild,
    class: className,
    children,
    ...rest
  }: {
    /**
     * As Base UI's `render`: the element given takes the trigger's props, and the chevron as the
     * snippet's second argument, to render after its own children (Base UI puts the trigger's
     * children inside the element it renders).
     */
    asChild?: Snippet<[PropsFn<"button">, Snippet]>
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  // A trigger of its own, outside the popup, is the element the popup is placed against: the
  // popup's input ("Combobox in Popup") is inside it.
  const ctx = useCombobox()
  const anchor = {
    [createAttachmentKey()]: (node: Element) => {
      ctx.anchor = node as HTMLElement
      return () => {
        if (ctx.anchor === node) ctx.anchor = null
      }
    },
  }
</script>

{#snippet icon()}
  <IconPlaceholder lucide="ChevronDownIcon" tabler="IconChevronDown" hugeicons="ArrowDown01Icon" phosphor="CaretDownIcon" remixicon="RiArrowDownSLine" sx={combobox.triggerIcon} />
{/snippet}

<Combobox.Trigger>
  {#snippet child({ props })}
    {#if asChild}
      {@render asChild(propsFn({ type: "button", ...props, "data-slot": "combobox-trigger", ...rest, ...anchor }), icon)}
    {:else}
      <button type="button" {...props} data-slot="combobox-trigger" {...rest} {...anchor} class={className} sx={combobox.triggerOwn}>
        {@render children?.()}
        {@render icon()}
      </button>
    {/if}
  {/snippet}
</Combobox.Trigger>
