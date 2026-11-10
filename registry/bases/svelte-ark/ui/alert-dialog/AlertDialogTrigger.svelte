<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"

  // Ark's Svelte package exports these Dialog parts only as `Dialog.*` (LF-009).
  import { Dialog } from "@ark-ui/svelte"
  import type { DialogTriggerProps } from "@ark-ui/svelte"

  let {
    asChild,
    class: className,
    children,
    ...rest
  }: {
    asChild?: DialogTriggerProps["asChild"]
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<Dialog.Trigger {asChild} data-slot="alert-dialog-trigger" {...rest} sx={className as Sx}>
  {@render children?.()}
</Dialog.Trigger>
