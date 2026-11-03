<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import { getContext } from "svelte"
  import type { Snippet } from "svelte"
  import { Portal,SelectContent,SelectList,SelectPositioner } from "@ark-ui/svelte"


  import { menuPositioner, menuSurface } from "../../../../styles/menu.styles"
  import { popupMotion } from "../../../../styles/overlay.styles"
  import { select } from "../../../../styles/select.styles"
  import { PLACEMENT } from "./placement"
  import type { PlacementState } from "./placement"
  import SelectScrollButton from "./SelectScrollButton.svelte"

  let {
    side = "bottom",
    sideOffset = 4,
    align = "center",
    alignOffset = 0,
    class: className,
    children,
    ...rest
  }: {
    side?: "top" | "right" | "bottom" | "left" | "inline-start" | "inline-end"
    sideOffset?: number
    align?: "start" | "center" | "end"
    alignOffset?: number
    alignItemWithTrigger?: boolean
    class?: ClassValue | null
    children?: Snippet
    [attribute: string]: unknown
  } = $props()

  // Base UI's placement, which the root places the popup with. `alignItemWithTrigger`, Base UI's
  // popup laid over its trigger with the chosen item level with it, has no counterpart in Ark: the
  // popup always opens beside the trigger.

  const placement = getContext<PlacementState | undefined>(PLACEMENT)
  $effect(() => {
    if (placement) Object.assign(placement, { side, sideOffset, align, alignOffset })
  })

  // Whether the list can scroll up or down, for Base UI's scroll arrows (`SelectScrollButton`).
  let list = $state<HTMLElement | null>(null)
  let canUp = $state(false)
  let canDown = $state(false)
  const measure = () => {
    const element = list
    if (!element) return
    canUp = element.scrollTop > 0
    canDown =
      element.scrollTop + element.clientHeight < element.scrollHeight - 1
  }
  $effect(() => {
    const element = list
    if (!element) return
    measure()
    const resize = new ResizeObserver(measure)
    resize.observe(element)
    for (const child of element.children) resize.observe(child)
    return () => resize.disconnect()
  })
</script>

<Portal>
  <SelectPositioner sx={menuPositioner}>
    <SelectContent data-slot="select-content" {...rest} sx={[popupMotion, menuSurface, select.content, className as Sx]}>
      {#if canUp}
        <SelectScrollButton direction="up" list={list} />
      {/if}
      <!-- Ark focuses the list, not an item: it draws no focus ring of its own. -->
      <SelectList bind:ref={list} sx={select.list} onscroll={measure}>
        {@render children?.()}
      </SelectList>
      {#if canDown}
        <SelectScrollButton direction="down" list={list} />
      {/if}
    </SelectContent>
  </SelectPositioner>
</Portal>
