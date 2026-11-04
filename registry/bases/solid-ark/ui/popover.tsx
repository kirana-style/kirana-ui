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
  PopoverContent as ArkPopoverContent,
  PopoverDescription as ArkPopoverDescription,
  PopoverPositioner,
  PopoverRoot,
  PopoverTitle as ArkPopoverTitle,
  PopoverTrigger as ArkPopoverTrigger,
  useLocaleContext,
} from "@ark-ui/solid"
import { positioning as place } from "../../../lib/placement"
import { Portal } from "solid-js/web"
import { popupMotion } from "../../../styles/overlay.styles"
import { popover } from "../../../styles/popover.styles"
import type { JSX } from "solid-js"
import type { Sx } from "@kirana-style/core"
import type {
  PopoverRootProps,
  PopoverTitleProps,
  PopoverTriggerProps,
} from "@ark-ui/solid"
import type { PlacementProps } from "../../../lib/placement"

/** The content's placement, which it hands to its root (`lib/placement.ts`). */
const PlacementContext = createContext<(placement: PlacementProps) => void>()

function Popover(props: {
  /** Ark's own placement, over what the content asks for. */
  positioning?: PopoverRootProps["positioning"]
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
      <PopoverRoot lazyMount unmountOnExit positioning={resolved()} {...rest}>
        {local.children}
      </PopoverRoot>
    </PlacementContext.Provider>
  )
}

function PopoverContent(props: {
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
        alignOffset: 0,
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
      <PopoverPositioner {...styleProps(popover.positioner)}>
        <ArkPopoverContent
          data-slot="popover-content"
          {...rest}
          {...styleProps(local.class, popupMotion, popover.content, local.sx)}
        >
          {local.children}
        </ArkPopoverContent>
      </PopoverPositioner>
    </Portal>
  )
}

function PopoverDescription(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <ArkPopoverDescription
      asChild={(childProps) => (
        <p
          {...childProps()}
          data-slot="popover-description"
          {...rest}
          {...styleProps(
            childProps().class,
            local.class,
            popover.description,
            local.sx
          )}
        >
          {local.children}
        </p>
      )}
    />
  )
}

function PopoverHeader(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <div
      data-slot="popover-header"
      {...rest}
      {...styleProps(local.class, popover.header, local.sx)}
    >
      {local.children}
    </div>
  )
}

function PopoverTitle(props: {
  asChild?: PopoverTitleProps["asChild"]
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
    <ArkPopoverTitle
      asChild={local.asChild}
      data-slot="popover-title"
      {...rest}
      {...styleProps(local.class, popover.title, local.sx)}
    >
      {local.children}
    </ArkPopoverTitle>
  )
}

function PopoverTrigger(props: {
  asChild?: PopoverTriggerProps["asChild"]
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
    <ArkPopoverTrigger
      asChild={local.asChild}
      data-slot="popover-trigger"
      {...rest}
      {...styleProps(local.class, local.sx)}
    >
      {local.children}
    </ArkPopoverTrigger>
  )
}

export {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
}
