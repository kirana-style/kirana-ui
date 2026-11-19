import { splitProps } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import { Accordion as AccordionPrimitive } from "@kirana-ui/solid/accordion"
import { asRender } from "../../../lib/solid/element"
import { accordion } from "../../../styles/accordion.styles"
import { IconPlaceholder } from "./icon-placeholder"
import type { JSX } from "solid-js"
import type { Sx } from "@kirana-style/core"
import type { AsChild } from "../../../lib/solid/element"

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
  const [local, rest] = splitProps(props, [
    "onValueChange",
    "asChild",
    "class",
    "sx",
    "children",
  ])
  return (
    <AccordionPrimitive.Root
      render={asRender(local.asChild)}
      data-slot="accordion"
      {...rest}
      onValueChange={(value: unknown[]) =>
        local.onValueChange?.({ value: value as string[] })
      }
      {...styleProps(local.class, accordion.root, local.sx)}
    >
      {local.children}
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
  const [local, rest] = splitProps(props, [
    "asChild",
    "class",
    "sx",
    "children",
  ])
  // Base UI's panel variables, which Kirana UI's panel writes, as React's part reads them.
  return (
    <AccordionPrimitive.Panel
      render={asRender(local.asChild)}
      data-slot="accordion-content"
      {...rest}
      {...styleProps(accordion.content, accordion.contentBase)}
    >
      <div
        {...styleProps(
          local.class,
          accordion.contentInner,
          accordion.contentInnerBase,
          local.sx
        )}
      >
        {local.children}
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
  const [local, rest] = splitProps(props, [
    "value",
    "asChild",
    "class",
    "sx",
    "children",
  ])
  // Ark's required `value` is declared here and passed on, so a project's type checker sees it.
  return (
    <AccordionPrimitive.Item
      render={asRender(local.asChild)}
      data-slot="accordion-item"
      value={local.value}
      {...rest}
      {...styleProps(local.class, accordion.item, local.sx)}
    >
      {local.children}
    </AccordionPrimitive.Item>
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
    <AccordionPrimitive.Header {...styleProps(accordion.header)}>
      <AccordionPrimitive.Trigger
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
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger }
