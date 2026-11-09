import {
  createContext,
  createSignal,
  splitProps,
  untrack,
  useContext,
} from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import { trace } from "../../../styles/trace.styles"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./collapsible"
import { IconPlaceholder } from "./icon-placeholder"
import type { JSX } from "solid-js"
import type { Sx } from "@kirana-style/core"

function Trace(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <div
      data-slot="trace"
      {...rest}
      {...styleProps(local.class, trace.root, local.sx)}
    >
      {local.children}
    </div>
  )
}

/** Whether a Trace collapsible's content stays in the page while closed (its `keepMounted`). */
const KeepMounted = createContext<(keep: boolean) => void>()

function TraceCollapsible(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  // Its content asks to stay in the page while closed (`keepMounted`, Base UI's panel's): Ark
  // mounts from the root, so the root lets it.
  const [keepMounted, setKeepMounted] = createSignal(false)
  return (
    <Collapsible
      data-slot="trace-collapsible"
      lazyMount={!keepMounted()}
      unmountOnExit={!keepMounted()}
      {...rest}
      class={local.class}
      sx={[trace.collapsible, local.sx]}
    >
      <KeepMounted.Provider value={setKeepMounted}>
        {local.children}
      </KeepMounted.Provider>
    </Collapsible>
  )
}

function TraceCollapsibleContent(props: {
  /** In the page while closed, `hidden`, as Base UI's panel with its `keepMounted`. */
  keepMounted?: boolean
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, [
    "keepMounted",
    "class",
    "sx",
    "children",
  ])
  // Read once, as the root mounts from it.
  if (untrack(() => local.keepMounted)) useContext(KeepMounted)?.(true)
  return (
    <CollapsibleContent
      data-slot="trace-collapsible-content"
      {...rest}
      sx={[trace.content, trace.contentArk]}
    >
      <div
        data-slot="trace-collapsible-content-inner"
        {...styleProps(local.class, trace.contentInner, local.sx)}
      >
        {local.children}
      </div>
    </CollapsibleContent>
  )
}

function TraceCollapsibleTrigger(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <CollapsibleTrigger
      data-slot="trace-collapsible-trigger"
      {...rest}
      class={local.class}
      sx={[trace.trigger, local.sx]}
    >
      {local.children}
      <TraceIcon sx={trace.chevron}>
        <IconPlaceholder
          lucide="ChevronRightIcon"
          tabler="IconChevronRight"
          hugeicons="ArrowRight01Icon"
          phosphor="CaretRightIcon"
          remixicon="RiArrowRightSLine"
        />
      </TraceIcon>
    </CollapsibleTrigger>
  )
}

function TraceDescription(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <span
      data-slot="trace-description"
      {...rest}
      {...styleProps(local.class, trace.description, local.sx)}
    >
      {local.children}
    </span>
  )
}

function TraceIcon(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <span
      data-slot="trace-icon"
      aria-hidden="true"
      {...rest}
      {...styleProps(local.class, trace.icon, local.sx)}
    >
      {local.children}
    </span>
  )
}

function TraceLine(props: {
  status?: "running" | "error" | "pending"
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["status", "class", "sx", "children"])
  return (
    <span
      data-slot="trace-line"
      data-status={local.status}
      {...rest}
      {...styleProps(local.class, trace.line, local.sx)}
    >
      {local.children}
    </span>
  )
}

function TraceTitle(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <span
      data-slot="trace-title"
      {...rest}
      {...styleProps(local.class, trace.title, local.sx)}
    >
      {local.children}
    </span>
  )
}

export {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceDescription,
  TraceIcon,
  TraceLine,
  TraceTitle,
}
