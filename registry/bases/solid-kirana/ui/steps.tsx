import { Show, omit } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import { Steps as StepsPrimitive } from "@kirana-ui/solid/steps"
import type {
  CompletedProps,
  ContentProps,
  IndicatorProps,
  ItemProps,
  ListProps,
  NextProps,
  PreviousProps,
  RootProps,
  SeparatorProps,
  TriggerProps,
} from "@kirana-ui/solid/steps"
import type { JSX } from "@solidjs/web"
import type { Sx } from "@kirana-style/core"

import { steps } from "../../../styles/steps.styles"
import { Button } from "./button"
import type { ButtonProps } from "./button"
import { IconPlaceholder } from "./icon-placeholder"

type Styled<P> = Omit<P, "class"> & { class?: string; sx?: Sx }

function Steps(props: Styled<RootProps>) {
  const rest = omit(props, "class", "sx", "orientation")
  return (
    <StepsPrimitive.Root
      data-slot="steps"
      orientation={props.orientation ?? "horizontal"}
      {...rest}
      {...styleProps(props.class, steps.root, props.sx)}
    />
  )
}

function StepsList(props: Styled<ListProps>) {
  const rest = omit(props, "class", "sx")
  return (
    <StepsPrimitive.List
      data-slot="steps-list"
      {...rest}
      {...styleProps(props.class, steps.list, props.sx)}
    />
  )
}

/** A step: its trigger, then the line to the next step, which the last step hides. */
function StepsItem(props: Styled<ItemProps> & { separator?: boolean }) {
  const rest = omit(props, "class", "sx", "children", "separator")
  return (
    <StepsPrimitive.Item
      data-slot="steps-item"
      {...rest}
      {...styleProps(props.class, steps.item, props.sx)}
    >
      {props.children}
      <Show when={props.separator ?? true}>
        <StepsSeparator />
      </Show>
    </StepsPrimitive.Item>
  )
}

function StepsTrigger(props: Styled<TriggerProps>) {
  const rest = omit(props, "class", "sx")
  return (
    <StepsPrimitive.Trigger
      data-slot="steps-trigger"
      {...rest}
      {...styleProps(props.class, steps.trigger, props.sx)}
    />
  )
}

/** The step's mark: given no children, its number, or a check once the step is done. */
function StepsIndicator(props: Styled<IndicatorProps>) {
  const rest = omit(props, "class", "sx", "children", "render")
  const own = "children" in props
  return (
    <StepsPrimitive.Indicator
      data-slot="steps-indicator"
      {...rest}
      {...styleProps(props.class, steps.indicator, props.sx)}
      render={
        own
          ? props.render
          : (indicatorProps, state) => (
              <span {...indicatorProps()}>
                <Show when={state().complete}>
                  <IconPlaceholder
                    lucide="CheckIcon"
                    tabler="IconCheck"
                    hugeicons="Tick02Icon"
                    phosphor="CheckIcon"
                    remixicon="RiCheckLine"
                  />
                </Show>
              </span>
            )
      }
    >
      {props.children}
    </StepsPrimitive.Indicator>
  )
}

function StepsSeparator(props: Styled<SeparatorProps>) {
  const rest = omit(props, "class", "sx")
  return (
    <StepsPrimitive.Separator
      data-slot="steps-separator"
      {...rest}
      {...styleProps(props.class, steps.separator, props.sx)}
    />
  )
}

function StepsTitle(props: Styled<JSX.HTMLAttributes<HTMLSpanElement>>) {
  const rest = omit(props, "class", "sx")
  return (
    <span
      data-slot="steps-title"
      {...rest}
      {...styleProps(props.class, steps.title, props.sx)}
    />
  )
}

function StepsDescription(props: Styled<JSX.HTMLAttributes<HTMLSpanElement>>) {
  const rest = omit(props, "class", "sx")
  return (
    <span
      data-slot="steps-description"
      {...rest}
      {...styleProps(props.class, steps.description, props.sx)}
    />
  )
}

function StepsContent(props: Styled<ContentProps>) {
  const rest = omit(props, "class", "sx")
  return (
    <StepsPrimitive.Content
      data-slot="steps-content"
      {...rest}
      {...styleProps(props.class, steps.content, props.sx)}
    />
  )
}

function StepsCompleted(props: Styled<CompletedProps>) {
  const rest = omit(props, "class", "sx")
  return (
    <StepsPrimitive.Completed
      data-slot="steps-completed"
      {...rest}
      {...styleProps(props.class, steps.content, props.sx)}
    />
  )
}

type NavProps<P> = Styled<Omit<P, "render">> &
  Pick<ButtonProps, "variant" | "size">

/** Goes to the step before: an outline Button. */
function StepsPrevious(props: NavProps<PreviousProps>) {
  const rest = omit(props, "class", "sx", "variant", "size", "children")
  return (
    <StepsPrimitive.Previous
      data-slot="steps-previous"
      {...rest}
      render={(navProps) => (
        <Button
          {...navProps()}
          variant={props.variant ?? "outline"}
          size={props.size ?? "default"}
          class={props.class}
          sx={props.sx}
        >
          {props.children}
        </Button>
      )}
    />
  )
}

/** Goes to the step after, and from the last to every step done: a Button. */
function StepsNext(props: NavProps<NextProps>) {
  const rest = omit(props, "class", "sx", "variant", "size", "children")
  return (
    <StepsPrimitive.Next
      data-slot="steps-next"
      {...rest}
      render={(navProps) => (
        <Button
          {...navProps()}
          variant={props.variant ?? "default"}
          size={props.size ?? "default"}
          class={props.class}
          sx={props.sx}
        >
          {props.children}
        </Button>
      )}
    />
  )
}

export {
  Steps,
  StepsList,
  StepsItem,
  StepsTrigger,
  StepsIndicator,
  StepsSeparator,
  StepsTitle,
  StepsDescription,
  StepsContent,
  StepsCompleted,
  StepsPrevious,
  StepsNext,
}
