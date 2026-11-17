<script lang="ts">
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { AlertDialogTrigger } from "@ui-sdk/svelte/alert-dialog"

  import type { AsChild } from "../../../../lib/svelte/as-child"
  import UisdkPart from "../../../../lib/svelte/UisdkPart.svelte"

  let {
    asChild,
    class: className,
    children,
    ...rest
  }: {
   asChild?: AsChild 
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<UisdkPart part={AlertDialogTrigger} slotName="alert-dialog-trigger" tag="button" asChild={asChild} {...rest}>
  {@render children?.()}
</UisdkPart>
