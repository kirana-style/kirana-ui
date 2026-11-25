"use client"

import type * as React from "react"

import { props as styleProps } from "@kirana-style/core"
import { Steps as StepsPrimitive } from "@kirana-ui/react/steps"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
import type { Sx } from "../../../lib/sx"
import { steps } from "../../../styles/steps.styles"
import { Button } from "./button"

type Props<P> = Omit<P, "className"> & { sx?: Sx }

function Steps({
  sx,
  orientation = "horizontal",
  ...props
}: Props<React.ComponentProps<typeof StepsPrimitive.Root>>) {
  return (
    <StepsPrimitive.Root
      data-slot="steps"
      orientation={orientation}
      {...props}
      {...styleProps(steps.root, sx)}
    />
  )
}

function StepsList({
  sx,
  ...props
}: Props<React.ComponentProps<typeof StepsPrimitive.List>>) {
  return (
    <StepsPrimitive.List
      data-slot="steps-list"
      {...props}
      {...styleProps(steps.list, sx)}
    />
  )
}

/** A step: its trigger, then the line to the next step, which the last step hides. */
function StepsItem({
  sx,
  children,
  separator = true,
  ...props
}: Props<React.ComponentProps<typeof StepsPrimitive.Item>> & {
  separator?: boolean
}) {
  return (
    <StepsPrimitive.Item
      data-slot="steps-item"
      {...props}
      {...styleProps(steps.item, sx)}
    >
      {children}
      {separator && <StepsSeparator />}
    </StepsPrimitive.Item>
  )
}

function StepsTrigger({
  sx,
  ...props
}: Props<React.ComponentProps<typeof StepsPrimitive.Trigger>>) {
  return (
    <StepsPrimitive.Trigger
      data-slot="steps-trigger"
      {...props}
      {...styleProps(steps.trigger, sx)}
    />
  )
}

/** The step's mark: given no children, its number, or a check once the step is done. */
function StepsIndicator({
  sx,
  children,
  ...props
}: Props<React.ComponentProps<typeof StepsPrimitive.Indicator>>) {
  return (
    <StepsPrimitive.Indicator
      data-slot="steps-indicator"
      {...props}
      {...styleProps(steps.indicator, sx)}
      render={
        children === undefined
          ? (own, state) => (
              <span {...own}>
                {state.complete ? (
                  <IconPlaceholder
                    lucide="CheckIcon"
                    tabler="IconCheck"
                    hugeicons="Tick02Icon"
                    phosphor="CheckIcon"
                    remixicon="RiCheckLine"
                  />
                ) : null}
              </span>
            )
          : props.render
      }
    >
      {children}
    </StepsPrimitive.Indicator>
  )
}

function StepsSeparator({
  sx,
  ...props
}: Props<React.ComponentProps<typeof StepsPrimitive.Separator>>) {
  return (
    <StepsPrimitive.Separator
      data-slot="steps-separator"
      {...props}
      {...styleProps(steps.separator, sx)}
    />
  )
}

function StepsTitle({ sx, ...props }: Props<React.ComponentProps<"span">>) {
  return <span data-slot="steps-title" {...props} sx={[steps.title, sx]} />
}

function StepsDescription({
  sx,
  ...props
}: Props<React.ComponentProps<"span">>) {
  return (
    <span
      data-slot="steps-description"
      {...props}
      sx={[steps.description, sx]}
    />
  )
}

function StepsContent({
  sx,
  ...props
}: Props<React.ComponentProps<typeof StepsPrimitive.Content>>) {
  return (
    <StepsPrimitive.Content
      data-slot="steps-content"
      {...props}
      {...styleProps(steps.content, sx)}
    />
  )
}

function StepsCompleted({
  sx,
  ...props
}: Props<React.ComponentProps<typeof StepsPrimitive.Completed>>) {
  return (
    <StepsPrimitive.Completed
      data-slot="steps-completed"
      {...props}
      {...styleProps(steps.content, sx)}
    />
  )
}

type NavProps = Props<
  Omit<React.ComponentProps<typeof StepsPrimitive.Previous>, "render">
> &
  Pick<React.ComponentProps<typeof Button>, "variant" | "size">

/** Goes to the step before: an outline Button. */
function StepsPrevious({
  sx,
  variant = "outline",
  size = "default",
  ...props
}: NavProps) {
  return (
    <StepsPrimitive.Previous
      data-slot="steps-previous"
      {...props}
      render={<Button variant={variant} size={size} sx={sx} />}
    />
  )
}

/** Goes to the step after, and from the last to every step done: a Button. */
function StepsNext({
  sx,
  variant = "default",
  size = "default",
  ...props
}: NavProps) {
  return (
    <StepsPrimitive.Next
      data-slot="steps-next"
      {...props}
      render={<Button variant={variant} size={size} sx={sx} />}
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
