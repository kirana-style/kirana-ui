import * as React from "react"
import { props as styleProps } from "@kirana-style/core"

import { Button } from "./button"
import { IconPlaceholder } from "../../../icons/icon-placeholder"
import type { Sx } from "../../../lib/sx"
import { pagination } from "../../../styles/pagination.styles"
import { visuallyHidden } from "../../../styles/visually-hidden.styles"

function Pagination({
  sx,
  ...props
}: Omit<React.ComponentProps<"nav">, "className"> & { sx?: Sx }) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      {...props}
      sx={[pagination.root, sx]}
    />
  )
}

function PaginationContent({
  sx,
  ...props
}: Omit<React.ComponentProps<"ul">, "className"> & { sx?: Sx }) {
  return (
    <ul
      data-slot="pagination-content"
      {...props}
      sx={[pagination.content, sx]}
    />
  )
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />
}

type PaginationLinkProps = {
  isActive?: boolean
  sx?: Sx
} & Pick<React.ComponentProps<typeof Button>, "size"> &
  Omit<React.ComponentProps<"a">, "className">

function PaginationLink({
  sx,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) {
  return (
    <Button
      variant={isActive ? "outline" : "ghost"}
      size={size}
      sx={sx}
      nativeButton={false}
      render={
        <a
          aria-current={isActive ? "page" : undefined}
          data-slot="pagination-link"
          data-active={isActive}
          {...props}
        />
      }
    />
  )
}

function PaginationPrevious({
  sx,
  text = "Previous",
  ...props
}: React.ComponentProps<typeof PaginationLink> & { text?: string }) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      sx={[pagination.previous, sx]}
      {...props}
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
      <span sx={pagination.text}>{text}</span>
    </PaginationLink>
  )
}

function PaginationNext({
  sx,
  text = "Next",
  ...props
}: React.ComponentProps<typeof PaginationLink> & { text?: string }) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      sx={[pagination.next, sx]}
      {...props}
    >
      <span sx={pagination.text}>{text}</span>
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

function PaginationEllipsis({
  sx,
  ...props
}: Omit<React.ComponentProps<"span">, "className"> & { sx?: Sx }) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      {...props}
      sx={[pagination.ellipsis, sx]}
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

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}
