<script lang="ts">
  import { setContext } from "svelte"
  import type { Snippet } from "svelte"

  import { TooltipRoot, useLocaleContext } from "@ark-ui/svelte"
  import type { TooltipRootProps } from "@ark-ui/svelte"

  import { positioning as place } from "../../../../lib/placement"
  import type { PlacementProps } from "../../../../lib/placement"
  import { PLACEMENT } from "./placement"

  let {
    openDelay = 0, positioning,
    children,
    ...rest
  }: {
    openDelay?: number
    /** Ark's own placement, over what the content asks for. */
    positioning?: TooltipRootProps["positioning"]
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  // It renders no element: what a caller passes (`v-model:open` …) goes to Ark's root.

  // Opens at once, as shadcn/ui's `TooltipProvider` (`delay = 0`) does.

  // The content's `side`, `align` and offsets (Base UI's), placed from here as Ark places a popup.
  let placement = $state<PlacementProps>({})
  setContext(PLACEMENT, placement)
  const locale = useLocaleContext()
  const rtl = $derived.by(() => locale?.()?.dir === "rtl")
  const resolved = $derived.by(() => ({
    ...place(placement, { arrow: 10, rtl: rtl }),
    ...positioning,
  }))
</script>

<!-- Closed, the popup leaves the page, as Base UI's does; Ark keeps it while its exit runs. -->
<TooltipRoot lazyMount unmountOnExit openDelay={openDelay} positioning={resolved} {...rest}>
  {@render children?.()}
</TooltipRoot>
