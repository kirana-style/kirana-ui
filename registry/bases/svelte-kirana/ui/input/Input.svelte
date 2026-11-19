<script lang="ts">
  import type { ClassValue, HTMLInputAttributes } from "svelte/elements"

  import { input } from "../../../../styles/input.styles"

  /** `bind:value`, as on a native one, which Vue's `v-model` is. */
  let {
    value = $bindable(),
    class: className,
    ...rest
  }: Omit<HTMLInputAttributes, "class" | "value"> & {
    value?: string | number
    class?: ClassValue | null
  } = $props()
</script>

<input data-slot="input" bind:value {...rest} class={className} sx={input} />
