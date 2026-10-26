"use client"

import * as React from "react"
import { props as styleProps } from "@kirana-style/core"
import {
  Breadcrumb as BreadcrumbPrimitive,
  Breadcrumbs as BreadcrumbsPrimitive,
  composeRenderProps,
  Link as LinkPrimitive,
} from "react-aria-components"
import type {
  BreadcrumbProps,
  BreadcrumbsProps,
  LinkProps,
} from "react-aria-components"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
import type { Sx } from "../../../lib/sx"
import { breadcrumb } from "../../../styles/breadcrumb.styles"
import { visuallyHidden } from "../../../styles/visually-hidden.styles"

type El<T extends "nav" | "span"> = Omit<
  React.ComponentProps<T>,
  "className"
> & { sx?: Sx }

function Breadcrumb({ sx, ...props }: El<"nav">) {
  return (
    <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} sx={sx} />
  )
}

function BreadcrumbList<T extends object>({
  sx,
  ...props
}: Omit<BreadcrumbsProps<T>, "className" | "style"> & { sx?: Sx }) {
  return (
    <BreadcrumbsPrimitive
      data-slot="breadcrumb-list"
      {...props}
      {...styleProps(breadcrumb.list, sx)}
    />
  )
}

/** A crumb, and the separator after it unless it is the current page's. */
function BreadcrumbItem({
  sx,
  children,
  separatorSx,
  ...props
}: Omit<BreadcrumbProps, "className" | "style"> & {
  sx?: Sx
  separatorSx?: Sx
}) {
  return (
    <BreadcrumbPrimitive
      data-slot="breadcrumb-item"
      {...props}
      {...styleProps(breadcrumb.item, sx)}
    >
      {composeRenderProps(children, (crumb, { isCurrent }) => (
        <>
          {crumb}
          {!isCurrent && (
            <span
              data-slot="breadcrumb-separator"
              role="presentation"
              aria-hidden="true"
              sx={[breadcrumb.separator, separatorSx]}
            >
              <IconPlaceholder
                lucide="ChevronRightIcon"
                tabler="IconChevronRight"
                hugeicons="ArrowRight01Icon"
                phosphor="CaretRightIcon"
                remixicon="RiArrowRightSLine"
              />
            </span>
          )}
        </>
      ))}
    </BreadcrumbPrimitive>
  )
}

function BreadcrumbLink({
  sx,
  ...props
}: Omit<LinkProps, "className" | "style"> & { sx?: Sx }) {
  return (
    <LinkPrimitive
      data-slot="breadcrumb-link"
      {...props}
      {...styleProps(breadcrumb.link, sx)}
    />
  )
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
  BreadcrumbEllipsis,
}
