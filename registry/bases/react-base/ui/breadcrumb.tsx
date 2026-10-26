import * as React from "react"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { props as styleProps } from "@kirana-style/core"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
import type { Sx } from "../../../lib/sx"
import { breadcrumb } from "../../../styles/breadcrumb.styles"
import { visuallyHidden } from "../../../styles/visually-hidden.styles"

type El<T extends "nav" | "ol" | "li" | "span"> = Omit<
  React.ComponentProps<T>,
  "className"
> & { sx?: Sx }

function Breadcrumb({ sx, ...props }: El<"nav">) {
  return (
    <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} sx={sx} />
  )
}

function BreadcrumbList({ sx, ...props }: El<"ol">) {
  return (
    <ol data-slot="breadcrumb-list" {...props} sx={[breadcrumb.list, sx]} />
  )
}

function BreadcrumbItem({ sx, ...props }: El<"li">) {
  return (
    <li data-slot="breadcrumb-item" {...props} sx={[breadcrumb.item, sx]} />
  )
}

function BreadcrumbLink({
  sx,
  render,
  ...props
}: Omit<useRender.ComponentProps<"a">, "className"> & { sx?: Sx }) {
  return useRender({
    defaultTagName: "a",
    props: mergeProps<"a">(styleProps(breadcrumb.link, sx), props),
    render,
    state: { slot: "breadcrumb-link" },
  })
}

function BreadcrumbPage({ sx, ...props }: El<"span">) {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      {...props}
      sx={[breadcrumb.page, sx]}
    />
  )
}

function BreadcrumbSeparator({ children, sx, ...props }: El<"li">) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      {...props}
      sx={[breadcrumb.separator, sx]}
    >
      {children ?? (
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

function BreadcrumbEllipsis({ sx, ...props }: El<"span">) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      {...props}
      sx={[breadcrumb.ellipsis, sx]}
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

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}
