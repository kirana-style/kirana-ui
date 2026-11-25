<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import type { TagsInputEntry } from "@kirana-ui/svelte"
  import { TagsInput } from "@kirana-ui/svelte/tags-input"

  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import { combobox } from "../../../../styles/combobox.styles"
  import { tagsInput } from "../../../../styles/tags-input.styles"
  import { Button } from "../button"

  /** A tag: its text (its children, given any), the input it is edited in, and its remove button. */
  let {
    entry,
    showRemove = true,
    class: className,
    children,
    ...rest
  }: {
    entry: TagsInputEntry
    showRemove?: boolean
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<TagsInput.Item data-slot="tags-input-item" {entry} {...rest} sx={[combobox.chip, tagsInput.item, className as Sx]}>
  <!-- The tag's own text unless given children: the children go on only when there are some. -->
  <TagsInput.ItemText data-slot="tags-input-item-text" {children} />
  <TagsInput.ItemInput data-slot="tags-input-item-input" sx={tagsInput.itemInput} />
  {#if showRemove}
    <TagsInput.ItemRemove data-slot="tags-input-item-remove">
      {#snippet child({ props })}
        <Button {...props} variant="ghost" size="icon-xs" sx={[combobox.chipRemove, tagsInput.itemRemove]}>
          <IconPlaceholder lucide="XIcon" tabler="IconX" hugeicons="Cancel01Icon" phosphor="XIcon" remixicon="RiCloseLine" />
        </Button>
      {/snippet}
    </TagsInput.ItemRemove>
  {/if}
</TagsInput.Item>
