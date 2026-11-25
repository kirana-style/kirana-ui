"use client"

import * as React from "react"

import type { TourStep as TourStepPrimitive } from "@kirana-ui/react"
import { Tour as TourPrimitive } from "@kirana-ui/react/tour"
import type {
  PopupProps,
  PositionerProps,
  RootProps,
  TourShownStep,
} from "@kirana-ui/react/tour"
import { props as styleProps } from "@kirana-style/core"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
import type { Sx } from "../../../lib/sx"
import { dialog } from "../../../styles/dialog.styles"
import { backdropMotion, popupMotion } from "../../../styles/overlay.styles"
import { popover } from "../../../styles/popover.styles"
import { tour } from "../../../styles/tour.styles"
import { visuallyHidden } from "../../../styles/visually-hidden.styles"
import { Button } from "./button"

type Props<P> = Omit<P, "className"> & { sx?: Sx }

/** A step: the primitive's (`id`, `target`, `side`, `align`), with what `TourContent` draws by itself. */
type TourStep = TourStepPrimitive & {
  title?: React.ReactNode
  description?: React.ReactNode
}

/** The step shown, for the parts inside the popup: its progress and its next button's label. */
const TourShownContext = React.createContext<TourShownStep | null>(null)

/** The root: the steps, and whether the tour is open and which step it shows. It draws nothing. */
function Tour<Step extends TourStepPrimitive = TourStep>(
  props: RootProps<Step>
) {
  return <TourPrimitive.Root<Step> {...props} />
}

/**
 * The spotlight over the page and the popup by the step's target, with its arrow and a close button
 * in its corner. Given no children, it draws the step's `title` and `description`, its progress and
 * the Back and Next buttons; children may be a function of the step shown.
 */
function TourContent<Step extends TourStep = TourStep>({
  sx,
  side,
  align,
  sideOffset = 12,
  alignOffset = 0,
  showCloseButton = true,
  children,
  ...props
}: Props<PopupProps<Step>> &
  Pick<PositionerProps, "side" | "align" | "sideOffset" | "alignOffset"> & {
    showCloseButton?: boolean
  }) {
  return (
    <TourPrimitive.Portal>
      <TourPrimitive.Spotlight
        data-slot="tour-spotlight"
        {...styleProps(backdropMotion, tour.spotlight)}
      />
      <TourPrimitive.Positioner
        side={side}
        align={align}
        sideOffset={sideOffset}
        alignOffset={alignOffset}
        {...styleProps(popover.positioner)}
      >
        <TourPrimitive.Popup<Step>
          data-slot="tour-content"
          {...props}
          {...styleProps(popupMotion, popover.content, tour.content, sx)}
        >
          {(shown) => (
            <TourShownContext value={shown as TourShownStep}>
              <TourPrimitive.Arrow
                data-slot="tour-arrow"
                {...styleProps(tour.arrow)}
              />
              {typeof children === "function"
                ? children(shown)
                : (children ?? (
                    <>
                      <TourHeader>
                        <TourTitle>{shown.step?.title}</TourTitle>
                        {shown.step?.description != null && (
                          <TourDescription>
                            {shown.step.description}
                          </TourDescription>
                        )}
                      </TourHeader>
                      <TourFooter>
                        <TourProgress />
                        <TourPrevious />
                        <TourNext />
                      </TourFooter>
                    </>
                  ))}
              {showCloseButton && <TourClose />}
            </TourShownContext>
          )}
        </TourPrimitive.Popup>
      </TourPrimitive.Positioner>
    </TourPrimitive.Portal>
  )
}

type El = Props<React.ComponentProps<"div">>

function TourHeader({ sx, ...props }: El) {
  return (
    <div
      data-slot="tour-header"
      {...props}
      sx={[popover.header, tour.header, sx]}
    />
  )
}

function TourTitle({
  sx,
  ...props
}: Props<React.ComponentProps<typeof TourPrimitive.Title>>) {
  return (
    <TourPrimitive.Title
      data-slot="tour-title"
      {...props}
      {...styleProps(popover.title, sx)}
    />
  )
}

function TourDescription({
  sx,
  ...props
}: Props<React.ComponentProps<typeof TourPrimitive.Description>>) {
  return (
    <TourPrimitive.Description
      data-slot="tour-description"
      {...props}
      {...styleProps(popover.description, sx)}
    />
  )
}

function TourFooter({ sx, ...props }: El) {
  return <div data-slot="tour-footer" {...props} sx={[tour.footer, sx]} />
}

/** The step's place in the tour, "1 of 3", unless given children. */
function TourProgress({
  sx,
  children,
  ...props
}: Props<React.ComponentProps<"span">>) {
  const shown = React.use(TourShownContext)
  return (
    <span data-slot="tour-progress" {...props} sx={[tour.progress, sx]}>
      {children ?? (shown ? `${shown.current} of ${shown.total}` : null)}
    </span>
  )
}

/** An outline Button that goes back a step, "Back" unless given children. */
function TourPrevious({
  sx,
  children = "Back",
  ...props
}: Props<React.ComponentProps<typeof TourPrimitive.Previous>>) {
  return (
    <TourPrimitive.Previous
      data-slot="tour-previous"
      render={<Button variant="outline" size="sm" sx={[tour.previous, sx]} />}
      {...props}
    >
      {children}
    </TourPrimitive.Previous>
  )
}

/** A Button that goes on a step, "Next", or "Done" on the last step, unless given children. */
function TourNext({
  sx,
  children,
  ...props
}: Props<React.ComponentProps<typeof TourPrimitive.Next>>) {
  const shown = React.use(TourShownContext)
  const last = shown != null && shown.current === shown.total
  return (
    <TourPrimitive.Next
      data-slot="tour-next"
      render={<Button size="sm" sx={sx} />}
      {...props}
    >
      {children ?? (last ? "Done" : "Next")}
    </TourPrimitive.Next>
  )
}

/** A ghost icon Button in the popup's corner that ends the tour. */
function TourClose({
  sx,
  children,
  ...props
}: Props<React.ComponentProps<typeof TourPrimitive.Close>>) {
  return (
    <TourPrimitive.Close
      data-slot="tour-close"
      render={<Button variant="ghost" size="icon-sm" sx={[dialog.close, sx]} />}
      {...props}
    >
      {children ?? (
        <>
          <IconPlaceholder
            lucide="XIcon"
            tabler="IconX"
            hugeicons="Cancel01Icon"
            phosphor="XIcon"
            remixicon="RiCloseLine"
          />
          <span sx={visuallyHidden}>Close</span>
        </>
      )}
    </TourPrimitive.Close>
  )
}

export {
  Tour,
  TourClose,
  TourContent,
  TourDescription,
  TourFooter,
  TourHeader,
  TourNext,
  TourPrevious,
  TourProgress,
  TourTitle,
}
export type { TourStep }
