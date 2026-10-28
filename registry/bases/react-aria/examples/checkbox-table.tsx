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

export default function CheckboxInTable() {
  return (
    <div sx={page.example}>
      <Table aria-label="Users" selectionMode="multiple">
        <TableHeader>
          <TableHead sx={styles.check}>
            <Checkbox
              id="select-all-checkbox"
              name="select-all-checkbox"
              slot="selection"
            />
          </TableHead>
          <TableHead isRowHeader>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
        </TableHeader>
        <TableBody>
          {tableData.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                <Checkbox
                  id={`row-${row.id}-checkbox`}
                  name={`row-${row.id}-checkbox`}
                  slot="selection"
                />
              </TableCell>
              <TableCell sx={styles.medium}>{row.name}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
