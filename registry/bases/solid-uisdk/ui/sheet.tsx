import { Show, createContext, omit, useContext } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import {
  Dialog as DialogPrimitive,
  DialogBackdrop,
  DialogClose as DialogClosePrimitive,
  DialogContent as DialogContentPrimitive,
  DialogDescription as DialogDescriptionPrimitive,
  DialogTitle as DialogTitlePrimitive,
  DialogTrigger as DialogTriggerPrimitive,
} from "@ui-sdk/solid/dialog"
import type { JSX } from "@solidjs/web"
import type { Sx } from "@kirana-style/core"

import type { AsChild } from "../../../lib/solid2/element"
import {
  endScrollAnimations,
  popupContainer,
  UisdkPart,
} from "../../../lib/solid2/uisdk-part"
import { sheet } from "../../../styles/sheet.styles"
import { visuallyHidden } from "../../../styles/visually-hidden.styles"
import { Button } from "./button"
import { IconPlaceholder } from "./icon-placeholder"

/** The open sheet's content, whose scroll-driven animations end as it closes (LF-024). */
type ContentHolder = { el: HTMLElement | null }

const ContentContext = createContext<ContentHolder | null>(null)

/**
 * ui-sdk's dialog, drawn as a sheet at an edge, taking Ark UI's root's props: `open` is given with `onOpenChange` called with
 * `{ open }`, as Solid's Ark UI parts take it. It renders no element; its popup renders in the
 * body, as Base UI's portal puts it, and as it closes its content's scroll-driven animations end
 * (LF-024).
 */
function Sheet(props: {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (details: { open: boolean }) => void
  children?: JSX.Element
  [attribute: string]: unknown
  sx?: Sx
  class?: string
}) {
  const rest = omit(props, "onOpenChange", "children", "sx", "class")
  const content: ContentHolder = { el: null }
  return (
    <ContentContext value={content}>
      <DialogPrimitive
        container={popupContainer()}
        {...rest}
        onOpenChange={(open: boolean) => {
          // Before ui-sdk gathers what its exit waits for.
          if (!open) endScrollAnimations(content.el)
          props.onOpenChange?.({ open })
        }}
      >
        {props.children}
      </DialogPrimitive>
    </ContentContext>
  )
}

function SheetClose(props: {
  asChild?: AsChild<"button">
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "asChild", "class", "sx", "children")
  return (
    <UisdkPart
      part={DialogClosePrimitive}
      slotName="sheet-close"
      tag="button"
      asChild={props.asChild}
      {...rest}
      {...styleProps(props.class, props.sx)}
    >
      {props.children}
    </UisdkPart>
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
  const rest = omit(
    props,
    "side",
    "showCloseButton",
    "class",
    "sx",
    "children",
    "ref"
  )
  const side = () => props.side ?? "right"
  const content = useContext(ContentContext)
  return (
    <>
      <SheetOverlay />
      <UisdkPart
        part={DialogContentPrimitive}
        slotName="sheet-content"
        tag="div"
        data-side={side()}
        ref={[
          props.ref as JSX.Ref<HTMLElement>,
          (el: HTMLElement) => content && (content.el = el),
        ]}
        {...rest}
        {...styleProps(
          props.class,
          sheet.content,
          sheet.side[side()],
          props.sx
        )}
      >
        {props.children}
        <Show when={props.showCloseButton ?? true}>
          <UisdkPart
            part={DialogClosePrimitive}
            slotName="sheet-close"
            tag="button"
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
        </Show>
      </UisdkPart>
    </>
  )
}

function SheetDescription(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "class", "sx", "children")
  return (
    <UisdkPart
      part={DialogDescriptionPrimitive}
      slotName="sheet-description"
      tag="p"
      {...rest}
      {...styleProps(props.class, sheet.description, props.sx)}
    >
      {props.children}
    </UisdkPart>
  )
}

function SheetFooter(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "class", "sx", "children")
  return (
    <div
      data-slot="sheet-footer"
      {...rest}
      {...styleProps(props.class, sheet.footer, props.sx)}
    >
      {props.children}
    </div>
  )
}

function SheetHeader(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "class", "sx", "children")
  return (
    <div
      data-slot="sheet-header"
      {...rest}
      {...styleProps(props.class, sheet.header, props.sx)}
    >
      {props.children}
    </div>
  )
}

function SheetOverlay(props: {
  asChild?: AsChild<"div">
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const rest = omit(props, "asChild", "class", "sx")
  return (
    <UisdkPart
      part={DialogBackdrop}
      slotName="sheet-overlay"
      tag="div"
      asChild={props.asChild}
      {...rest}
      {...styleProps(props.class, sheet.overlay, props.sx)}
    />
  )
}

function SheetTitle(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "class", "sx", "children")
  return (
    <UisdkPart
      part={DialogTitlePrimitive}
      slotName="sheet-title"
      tag="h2"
      {...rest}
      {...styleProps(props.class, sheet.title, props.sx)}
    >
      {props.children}
    </UisdkPart>
  )
}

function SheetTrigger(props: {
  asChild?: AsChild<"button">
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "asChild", "class", "sx", "children")
  return (
    <UisdkPart
      part={DialogTriggerPrimitive}
      slotName="sheet-trigger"
      tag="button"
      asChild={props.asChild}
      {...rest}
      {...styleProps(props.class, props.sx)}
    >
      {props.children}
    </UisdkPart>
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
