"use client"

import type { ComponentProps, ReactNode } from "react"

import * as AccordionPrimitive from "@ui-sdk/react/accordion"
import { props as styleProps } from "@kirana-style/core"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
import type { Sx } from "../../../lib/sx"
import { slotRender, slotOf } from "../../../lib/uisdk-slot"
import { accordion } from "../../../styles/accordion.styles"

type RootProps = ComponentProps<typeof AccordionPrimitive.Accordion>

/** A value as ui-sdk keeps it: Base UI's may be any value (an index), ui-sdk's are text. */
const text = (values: readonly unknown[] | undefined) => values?.map(String)

/**
 * Base UI's Accordion root, whose values may be numbers (an item's index), on ui-sdk's, whose are
 * strings: each is written as text both ways.
 */
function Accordion({
  sx,
  value,
  defaultValue,
  onValueChange,
  ...props
}: Omit<RootProps, "className" | "value" | "defaultValue" | "onValueChange"> & {
  sx?: Sx
  value?: readonly unknown[]
  defaultValue?: readonly unknown[]
  onValueChange?: (
    value: string[],
    details: Parameters<NonNullable<RootProps["onValueChange"]>>[1]
  ) => void
}) {
  return (
    <AccordionPrimitive.Accordion
      value={text(value)}
      defaultValue={text(defaultValue)}
      onValueChange={onValueChange}
      {...props}
      render={slotRender(slotOf(props, "accordion"), "div", props.render)}
      {...styleProps(accordion.root, sx)}
    />
  )
}

function AccordionItem({
  sx,
  value,
  ...props
}: Omit<
  ComponentProps<typeof AccordionPrimitive.AccordionItem>,
  "className" | "value"
> & { sx?: Sx; value?: unknown }) {
  return (
    <AccordionPrimitive.AccordionItem
      value={value === undefined ? undefined : String(value)}
      {...props}
      render={slotRender(slotOf(props, "accordion-item"), "div", props.render)}
      {...styleProps(accordion.item, sx)}
    />
  )
}

function AccordionTrigger({
  sx,
  children,
  ...props
}: Omit<
  ComponentProps<typeof AccordionPrimitive.AccordionTrigger>,
  "className" | "children"
> & {
  sx?: Sx
  // Plain content, as Base UI's part takes it: the part adds its own around it.
  children?: ReactNode
}) {
  return (
    <AccordionPrimitive.AccordionHeader {...styleProps(accordion.header)}>
      <AccordionPrimitive.AccordionTrigger
        {...props}
        render={slotRender(
          slotOf(props, "accordion-trigger"),
          "button",
          props.render
        )}
        {...styleProps(accordion.trigger, sx)}
      >
        {children}
        <IconPlaceholder
          lucide="ChevronDownIcon"
          tabler="IconChevronDown"
          data-slot="accordion-trigger-icon"
          hugeicons="ArrowDown01Icon"
          phosphor="CaretDownIcon"
          remixicon="RiArrowDownSLine"
          {...styleProps(accordion.iconClosed)}
        />
        <IconPlaceholder
          lucide="ChevronUpIcon"
          tabler="IconChevronUp"
          data-slot="accordion-trigger-icon"
          hugeicons="ArrowUp01Icon"
          phosphor="CaretUpIcon"
          remixicon="RiArrowUpSLine"
          {...styleProps(accordion.iconOpen)}
        />
      </AccordionPrimitive.AccordionTrigger>
    </AccordionPrimitive.AccordionHeader>
  )
}

function AccordionContent({
  sx,
  children,
  ...props
}: Omit<
  ComponentProps<typeof AccordionPrimitive.AccordionPanel>,
  "className" | "children"
> & {
  sx?: Sx
  // Plain content, as Base UI's part takes it: the part adds its own around it.
  children?: ReactNode
}) {
  return (
    <AccordionPrimitive.AccordionPanel
      {...props}
      render={slotRender(
        slotOf(props, "accordion-content"),
        "div",
        props.render
      )}
      {...styleProps(accordion.content, accordion.contentBase)}
    >
      <div sx={[accordion.contentInner, accordion.contentInnerBase, sx]}>
        {children}
      </div>
    </AccordionPrimitive.AccordionPanel>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
