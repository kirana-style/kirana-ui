"use client"

import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion"
import { props as styleProps } from "@kirana-style/core"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
import type { Sx } from "../../../lib/sx"
import { accordion } from "../../../styles/accordion.styles"

function Accordion({
  sx,
  ...props
}: Omit<AccordionPrimitive.Root.Props, "className"> & { sx?: Sx }) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      {...props}
      {...styleProps(accordion.root, sx)}
    />
  )
}

function AccordionItem({
  sx,
  ...props
}: Omit<AccordionPrimitive.Item.Props, "className"> & { sx?: Sx }) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      {...props}
      {...styleProps(accordion.item, sx)}
    />
  )
}

function AccordionTrigger({
  sx,
  children,
  ...props
}: Omit<AccordionPrimitive.Trigger.Props, "className"> & { sx?: Sx }) {
  return (
    <AccordionPrimitive.Header {...styleProps(accordion.header)}>
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        {...props}
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
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  sx,
  children,
  ...props
}: Omit<AccordionPrimitive.Panel.Props, "className"> & { sx?: Sx }) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      {...props}
      {...styleProps(accordion.content, accordion.contentBase)}
    >
      <div sx={[accordion.contentInner, accordion.contentInnerBase, sx]}>
        {children}
      </div>
    </AccordionPrimitive.Panel>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
