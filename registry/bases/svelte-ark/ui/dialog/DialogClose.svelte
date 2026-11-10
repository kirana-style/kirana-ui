<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import type { DialogCloseTriggerProps } from "@ark-ui/svelte"

  import { DialogCloseTrigger } from "@ark-ui/svelte"

  let {
    asChild,
    class: className,
    children,
    ...rest
  }: {
    asChild?: DialogCloseTriggerProps["asChild"]
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<DialogCloseTrigger {asChild} data-slot="dialog-close" {...rest} sx={className as Sx}>
  {@render children?.()}
</DialogCloseTrigger>
