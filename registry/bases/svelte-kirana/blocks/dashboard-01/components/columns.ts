/**
 * The table's columns, React's `columnHelper.columns([...])`: each cell a component of its own,
 * rendered with TanStack's `renderComponent`, which its `FlexRender` draws.
 */
import { renderComponent } from "@tanstack/svelte-table"

import { columnHelper } from "./data-table"
import DragHandle from "./DragHandle.svelte"
import EditableCell from "./EditableCell.svelte"
import NumberHeader from "./NumberHeader.svelte"
import ReviewerCell from "./ReviewerCell.svelte"
import RowActions from "./RowActions.svelte"
import SelectCell from "./SelectCell.svelte"
import StatusCell from "./StatusCell.svelte"
import TableCellViewer from "./TableCellViewer.svelte"
import TypeCell from "./TypeCell.svelte"

export const columns = columnHelper.columns([
  columnHelper.display({
    id: "drag",
    header: () => null,
    cell: () => renderComponent(DragHandle),
  }),
  columnHelper.display({
    id: "select",
    header: ({ table }) =>
      renderComponent(SelectCell, {
        header: true,
        checked: table.getIsAllPageRowsSelected()
          ? true
          : table.getIsSomePageRowsSelected()
            ? "indeterminate"
            : false,
        label: "Select all",
        onToggle: (value: boolean) => table.toggleAllPageRowsSelected(value),
      }),
    cell: ({ row }) =>
      renderComponent(SelectCell, {
        checked: row.getIsSelected(),
        label: "Select row",
        onToggle: (value: boolean) => row.toggleSelected(value),
      }),
    enableSorting: false,
    enableHiding: false,
  }),
  columnHelper.accessor("header", {
    header: "Header",
    cell: ({ row }) => renderComponent(TableCellViewer, { item: row.original }),
    enableHiding: false,
  }),
  columnHelper.accessor("type", {
    header: "Section Type",
    cell: ({ row }) => renderComponent(TypeCell, { type: row.original.type }),
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: ({ row }) =>
      renderComponent(StatusCell, { status: row.original.status }),
  }),
  columnHelper.accessor("target", {
    header: () => renderComponent(NumberHeader, { field: "target" }),
    cell: ({ row }) =>
      renderComponent(EditableCell, { item: row.original, field: "target" }),
  }),
  columnHelper.accessor("limit", {
    header: () => renderComponent(NumberHeader, { field: "limit" }),
    cell: ({ row }) =>
      renderComponent(EditableCell, { item: row.original, field: "limit" }),
  }),
  columnHelper.accessor("reviewer", {
    header: "Reviewer",
    cell: ({ row }) => renderComponent(ReviewerCell, { item: row.original }),
  }),
  columnHelper.display({
    id: "actions",
    cell: () => renderComponent(RowActions),
  }),
])
