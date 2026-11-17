<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"

  import { sidebar } from "../../../../styles/sidebar.styles"
  import { Separator } from "../separator"

  let {
    class: className,
    ...rest
  }: {
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()
</script>

<Separator data-slot="sidebar-separator" data-sidebar="separator" {...rest} sx={[sidebar.separator, className as Sx]} />
