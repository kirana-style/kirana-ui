<script lang="ts">
  import type { ClassValue } from "svelte/elements"

  import { Badge } from "../../../ui/badge"
  import { styles } from "./data-table"

  let {
    type,
    class: className,
    ...rest
  }: {
    type: string
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()


</script>

<div class={className} sx={styles.div3} {...rest}>
  <Badge variant="outline" sx={styles.badge}>
    {type}
  </Badge>
</div>
