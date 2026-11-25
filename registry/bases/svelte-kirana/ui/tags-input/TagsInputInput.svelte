<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import { TagsInput } from "@kirana-ui/svelte/tags-input"

  import { combobox } from "../../../../styles/combobox.styles"
  import { tagsInput } from "../../../../styles/tags-input.styles"

  let {
    class: className,
    ...rest
  }: {
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()
</script>

<TagsInput.Input data-slot="tags-input-input" {...rest} sx={[combobox.chipInput, tagsInput.input, className as Sx]} />
