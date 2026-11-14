import {
  createContext,
  createEffect,
  createMemo,
  createSignal,
  mergeProps,
  splitProps,
  useContext,
} from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import {
  TooltipArrow,
  TooltipArrowTip,
  TooltipContent as ArkTooltipContent,
  TooltipPositioner,
  TooltipRoot,
  TooltipTrigger as ArkTooltipTrigger,
  useLocaleContext,
} from "@ark-ui/solid"
import { positioning as place } from "../../../lib/placement"
import { Portal } from "solid-js/web"
import { popupMotion } from "../../../styles/overlay.styles"
import { tooltip } from "../../../styles/tooltip.styles"
import type { JSX } from "solid-js"
import type { Sx } from "@kirana-style/core"
import type { TooltipRootProps, TooltipTriggerProps } from "@ark-ui/solid"
import type { PlacementProps } from "../../../lib/placement"

/** The content's placement, which it hands to its root (`lib/placement.ts`). */
const PlacementContext = createContext<(placement: PlacementProps) => void>()

function Tooltip(props: {
  openDelay?: number
  /** Ark's own placement, over what the content asks for. */
  positioning?: TooltipRootProps["positioning"]
  children?: JSX.Element
  [attribute: string]: unknown
  sx?: Sx
  class?: string
}) {
  const [local, rest] = splitProps(
    mergeProps({ openDelay: 0 } as const, props),
    ["openDelay", "positioning", "children", "sx", "class"]
  )
  // It renders no element: what a caller passes (`v-model:open` …) goes to Ark's root.

  // Opens at once, as shadcn/ui's `TooltipProvider` (`delay = 0`) does.

  // The content's `side`, `align` and offsets (Base UI's), placed from here as Ark places a popup.
  const [placement, setPlacement] = createSignal<PlacementProps>({})
  const locale = useLocaleContext()
  const rtl = createMemo(() => locale?.()?.dir === "rtl")
  const resolved = createMemo(() => ({
    ...place(placement(), { arrow: 10, rtl: rtl() }),
    ...local.positioning,
  }))
  return (
    <PlacementContext.Provider value={setPlacement}>
      <TooltipRoot
        lazyMount
        unmountOnExit
        openDelay={local.openDelay}
        positioning={resolved()}
        {...rest}
      >
        {local.children}
      </TooltipRoot>
    </PlacementContext.Provider>
  )
}

function TooltipContent(props: {
  // Declared here, not imported: Vue resolves an imported props type through TypeScript's
  // JavaScript API, which TypeScript 7 does not have.
  side?: "top" | "right" | "bottom" | "left" | "inline-start" | "inline-end"
  sideOffset?: number
  align?: "start" | "center" | "end"
  alignOffset?: number
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(
    mergeProps(
      { side: "top", sideOffset: 4, align: "center", alignOffset: 0 } as const,
      props
    ),
    ["side", "sideOffset", "align", "alignOffset", "class", "sx", "children"]
  )
  // Base UI's placement, which the root places the popup with.

  const setPlacement = useContext(PlacementContext)
  createEffect(() => {
    setPlacement?.({
      side: local.side,
      sideOffset: local.sideOffset,
      align: local.align,
      alignOffset: local.alignOffset,
    })
  })
  return (
    <Portal>
      <TooltipPositioner {...styleProps(tooltip.positioner)}>
        <ArkTooltipContent
          data-slot="tooltip-content"
          {...rest}
          {...styleProps(local.class, popupMotion, tooltip.content, local.sx)}
        >
          {local.children}
          <TooltipArrow {...styleProps(tooltip.arrowArk)}>
            <TooltipArrowTip {...styleProps(tooltip.arrowTipArk)} />
          </TooltipArrow>
        </ArkTooltipContent>
      </TooltipPositioner>
    </Portal>
  )
}

function TooltipTrigger(props: {
  asChild?: TooltipTriggerProps["asChild"]
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, [
    "asChild",
    "class",
    "sx",
    "children",
  ])
  // `type="button"`: Ark's tooltip trigger is a `<button>` without one, which submits the form it
  // sits in (LF-021).
  return (
    <ArkTooltipTrigger
      asChild={local.asChild}
      type="button"
      data-slot="tooltip-trigger"
      {...rest}
      {...styleProps(local.class, local.sx)}
    >
      {local.children}
    </ArkTooltipTrigger>
  )
}

export { Tooltip, TooltipContent, TooltipTrigger }
