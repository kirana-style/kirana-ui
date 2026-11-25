import { omit } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import { Accordion as AccordionPrimitive } from "@kirana-ui/solid/accordion"
import { asRender } from "../../../lib/solid2/element"
import { accordion } from "../../../styles/accordion.styles"
import { IconPlaceholder } from "./icon-placeholder"
import type { JSX } from "@solidjs/web"
import type { Sx } from "@kirana-style/core"
import type { AsChild } from "../../../lib/solid2/element"

/**
 * Kirana UI's accordion, with Solid's Ark UI part's props: `multiple`, and a value that is always
 * a list (`defaultValue`, `value`, `onValueChange({ value })`), as Kirana UI's is. A closed
 * panel leaves the page, as Ark UI's `lazyMount` and `unmountOnExit` had it.
 */
function Accordion(props: {
  defaultValue?: string[]
  value?: string[]
  onValueChange?: (details: { value: string[] }) => void
  asChild?: AsChild<"div">
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(
    props,
    "onValueChange",
    "asChild",
    "class",
    "sx",
    "children"
  )
  return (
    <AccordionPrimitive.Root
      render={asRender(props.asChild)}
      data-slot="accordion"
      {...rest}
      onValueChange={(value: unknown[]) =>
        props.onValueChange?.({ value: value as string[] })
      }
      {...styleProps(props.class, accordion.root, props.sx)}
    >
      {props.children}
    </AccordionPrimitive.Root>
  )
}

function AccordionContent(props: {
  asChild?: AsChild<"div">
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "asChild", "class", "sx", "children")
  // Base UI's panel variables, which Kirana UI's panel writes, as React's part reads them.
  return (
    <AccordionPrimitive.Panel
      render={asRender(props.asChild)}
      data-slot="accordion-content"
      {...rest}
      {...styleProps(accordion.content, accordion.contentBase)}
    >
      <div
        {...styleProps(
          props.class,
          accordion.contentInner,
          accordion.contentInnerBase,
          props.sx
        )}
      >
        {props.children}
      </div>
    </AccordionPrimitive.Panel>
  )
}

function AccordionItem(props: {
  value: string
  asChild?: AsChild<"div">
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "value", "asChild", "class", "sx", "children")
  // Ark's required `value` is declared here and passed on, so a project's type checker sees it.
  return (
    <AccordionPrimitive.Item
      render={asRender(props.asChild)}
      data-slot="accordion-item"
      value={props.value}
      {...rest}
      {...styleProps(props.class, accordion.item, props.sx)}
    >
      {props.children}
    </AccordionPrimitive.Item>
  )
}

function AccordionTrigger(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "class", "sx", "children")
  return (
    <AccordionPrimitive.Header {...styleProps(accordion.header)}>
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        {...rest}
        {...styleProps(props.class, accordion.trigger, props.sx)}
      >
        {props.children}
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

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger }
