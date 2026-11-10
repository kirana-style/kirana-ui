<script lang="ts">
  import type { ClassValue } from "svelte/elements"
  import { onDestroy } from "svelte"

  /**
   * Base UI's `ScrollUpArrow` and `ScrollDownArrow`, which Ark UI's select has no counterpart for:
   * at the popup's top or bottom while the list can scroll that way, scrolling it while the pointer
   * rests on it. `SelectContent` mounts one per direction.
   */

  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import { select } from "../../../../styles/select.styles"

  let {
    direction, list,
    class: className,
    ...rest
  }: {
    direction: "up" | "down"
    /** The list it scrolls. */
    list: HTMLElement | null
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()

  /** Pixels a frame, about Base UI's pace. */
  const STEP = 15
  let frame = 0
  function scroll() {
    if (!list) return
    list.scrollTop += direction === "up" ? -STEP : STEP
    frame = requestAnimationFrame(scroll)
  }
  const stop = () => cancelAnimationFrame(frame)
  onDestroy(stop)
</script>

<div data-slot={
      direction === 'up'
        ? 'select-scroll-up-button'
        : 'select-scroll-down-button'
    } data-direction={direction} data-side={direction === 'up' ? 'top' : 'bottom'} data-visible="" aria-hidden="true" style="position: absolute" {...rest} class={className} sx={[select.scrollButton, direction === 'up' ? select.scrollUp : select.scrollDown]} onpointerenter={scroll} onpointerleave={stop}>
  {#if direction === 'up'}
    <IconPlaceholder lucide="ChevronUpIcon" tabler="IconChevronUp" hugeicons="ArrowUp01Icon" phosphor="CaretUpIcon" remixicon="RiArrowUpSLine" />
  {:else}
    <IconPlaceholder lucide="ChevronDownIcon" tabler="IconChevronDown" hugeicons="ArrowDown01Icon" phosphor="CaretDownIcon" remixicon="RiArrowDownSLine" />
  {/if}
</div>
