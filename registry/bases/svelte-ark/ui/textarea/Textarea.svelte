<script lang="ts">
  import type { ClassValue, HTMLTextareaAttributes } from "svelte/elements"

  import { textarea } from "../../../../styles/textarea.styles"

  /** `bind:value`, as on a native one, which Vue's `v-model` is. */
  let {
    value = $bindable(),
    class: className,
    ...rest
  }: Omit<HTMLTextareaAttributes, "class" | "value"> & {
    value?: string | number
    class?: ClassValue | null
  } = $props()
</script>

<textarea data-slot="textarea" bind:value {...rest} class={className} sx={textarea}></textarea>
