import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { fontWeight, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { visuallyHidden } from "../../../styles/visually-hidden.styles"
import { IconPlaceholder } from "../../../icons/angular"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"

const styles = {
  end: css({ textAlign: "right" }),
  medium: css({ fontWeight: fontWeight.medium }),
  more: css({
    width: { "*": null, base: space[8] },
    height: { "*": null, base: space[8] },
  }),
}

@Component({
  selector: "table-actions",
  imports: [
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div kuiTable>
        <thead kuiTableHeader>
          <tr kuiTableRow>
            <th kuiTableHead>Product</th>
            <th kuiTableHead>Price</th>
            <th kuiTableHead [sx]="styles.end">Actions</th>
          </tr>
        </thead>
        <tbody kuiTableBody>
          <tr kuiTableRow>
            <td kuiTableCell [sx]="styles.medium">Wireless Mouse</td>
            <td kuiTableCell>$29.99</td>
            <td kuiTableCell [sx]="styles.end">
              <ng-container kuiDropdownMenu>
                <button
                  kuiButton
                  kuiDropdownMenuTrigger
                  variant="ghost"
                  size="icon"
                  [sx]="styles.more"
                >
                  <svg
                    iconPlaceholder
                    lucide="MoreHorizontalIcon"
                    tabler="IconDots"
                    hugeicons="MoreHorizontalCircle01Icon"
                    phosphor="DotsThreeOutlineIcon"
                    remixicon="RiMoreLine"
                  ></svg>
                  <span [sx]="visuallyHidden">Open menu</span>
                </button>
                <div kuiDropdownMenuContent align="end">
                  <div kuiDropdownMenuItem>Edit</div>
                  <div kuiDropdownMenuItem>Duplicate</div>
                  <div kuiDropdownMenuSeparator></div>
                  <div kuiDropdownMenuItem variant="destructive">Delete</div>
                </div>
              </ng-container>
            </td>
          </tr>
          <tr kuiTableRow>
            <td kuiTableCell [sx]="styles.medium">Mechanical Keyboard</td>
            <td kuiTableCell>$129.99</td>
            <td kuiTableCell [sx]="styles.end">
              <ng-container kuiDropdownMenu>
                <button
                  kuiButton
                  kuiDropdownMenuTrigger
                  variant="ghost"
                  size="icon"
                  [sx]="styles.more"
                >
                  <svg
                    iconPlaceholder
                    lucide="MoreHorizontalIcon"
                    tabler="IconDots"
                    hugeicons="MoreHorizontalCircle01Icon"
                    phosphor="DotsThreeOutlineIcon"
                    remixicon="RiMoreLine"
                  ></svg>
                  <span [sx]="visuallyHidden">Open menu</span>
                </button>
                <div kuiDropdownMenuContent align="end">
                  <div kuiDropdownMenuItem>Edit</div>
                  <div kuiDropdownMenuItem>Duplicate</div>
                  <div kuiDropdownMenuSeparator></div>
                  <div kuiDropdownMenuItem variant="destructive">Delete</div>
                </div>
              </ng-container>
            </td>
          </tr>
          <tr kuiTableRow>
            <td kuiTableCell [sx]="styles.medium">USB-C Hub</td>
            <td kuiTableCell>$49.99</td>
            <td kuiTableCell [sx]="styles.end">
              <ng-container kuiDropdownMenu>
                <button
                  kuiButton
                  kuiDropdownMenuTrigger
                  variant="ghost"
                  size="icon"
                  [sx]="styles.more"
                >
                  <svg
                    iconPlaceholder
                    lucide="MoreHorizontalIcon"
                    tabler="IconDots"
                    hugeicons="MoreHorizontalCircle01Icon"
                    phosphor="DotsThreeOutlineIcon"
                    remixicon="RiMoreLine"
                  ></svg>
                  <span [sx]="visuallyHidden">Open menu</span>
                </button>
                <div kuiDropdownMenuContent align="end">
                  <div kuiDropdownMenuItem>Edit</div>
                  <div kuiDropdownMenuItem>Duplicate</div>
                  <div kuiDropdownMenuSeparator></div>
                  <div kuiDropdownMenuItem variant="destructive">Delete</div>
                </div>
              </ng-container>
            </td>
          </tr>
        </tbody>
      </div>
    </div>
  `,
})
export default class TableActions {
  protected readonly styles = styles
  protected readonly page = page
  protected readonly visuallyHidden = visuallyHidden
}
