<script lang="ts">
  import type { Sx } from "@kirana-style/core"
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

<div sx={[styles.div3, className as Sx]} {...rest}>
  <Badge variant="outline" sx={styles.badge}>
    {type}
  </Badge>
</div>
