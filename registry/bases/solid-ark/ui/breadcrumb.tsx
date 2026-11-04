import { splitProps } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import { breadcrumb } from "../../../styles/breadcrumb.styles"
import { IconPlaceholder } from "./icon-placeholder"
import { visuallyHidden } from "../../../styles/visually-hidden.styles"
import { ark } from "@ark-ui/solid"
import type { JSX } from "solid-js"
import type { Sx } from "@kirana-style/core"
import type { PolymorphicProps } from "@ark-ui/solid"

function Breadcrumb(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <nav
      data-slot="breadcrumb"
      aria-label="breadcrumb"
      {...rest}
      {...styleProps(local.class, local.sx)}
    >
      {local.children}
    </nav>
  )
}

function BreadcrumbEllipsis(props: {
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx"])
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      {...rest}
      {...styleProps(local.class, breadcrumb.ellipsis, local.sx)}
    >
      <IconPlaceholder
        lucide="MoreHorizontalIcon"
        tabler="IconDots"
        hugeicons="MoreHorizontalCircle01Icon"
        phosphor="DotsThreeIcon"
        remixicon="RiMoreLine"
      />
      <span sx={visuallyHidden}>More</span>
    </span>
  )
}

function BreadcrumbItem(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <li
      data-slot="breadcrumb-item"
      {...rest}
      {...styleProps(local.class, breadcrumb.item, local.sx)}
    >
      {local.children}
    </li>
  )
}

function BreadcrumbLink(props: {
  asChild?: PolymorphicProps<"a">["asChild"]
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
    <ark.a
      data-slot="breadcrumb-link"
      {...rest}
      {...styleProps(local.class, breadcrumb.link, local.sx)}
      asChild={local.asChild}
    >
      {local.children}
    </ark.a>
  )
}

function BreadcrumbList(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <ol
      data-slot="breadcrumb-list"
      {...rest}
      {...styleProps(local.class, breadcrumb.list, local.sx)}
    >
      {local.children}
    </ol>
  )
}

function BreadcrumbPage(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      {...rest}
      {...styleProps(local.class, breadcrumb.page, local.sx)}
    >
      {local.children}
    </span>
  )
}

function BreadcrumbSeparator(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      {...rest}
      {...styleProps(local.class, breadcrumb.separator, local.sx)}
    >
      {local.children ? (
        local.children
      ) : (
        <IconPlaceholder
          lucide="ChevronRightIcon"
          tabler="IconChevronRight"
          hugeicons="ArrowRight01Icon"
          phosphor="CaretRightIcon"
          remixicon="RiArrowRightSLine"
        />
      )}
    </li>
  )
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}
