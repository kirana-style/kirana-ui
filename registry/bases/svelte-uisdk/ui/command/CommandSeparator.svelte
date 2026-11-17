<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { CommandSeparator } from "@ui-sdk/svelte/command"

  import UisdkPart from "../../../../lib/svelte/UisdkPart.svelte"
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

<!-- Hidden while something is typed, as cmdk's: ui-sdk's composed separators hide while it filters. -->
<UisdkPart part={CommandSeparator} slotName="command-separator" tag="div" cmdk-separator {...rest} sx={[command.separator, className as Sx]}></UisdkPart>
