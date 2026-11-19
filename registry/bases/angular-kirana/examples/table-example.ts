import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import {
  color,
  fontSize,
  fontWeight,
  lineHeight,
  space,
} from "../../../core/scales"
import { radius } from "../../../core/tokens"
import { visuallyHidden } from "../../../styles/visually-hidden.styles"
import { IconPlaceholder } from "../../../icons/angular"
import { Example, ExampleWrapper } from "../components/example"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Input } from "../ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"

const styles = {
  invoice: css({ width: "100px" }),
  end: css({ textAlign: "right" }),
  medium: css({ fontWeight: fontWeight.medium }),
  more: css({
    width: { "*": null, base: space[8] },
    height: { "*": null, base: space[8] },
  }),
  w40: css({ width: { "*": null, base: space[40] } }),
  quantity: css({
    height: { "*": null, base: space[8] },
    width: { "*": null, base: space[20] },
  }),
  // `inline-flex items-center rounded-full px-2 py-1 text-xs font-medium`, tinted below.
  badge: css({
    display: "inline-flex",
    alignItems: "center",
    borderRadius: radius.full,
    paddingInline: space[2],
    paddingBlock: space[1],
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    fontWeight: fontWeight.medium,
  }),
  // `bg-blue-500/10 text-blue-700 dark:text-blue-400`
  blue: css({
    backgroundColor: `color-mix(in oklab, ${color.blue[500]} 10%, transparent)`,
    color: `light-dark(${color.blue[700]}, ${color.blue[400]})`,
  }),
  // `bg-gray-500/10 text-gray-700 dark:text-gray-400`
  gray: css({
    backgroundColor: `color-mix(in oklab, ${color.gray[500]} 10%, transparent)`,
    color: `light-dark(${color.gray[700]}, ${color.gray[400]})`,
  }),
  // `bg-green-500/10 text-green-700 dark:text-green-400`
  green: css({
    backgroundColor: `color-mix(in oklab, ${color.green[500]} 10%, transparent)`,
    color: `light-dark(${color.green[700]}, ${color.green[400]})`,
  }),
  // `bg-yellow-500/10 text-yellow-700 dark:text-yellow-400`
  yellow: css({
    backgroundColor: `color-mix(in oklab, ${color.yellow[500]} 10%, transparent)`,
    color: `light-dark(${color.yellow[700]}, ${color.yellow[400]})`,
  }),
}

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
]

const people = [
  { value: "sarah", label: "Sarah Chen" },
  { value: "marcus", label: "Marc Rodriguez" },
  { value: "emily", label: "Emily Watson" },
  { value: "david", label: "David Kim" },
]

const tasks = [
  {
    task: "Design homepage",
    assignee: "sarah",
    status: "In Progress",
  },
  {
    task: "Implement API",
    assignee: "marcus",
    status: "Pending",
  },
  {
    task: "Write tests",
    assignee: "emily",
    status: "Not Started",
  },
]

