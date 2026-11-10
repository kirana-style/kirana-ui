<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import { Select } from "bits-ui"

  import { physicalSide } from "../../../../lib/placement"
  import { menuSurface } from "../../../../styles/menu.styles"
  import { popupMotion } from "../../../../styles/overlay.styles"
  import { select } from "../../../../styles/select.styles"
  import { useDirection } from "../direction/context"
  import SelectScrollButton from "./SelectScrollButton.svelte"

  /**
   * Base UI's placement, passed to Bits' content, whose sides are physical. `alignItemWithTrigger`,
   * Base UI's popup laid over its trigger with the chosen item level with it, has no counterpart in
   * Bits UI: the popup opens beside the trigger, as on Ark UI.
   */
  let {
    side = "bottom",
    sideOffset = 4,
    align = "center",
    alignOffset = 0,
    alignItemWithTrigger: _alignItemWithTrigger,
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

  const direction = useDirection()
  const dir = $derived(direction().dir)

  // Whether the list can scroll up or down, for Base UI's scroll arrows (`SelectScrollButton`).
  let list = $state<HTMLElement | null>(null)
  let canUp = $state(false)
  let canDown = $state(false)
  const measure = () => {
    const element = list
    if (!element) return
    canUp = element.scrollTop > 0
    canDown = element.scrollTop + element.clientHeight < element.scrollHeight - 1
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

<Select.Portal>
  <Select.Content
    data-slot="select-content"
    side={physicalSide(side, dir === "rtl")}
    {sideOffset}
    {align}
    {alignOffset}
    {dir}
    {...rest}
    sx={[popupMotion, menuSurface, select.content, className as Sx]}
  >
    {#if canUp}
      <SelectScrollButton direction="up" {list} />
    {/if}
    <!-- Bits focuses the items, the viewport only scrolls: it draws no focus ring of its own. -->
    <Select.Viewport bind:ref={list} sx={select.list} onscroll={measure}>
      {@render children?.()}
    </Select.Viewport>
    {#if canDown}
      <SelectScrollButton direction="down" {list} />
    {/if}
  </Select.Content>
</Select.Portal>
