<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { Command } from "bits-ui"

  import { command } from "../../../../styles/command.styles"

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

<!-- In the list while nothing matches, as cmdk's. -->
<Command.Empty data-slot="command-empty" {...{ "cmdk-empty": "" }} {...rest} sx={[command.empty, className as Sx]}>
  {@render children?.()}
</Command.Empty>
