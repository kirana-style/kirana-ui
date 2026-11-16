/**
 * The table's columns, React's `columnHelper.columns([...])`: each cell a component of its own,
 * rendered with `h()`, which TanStack's `FlexRender` draws.
 */
import { h } from "vue"

import { columnHelper } from "./data-table"
import DragHandle from "./DragHandle.vue"
import EditableCell from "./EditableCell.vue"
import NumberHeader from "./NumberHeader.vue"
import ReviewerCell from "./ReviewerCell.vue"
import RowActions from "./RowActions.vue"
import SelectCell from "./SelectCell.vue"
import StatusCell from "./StatusCell.vue"
import TableCellViewer from "./TableCellViewer.vue"
import TypeCell from "./TypeCell.vue"

export const columns = columnHelper.columns([
  columnHelper.display({
    id: "drag",
    header: () => null,
    cell: () => h(DragHandle),
  }),
  columnHelper.display({
    id: "select",
    header: ({ table }) =>
      h(SelectCell, {
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
      h(SelectCell, {
        checked: row.getIsSelected(),
        label: "Select row",
        onToggle: (value: boolean) => row.toggleSelected(value),
      }),
    enableSorting: false,
    enableHiding: false,
  }),
  columnHelper.accessor("header", {
    header: "Header",
    cell: ({ row }) => h(TableCellViewer, { item: row.original }),
    enableHiding: false,
  }),
  columnHelper.accessor("type", {
    header: "Section Type",
    cell: ({ row }) => h(TypeCell, { type: row.original.type }),
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: ({ row }) => h(StatusCell, { status: row.original.status }),
  }),
  columnHelper.accessor("target", {
    header: () => h(NumberHeader, { field: "target" }),
    cell: ({ row }) => h(EditableCell, { item: row.original, field: "target" }),
  }),
  columnHelper.accessor("limit", {
    header: () => h(NumberHeader, { field: "limit" }),
    cell: ({ row }) => h(EditableCell, { item: row.original, field: "limit" }),
  }),
  columnHelper.accessor("reviewer", {
    header: "Reviewer",
    cell: ({ row }) => h(ReviewerCell, { item: row.original }),
  }),
  columnHelper.display({
    id: "actions",
    cell: () => h(RowActions),
  }),
])
