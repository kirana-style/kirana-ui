<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"

  import { item } from "../../../../styles/item.styles"
  import { Separator } from "../separator"

  let {
    class: className,
    ...rest
  }: {
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()
</script>

<Separator data-slot="item-separator" orientation="horizontal" {...rest} sx={[item.separator, className as Sx]} />
