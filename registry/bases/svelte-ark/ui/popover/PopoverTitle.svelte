<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import type { PopoverTitleProps } from "@ark-ui/svelte"

  import { popover } from "../../../../styles/popover.styles"
  import { PopoverTitle } from "@ark-ui/svelte"

  let {
    asChild,
    class: className,
    children,
    ...rest
  }: {
    asChild?: PopoverTitleProps["asChild"]
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()
</script>

<PopoverTitle {asChild} data-slot="popover-title" {...rest} sx={[popover.title, className as Sx]}>
  {@render children?.()}
</PopoverTitle>
