import { omit } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import {
  Accordion as AccordionPrimitive,
  AccordionHeader,
  AccordionItem as AccordionItemPrimitive,
  AccordionPanel,
  AccordionTrigger as AccordionTriggerPrimitive,
} from "@ui-sdk/solid/accordion"
import type { JSX } from "@solidjs/web"
import type { Sx } from "@kirana-style/core"

import { UisdkPart } from "../../../lib/solid2/uisdk-part"
import type { AsChild } from "../../../lib/solid2/uisdk-part"
import { accordion } from "../../../styles/accordion.styles"
import { IconPlaceholder } from "./icon-placeholder"

/**
 * ui-sdk's accordion, taking Solid's Ark UI parts' props: `value`, `defaultValue`, `multiple`, and
 * `onValueChange` called with `{ value }`. A closed panel leaves the page, as Base UI's does.
 */
function Accordion(props: {
  multiple?: boolean
  defaultValue?: string[]
  value?: string[]
  onValueChange?: (details: { value: string[] }) => void
  asChild?: AsChild
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "onValueChange", "asChild", "class", "sx")
  return (
    <UisdkPart
      part={AccordionPrimitive}
      slotName="accordion"
      asChild={props.asChild}
      {...rest}
      onValueChange={(value: string[]) => props.onValueChange?.({ value })}
      {...styleProps(props.class, accordion.root, props.sx)}
    />
  )
}

/** ui-sdk's panel, its height Base UI's `--accordion-panel-height`, held by the inner part. */
function AccordionContent(props: {
  asChild?: AsChild
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "asChild", "class", "sx", "children")
  return (
    <UisdkPart
      part={AccordionPanel}
      slotName="accordion-content"
      asChild={props.asChild}
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
    </UisdkPart>
  )
}

function AccordionItem(props: {
  value: string
  disabled?: boolean
  asChild?: AsChild
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "asChild", "class", "sx")
  return (
    <UisdkPart
      part={AccordionItemPrimitive}
      slotName="accordion-item"
      asChild={props.asChild}
      {...rest}
      {...styleProps(props.class, accordion.item, props.sx)}
    />
  )
}

/** ui-sdk's header (an `h3`) around the trigger, as Base UI's. */
function AccordionTrigger(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "class", "sx", "children")
  return (
    <AccordionHeader {...styleProps(accordion.header)}>
      <UisdkPart
        part={AccordionTriggerPrimitive}
        slotName="accordion-trigger"
        tag="button"
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
      </UisdkPart>
    </AccordionHeader>
  )
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger }
