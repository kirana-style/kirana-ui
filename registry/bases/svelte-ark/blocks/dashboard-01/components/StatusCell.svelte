<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"

  import IconPlaceholder from "../../../../../icons/IconPlaceholder.svelte"
  import { Badge } from "../../../ui/badge"
  import { styles } from "./data-table"

  let {
    status,
    class: className,
    ...rest
  }: {
    status: string
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()


</script>

<Badge variant="outline" sx={[styles.badge2, className as Sx]} {...rest}>
  {#if status === 'Done'}
    <IconPlaceholder lucide="CircleCheckIcon" tabler="IconCircleCheckFilled" hugeicons="CheckmarkCircle01Icon" phosphor="CheckCircleIcon" remixicon="RiCheckboxCircleFill" sx={styles.iconPlaceholder} />
  {:else}
    <IconPlaceholder lucide="LoaderIcon" tabler="IconLoader" hugeicons="Loading03Icon" phosphor="SpinnerIcon" remixicon="RiLoader4Line" />
  {/if}
  {status}
</Badge>
