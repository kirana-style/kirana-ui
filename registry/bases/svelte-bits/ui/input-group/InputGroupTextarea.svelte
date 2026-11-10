<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"

  import { inputGroup } from "../../../../styles/input-group.styles"
  import { Textarea } from "../textarea"

  let {
    /** `bind:value`, passed on to the textarea, as Vue's `v-model` is. */
    value = $bindable(),
    class: className,
    ...rest
  }: {
    value?: string | number
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()
</script>

<Textarea data-slot="input-group-control" bind:value {...rest} sx={[inputGroup.textarea, className as Sx]} />
