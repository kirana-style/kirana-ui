<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"

  import { command } from "../../../../styles/command.styles"
  import { visuallyHidden } from "../../../../styles/visually-hidden.styles"
  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "../dialog"

  let {
    title = "Command Palette",
    description = "Search for a command to run...",
    showCloseButton = false,
    class: className,
    children,
    ...rest
  }: {
    title?: string
    description?: string
    showCloseButton?: boolean
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<Dialog {...rest}>
  <DialogHeader sx={visuallyHidden}>
    <DialogTitle>
      {title}
    </DialogTitle>
    <DialogDescription>
      {description}
    </DialogDescription>
  </DialogHeader>
  <DialogContent sx={[command.dialog, className as Sx]} showCloseButton={showCloseButton}>
    {@render children?.()}
  </DialogContent>
</Dialog>
