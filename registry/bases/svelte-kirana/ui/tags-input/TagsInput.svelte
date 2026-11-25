<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { TagsInput } from "@kirana-ui/svelte/tags-input"

  import { combobox } from "../../../../styles/combobox.styles"
  import { tagsInput } from "../../../../styles/tags-input.styles"
  import TagsInputInput from "./TagsInputInput.svelte"
  import TagsInputItem from "./TagsInputItem.svelte"

  /**
   * The field: its tags, one `TagsInputItem` for each, then its children (the input, and a clear
   * button where there is one). With no children, a bare input. `bind:value` is the tags; the rest
   * goes to Kirana UI's root.
   */
  let {
    value = $bindable(),
    class: className,
    children,
    ...rest
  }: {
    value?: string[]
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<TagsInput.Root data-slot="tags-input" bind:value {...rest} sx={[combobox.chips, tagsInput.root, className as Sx]}>
  <TagsInput.List data-slot="tags-input-list" sx={combobox.contents}>
    <TagsInput.Items>
      {#snippet children(entry)}
        <TagsInputItem {entry} />
      {/snippet}
    </TagsInput.Items>
  </TagsInput.List>
  {#if children}
    {@render children()}
  {:else}
    <TagsInputInput />
  {/if}
</TagsInput.Root>
