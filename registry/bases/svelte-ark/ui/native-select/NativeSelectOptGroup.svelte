<script lang="ts">
  import type { Sx } from "@kirana-style/core"
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

<optgroup data-slot="native-select-optgroup" {...rest} sx={[nativeSelect.option, className as Sx]}>
  {@render children?.()}
</optgroup>
