<script lang="ts">
  import { setContext } from "svelte"
  import type { Snippet } from "svelte"

  import { PopoverRoot, useLocaleContext } from "@ark-ui/svelte"
  import type { PopoverRootProps } from "@ark-ui/svelte"

  import { positioning as place } from "../../../../lib/placement"
  import type { PlacementProps } from "../../../../lib/placement"
  import { PLACEMENT } from "./placement"

  let {
    positioning,
    children,
    ...rest
  }: {
    /** Ark's own placement, over what the content asks for. */
    positioning?: PopoverRootProps["positioning"]
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  // It renders no element: what a caller passes (`v-model:open` …) goes to Ark's root.

  // The content's `side`, `align` and offsets (Base UI's), placed from here as Ark places a popup.
  let placement = $state<PlacementProps>({})
  setContext(PLACEMENT, placement)
  const locale = useLocaleContext()
  const rtl = $derived.by(() => locale?.()?.dir === "rtl")
  const resolved = $derived.by(() => ({
    ...place(placement, { rtl: rtl }),
    ...positioning,
  }))
</script>

<!-- Closed, the popup leaves the page, as Base UI's does; Ark keeps it while its exit runs. -->
<PopoverRoot lazyMount unmountOnExit positioning={resolved} {...rest}>
  {@render children?.()}
</PopoverRoot>
