import { For, createMemo, createSignal } from "solid-js"
import { css } from "@kirana-style/core"
import { Checkbox } from "../ui/checkbox"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import { fontWeight, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

export default function CheckboxTable() {
  const styles = {
    check: css({ width: space[8] }),
    medium: css({ fontWeight: fontWeight.medium }),
  }

  const tableData = [
    {
      id: "1",
      name: "Sarah Chen",
      email: "sarah.chen@example.com",
      role: "Admin",
    },
    {
      id: "2",
      name: "Marcus Rodriguez",
      email: "marcus.rodriguez@example.com",
      role: "User",
    },
    {
      id: "3",
      name: "Priya Patel",
      email: "priya.patel@example.com",
      role: "User",
    },
    {
      id: "4",
      name: "David Kim",
      email: "david.kim@example.com",
      role: "Editor",
    },
  ]

  const [selectedRows, setSelectedRows] = createSignal(new Set(["1"]))
  const selectAll = createMemo(() => selectedRows().size === tableData.length)

  // Ark reports `{ checked }`, `true`, `false` or `"indeterminate"`.
  const handleSelectAll = ({
    checked,
  }: {
    checked: boolean | "indeterminate"
  }) => {
    setSelectedRows(
      checked === true
        ? new Set(tableData.map((row) => row.id))
        : new Set<string>()
    )
  }

  const handleSelectRow = (id: string, checked: boolean) => {
    const next = new Set(selectedRows())
    if (checked) next.add(id)
    else next.delete(id)
    setSelectedRows(next)
  }

  return (
    <div sx={page.example}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead sx={styles.check}>
              <Checkbox
                id="select-all-checkbox"
                name="select-all-checkbox"
                checked={selectAll()}
                onCheckedChange={handleSelectAll}
              />
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <For each={tableData}>
            {(row) => (
              <TableRow
                data-state={selectedRows().has(row.id) ? "selected" : undefined}
              >
                <TableCell>
                  <Checkbox
                    id={`row-${row.id}-checkbox`}
                    name={`row-${row.id}-checkbox`}
                    checked={selectedRows().has(row.id)}
                    onCheckedChange={({
                      checked,
                    }: {
                      checked: boolean | "indeterminate"
                    }) => handleSelectRow(row.id, checked === true)}
                  />
                </TableCell>
                <TableCell sx={styles.medium}>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.role}</TableCell>
              </TableRow>
            )}
          </For>
        </TableBody>
      </Table>
    </div>
  )
}
