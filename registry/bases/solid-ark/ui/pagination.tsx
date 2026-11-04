import { mergeProps, splitProps } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import { pagination } from "../../../styles/pagination.styles"
import { IconPlaceholder } from "./icon-placeholder"
import { visuallyHidden } from "../../../styles/visually-hidden.styles"
import { Button } from "./button"
import type { JSX } from "solid-js"
import type { Sx } from "@kirana-style/core"
import type { button } from "../../../styles/button.styles"

function Pagination(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      {...rest}
      {...styleProps(local.class, pagination.root, local.sx)}
    >
      {local.children}
    </nav>
  )
}

function PaginationContent(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <ul
      data-slot="pagination-content"
      {...rest}
      {...styleProps(local.class, pagination.content, local.sx)}
    >
      {local.children}
    </ul>
  )
}

function PaginationEllipsis(props: {
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx"])
  return (
    <span
      aria-hidden="true"
      data-slot="pagination-ellipsis"
      {...rest}
      {...styleProps(local.class, pagination.ellipsis, local.sx)}
    >
      <IconPlaceholder
        lucide="MoreHorizontalIcon"
        tabler="IconDots"
        hugeicons="MoreHorizontalCircle01Icon"
        phosphor="DotsThreeIcon"
        remixicon="RiMoreLine"
      />
      <span sx={visuallyHidden}>More pages</span>
    </span>
  )
}

function PaginationItem(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <li
      data-slot="pagination-item"
      {...rest}
      {...styleProps(local.class, local.sx)}
    >
      {local.children}
    </li>
  )
}

type ButtonVariants = NonNullable<Parameters<typeof button>[0]>

function PaginationLink(props: {
  isActive?: boolean
  size?: ButtonVariants["size"]
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(
    mergeProps({ isActive: false, size: "icon" } as const, props),
    ["isActive", "size", "class", "sx", "children"]
  )
  return (
    <Button
      variant={local.isActive ? "outline" : "ghost"}
      size={local.size}
      labelText={false}
      class={local.class}
      sx={[local.sx]}
      asChild={(childProps) => (
        <a
          {...childProps()}
          aria-current={local.isActive ? "page" : undefined}
          data-slot="pagination-link"
          data-active={local.isActive || undefined}
          {...rest}
        >
          {local.children}
        </a>
      )}
    />
  )
}

function PaginationNext(props: {
  text?: string
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(
    mergeProps({ text: "Next" } as const, props),
    ["text", "class", "sx"]
  )
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      {...rest}
      class={local.class}
      sx={[pagination.next, local.sx]}
    >
      <span sx={pagination.text}>{local.text}</span>
      <IconPlaceholder
        lucide="ChevronRightIcon"
        tabler="IconChevronRight"
        hugeicons="ArrowRight01Icon"
        phosphor="CaretRightIcon"
        remixicon="RiArrowRightSLine"
        data-icon="inline-end"
        {...styleProps(pagination.flip)}
      />
    </PaginationLink>
  )
}

function PaginationPrevious(props: {
  text?: string
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(
    mergeProps({ text: "Previous" } as const, props),
    ["text", "class", "sx"]
  )
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      {...rest}
      class={local.class}
      sx={[pagination.previous, local.sx]}
    >
      <IconPlaceholder
        lucide="ChevronLeftIcon"
        tabler="IconChevronLeft"
        hugeicons="ArrowLeft01Icon"
        phosphor="CaretLeftIcon"
        remixicon="RiArrowLeftSLine"
        data-icon="inline-start"
        {...styleProps(pagination.flip)}
      />
      <span sx={pagination.text}>{local.text}</span>
    </PaginationLink>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}
