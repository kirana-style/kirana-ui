"use client"

import type { PartProps } from "../../../lib/kirana-render"

import { Accordion as AccordionPrimitive } from "@kirana-ui/react/accordion"
import { props as styleProps } from "@kirana-style/core"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
import type { Sx } from "../../../lib/sx"
import { accordion } from "../../../styles/accordion.styles"

function Accordion({
  sx,
  ...props
}: Omit<PartProps<typeof AccordionPrimitive.Root>, "className"> & { sx?: Sx }) {
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
}: Omit<PartProps<typeof AccordionPrimitive.Item>, "className"> & { sx?: Sx }) {
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
}: Omit<PartProps<typeof AccordionPrimitive.Trigger>, "className"> & {
  sx?: Sx
}) {
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
}: Omit<PartProps<typeof AccordionPrimitive.Panel>, "className"> & {
  sx?: Sx
}) {
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
