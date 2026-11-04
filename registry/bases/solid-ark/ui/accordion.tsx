import { splitProps } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import {
  AccordionItem as ArkAccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "@ark-ui/solid"
import { accordion } from "../../../styles/accordion.styles"
import { IconPlaceholder } from "./icon-placeholder"
import type { JSX } from "solid-js"
import type { Sx } from "@kirana-style/core"
import type {
  AccordionItemContentProps,
  AccordionItemProps,
  AccordionRootProps,
} from "@ark-ui/solid"

function Accordion(props: {
  asChild?: AccordionRootProps["asChild"]
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, [
    "asChild",
    "class",
    "sx",
    "children",
  ])
  return (
    <AccordionRoot
      asChild={local.asChild}
      data-slot="accordion"
      lazyMount
      unmountOnExit
      {...rest}
      {...styleProps(local.class, accordion.root, local.sx)}
    >
      {local.children}
    </AccordionRoot>
  )
}

function AccordionContent(props: {
  asChild?: AccordionItemContentProps["asChild"]
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, [
    "asChild",
    "class",
    "sx",
    "children",
  ])
  return (
    <AccordionItemContent
      asChild={local.asChild}
      data-slot="accordion-content"
      {...rest}
      {...styleProps(accordion.content, accordion.contentArk)}
    >
      <div {...styleProps(local.class, accordion.contentInner, local.sx)}>
        {local.children}
      </div>
    </AccordionItemContent>
  )
}

function AccordionItem(props: {
  value: string
  asChild?: AccordionItemProps["asChild"]
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, [
    "value",
    "asChild",
    "class",
    "sx",
    "children",
  ])
  // Ark's required `value` is declared here and passed on, so a project's type checker sees it.
  return (
    <ArkAccordionItem
      asChild={local.asChild}
      data-slot="accordion-item"
      value={local.value}
      {...rest}
      {...styleProps(local.class, accordion.item, local.sx)}
    >
      {local.children}
    </ArkAccordionItem>
  )
}

function AccordionTrigger(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <h3 sx={accordion.header}>
      <AccordionItemTrigger
        data-slot="accordion-trigger"
        {...rest}
        {...styleProps(local.class, accordion.trigger, local.sx)}
      >
        {local.children}
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
      </AccordionItemTrigger>
    </h3>
  )
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger }
