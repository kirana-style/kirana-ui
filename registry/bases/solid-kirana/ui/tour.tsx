import { createContext, omit, Show, useContext } from "solid-js"
import type { Accessor } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import { Tour as TourPrimitive } from "@kirana-ui/solid/tour"
import type {
  PositionerProps,
  RootProps,
  TourShownStep,
} from "@kirana-ui/solid/tour"
import type { TourStep as TourStepPrimitive } from "@kirana-ui/solid"
import { IconPlaceholder } from "./icon-placeholder"
import { dialog } from "../../../styles/dialog.styles"
import { backdropMotion, popupMotion } from "../../../styles/overlay.styles"
import { popover } from "../../../styles/popover.styles"
import { tour } from "../../../styles/tour.styles"
import { visuallyHidden } from "../../../styles/visually-hidden.styles"
import { Button } from "./button"
import type { JSX } from "@solidjs/web"
import type { Sx } from "@kirana-style/core"

type El = {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}

/** A step: the primitive's (`id`, `target`, `side`, `align`), with what `TourContent` draws by itself. */
type TourStep = TourStepPrimitive & {
  title?: JSX.Element
  description?: JSX.Element
}

/** The step shown, for the parts inside the popup: its progress and its next button's label. */
const TourShownContext = createContext<Accessor<TourShownStep> | null>(null)

/**
 * The root: the steps, and whether the tour is open and which step it shows. It draws nothing. It
 * takes Kirana UI's props as they are: `open`, `onOpenChange(open, details)`, `step` and
 * `onStepChange(step, details)`.
 */
function Tour<Step extends TourStepPrimitive = TourStep>(
  props: RootProps<Step>
) {
  return <TourPrimitive.Root<Step> {...props} />
}

/**
 * The spotlight over the page and the popup by the step's target, with its arrow and a close button
 * in its corner. Given no children, it draws the step's `title` and `description`, its progress and
 * the Back and Next buttons; children may be a function of the step shown, given as an accessor.
 */
function TourContent<Step extends TourStep = TourStep>(
  props: {
    class?: string
    sx?: Sx
    [attribute: string]: unknown
  } & Pick<PositionerProps, "side" | "align" | "sideOffset" | "alignOffset"> & {
      showCloseButton?: boolean
      children?:
        | JSX.Element
        | ((shown: Accessor<TourShownStep<Step>>) => JSX.Element)
    }
) {
  const rest = omit(
    props,
    "side",
    "align",
    "sideOffset",
    "alignOffset",
    "showCloseButton",
    "class",
    "sx",
    "children"
  )
  return (
    <TourPrimitive.Portal>
      <TourPrimitive.Spotlight
        data-slot="tour-spotlight"
        {...styleProps(backdropMotion, tour.spotlight)}
      />
      <TourPrimitive.Positioner
        side={props.side}
        align={props.align}
        sideOffset={props.sideOffset ?? 12}
        alignOffset={props.alignOffset ?? 0}
        {...styleProps(popover.positioner)}
      >
        <TourPrimitive.Popup<Step>
          data-slot="tour-content"
          {...rest}
          {...styleProps(
            props.class,
            popupMotion,
            popover.content,
            tour.content,
            props.sx
          )}
        >
          {(shown) => (
            <TourShownContext value={shown as Accessor<TourShownStep>}>
              <TourPrimitive.Arrow
                data-slot="tour-arrow"
                {...styleProps(tour.arrow)}
              />
              {typeof props.children === "function"
                ? props.children(shown)
                : (props.children ?? (
                    <>
                      <TourHeader>
                        <TourTitle>{shown().step?.title}</TourTitle>
                        <Show when={shown().step?.description != null}>
                          <TourDescription>
                            {shown().step?.description}
                          </TourDescription>
                        </Show>
                      </TourHeader>
                      <TourFooter>
                        <TourProgress />
                        <TourPrevious />
                        <TourNext />
                      </TourFooter>
                    </>
                  ))}
              <Show when={props.showCloseButton ?? true}>
                <TourClose />
              </Show>
            </TourShownContext>
          )}
        </TourPrimitive.Popup>
      </TourPrimitive.Positioner>
    </TourPrimitive.Portal>
  )
}

function TourHeader(props: El) {
  const rest = omit(props, "class", "sx")
  return (
    <div
      data-slot="tour-header"
      {...rest}
      {...styleProps(props.class, popover.header, tour.header, props.sx)}
    />
  )
}

function TourTitle(props: El) {
  const rest = omit(props, "class", "sx")
  return (
    <TourPrimitive.Title
      data-slot="tour-title"
      {...rest}
      {...styleProps(props.class, popover.title, props.sx)}
    />
  )
}

function TourDescription(props: El) {
  const rest = omit(props, "class", "sx")
  return (
    <TourPrimitive.Description
      data-slot="tour-description"
      {...rest}
      {...styleProps(props.class, popover.description, props.sx)}
    />
  )
}

function TourFooter(props: El) {
  const rest = omit(props, "class", "sx")
  return (
    <div
      data-slot="tour-footer"
      {...rest}
      {...styleProps(props.class, tour.footer, props.sx)}
    />
  )
}

/** The step's place in the tour, "1 of 3", unless given children. */
function TourProgress(props: El) {
  const shown = useContext(TourShownContext)
  const rest = omit(props, "class", "sx", "children")
  return (
    <span
      data-slot="tour-progress"
      {...rest}
      {...styleProps(props.class, tour.progress, props.sx)}
    >
      {props.children ??
        (shown ? `${shown().current} of ${shown().total}` : null)}
    </span>
  )
}

/** An outline Button that goes back a step, "Back" unless given children. */
function TourPrevious(props: El) {
  const rest = omit(props, "sx", "children")
  return (
    <TourPrimitive.Previous
      data-slot="tour-previous"
      render={(previousProps) => (
        <Button
          {...previousProps()}
          variant="outline"
          size="sm"
          sx={[tour.previous, props.sx]}
        />
      )}
      {...rest}
    >
      {props.children ?? "Back"}
    </TourPrimitive.Previous>
  )
}

/** A Button that goes on a step, "Next", or "Done" on the last step, unless given children. */
function TourNext(props: El) {
  const shown = useContext(TourShownContext)
  const last = () => shown != null && shown().current === shown().total
  const rest = omit(props, "sx", "children")
  return (
    <TourPrimitive.Next
      data-slot="tour-next"
      render={(nextProps) => (
        <Button {...nextProps()} size="sm" sx={props.sx} />
      )}
      {...rest}
    >
      {props.children ?? (last() ? "Done" : "Next")}
    </TourPrimitive.Next>
  )
}

/** A ghost icon Button in the popup's corner that ends the tour. */
function TourClose(props: El) {
  const rest = omit(props, "sx", "children")
  return (
    <TourPrimitive.Close
      data-slot="tour-close"
      render={(closeProps) => (
        <Button
          {...closeProps()}
          variant="ghost"
          size="icon-sm"
          sx={[dialog.close, props.sx]}
        />
      )}
      {...rest}
    >
      {props.children ?? (
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
