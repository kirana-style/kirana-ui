import { splitProps } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import { table } from "../../../styles/table.styles"
import type { JSX } from "solid-js"
import type { Sx } from "@kirana-style/core"

function Table(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <div data-slot="table-container" sx={table.container}>
      <table
        data-slot="table"
        {...rest}
        {...styleProps(local.class, table.root, local.sx)}
      >
        {local.children}
      </table>
    </div>
  )
}

function TableBody(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <tbody
      data-slot="table-body"
      {...rest}
      {...styleProps(local.class, table.body, local.sx)}
    >
      {local.children}
    </tbody>
  )
}

function TableCaption(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <caption
      data-slot="table-caption"
      {...rest}
      {...styleProps(local.class, table.caption, local.sx)}
    >
      {local.children}
    </caption>
  )
}

function TableCell(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <td
      data-slot="table-cell"
      {...rest}
      {...styleProps(local.class, table.cell, local.sx)}
    >
      {local.children}
    </td>
  )
}

function TableFooter(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <tfoot
      data-slot="table-footer"
      {...rest}
      {...styleProps(local.class, table.footer, local.sx)}
    >
      {local.children}
    </tfoot>
  )
}

function TableHead(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <th
      data-slot="table-head"
      {...rest}
      {...styleProps(local.class, table.head, local.sx)}
    >
      {local.children}
    </th>
  )
}

function TableHeader(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <thead
      data-slot="table-header"
      {...rest}
      {...styleProps(local.class, table.header, local.sx)}
    >
      {local.children}
    </thead>
  )
}

function TableRow(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["class", "sx", "children"])
  return (
    <tr
      data-slot="table-row"
      {...rest}
      {...styleProps(local.class, table.row, local.sx)}
    >
      {local.children}
    </tr>
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
}
