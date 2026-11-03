<script lang="ts">
  import { setContext } from "svelte"
  import type { Snippet } from "svelte"

  import { MenuRoot, useLocaleContext } from "@ark-ui/svelte"
  import type { MenuRootProps } from "@ark-ui/svelte"
  // A submenu is a menu inside the menu: its trigger is an item of the outer one.

  import { positioning as place } from "../../../../lib/placement"
  import type { PlacementProps } from "../../../../lib/placement"
  import { PLACEMENT } from "./placement"

  let {
    positioning,
    children,
    ...rest
  }: {
    /** Ark's own placement, over what the content asks for. */
    positioning?: MenuRootProps["positioning"]
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  // It renders no element: what a caller passes (`v-model:open` …) goes to Ark's root.

  // The content's `side`, `align` and offsets (Base UI's), placed from here as Ark places a popup.
  let placement = $state<PlacementProps>({})
  setContext(PLACEMENT, placement)
  const locale = useLocaleContext()
  const resolved = $derived.by(() => ({
    ...place(placement, { rtl: locale?.()?.dir === "rtl" }),
    ...positioning,
  }))
</script>

<!-- Closed, the popup leaves the page, as Base UI's does; Ark keeps it while its exit runs. -->
<MenuRoot lazyMount unmountOnExit positioning={resolved} {...rest}>
  {@render children?.()}
</MenuRoot>
