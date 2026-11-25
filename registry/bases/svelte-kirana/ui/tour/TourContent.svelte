<script lang="ts" generics="Step extends TourStep = TourStep">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"
  import type { Snippet } from "svelte"
  import type { Align, Side } from "@kirana-ui/svelte"
  import { Tour } from "@kirana-ui/svelte/tour"
  import type { TourShownStep } from "@kirana-ui/svelte/tour"

  import { backdropMotion, popupMotion } from "../../../../styles/overlay.styles"
  import { popover } from "../../../../styles/popover.styles"
  import { tour } from "../../../../styles/tour.styles"
  import type { TourStep } from "./context"
  import TourClose from "./TourClose.svelte"
  import TourDescription from "./TourDescription.svelte"
  import TourFooter from "./TourFooter.svelte"
  import TourHeader from "./TourHeader.svelte"
  import TourNext from "./TourNext.svelte"
  import TourPrevious from "./TourPrevious.svelte"
  import TourProgress from "./TourProgress.svelte"
  import TourShown from "./TourShown.svelte"
  import TourTitle from "./TourTitle.svelte"

  /**
   * The spotlight over the page and the popup by the step's target, with its arrow and a close button
   * in its corner. Given no children, it draws the step's `title` and `description`, its progress and
   * the Back and Next buttons; the children snippet is given the step shown.
   */
  let {
    side,
    align,
    sideOffset = 12,
    alignOffset = 0,
    showCloseButton = true,
    class: className,
    children: content,
    ...rest
  }: {
    side?: Side
    align?: Align
    sideOffset?: number
    alignOffset?: number
    showCloseButton?: boolean
    class?: ClassValue | null
    children?: Snippet<[TourShownStep<Step>]>
    [attribute: string]: unknown
  } = $props()
</script>

{#snippet text(value: string | Snippet | undefined)}
  {#if typeof value === "function"}{@render value()}{:else}{value}{/if}
{/snippet}

<Tour.Portal>
  <Tour.Spotlight data-slot="tour-spotlight" sx={[backdropMotion, tour.spotlight]} />
  <Tour.Positioner {side} {align} {sideOffset} {alignOffset} sx={popover.positioner}>
    <Tour.Popup data-slot="tour-content" {...rest} sx={[popupMotion, popover.content, tour.content, className as Sx]}>
      {#snippet children(shown: TourShownStep<Step>)}
        <TourShown shown={shown as TourShownStep}>
          <Tour.Arrow data-slot="tour-arrow" sx={tour.arrow} />
          {#if content}
            {@render content(shown)}
          {:else}
            <TourHeader>
              <TourTitle>{@render text(shown.step?.title)}</TourTitle>
              {#if shown.step?.description != null}
                <TourDescription>{@render text(shown.step.description)}</TourDescription>
              {/if}
            </TourHeader>
            <TourFooter>
              <TourProgress />
              <TourPrevious />
              <TourNext />
            </TourFooter>
          {/if}
          {#if showCloseButton}
            <TourClose />
          {/if}
        </TourShown>
      {/snippet}
    </Tour.Popup>
  </Tour.Positioner>
</Tour.Portal>
