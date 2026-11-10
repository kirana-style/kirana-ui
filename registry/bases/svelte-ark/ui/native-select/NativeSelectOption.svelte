<script lang="ts">
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"

  import { nativeSelect } from "../../../../styles/native-select.styles"

  let {
    class: className,
    children,
    ...rest
  }: {
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<option data-slot="native-select-option" {...rest} class={className} sx={nativeSelect.option}>
  {@render children?.()}
</option>
