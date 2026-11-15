"use client"

import * as React from "react"

import type { Sx } from "../../../lib/sx"
import { table } from "../../../styles/table.styles"

type El<T extends keyof React.JSX.IntrinsicElements> = Omit<
  React.ComponentProps<T>,
  "className"
> & { sx?: Sx }

function Table({ sx, ...props }: El<"table">) {
  return (
    <div data-slot="table-container" sx={table.container}>
      <table data-slot="table" {...props} sx={[table.root, sx]} />
    </div>
  )
}

function TableHeader({ sx, ...props }: El<"thead">) {
  return <thead data-slot="table-header" {...props} sx={[table.header, sx]} />
}

function TableBody({ sx, ...props }: El<"tbody">) {
  return <tbody data-slot="table-body" {...props} sx={[table.body, sx]} />
}

function TableFooter({ sx, ...props }: El<"tfoot">) {
  return <tfoot data-slot="table-footer" {...props} sx={[table.footer, sx]} />
}

function TableRow({ sx, ...props }: El<"tr">) {
  return <tr data-slot="table-row" {...props} sx={[table.row, sx]} />
}

function TableHead({ sx, ...props }: El<"th">) {
  return <th data-slot="table-head" {...props} sx={[table.head, sx]} />
}

function TableCell({ sx, ...props }: El<"td">) {
  return <td data-slot="table-cell" {...props} sx={[table.cell, sx]} />
}

function TableCaption({ sx, ...props }: El<"caption">) {
  return (
    <caption data-slot="table-caption" {...props} sx={[table.caption, sx]} />
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
