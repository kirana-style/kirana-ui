"use client"

import type { ComponentProps, ReactNode } from "react"

import * as AccordionPrimitive from "@ui-sdk/react/accordion"
import { props as styleProps } from "@kirana-style/core"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
import type { Sx } from "../../../lib/sx"
import { slotRender } from "../../../lib/uisdk-slot"
import { accordion } from "../../../styles/accordion.styles"

function Accordion({
  sx,
  ...props
}: Omit<ComponentProps<typeof AccordionPrimitive.Accordion>, "className"> & {
  sx?: Sx
}) {
  return (
    <AccordionPrimitive.Accordion
      {...props}
      render={slotRender("accordion", "div", props.render)}
      {...styleProps(accordion.root, sx)}
    />
  )
}

function AccordionItem({
  sx,
  ...props
}: Omit<
  ComponentProps<typeof AccordionPrimitive.AccordionItem>,
  "className"
> & { sx?: Sx }) {
  return (
    <AccordionPrimitive.AccordionItem
      {...props}
      render={slotRender("accordion-item", "div", props.render)}
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
        render={slotRender("accordion-trigger", "button", props.render)}
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
      render={slotRender("accordion-content", "div", props.render)}
      {...styleProps(accordion.content, accordion.contentBase)}
    >
      <div sx={[accordion.contentInner, accordion.contentInnerBase, sx]}>
        {children}
      </div>
    </AccordionPrimitive.AccordionPanel>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
