<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"

  import { spinner } from "../../../../styles/spinner.styles"
  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"

  let {
    class: className,
    ...rest
  }: {
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()
</script>

<IconPlaceholder data-slot="spinner" lucide="Loader2Icon" tabler="IconLoader" hugeicons="Loading03Icon" phosphor="SpinnerIcon" remixicon="RiLoaderLine" role="status" aria-label="Loading" {...rest} sx={[spinner, className as Sx]} />
