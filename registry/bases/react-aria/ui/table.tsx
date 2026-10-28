"use client"

import * as React from "react"
import { props as styleProps } from "@kirana-style/core"
import {
  Cell as CellPrimitive,
  Column as ColumnPrimitive,
  Row as RowPrimitive,
  TableBody as TableBodyPrimitive,
  TableFooter as TableFooterPrimitive,
  TableHeader as TableHeaderPrimitive,
  Table as TablePrimitive,
} from "react-aria-components"
import type {
  CellProps,
  ColumnProps,
  RowProps,
  TableBodyProps,
  TableFooterProps,
  TableHeaderProps,
  TableProps,
} from "react-aria-components"

import type { Sx } from "../../../lib/sx"
import { table } from "../../../styles/table.styles"

type Styled<P> = Omit<P, "className" | "style"> & { sx?: Sx }

function Table({ sx, ...props }: Styled<TableProps>) {
  return (
    <div data-slot="table-container" sx={table.container}>
      <TablePrimitive
        data-slot="table"
        {...props}
        {...styleProps(table.root, sx)}
      />
    </div>
  )
}

function TableHeader<T>({ sx, ...props }: Styled<TableHeaderProps<T>>) {
  return (
    <TableHeaderPrimitive
      data-slot="table-header"
      {...props}
      {...styleProps(table.header, sx)}
    />
  )
}

function TableBody<T>({ sx, ...props }: Styled<TableBodyProps<T>>) {
  return (
    <TableBodyPrimitive
      data-slot="table-body"
      {...props}
      {...styleProps(table.body, sx)}
    />
  )
}

function TableFooter<T>({ sx, ...props }: Styled<TableFooterProps<T>>) {
  return (
    <TableFooterPrimitive
      data-slot="table-footer"
      {...props}
      {...styleProps(table.footer, sx)}
    />
  )
}

function TableRow<T>({ sx, ...props }: Styled<RowProps<T>>) {
  return (
    <RowPrimitive
      data-slot="table-row"
      {...props}
      {...styleProps(table.row, sx)}
    />
  )
}

function TableHead({ sx, ...props }: Styled<ColumnProps>) {
  return (
    <ColumnPrimitive
      data-slot="table-head"
      {...props}
      {...styleProps(table.head, sx)}
    />
  )
}

function TableCell({ sx, ...props }: Styled<CellProps>) {
  return (
    <CellPrimitive
      data-slot="table-cell"
      {...props}
      {...styleProps(table.cell, sx)}
    />
  )
}

function TableCaption({
  sx,
  ...props
}: Omit<React.ComponentProps<"figcaption">, "className"> & { sx?: Sx }) {
  return (
    <figcaption
      data-slot="table-caption"
      {...props}
      sx={[table.caption, table.figcaption, sx]}
    />
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
