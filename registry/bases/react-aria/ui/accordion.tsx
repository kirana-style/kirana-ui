"use client"

import * as React from "react"
import { props as styleProps } from "@kirana-style/core"
import {
  DisclosurePanel as AccordionContentPrimitive,
  Heading as AccordionHeaderPrimitive,
  Disclosure as AccordionItemPrimitive,
  DisclosureGroup as AccordionPrimitive,
  Button as AccordionTriggerPrimitive,
} from "react-aria-components"
import type {
  ButtonProps,
  DisclosureGroupProps,
  DisclosurePanelProps,
  DisclosureProps,
} from "react-aria-components"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
import type { Sx } from "../../../lib/sx"
import { accordion } from "../../../styles/accordion.styles"

function Accordion({
  sx,
  ...props
}: Omit<DisclosureGroupProps, "className" | "style"> & { sx?: Sx }) {
  return (
    <AccordionPrimitive
      data-slot="accordion"
      {...props}
      {...styleProps(accordion.root, sx)}
    />
  )
}

function AccordionItem({
  sx,
  ...props
}: Omit<DisclosureProps, "className" | "style"> & { sx?: Sx }) {
  return (
    <AccordionItemPrimitive
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
}: Omit<ButtonProps, "children" | "className" | "style"> & {
  children: React.ReactNode
  sx?: Sx
}) {
  return (
    <AccordionHeaderPrimitive {...styleProps(accordion.header)}>
      <AccordionTriggerPrimitive
        slot="trigger"
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
      </AccordionTriggerPrimitive>
    </AccordionHeaderPrimitive>
  )
}

function AccordionContent({
  sx,
  children,
  ...props
}: Omit<DisclosurePanelProps, "className" | "style"> & { sx?: Sx }) {
  return (
    <AccordionContentPrimitive
      data-slot="accordion-content"
      {...props}
      {...styleProps(accordion.content, accordion.contentAria)}
    >
      <div sx={[accordion.contentInner, sx]}>{children}</div>
    </AccordionContentPrimitive>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
