<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { Collapsible } from "@ui-sdk/svelte/collapsible"

  import type { AsChild } from "../../../../lib/svelte/as-child"
  import UisdkPart from "../../../../lib/svelte/UisdkPart.svelte"

  /**
   * ui-sdk's collapsible, taking Svelte's Ark UI parts' props: `open`, `defaultOpen`, and
   * `onOpenChange` called with `{ open }`. Unstyled, as upstream's: a caller's `sx` is all it draws.
   * A closed panel leaves the page, as Base UI's does.
   */
  let {
    onOpenChange,
    lazyMount: _lazyMount,
    unmountOnExit: _unmountOnExit,
    class: className,
    children,
    asChild,
    ...rest
  }: {
    defaultOpen?: boolean
    open?: boolean
    onOpenChange?: (details: { open: boolean }) => void
    lazyMount?: boolean
    unmountOnExit?: boolean
    class?: ClassValue | null
    children?: Snippet
    /** The caller's element as the collapsible, as Ark UI's Svelte parts take `asChild`. */
    asChild?: AsChild<"div">
    [attribute: string]: unknown
  } = $props()
</script>

<UisdkPart
  part={Collapsible}
  slotName="collapsible"
  {asChild}
  {...rest}
  onOpenChange={(open: boolean) => onOpenChange?.({ open })}
  sx={className as Sx}
>
  {@render children?.()}
</UisdkPart>
