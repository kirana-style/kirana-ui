<script lang="ts">
  import type { ClassValue } from "svelte/elements"

  // The target's and the limit's header, aligned as their fields are.
  import { styles } from "./data-table"

  let {
    field,
    class: className,
    ...rest
  }: {
    field: "target" | "limit"
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()


</script>

<div class={className} sx={field === 'target' ? styles.div4 : styles.div5} {...rest}>
  {field === "target" ? "Target" : "Limit"}
</div>
