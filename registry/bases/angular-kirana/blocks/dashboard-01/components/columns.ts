/**
 * The table's columns, React's `columnHelper.columns([...])`: each cell a component of its own,
 * given its inputs and outputs through TanStack's `flexRenderComponent`, which `FlexRender` draws.
 */
import { flexRenderComponent } from "@tanstack/angular-table"

import { DragHandle } from "./drag-handle"
import { EditableCell } from "./editable-cell"
import { NumberHeader } from "./number-header"
import { ReviewerCell } from "./reviewer-cell"
import { RowActions } from "./row-actions"
import { SelectCell } from "./select-cell"
import { StatusCell } from "./status-cell"
import { columnHelper } from "./table"
import { TableCellViewer } from "./table-cell-viewer"
import { TypeCell } from "./type-cell"

export const columns = columnHelper.columns([
  columnHelper.display({
    id: "drag",
    header: () => null,
    cell: () => flexRenderComponent(DragHandle),
  }),
  columnHelper.display({
    id: "select",
    header: ({ table }) =>
      flexRenderComponent(SelectCell, {
        inputs: {
          header: true,
          checked: table.getIsAllPageRowsSelected()
            ? true
            : table.getIsSomePageRowsSelected()
              ? "indeterminate"
              : false,
          label: "Select all",
        },
        outputs: {
          toggle: (value: boolean) => table.toggleAllPageRowsSelected(value),
        },
      }),
    cell: ({ row }) =>
      flexRenderComponent(SelectCell, {
        inputs: { checked: row.getIsSelected(), label: "Select row" },
        outputs: { toggle: (value: boolean) => row.toggleSelected(value) },
      }),
    enableSorting: false,
    enableHiding: false,
  }),
  columnHelper.accessor("header", {
    header: "Header",
    cell: ({ row }) =>
      flexRenderComponent(TableCellViewer, { inputs: { item: row.original } }),
    enableHiding: false,
  }),
  columnHelper.accessor("type", {
    header: "Section Type",
    cell: ({ row }) =>
      flexRenderComponent(TypeCell, { inputs: { type: row.original.type } }),
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: ({ row }) =>
      flexRenderComponent(StatusCell, {
        inputs: { status: row.original.status },
      }),
  }),
  columnHelper.accessor("target", {
    header: () =>
      flexRenderComponent(NumberHeader, { inputs: { field: "target" } }),
    cell: ({ row }) =>
      flexRenderComponent(EditableCell, {
        inputs: { item: row.original, field: "target" },
      }),
  }),
  columnHelper.accessor("limit", {
    header: () =>
      flexRenderComponent(NumberHeader, { inputs: { field: "limit" } }),
    cell: ({ row }) =>
      flexRenderComponent(EditableCell, {
        inputs: { item: row.original, field: "limit" },
      }),
  }),
  columnHelper.accessor("reviewer", {
    header: "Reviewer",
    cell: ({ row }) =>
      flexRenderComponent(ReviewerCell, { inputs: { item: row.original } }),
  }),
  columnHelper.display({
    id: "actions",
    cell: () => flexRenderComponent(RowActions),
  }),
])