@Component({
  selector: "table-example",
  imports: [
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    Example,
    ExampleWrapper,
    Input,
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div kuiExampleWrapper>
      <!-- TableBasic -->
      <div kuiExample title="Basic">
        <div kuiTable>
          <caption kuiTableCaption>
            A list of your recent invoices.
          </caption>
          <thead kuiTableHeader>
            <tr kuiTableRow>
              <th kuiTableHead [sx]="styles.invoice">Invoice</th>
              <th kuiTableHead>Status</th>
              <th kuiTableHead>Method</th>
              <th kuiTableHead [sx]="styles.end">Amount</th>
            </tr>
          </thead>
          <tbody kuiTableBody>
            @for (invoice of invoices.slice(0, 3); track invoice.invoice) {
              <tr kuiTableRow>
                <td kuiTableCell [sx]="styles.medium">{{ invoice.invoice }}</td>
                <td kuiTableCell>{{ invoice.paymentStatus }}</td>
                <td kuiTableCell>{{ invoice.paymentMethod }}</td>
                <td kuiTableCell [sx]="styles.end">
                  {{ invoice.totalAmount }}
                </td>
              </tr>
            }
          </tbody>
        </div>
      </div>
      <!-- TableWithFooter -->
      <div kuiExample title="With Footer">
        <div kuiTable>
          <caption kuiTableCaption>
            A list of your recent invoices.
          </caption>
          <thead kuiTableHeader>
            <tr kuiTableRow>
              <th kuiTableHead [sx]="styles.invoice">Invoice</th>
              <th kuiTableHead>Status</th>
              <th kuiTableHead>Method</th>
              <th kuiTableHead [sx]="styles.end">Amount</th>
            </tr>
          </thead>
          <tbody kuiTableBody>
            @for (invoice of invoices.slice(0, 3); track invoice.invoice) {
              <tr kuiTableRow>
                <td kuiTableCell [sx]="styles.medium">{{ invoice.invoice }}</td>
                <td kuiTableCell>{{ invoice.paymentStatus }}</td>
                <td kuiTableCell>{{ invoice.paymentMethod }}</td>
                <td kuiTableCell [sx]="styles.end">
                  {{ invoice.totalAmount }}
                </td>
              </tr>
            }
          </tbody>
          <tfoot kuiTableFooter>
            <tr kuiTableRow>
              <td kuiTableCell [attr.colspan]="3">Total</td>
              <td kuiTableCell [sx]="styles.end">$2,500.00</td>
            </tr>
          </tfoot>
        </div>
      </div>
      <!-- TableSimple -->
      <div kuiExample title="Simple">
        <div kuiTable>
          <thead kuiTableHeader>
            <tr kuiTableRow>
              <th kuiTableHead>Name</th>
              <th kuiTableHead>Email</th>
              <th kuiTableHead [sx]="styles.end">Role</th>
            </tr>
          </thead>
          <tbody kuiTableBody>
            <tr kuiTableRow>
              <td kuiTableCell [sx]="styles.medium">Sarah Chen</td>
              <td kuiTableCell>sarah.chen{{ "@" }}acme.com</td>
              <td kuiTableCell [sx]="styles.end">Admin</td>
            </tr>
            <tr kuiTableRow>
              <td kuiTableCell [sx]="styles.medium">Marc Rodriguez</td>
              <td kuiTableCell>marcus.rodriguez{{ "@" }}acme.com</td>
              <td kuiTableCell [sx]="styles.end">User</td>
            </tr>
            <tr kuiTableRow>
              <td kuiTableCell [sx]="styles.medium">Emily Watson</td>
              <td kuiTableCell>emily.watson{{ "@" }}acme.com</td>
              <td kuiTableCell [sx]="styles.end">User</td>
            </tr>
          </tbody>
        </div>
      </div>
      <!-- TableWithBadges -->
      <div kuiExample title="With Badges">
        <div kuiTable>
          <thead kuiTableHeader>
            <tr kuiTableRow>
              <th kuiTableHead>Task</th>
              <th kuiTableHead>Status</th>
              <th kuiTableHead [sx]="styles.end">Priority</th>
            </tr>
          </thead>
          <tbody kuiTableBody>
            <tr kuiTableRow>
              <td kuiTableCell [sx]="styles.medium">Design homepage</td>
              <td kuiTableCell>
                <span [sx]="[styles.badge, styles.green]">Completed</span>
              </td>
              <td kuiTableCell [sx]="styles.end">
                <span [sx]="[styles.badge, styles.blue]">High</span>
              </td>
            </tr>
            <tr kuiTableRow>
              <td kuiTableCell [sx]="styles.medium">Implement API</td>
              <td kuiTableCell>
                <span [sx]="[styles.badge, styles.yellow]">In Progress</span>
              </td>
              <td kuiTableCell [sx]="styles.end">
                <span [sx]="[styles.badge, styles.gray]">Medium</span>
              </td>
            </tr>
            <tr kuiTableRow>
              <td kuiTableCell [sx]="styles.medium">Write tests</td>
              <td kuiTableCell>
                <span [sx]="[styles.badge, styles.gray]">Pending</span>
              </td>
              <td kuiTableCell [sx]="styles.end">
                <span [sx]="[styles.badge, styles.gray]">Low</span>
              </td>
            </tr>
          </tbody>
        </div>
      </div>
      <!-- TableWithActions -->
      <div kuiExample title="With Actions">
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
      <!-- TableWithSelect -->
      <div kuiExample title="With Select">
        <div kuiTable>
          <thead kuiTableHeader>
            <tr kuiTableRow>
              <th kuiTableHead>Task</th>
              <th kuiTableHead>Assignee</th>
              <th kuiTableHead>Status</th>
            </tr>
          </thead>
          <tbody kuiTableBody>
            @for (item of tasks; track item.task) {
              <tr kuiTableRow>
                <td kuiTableCell [sx]="styles.medium">{{ item.task }}</td>
                <td kuiTableCell>
                  <ng-container
                    kuiSelect
                    [items]="people"
                    [defaultValue]="item.assignee"
                  >
                    <button kuiSelectTrigger [sx]="styles.w40" size="sm">
                      <span kuiSelectValue></span>
                    </button>
                    <div kuiSelectContent>
                      <div kuiSelectGroup>
                        @for (person of people; track person.value) {
                          <div kuiSelectItem [value]="person.value">
                            {{ person.label }}
                          </div>
                        }
                      </div>
                    </div>
                  </ng-container>
                </td>
                <td kuiTableCell>{{ item.status }}</td>
              </tr>
            }
          </tbody>
        </div>
      </div>
      <!-- TableWithInput -->
      <div kuiExample title="With Input">
        <div kuiTable>
          <thead kuiTableHeader>
            <tr kuiTableRow>
              <th kuiTableHead>Product</th>
              <th kuiTableHead>Quantity</th>
              <th kuiTableHead>Price</th>
            </tr>
          </thead>
          <tbody kuiTableBody>
            <tr kuiTableRow>
              <td kuiTableCell [sx]="styles.medium">Wireless Mouse</td>
              <td kuiTableCell>
                <input
                  kuiInput
                  type="number"
                  value="1"
                  [sx]="styles.quantity"
                  min="0"
                />
              </td>
              <td kuiTableCell>$29.99</td>
            </tr>
            <tr kuiTableRow>
              <td kuiTableCell [sx]="styles.medium">Mechanical Keyboard</td>
              <td kuiTableCell>
                <input
                  kuiInput
                  type="number"
                  value="2"
                  [sx]="styles.quantity"
                  min="0"
                />
              </td>
              <td kuiTableCell>$129.99</td>
            </tr>
            <tr kuiTableRow>
              <td kuiTableCell [sx]="styles.medium">USB-C Hub</td>
              <td kuiTableCell>
                <input
                  kuiInput
                  type="number"
                  value="1"
                  [sx]="styles.quantity"
                  min="0"
                />
              </td>
              <td kuiTableCell>$49.99</td>
            </tr>
          </tbody>
        </div>
      </div>
    </div>
  `,
})
export default class TableExample {
  protected readonly styles = styles
  protected readonly invoices = invoices
  protected readonly people = people
  protected readonly tasks = tasks
  protected readonly visuallyHidden = visuallyHidden
}
