import { css } from "@kirana-style/core"

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
import { IconPlaceholder } from "../../../icons/icon-placeholder"
import {
  color,
  fontSize,
  fontWeight,
  lineHeight,
  space,
} from "../../../core/scales"
import { radius } from "../../../core/tokens"
import { visuallyHidden } from "../../../styles/visually-hidden.styles"

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

export default function TableExample() {
  return (
    <ExampleWrapper>
      <TableBasic />
      <TableWithFooter />
      <TableSimple />
      <TableWithBadges />
      <TableWithActions />
      <TableWithSelect />
      <TableWithInput />
    </ExampleWrapper>
  )
}

function TableBasic() {
  return (
    <Example title="Basic">
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead sx={styles.invoice}>Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead sx={styles.end}>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.slice(0, 3).map((invoice) => (
            <TableRow key={invoice.invoice}>
              <TableCell sx={styles.medium}>{invoice.invoice}</TableCell>
              <TableCell>{invoice.paymentStatus}</TableCell>
              <TableCell>{invoice.paymentMethod}</TableCell>
              <TableCell sx={styles.end}>{invoice.totalAmount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Example>
  )
}

function TableWithFooter() {
  return (
    <Example title="With Footer">
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead sx={styles.invoice}>Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead sx={styles.end}>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.slice(0, 3).map((invoice) => (
            <TableRow key={invoice.invoice}>
              <TableCell sx={styles.medium}>{invoice.invoice}</TableCell>
              <TableCell>{invoice.paymentStatus}</TableCell>
              <TableCell>{invoice.paymentMethod}</TableCell>
              <TableCell sx={styles.end}>{invoice.totalAmount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell sx={styles.end}>$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </Example>
  )
}

function TableSimple() {
  return (
    <Example title="Simple">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead sx={styles.end}>Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell sx={styles.medium}>Sarah Chen</TableCell>
            <TableCell>sarah.chen@acme.com</TableCell>
            <TableCell sx={styles.end}>Admin</TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={styles.medium}>Marc Rodriguez</TableCell>
            <TableCell>marcus.rodriguez@acme.com</TableCell>
            <TableCell sx={styles.end}>User</TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={styles.medium}>Emily Watson</TableCell>
            <TableCell>emily.watson@acme.com</TableCell>
            <TableCell sx={styles.end}>User</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Example>
  )
}

function TableWithBadges() {
  return (
    <Example title="With Badges">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Task</TableHead>
            <TableHead>Status</TableHead>
            <TableHead sx={styles.end}>Priority</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell sx={styles.medium}>Design homepage</TableCell>
            <TableCell>
              <span sx={[styles.badge, styles.green]}>Completed</span>
            </TableCell>
            <TableCell sx={styles.end}>
              <span sx={[styles.badge, styles.blue]}>High</span>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={styles.medium}>Implement API</TableCell>
            <TableCell>
              <span sx={[styles.badge, styles.yellow]}>In Progress</span>
            </TableCell>
            <TableCell sx={styles.end}>
              <span sx={[styles.badge, styles.gray]}>Medium</span>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={styles.medium}>Write tests</TableCell>
            <TableCell>
              <span sx={[styles.badge, styles.gray]}>Pending</span>
            </TableCell>
            <TableCell sx={styles.end}>
              <span sx={[styles.badge, styles.gray]}>Low</span>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Example>
  )
}

function TableWithActions() {
  return (
    <Example title="With Actions">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Price</TableHead>
            <TableHead sx={styles.end}>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell sx={styles.medium}>Wireless Mouse</TableCell>
            <TableCell>$29.99</TableCell>
            <TableCell sx={styles.end}>
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button variant="ghost" size="icon" sx={styles.more} />
                  }
                >
                  <IconPlaceholder
                    lucide="MoreHorizontalIcon"
                    tabler="IconDots"
                    hugeicons="MoreHorizontalCircle01Icon"
                    phosphor="DotsThreeOutlineIcon"
                    remixicon="RiMoreLine"
                  />
                  <span sx={visuallyHidden}>Open menu</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Duplicate</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive">
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={styles.medium}>Mechanical Keyboard</TableCell>
            <TableCell>$129.99</TableCell>
            <TableCell sx={styles.end}>
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button variant="ghost" size="icon" sx={styles.more} />
                  }
                >
                  <IconPlaceholder
                    lucide="MoreHorizontalIcon"
                    tabler="IconDots"
                    hugeicons="MoreHorizontalCircle01Icon"
                    phosphor="DotsThreeOutlineIcon"
                    remixicon="RiMoreLine"
                  />
                  <span sx={visuallyHidden}>Open menu</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Duplicate</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive">
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={styles.medium}>USB-C Hub</TableCell>
            <TableCell>$49.99</TableCell>
            <TableCell sx={styles.end}>
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button variant="ghost" size="icon" sx={styles.more} />
                  }
                >
                  <IconPlaceholder
                    lucide="MoreHorizontalIcon"
                    tabler="IconDots"
                    hugeicons="MoreHorizontalCircle01Icon"
                    phosphor="DotsThreeOutlineIcon"
                    remixicon="RiMoreLine"
                  />
                  <span sx={visuallyHidden}>Open menu</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Duplicate</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive">
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Example>
  )
}

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

function TableWithSelect() {
  return (
    <Example title="With Select">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Task</TableHead>
            <TableHead>Assignee</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((item) => (
            <TableRow key={item.task}>
              <TableCell sx={styles.medium}>{item.task}</TableCell>
              <TableCell>
                <Select
                  items={people}
                  defaultValue={people.find(
                    (person) => person.value === item.assignee
                  )}
                  itemToStringValue={(person) => {
                    return person.value
                  }}
                >
                  <SelectTrigger sx={styles.w40} size="sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {people.map((person) => (
                        <SelectItem key={person.value} value={person}>
                          {person.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>{item.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Example>
  )
}

function TableWithInput() {
  return (
    <Example title="With Input">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell sx={styles.medium}>Wireless Mouse</TableCell>
            <TableCell>
              <Input
                type="number"
                defaultValue="1"
                sx={styles.quantity}
                min="0"
              />
            </TableCell>
            <TableCell>$29.99</TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={styles.medium}>Mechanical Keyboard</TableCell>
            <TableCell>
              <Input
                type="number"
                defaultValue="2"
                sx={styles.quantity}
                min="0"
              />
            </TableCell>
            <TableCell>$129.99</TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={styles.medium}>USB-C Hub</TableCell>
            <TableCell>
              <Input
                type="number"
                defaultValue="1"
                sx={styles.quantity}
                min="0"
              />
            </TableCell>
            <TableCell>$49.99</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Example>
  )
}
