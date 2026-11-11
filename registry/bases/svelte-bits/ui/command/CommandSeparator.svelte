<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import { Command } from "bits-ui"

  import { command } from "../../../../styles/command.styles"

  let {
    class: className,
    ...rest
  }: {
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()
</script>

<!-- Hidden while something is typed, as cmdk's. -->
<Command.Separator data-slot="command-separator" {...{ "cmdk-separator": "" }} {...rest} sx={[command.separator, className as Sx]} />
