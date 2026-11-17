<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { Command } from "@ui-sdk/svelte/command"

  import UisdkPart from "../../../../lib/svelte/UisdkPart.svelte"
  import { command } from "../../../../styles/command.styles"

  let {
    shouldFilter = true,
    dir,
    class: className,
    children,
    ...rest
  }: {
    shouldFilter?: boolean
    dir?: "ltr" | "rtl"
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<UisdkPart part={Command} slotName="command" tag="div" cmdk-root tabindex="-1" dir={dir} filter={shouldFilter ? undefined : false} {...rest} sx={[command.root, className as Sx]}>
  {@render children?.()}
</UisdkPart>
