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
  HoverCardContent as ArkHoverCardContent,
  HoverCardPositioner,
  HoverCardRoot,
  HoverCardTrigger as ArkHoverCardTrigger,
  useLocaleContext,
} from "@ark-ui/solid"
import { positioning as place } from "../../../lib/placement"
import { Portal } from "solid-js/web"
import { hoverCard } from "../../../styles/hover-card.styles"
import { popupMotion } from "../../../styles/overlay.styles"
import type { JSX } from "solid-js"
import type { Sx } from "@kirana-style/core"
import type { HoverCardRootProps, HoverCardTriggerProps } from "@ark-ui/solid"
import type { PlacementProps } from "../../../lib/placement"

/** The content's placement, which it hands to its root (`lib/placement.ts`). */
const PlacementContext = createContext<(placement: PlacementProps) => void>()

function HoverCard(props: {
  /** Ark's own placement, over what the content asks for. */
  positioning?: HoverCardRootProps["positioning"]
  children?: JSX.Element
  [attribute: string]: unknown
  sx?: Sx
  class?: string
}) {
  const [local, rest] = splitProps(props, [
    "positioning",
    "children",
    "sx",
    "class",
  ])
  // It renders no element: what a caller passes (`v-model:open` …) goes to Ark's root.

  // The content's `side`, `align` and offsets (Base UI's), placed from here as Ark places a popup.
  const [placement, setPlacement] = createSignal<PlacementProps>({})
  const locale = useLocaleContext()
  const rtl = createMemo(() => locale?.()?.dir === "rtl")
  const resolved = createMemo(() => ({
    ...place(placement(), { rtl: rtl() }),
    ...local.positioning,
  }))
  return (
    <PlacementContext.Provider value={setPlacement}>
      <HoverCardRoot lazyMount unmountOnExit positioning={resolved()} {...rest}>
        {local.children}
      </HoverCardRoot>
    </PlacementContext.Provider>
  )
}

function HoverCardContent(props: {
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
      {
        side: "bottom",
        sideOffset: 4,
        align: "center",
        alignOffset: 4,
      } as const,
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
      <HoverCardPositioner {...styleProps(hoverCard.positioner)}>
        <ArkHoverCardContent
          data-slot="hover-card-content"
          {...rest}
          {...styleProps(local.class, popupMotion, hoverCard.content, local.sx)}
        >
          {local.children}
        </ArkHoverCardContent>
      </HoverCardPositioner>
    </Portal>
  )
}

function HoverCardTrigger(props: {
  asChild?: HoverCardTriggerProps["asChild"]
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
  return (
    <ArkHoverCardTrigger
      asChild={local.asChild}
      data-slot="hover-card-trigger"
      {...rest}
      {...styleProps(local.class, local.sx)}
    >
      {local.children}
    </ArkHoverCardTrigger>
  )
}

export { HoverCard, HoverCardContent, HoverCardTrigger }
