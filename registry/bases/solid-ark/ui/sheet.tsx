import { Show, mergeProps, splitProps } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import {
  DialogBackdrop,
  DialogCloseTrigger,
  DialogContent,
  DialogDescription,
  DialogPositioner,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@ark-ui/solid"
import { Portal } from "solid-js/web"
import { IconPlaceholder } from "./icon-placeholder"
import { sheet } from "../../../styles/sheet.styles"
import { visuallyHidden } from "../../../styles/visually-hidden.styles"
import { Button } from "./button"
import type { JSX } from "solid-js"
import type { Sx } from "@kirana-style/core"
import type {
  DialogBackdropProps,
  DialogCloseTriggerProps,
  DialogTriggerProps,
} from "@ark-ui/solid"

function Sheet(props: {
  children?: JSX.Element
  [attribute: string]: unknown
  sx?: Sx
  class?: string
}) {
  const [local, rest] = splitProps(props, ["children", "sx", "class"])
  return (
    <DialogRoot lazyMount unmountOnExit {...rest}>
      {local.children}
    </DialogRoot>
  )
}

function SheetClose(props: {
  asChild?: DialogCloseTriggerProps["asChild"]
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
    <DialogCloseTrigger
      asChild={local.asChild}
      data-slot="sheet-close"
      {...rest}
      {...styleProps(local.class, local.sx)}
    >
      {local.children}
    </DialogCloseTrigger>
  )
}

function SheetContent(props: {
  side?: "top" | "right" | "bottom" | "left"
  showCloseButton?: boolean
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(
    mergeProps({ side: "right", showCloseButton: true } as const, props),
    ["side", "showCloseButton", "class", "sx", "children"]
  )
  return (
    <Portal>
      <SheetOverlay />
      <DialogPositioner>
        <DialogContent
          data-slot="sheet-content"
          data-side={local.side}
          {...rest}
          {...styleProps(
            local.class,
            sheet.content,
            sheet.side[local.side],
            local.sx
          )}
        >
          {local.children}
          <Show when={local.showCloseButton}>
            <>
              <DialogCloseTrigger
                data-slot="sheet-close"
                asChild={(childProps) => (
                  <Button
                    {...childProps()}
                    variant="ghost"
                    size="icon-sm"
                    sx={sheet.close}
                  >
                    <IconPlaceholder
                      lucide="XIcon"
                      tabler="IconX"
                      hugeicons="Cancel01Icon"
                      phosphor="XIcon"
                      remixicon="RiCloseLine"
                    />
                    <span sx={visuallyHidden}>Close</span>
                  </Button>
                )}
              />
            </>
          </Show>
        </DialogContent>
      </DialogPositioner>
    </Portal>
  )
}

function SheetDescription(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <DialogDescription
      asChild={(childProps) => (
        <p
          {...childProps()}
          data-slot="sheet-description"
          {...rest}
          {...styleProps(
            childProps().class,
            local.class,
            sheet.description,
            local.sx
          )}
        >
          {local.children}
        </p>
      )}
    />
  )
}

function SheetFooter(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <div
      data-slot="sheet-footer"
      {...rest}
      {...styleProps(local.class, sheet.footer, local.sx)}
    >
      {local.children}
    </div>
  )
}

function SheetHeader(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <div
      data-slot="sheet-header"
      {...rest}
      {...styleProps(local.class, sheet.header, local.sx)}
    >
      {local.children}
    </div>
  )
}

function SheetOverlay(props: {
  asChild?: DialogBackdropProps["asChild"]
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["asChild", "class", "sx"])
  return (
    <DialogBackdrop
      asChild={local.asChild}
      data-slot="sheet-overlay"
      {...rest}
      {...styleProps(local.class, sheet.overlay, local.sx)}
    />
  )
}

function SheetTitle(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <DialogTitle
      data-slot="sheet-title"
      {...rest}
      {...styleProps(local.class, sheet.title, local.sx)}
    >
      {local.children}
    </DialogTitle>
  )
}

function SheetTrigger(props: {
  asChild?: DialogTriggerProps["asChild"]
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
    <DialogTrigger
      asChild={local.asChild}
      data-slot="sheet-trigger"
      {...rest}
      {...styleProps(local.class, local.sx)}
    >
      {local.children}
    </DialogTrigger>
  )
}

export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetTitle,
  SheetTrigger,
}
