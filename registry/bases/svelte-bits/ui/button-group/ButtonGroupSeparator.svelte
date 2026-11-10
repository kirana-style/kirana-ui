<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"

  import { buttonGroup } from "../../../../styles/button-group.styles"
  import { Separator } from "../separator"

  let {
    orientation = "vertical",
    class: className,
    ...rest
  }: {
    orientation?: "horizontal" | "vertical"
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()
</script>

<Separator data-slot="button-group-separator" orientation={orientation} {...rest} sx={[buttonGroup.separator, className as Sx]} />
