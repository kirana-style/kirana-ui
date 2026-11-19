import { Component, computed, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { fontWeight, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Checkbox } from "../ui/checkbox"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"

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

@Component({
  selector: "checkbox-table",
  imports: [
    Checkbox,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div kuiTable>
        <thead kuiTableHeader>
          <tr kuiTableRow>
            <th kuiTableHead [sx]="styles.check">
              <span
                kuiCheckbox
                id="select-all-checkbox"
                name="select-all-checkbox"
                [checked]="selectAll()"
                (checkedChange)="handleSelectAll($event)"
              ></span>
            </th>
            <th kuiTableHead>Name</th>
            <th kuiTableHead>Email</th>
            <th kuiTableHead>Role</th>
          </tr>
        </thead>
        <tbody kuiTableBody>
          @for (row of tableData; track row.id) {
            <tr
              kuiTableRow
              [attr.data-state]="selectedRows().has(row.id) ? 'selected' : null"
            >
              <td kuiTableCell>
                <span
                  kuiCheckbox
                  [id]="\`row-\${row.id}-checkbox\`"
                  [attr.name]="\`row-\${row.id}-checkbox\`"
                  [checked]="selectedRows().has(row.id)"
                  (checkedChange)="handleSelectRow(row.id, $event)"
                ></span>
              </td>
              <td kuiTableCell [sx]="styles.medium">{{ row.name }}</td>
              <td kuiTableCell>{{ row.email }}</td>
              <td kuiTableCell>{{ row.role }}</td>
            </tr>
          }
        </tbody>
      </div>
    </div>
  `,
})
export default class CheckboxTable {
  protected readonly styles = styles
  protected readonly tableData = tableData
  protected readonly selectedRows = signal(new Set(["1"]))
  protected readonly selectAll = computed(
    () => this.selectedRows().size === tableData.length
  )

  protected handleSelectAll(checked: boolean) {
    this.selectedRows.set(
      checked ? new Set(tableData.map((row) => row.id)) : new Set()
    )
  }

  protected handleSelectRow(id: string, checked: boolean) {
    const next = new Set(this.selectedRows())
    if (checked) next.add(id)
    else next.delete(id)
    this.selectedRows.set(next)
  }
  protected readonly page = page
}
