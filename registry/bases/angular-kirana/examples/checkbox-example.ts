import { Component, computed, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { fontWeight, space } from "../../../core/scales"
import { Example, ExampleWrapper } from "../components/example"
import { Checkbox } from "../ui/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "../ui/field"
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
  normal: css({ fontWeight: { "*": null, base: fontWeight.normal } }),
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
  selector: "checkbox-example",
  imports: [
    Checkbox,
    Example,
    ExampleWrapper,
    Field,
    FieldContent,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldTitle,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    SxDirective,
  ],
  template: `
    <div kuiExampleWrapper>
      <!-- CheckboxBasic -->
      <div kuiExample title="Basic">
        <div kuiField orientation="horizontal">
          <span kuiCheckbox id="terms"></span>
          <label kuiFieldLabel for="terms">Accept terms and conditions</label>
        </div>
      </div>
      <!-- CheckboxWithDescription -->
      <div kuiExample title="With Description">
        <div kuiField orientation="horizontal">
          <span kuiCheckbox id="terms-2" defaultChecked></span>
          <div kuiFieldContent>
            <label kuiFieldLabel for="terms-2"
              >Accept terms and conditions</label
            >
            <p kuiFieldDescription>
              By clicking this checkbox, you agree to the terms and conditions.
            </p>
          </div>
        </div>
      </div>
      <!-- CheckboxInvalid -->
      <div kuiExample title="Invalid">
        <div kuiField orientation="horizontal" data-invalid="true">
          <span kuiCheckbox id="terms-3" aria-invalid="true"></span>
          <label kuiFieldLabel for="terms-3">Accept terms and conditions</label>
        </div>
      </div>
      <!-- CheckboxDisabled -->
      <div kuiExample title="Disabled">
        <div kuiField orientation="horizontal">
          <span kuiCheckbox id="toggle" disabled></span>
          <label kuiFieldLabel for="toggle">Enable notifications</label>
        </div>
      </div>
      <!-- CheckboxWithTitle -->
      <div kuiExample title="With Title">
        <div kuiFieldGroup>
          <label kuiFieldLabel for="toggle-2">
            <div kuiField orientation="horizontal">
              <span kuiCheckbox id="toggle-2" defaultChecked></span>
              <div kuiFieldContent>
                <div kuiFieldTitle>Enable notifications</div>
                <p kuiFieldDescription>
                  You can enable or disable notifications at any time.
                </p>
              </div>
            </div>
          </label>
          <label kuiFieldLabel for="toggle-4">
            <div kuiField orientation="horizontal" data-disabled="true">
              <span kuiCheckbox id="toggle-4" disabled></span>
              <div kuiFieldContent>
                <div kuiFieldTitle>Enable notifications</div>
                <p kuiFieldDescription>
                  You can enable or disable notifications at any time.
                </p>
              </div>
            </div>
          </label>
        </div>
      </div>
      <!-- CheckboxInTable -->
      <div kuiExample title="In Table">
        <div kuiTable>
          <thead kuiTableHeader>
            <tr kuiTableRow>
              <th kuiTableHead [sx]="styles.check">
                <span
                  kuiCheckbox
                  id="select-all"
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
                [attr.data-state]="
                  selectedRows().has(row.id) ? 'selected' : null
                "
              >
                <td kuiTableCell>
                  <span
                    kuiCheckbox
                    [id]="\`row-\${row.id}\`"
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
      <!-- CheckboxGroup -->
      <div kuiExample title="Group">
        <div kuiField>
          <label kuiFieldLabel>Show these items on the desktop:</label>
          <div kuiField orientation="horizontal">
            <span kuiCheckbox id="finder-pref-9k2-hard-disks-ljj"></span>
            <label
              kuiFieldLabel
              for="finder-pref-9k2-hard-disks-ljj"
              [sx]="styles.normal"
              >Hard disks</label
            >
          </div>
          <div kuiField orientation="horizontal">
            <span kuiCheckbox id="finder-pref-9k2-external-disks-1yg"></span>
            <label
              kuiFieldLabel
              for="finder-pref-9k2-external-disks-1yg"
              [sx]="styles.normal"
              >External disks</label
            >
          </div>
          <div kuiField orientation="horizontal">
            <span kuiCheckbox id="finder-pref-9k2-cds-dvds-fzt"></span>
            <label
              kuiFieldLabel
              for="finder-pref-9k2-cds-dvds-fzt"
              [sx]="styles.normal"
              >CDs, DVDs, and iPods</label
            >
          </div>
          <div kuiField orientation="horizontal">
            <span kuiCheckbox id="finder-pref-9k2-connected-servers-6l2"></span>
            <label
              kuiFieldLabel
              for="finder-pref-9k2-connected-servers-6l2"
              [sx]="styles.normal"
              >Connected servers</label
            >
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class CheckboxExample {
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
}
