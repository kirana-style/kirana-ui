<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { Select } from "bits-ui"

  import { select } from "../../../../styles/select.styles"

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

<Select.Group data-slot="select-group" {...rest} sx={[select.group, className as Sx]}>
  {@render children?.()}
</Select.Group>
