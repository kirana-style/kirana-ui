<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"

  import { sidebar } from "../../../../styles/sidebar.styles"
  import { Input } from "../input"

  let {
    class: className,
    ...rest
  }: {
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()
</script>

<Input data-slot="sidebar-input" data-sidebar="input" {...rest} sx={[sidebar.input, className as Sx]} />
