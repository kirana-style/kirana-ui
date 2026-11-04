/** The table's columns, React's `columnHelper.columns([...])`: each cell a component of its own. */
import { columnHelper } from "./table"
import { DragHandle } from "./drag-handle"
import { EditableCell } from "./editable-cell"
import { NumberHeader } from "./number-header"
import { ReviewerCell } from "./reviewer-cell"
import { RowActions } from "./row-actions"
import { SelectCell } from "./select-cell"
import { StatusCell } from "./status-cell"
import { TableCellViewer } from "./table-cell-viewer"
import { TypeCell } from "./type-cell"

export const columns = columnHelper.columns([
  columnHelper.display({
    id: "drag",
    header: () => null,
    cell: () => <DragHandle />,
  }),
  columnHelper.display({
    id: "select",
    header: ({ table }) => (
      <SelectCell
        header
        checked={
          table.getIsAllPageRowsSelected()
            ? true
            : table.getIsSomePageRowsSelected()
              ? "indeterminate"
              : false
        }
        label="Select all"
        onToggle={(value) => table.toggleAllPageRowsSelected(value)}
      />
    ),
    cell: ({ row }) => (
      <SelectCell
        checked={row.getIsSelected()}
        label="Select row"
        onToggle={(value) => row.toggleSelected(value)}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  }),
  columnHelper.accessor("header", {
    header: "Header",
    cell: ({ row }) => <TableCellViewer item={row.original} />,
    enableHiding: false,
  }),
  columnHelper.accessor("type", {
    header: "Section Type",
    cell: ({ row }) => <TypeCell type={row.original.type} />,
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: ({ row }) => <StatusCell status={row.original.status} />,
  }),
  columnHelper.accessor("target", {
    header: () => <NumberHeader field="target" />,
    cell: ({ row }) => <EditableCell item={row.original} field="target" />,
  }),
  columnHelper.accessor("limit", {
    header: () => <NumberHeader field="limit" />,
    cell: ({ row }) => <EditableCell item={row.original} field="limit" />,
  }),
  columnHelper.accessor("reviewer", {
    header: "Reviewer",
    cell: ({ row }) => <ReviewerCell item={row.original} />,
  }),
  columnHelper.display({
    id: "actions",
    cell: () => <RowActions />,
  }),
])
