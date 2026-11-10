<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { NavigationMenu } from "bits-ui"

  import { navigationMenu } from "../../../../styles/navigation-menu.styles"
  import { useDirection } from "../direction/context"

  /**
   * Bits UI's navigation menu, drawn as Base UI's: the bar, and below it a positioner holding the
   * popup, which is Bits' viewport: the open item's content is moved into it, as Base UI's moves
   * into its viewport. Bits measures the panel (`--bits-navigation-menu-viewport-*`), which the
   * popup reads under Ark UI's names (`navigationMenu.popupArk`), and the popup's offset under the
   * open trigger, which Bits does not give, is measured here, by `align`.
   */
  let {
    align = "start",
    value = $bindable(""),
    class: className,
    children,
    ...rest
  }: {
    align?: "start" | "center" | "end"
    value?: string
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  const direction = useDirection()
  const dir = $derived(direction().dir)

  let root = $state<HTMLElement | null>(null)
  let viewport = $state<HTMLElement | null>(null)
  let x = $state(0)
  const measure = () => {
    const trigger = root?.querySelector<HTMLElement>(
      '[data-navigation-menu-trigger][data-state="open"]'
    )
    if (!root || !trigger) return
    const bar = root.getBoundingClientRect()
    const box = trigger.getBoundingClientRect()
    const width = viewport?.offsetWidth ?? 0
    x =
      align === "center"
        ? box.left - bar.left + box.width / 2 - width / 2
        : align === "end"
          ? box.right - bar.left - width
          : box.left - bar.left
  }
  $effect(() => {
    void value
    measure()
    const element = viewport
    if (!element) return
    const resize = new ResizeObserver(measure)
    resize.observe(element)
    return () => resize.disconnect()
  })
  const MEASURES = $derived(
    `--viewport-width: var(--bits-navigation-menu-viewport-width); --viewport-height: var(--bits-navigation-menu-viewport-height); --viewport-x: ${x}px`
  )
</script>

<!-- Closed panels unmount, as Base UI's do. -->
<NavigationMenu.Root bind:ref={root} bind:value data-slot="navigation-menu" {dir} {...rest} sx={[navigationMenu.root, className as Sx]}>
  {@render children?.()}
  <div sx={[navigationMenu.positioner, navigationMenu.positionerArk]}>
    <!-- The popup clips the panel as Base UI's viewport inside it does. -->
    <NavigationMenu.Viewport bind:ref={viewport} style={MEASURES} sx={[navigationMenu.viewport, navigationMenu.popup, navigationMenu.popupArk]} />
  </div>
</NavigationMenu.Root>
