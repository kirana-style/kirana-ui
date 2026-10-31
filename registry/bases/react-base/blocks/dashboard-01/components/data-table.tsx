"use client"

import * as React from "react"
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import type { DragEndEvent, UniqueIdentifier } from "@dnd-kit/core"
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import {
  columnFilteringFeature,
  columnVisibilityFeature,
  createColumnHelper,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  FlexRender,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  tableFeatures,
  useTable,
} from "@tanstack/react-table"
import type {
  ColumnFiltersState,
  ColumnVisibilityState,
  Row,
  SortingState,
} from "@tanstack/react-table"
import { areaY, defineChart, dot, lineY, whenFocused } from "@tanstack/charts"
import { d3Curve } from "@tanstack/charts/d3/shape"
import { decorative } from "@tanstack/charts/mark/decorative"
import { scaleLinear } from "@tanstack/charts/scales/linear"
import { scalePoint } from "@tanstack/charts/scales/point"
import { curveNatural } from "d3-shape"
import { toast } from "sonner"
import { z } from "zod"

import { useIsMobile } from "../../../../../lib/use-mobile"
import { Badge } from "../../../ui/badge"
import { Button } from "../../../ui/button"
import type { ChartConfig } from "../../../ui/chart"
import {
  ChartContainer,
  ChartTooltipContent,
  chartTheme,
  chartTooltip,
  hiddenAxis,
  niceTicks,
} from "../../../ui/chart"
import { Checkbox } from "../../../ui/checkbox"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../../../ui/drawer"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../ui/dropdown-menu"
import { Input } from "../../../ui/input"
import { Label } from "../../../ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../ui/select"
import { Separator } from "../../../ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../ui/tabs"
import { IconPlaceholder } from "../../../../../icons/icon-placeholder"
import { css, select, props as styleProps } from "@kirana-style/core"
import { radius, theme } from "../../../../../core/tokens"
import {
  breakpoint,
  color,
  fontSize,
  fontWeight,
  lineHeight,
  space,
} from "../../../../../core/scales"

const styles = {
  dragHandleButton: css({
    width: { "*": null, base: space[7] },
    height: { "*": null, base: space[7] },
    color: theme.mutedForeground,
    backgroundColor: { ":hover": "transparent" },
  }),
  dragHandleIconPlaceholder: css({
    width: space[3],
    height: space[3],
    color: theme.mutedForeground,
  }),
  dragHandleSpan: css({
    borderWidth: "0",
    clipPath: "inset(50%)",
    height: "1px",
    margin: "-1px",
    overflow: "hidden",
    padding: "0",
    position: "absolute",
    whiteSpace: "nowrap",
    width: "1px",
  }),
  div: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }),
  div2: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }),
  div3: css({
    width: space[32],
  }),
  badge: css({
    paddingInline: { "*": null, base: space["1.5"] },
    color: theme.mutedForeground,
  }),
  badge2: css({
    paddingInline: { "*": null, base: space["1.5"] },
    color: theme.mutedForeground,
  }),
  iconPlaceholder: css({
    fill: `light-dark(${color.green[500]}, ${color.green[400]})`,
  }),
  div4: css({
    width: "100%",
    textAlign: "right",
  }),
  label: css({
    borderWidth: { "*": null, base: "0" },
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderColor: theme.border,
    clipPath: { "*": null, base: "inset(50%)" },
    height: { "*": null, base: "1px" },
    margin: { "*": null, base: "-1px" },
    overflow: { "*": null, base: "hidden" },
    padding: { "*": null, base: "0" },
    position: { "*": null, base: "absolute" },
    whiteSpace: { "*": null, base: "nowrap" },
    width: { "*": null, base: "1px" },
  }),
  input: css({
    height: { "*": null, base: space[8] },
    width: { "*": null, base: space[16] },
    borderColor: "transparent",
    backgroundColor: {
      base: "light-dark(transparent, transparent)",
      ":hover": `light-dark(color-mix(in oklab, ${theme.input} 30%, transparent), color-mix(in oklab, ${theme.input} 30%, transparent))`,
      ":focus-visible": `light-dark(${theme.background}, color-mix(in oklab, ${theme.input} 30%, transparent))`,
    },
    textAlign: { "*": null, base: "right" },

    boxShadow: "none",
    borderStyle: { ":focus-visible": "solid" },
    borderWidth: { ":focus-visible": "1px" },
  }),
  div5: css({
    width: "100%",
    textAlign: "right",
  }),
  label2: css({
    borderWidth: { "*": null, base: "0" },
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderColor: theme.border,
    clipPath: { "*": null, base: "inset(50%)" },
    height: { "*": null, base: "1px" },
    margin: { "*": null, base: "-1px" },
    overflow: { "*": null, base: "hidden" },
    padding: { "*": null, base: "0" },
    position: { "*": null, base: "absolute" },
    whiteSpace: { "*": null, base: "nowrap" },
    width: { "*": null, base: "1px" },
  }),
  input2: css({
    height: { "*": null, base: space[8] },
    width: { "*": null, base: space[16] },
    borderColor: "transparent",
    backgroundColor: {
      base: "light-dark(transparent, transparent)",
      ":hover": `light-dark(color-mix(in oklab, ${theme.input} 30%, transparent), color-mix(in oklab, ${theme.input} 30%, transparent))`,
      ":focus-visible": `light-dark(${theme.background}, color-mix(in oklab, ${theme.input} 30%, transparent))`,
    },
    textAlign: { "*": null, base: "right" },

    boxShadow: "none",
    borderStyle: { ":focus-visible": "solid" },
    borderWidth: { ":focus-visible": "1px" },
  }),
  label3: css({
    borderWidth: { "*": null, base: "0" },
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderColor: theme.border,
    clipPath: { "*": null, base: "inset(50%)" },
    height: { "*": null, base: "1px" },
    margin: { "*": null, base: "-1px" },
    overflow: { "*": null, base: "hidden" },
    padding: { "*": null, base: "0" },
    position: { "*": null, base: "absolute" },
    whiteSpace: { "*": null, base: "nowrap" },
    width: { "*": null, base: "1px" },
  }),
  selectTrigger: css({
    width: { "*": null, base: "9.5rem" },
    [select.descendant('[data-slot="select-value"]')]: {
      display: "block",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
  }),
  button: css({
    display: { "*": null, base: "flex" },
    width: { "*": null, base: space[8] },
    height: { "*": null, base: space[8] },
    color: theme.mutedForeground,
    backgroundColor: { "[data-open]": theme.muted },
  }),
  span: css({
    borderWidth: "0",
    clipPath: "inset(50%)",
    height: "1px",
    margin: "-1px",
    overflow: "hidden",
    padding: "0",
    position: "absolute",
    whiteSpace: "nowrap",
    width: "1px",
  }),
  dropdownMenuContent: css({
    width: { "*": null, base: space[32] },
  }),
  draggableRowTableRow: css({
    position: { "*": null, base: "relative" },
    zIndex: { "*": null, base: "0", '[data-dragging="true"]': "10" },
    opacity: { '[data-dragging="true"]': "80%" },
  }),
  dataTableTabs: css({
    width: { "*": null, base: "100%" },
    flexDirection: { "*": null, base: "column" },
    justifyContent: { "*": null, base: "flex-start" },
    gap: { "*": null, base: space[6] },
  }),
  dataTableDiv: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingInline: { base: space[4], [breakpoint.lg]: space[6] },
  }),
  dataTableLabel: css({
    borderWidth: { "*": null, base: "0" },
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderColor: theme.border,
    clipPath: { "*": null, base: "inset(50%)" },
    height: { "*": null, base: "1px" },
    margin: { "*": null, base: "-1px" },
    overflow: { "*": null, base: "hidden" },
    padding: { "*": null, base: "0" },
    position: { "*": null, base: "absolute" },
    whiteSpace: { "*": null, base: "nowrap" },
    width: { "*": null, base: "1px" },
  }),
  dataTableSelectTrigger: css({
    display: {
      "*": null,
      base: "flex",
      "@container main (width >= 56rem)": "none",
    },
    width: { "*": null, base: "fit-content" },
  }),
  tabsList: css({
    display: {
      "*": null,
      base: "none",
      "@container main (width >= 56rem)": "flex",
    },
  }),
  // Upstream's `**:data-[slot=badge]:…` on the list, which would rank below the badge's own here.
  tabBadge: css({
    width: { "*": null, base: space[5] },
    height: { "*": null, base: space[5] },
    borderRadius: { "*": null, base: radius.full },
    backgroundColor: {
      "*": null,
      base: `color-mix(in oklab, ${theme.mutedForeground} 30%, transparent)`,
    },
    paddingInline: { "*": null, base: space[1] },
  }),
  dataTableDiv2: css({
    display: "flex",
    alignItems: "center",
    gap: space[2],
  }),
  // The column menu: `w-56`, as shadcn/ui's blocks page draws it (its `new-york-v4` copy).
  dataTableDropdownMenuContent: css({
    width: { "*": null, base: space[56] },
  }),
  dropdownMenuCheckboxItem: css({
    textTransform: { "*": null, base: "capitalize" },
  }),
  dataTableSpan: css({
    display: { base: "none", [breakpoint.lg]: "inline" },
  }),
  tabsContent: css({
    position: { "*": null, base: "relative" },
    display: { "*": null, base: "flex" },
    flexDirection: { "*": null, base: "column" },
    gap: { "*": null, base: space[4] },
    overflow: { "*": null, base: "auto" },
    paddingInline: { "*": null, base: space[4], [breakpoint.lg]: space[6] },
  }),
  dataTableDiv3: css({
    overflow: "hidden",
    borderRadius: radius.lg,
    borderWidth: "1px",
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderColor: theme.border,
  }),
  tableHeader: css({
    position: { "*": null, base: "sticky" },
    top: { "*": null, base: space["0"] },
    zIndex: { "*": null, base: "10" },
    backgroundColor: theme.muted,
  }),
  tableBody: css({
    [select.descendant('[data-slot="table-cell"]:first-child')]: {
      width: space[8],
    },
  }),
  tableCell: css({
    height: { "*": null, base: space[24] },
    textAlign: { "*": null, base: "center" },
  }),
  dataTableDiv4: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingInline: space[4],
  }),
  dataTableDiv5: css({
    display: { base: "none", [breakpoint.lg]: "flex" },
    flex: "1 1 0%",
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  }),
  div6: css({
    display: "flex",
    width: { base: "100%", [breakpoint.lg]: "fit-content" },
    alignItems: "center",
    gap: space[8],
  }),
  div7: css({
    display: { base: "none", [breakpoint.lg]: "flex" },
    alignItems: "center",
    gap: space[2],
  }),
  dataTableLabel2: css({
    fontSize: { "*": null, base: fontSize.sm },
    fontWeight: { "*": null, base: fontWeight.medium },
  }),
  selectTrigger2: css({
    width: { "*": null, base: space[20] },
  }),
  div8: css({
    display: "flex",
    width: "fit-content",
    alignItems: "center",
    justifyContent: "center",
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.medium,
  }),
  div9: css({
    marginLeft: { base: "auto", [breakpoint.lg]: space["0"] },
    display: "flex",
    alignItems: "center",
    gap: space[2],
  }),
  dataTableButton: css({
    display: { "*": null, base: "none", [breakpoint.lg]: "flex" },
    height: { "*": null, base: space[8] },
    width: { "*": null, base: space[8] },
    padding: { "*": null, base: space["0"] },
  }),
  span2: css({
    borderWidth: "0",
    clipPath: "inset(50%)",
    height: "1px",
    margin: "-1px",
    overflow: "hidden",
    padding: "0",
    position: "absolute",
    whiteSpace: "nowrap",
    width: "1px",
  }),
  button2: css({
    width: { "*": null, base: space[8] },
    height: { "*": null, base: space[8] },
  }),
  span3: css({
    borderWidth: "0",
    clipPath: "inset(50%)",
    height: "1px",
    margin: "-1px",
    overflow: "hidden",
    padding: "0",
    position: "absolute",
    whiteSpace: "nowrap",
    width: "1px",
  }),
  button3: css({
    width: { "*": null, base: space[8] },
    height: { "*": null, base: space[8] },
  }),
  span4: css({
    borderWidth: "0",
    clipPath: "inset(50%)",
    height: "1px",
    margin: "-1px",
    overflow: "hidden",
    padding: "0",
    position: "absolute",
    whiteSpace: "nowrap",
    width: "1px",
  }),
  button4: css({
    display: { "*": null, base: "none", [breakpoint.lg]: "flex" },
    width: { "*": null, base: space[8] },
    height: { "*": null, base: space[8] },
  }),
  span5: css({
    borderWidth: "0",
    clipPath: "inset(50%)",
    height: "1px",
    margin: "-1px",
    overflow: "hidden",
    padding: "0",
    position: "absolute",
    whiteSpace: "nowrap",
    width: "1px",
  }),
  tabsContent2: css({
    display: { "*": null, base: "flex" },
    flexDirection: { "*": null, base: "column" },
    paddingInline: { "*": null, base: space[4], [breakpoint.lg]: space[6] },
  }),
  div10: css({
    aspectRatio: "16 / 9",
    width: "100%",
    flex: "1 1 0%",
    borderRadius: radius.lg,
    borderStyle: "dashed",
    borderWidth: "1px",
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderColor: theme.border,
  }),
  tabsContent3: css({
    display: { "*": null, base: "flex" },
    flexDirection: { "*": null, base: "column" },
    paddingInline: { "*": null, base: space[4], [breakpoint.lg]: space[6] },
  }),
  div11: css({
    aspectRatio: "16 / 9",
    width: "100%",
    flex: "1 1 0%",
    borderRadius: radius.lg,
    borderStyle: "dashed",
    borderWidth: "1px",
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderColor: theme.border,
  }),
  tabsContent4: css({
    display: { "*": null, base: "flex" },
    flexDirection: { "*": null, base: "column" },
    paddingInline: { "*": null, base: space[4], [breakpoint.lg]: space[6] },
  }),
  div12: css({
    aspectRatio: "16 / 9",
    width: "100%",
    flex: "1 1 0%",
    borderRadius: radius.lg,
    borderStyle: "dashed",
    borderWidth: "1px",
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderColor: theme.border,
  }),
  tableCellViewerButton: css({
    width: { "*": null, base: "fit-content" },
    paddingInline: { "*": null, base: space["0"] },
    textAlign: { "*": null, base: "left" },
    color: theme.foreground,
  }),
  tableCellViewerDrawerHeader: css({
    gap: { "*": null, base: space[1] },
  }),
  tableCellViewerDiv: css({
    display: "flex",
    flexDirection: "column",
    gap: space[4],
    overflowY: "auto",
    paddingInline: space[4],
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
  }),
  tableCellViewerDiv2: css({
    display: "grid",
    gap: space[2],
  }),
  tableCellViewerDiv3: css({
    display: "flex",
    gap: space[2],
    lineHeight: "1",
    fontWeight: fontWeight.medium,
  }),
  tableCellViewerIconPlaceholder: css({
    width: space[4],
    height: space[4],
  }),
  tableCellViewerDiv4: css({
    color: theme.mutedForeground,
  }),
  tableCellViewerForm: css({
    display: "flex",
    flexDirection: "column",
    gap: space[4],
  }),
  tableCellViewerDiv5: css({
    display: "flex",
    flexDirection: "column",
    gap: space[3],
  }),
  tableCellViewerDiv6: css({
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: space[4],
  }),
  tableCellViewerDiv7: css({
    display: "flex",
    flexDirection: "column",
    gap: space[3],
  }),
  tableCellViewerSelectTrigger: css({
    width: { "*": null, base: "100%" },
  }),
  tableCellViewerDiv8: css({
    display: "flex",
    flexDirection: "column",
    gap: space[3],
  }),
  tableCellViewerSelectTrigger2: css({
    width: { "*": null, base: "100%" },
  }),
  tableCellViewerDiv9: css({
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: space[4],
  }),
  tableCellViewerDiv10: css({
    display: "flex",
    flexDirection: "column",
    gap: space[3],
  }),
  tableCellViewerDiv11: css({
    display: "flex",
    flexDirection: "column",
    gap: space[3],
  }),
  tableCellViewerDiv12: css({
    display: "flex",
    flexDirection: "column",
    gap: space[3],
  }),
  tableCellViewerSelectTrigger3: css({
    width: { "*": null, base: "100%" },
  }),
}

// New in v9: declare the features this table uses — anything you don't
// register is tree-shaken out of the bundle.
const features = tableFeatures({
  columnFilteringFeature,
  columnVisibilityFeature,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  filteredRowModel: createFilteredRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  sortedRowModel: createSortedRowModel(),
})

const columnHelper = createColumnHelper<
  typeof features,
  z.infer<typeof schema>
>()

export const schema = z.object({
  id: z.number(),
  header: z.string(),
  type: z.string(),
  status: z.string(),
  target: z.string(),
  limit: z.string(),
  reviewer: z.string(),
})

// Create a separate component for the drag handle
function DragHandle({ id }: { id: number }) {
  const { attributes, listeners } = useSortable({
    id,
  })
  return (
    <Button
      {...attributes}
      {...listeners}
      variant="ghost"
      size="icon"
      sx={styles.dragHandleButton}
    >
      <IconPlaceholder
        lucide="GripVerticalIcon"
        tabler="IconGripVertical"
        hugeicons="DragDropVerticalIcon"
        phosphor="DotsSixVerticalIcon"
        remixicon="RiDraggable"
        {...styleProps(styles.dragHandleIconPlaceholder)}
      />
      <span sx={styles.dragHandleSpan}>Drag to reorder</span>
    </Button>
  )
}
const columns = columnHelper.columns([
  columnHelper.display({
    id: "drag",
    header: () => null,
    cell: ({ row }) => <DragHandle id={row.original.id} />,
  }),
  columnHelper.display({
    id: "select",
    header: ({ table }) => (
      <div sx={styles.div}>
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          indeterminate={
            table.getIsSomePageRowsSelected() &&
            !table.getIsAllPageRowsSelected()
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div sx={styles.div2}>
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  }),
  columnHelper.accessor("header", {
    header: "Header",
    cell: ({ row }) => {
      return <TableCellViewer item={row.original} />
    },
    enableHiding: false,
  }),
  columnHelper.accessor("type", {
    header: "Section Type",
    cell: ({ row }) => (
      <div sx={styles.div3}>
        <Badge variant="outline" sx={styles.badge}>
          {row.original.type}
        </Badge>
      </div>
    ),
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: ({ row }) => (
      <Badge variant="outline" sx={styles.badge2}>
        {row.original.status === "Done" ? (
          <IconPlaceholder
            lucide="CircleCheckIcon"
            tabler="IconCircleCheckFilled"
            hugeicons="CheckmarkCircle01Icon"
            phosphor="CheckCircleIcon"
            remixicon="RiCheckboxCircleFill"
            {...styleProps(styles.iconPlaceholder)}
          />
        ) : (
          <IconPlaceholder
            lucide="LoaderIcon"
            tabler="IconLoader"
            hugeicons="Loading03Icon"
            phosphor="SpinnerIcon"
            remixicon="RiLoader4Line"
          />
        )}
        {row.original.status}
      </Badge>
    ),
  }),
  columnHelper.accessor("target", {
    header: () => <div sx={styles.div4}>Target</div>,
    cell: ({ row }) => (
      <form
        onSubmit={(e) => {
          e.preventDefault()
          toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
            loading: `Saving ${row.original.header}`,
            success: "Done",
            error: "Error",
          })
        }}
      >
        <Label htmlFor={`${row.original.id}-target`} sx={styles.label}>
          Target
        </Label>
        <Input
          sx={styles.input}
          defaultValue={row.original.target}
          id={`${row.original.id}-target`}
        />
      </form>
    ),
  }),
  columnHelper.accessor("limit", {
    header: () => <div sx={styles.div5}>Limit</div>,
    cell: ({ row }) => (
      <form
        onSubmit={(e) => {
          e.preventDefault()
          toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
            loading: `Saving ${row.original.header}`,
            success: "Done",
            error: "Error",
          })
        }}
      >
        <Label htmlFor={`${row.original.id}-limit`} sx={styles.label2}>
          Limit
        </Label>
        <Input
          sx={styles.input2}
          defaultValue={row.original.limit}
          id={`${row.original.id}-limit`}
        />
      </form>
    ),
  }),
  columnHelper.accessor("reviewer", {
    header: "Reviewer",
    cell: ({ row }) => {
      const isAssigned = row.original.reviewer !== "Assign reviewer"
      if (isAssigned) {
        return row.original.reviewer
      }
      return (
        <>
          <Label htmlFor={`${row.original.id}-reviewer`} sx={styles.label3}>
            Reviewer
          </Label>
          <Select
            items={[
              { label: "Eddie Lake", value: "Eddie Lake" },
              { label: "Jamik Tashpulatov", value: "Jamik Tashpulatov" },
            ]}
          >
            <SelectTrigger
              sx={styles.selectTrigger}
              size="sm"
              id={`${row.original.id}-reviewer`}
            >
              <SelectValue placeholder="Assign reviewer" />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectGroup>
                <SelectItem value="Eddie Lake">Eddie Lake</SelectItem>
                <SelectItem value="Jamik Tashpulatov">
                  Jamik Tashpulatov
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </>
      )
    },
  }),
  columnHelper.display({
    id: "actions",
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger
          render={<Button variant="ghost" sx={styles.button} size="icon" />}
        >
          <IconPlaceholder
            lucide="EllipsisVerticalIcon"
            tabler="IconDotsVertical"
            hugeicons="MoreVerticalCircle01Icon"
            phosphor="DotsThreeVerticalIcon"
            remixicon="RiMore2Line"
          />
          <span sx={styles.span}>Open menu</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" sx={styles.dropdownMenuContent}>
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Make a copy</DropdownMenuItem>
          <DropdownMenuItem>Favorite</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  }),
])
function DraggableRow({
  row,
}: {
  row: Row<typeof features, z.infer<typeof schema>>
}) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.id,
  })
  return (
    <TableRow
      data-state={row.getIsSelected() && "selected"}
      data-dragging={isDragging}
      ref={setNodeRef}
      sx={styles.draggableRowTableRow}
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          <FlexRender cell={cell} />
        </TableCell>
      ))}
    </TableRow>
  )
}
export function DataTable({
  data: initialData,
}: {
  data: z.infer<typeof schema>[]
}) {
  const [data, setData] = React.useState(() => initialData)
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] =
    React.useState<ColumnVisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  })
  const sortableId = React.useId()
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  )
  const dataIds = React.useMemo<UniqueIdentifier[]>(
    () => data?.map(({ id }) => id) || [],
    [data]
  )
  const table = useTable({
    features,
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    getRowId: (row) => row.id.toString(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
  })
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (active && over && active.id !== over.id) {
      setData((rows) => {
        const oldIndex = dataIds.indexOf(active.id)
        const newIndex = dataIds.indexOf(over.id)
        return arrayMove(rows, oldIndex, newIndex)
      })
    }
  }
  return (
    <Tabs defaultValue="outline" sx={styles.dataTableTabs}>
      <div sx={styles.dataTableDiv}>
        <Label htmlFor="view-selector" sx={styles.dataTableLabel}>
          View
        </Label>
        <Select
          defaultValue="outline"
          items={[
            { label: "Outline", value: "outline" },
            { label: "Past Performance", value: "past-performance" },
            { label: "Key Personnel", value: "key-personnel" },
            { label: "Focus Documents", value: "focus-documents" },
          ]}
        >
          <SelectTrigger
            sx={styles.dataTableSelectTrigger}
            size="sm"
            id="view-selector"
          >
            <SelectValue placeholder="Select a view" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="outline">Outline</SelectItem>
              <SelectItem value="past-performance">Past Performance</SelectItem>
              <SelectItem value="key-personnel">Key Personnel</SelectItem>
              <SelectItem value="focus-documents">Focus Documents</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <TabsList sx={styles.tabsList}>
          <TabsTrigger value="outline">Outline</TabsTrigger>
          <TabsTrigger value="past-performance">
            Past Performance{" "}
            <Badge variant="secondary" sx={styles.tabBadge}>
              3
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="key-personnel">
            Key Personnel{" "}
            <Badge variant="secondary" sx={styles.tabBadge}>
              2
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="focus-documents">Focus Documents</TabsTrigger>
        </TabsList>
        <div sx={styles.dataTableDiv2}>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={<Button variant="outline" size="sm" />}
            >
              <IconPlaceholder
                lucide="Columns3Icon"
                tabler="IconLayoutColumns"
                hugeicons="LeftToRightListBulletIcon"
                phosphor="ColumnsIcon"
                remixicon="RiLayoutColumnLine"
                data-icon="inline-start"
              />
              Columns
              <IconPlaceholder
                lucide="ChevronDownIcon"
                tabler="IconChevronDown"
                hugeicons="ArrowDown01Icon"
                phosphor="CaretDownIcon"
                remixicon="RiArrowDownSLine"
                data-icon="inline-end"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              sx={styles.dataTableDropdownMenuContent}
            >
              {table
                .getAllColumns()
                .filter(
                  (column) =>
                    typeof column.accessorFn !== "undefined" &&
                    column.getCanHide()
                )
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      sx={styles.dropdownMenuCheckboxItem}
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" size="sm">
            <IconPlaceholder
              lucide="PlusIcon"
              tabler="IconPlus"
              hugeicons="Add01Icon"
              phosphor="PlusIcon"
              remixicon="RiAddLine"
            />
            <span sx={styles.dataTableSpan}>Add Section</span>
          </Button>
        </div>
      </div>
      <TabsContent value="outline" sx={styles.tabsContent}>
        <div sx={styles.dataTableDiv3}>
          <DndContext
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis]}
            onDragEnd={handleDragEnd}
            sensors={sensors}
            id={sortableId}
          >
            <Table>
              <TableHeader sx={styles.tableHeader}>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id} colSpan={header.colSpan}>
                          {header.isPlaceholder ? null : (
                            <FlexRender header={header} />
                          )}
                        </TableHead>
                      )
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody sx={styles.tableBody}>
                {table.getRowModel().rows?.length ? (
                  <SortableContext
                    items={dataIds}
                    strategy={verticalListSortingStrategy}
                  >
                    {table.getRowModel().rows.map((row) => (
                      <DraggableRow key={row.id} row={row} />
                    ))}
                  </SortableContext>
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} sx={styles.tableCell}>
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </DndContext>
        </div>
        <div sx={styles.dataTableDiv4}>
          <div sx={styles.dataTableDiv5}>
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div sx={styles.div6}>
            <div sx={styles.div7}>
              <Label htmlFor="rows-per-page" sx={styles.dataTableLabel2}>
                Rows per page
              </Label>
              <Select
                value={`${table.state.pagination.pageSize}`}
                onValueChange={(value) => {
                  table.setPageSize(Number(value))
                }}
                items={[10, 20, 30, 40, 50].map((pageSize) => ({
                  label: `${pageSize}`,
                  value: `${pageSize}`,
                }))}
              >
                <SelectTrigger
                  size="sm"
                  sx={styles.selectTrigger2}
                  id="rows-per-page"
                >
                  <SelectValue placeholder={table.state.pagination.pageSize} />
                </SelectTrigger>
                <SelectContent side="top">
                  <SelectGroup>
                    {[10, 20, 30, 40, 50].map((pageSize) => (
                      <SelectItem key={pageSize} value={`${pageSize}`}>
                        {pageSize}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div sx={styles.div8}>
              Page {table.state.pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </div>
            <div sx={styles.div9}>
              <Button
                variant="outline"
                sx={styles.dataTableButton}
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <span sx={styles.span2}>Go to first page</span>
                <IconPlaceholder
                  lucide="ChevronsLeftIcon"
                  tabler="IconChevronsLeft"
                  hugeicons="ArrowLeftDoubleIcon"
                  phosphor="CaretDoubleLeftIcon"
                  remixicon="RiSkipLeftLine"
                />
              </Button>
              <Button
                variant="outline"
                sx={styles.button2}
                size="icon"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <span sx={styles.span3}>Go to previous page</span>
                <IconPlaceholder
                  lucide="ChevronLeftIcon"
                  tabler="IconChevronLeft"
                  hugeicons="ArrowLeft01Icon"
                  phosphor="CaretLeftIcon"
                  remixicon="RiArrowLeftSLine"
                />
              </Button>
              <Button
                variant="outline"
                sx={styles.button3}
                size="icon"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <span sx={styles.span4}>Go to next page</span>
                <IconPlaceholder
                  lucide="ChevronRightIcon"
                  tabler="IconChevronRight"
                  hugeicons="ArrowRight01Icon"
                  phosphor="CaretRightIcon"
                  remixicon="RiArrowRightSLine"
                />
              </Button>
              <Button
                variant="outline"
                sx={styles.button4}
                size="icon"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <span sx={styles.span5}>Go to last page</span>
                <IconPlaceholder
                  lucide="ChevronsRightIcon"
                  tabler="IconChevronsRight"
                  hugeicons="ArrowRightDoubleIcon"
                  phosphor="CaretDoubleRightIcon"
                  remixicon="RiSkipRightLine"
                />
              </Button>
            </div>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="past-performance" sx={styles.tabsContent2}>
        <div sx={styles.div10}></div>
      </TabsContent>
      <TabsContent value="key-personnel" sx={styles.tabsContent3}>
        <div sx={styles.div11}></div>
      </TabsContent>
      <TabsContent value="focus-documents" sx={styles.tabsContent4}>
        <div sx={styles.div12}></div>
      </TabsContent>
    </Tabs>
  )
}
const chartData = [
  {
    month: "January",
    desktop: 186,
    mobile: 80,
  },
  {
    month: "February",
    desktop: 305,
    mobile: 200,
  },
  {
    month: "March",
    desktop: 237,
    mobile: 120,
  },
  {
    month: "April",
    desktop: 73,
    mobile: 190,
  },
  {
    month: "May",
    desktop: 209,
    mobile: 130,
  },
  {
    month: "June",
    desktop: 214,
    mobile: 140,
  },
]
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: theme.primary,
  },
  mobile: {
    label: "Mobile",
    color: theme.primary,
  },
} satisfies ChartConfig
const SERIES = ["mobile", "desktop"] as const

/** Each area's fill: its colour at Recharts' `fillOpacity`. */
const FILL = {
  mobile: "color-mix(in oklab, var(--color-mobile) 60%, transparent)",
  desktop: "color-mix(in oklab, var(--color-desktop) 40%, transparent)",
}

const layers = chartData.flatMap((row) => {
  let base = 0
  return SERIES.map((series) => {
    const y1 = base
    base += row[series]
    return { month: row.month, series, value: row[series], y1, y2: base }
  })
})

const curve = d3Curve(curveNatural)
const y = niceTicks(layers.map((layer) => layer.y2))

/**
 * The drawer's chart, on TanStack Charts (upstream's is Recharts): the six months' visitors
 * stacked, each layer filled and edged in its colour, the month axis hidden, the registry's
 * `chart-area-stacked` otherwise.
 */
const chart = defineChart(
  {
    marks: [
      areaY(layers, {
        id: "visitors",
        x: "month",
        y: "value",
        y1: "y1",
        y2: "y2",
        z: "series",
        curve,
        fill: (layer) => FILL[layer.series],
        fillOpacity: 1,
      }),
      // Each layer's top edge, Recharts' area stroke; the tooltip reads the areas.
      decorative(
        lineY(layers, {
          x: "month",
          y: "y2",
          z: "series",
          curve,
          stroke: (layer) => `var(--color-${layer.series})`,
          strokeWidth: 1,
        })
      ),
      // Recharts' active dot on each layer at the focused month.
      whenFocused(
        dot(layers, {
          x: "month",
          y: "y2",
          r: 4,
          color: "series",
          stroke: theme.background,
          strokeWidth: 2,
        }),
        { match: "x" }
      ),
    ],
    scales: {
      x: { scale: () => scalePoint<string>(), axis: false },
      y: {
        scale: scaleLinear().domain(y.domain),
        grid: true,
        axis: hiddenAxis(y.ticks),
      },
    },
    margin: { left: 0, right: 10 },
    color: {
      domain: SERIES,
      range: SERIES.map((series) => `var(--color-${series})`),
    },
    theme: chartTheme,
  },
  {
    focus: "group-x",
    // Recharts lists the series in the order it draws them, bottom layer first.
    tooltip: {
      ...chartTooltip,
      sort: (left, right) =>
        SERIES.indexOf(left.datum.series) - SERIES.indexOf(right.datum.series),
    },
  }
)

function TableCellViewer({ item }: { item: z.infer<typeof schema> }) {
  const isMobile = useIsMobile()
  return (
    <Drawer swipeDirection={isMobile ? "down" : "right"}>
      <DrawerTrigger
        render={<Button variant="link" sx={styles.tableCellViewerButton} />}
      >
        {item.header}
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader sx={styles.tableCellViewerDrawerHeader}>
          <DrawerTitle>{item.header}</DrawerTitle>
          <DrawerDescription>
            Showing total visitors for the last 6 months
          </DrawerDescription>
        </DrawerHeader>
        <div sx={styles.tableCellViewerDiv}>
          {!isMobile && (
            <>
              <ChartContainer
                config={chartConfig}
                definition={chart}
                ariaLabel="Desktop and mobile visitors, January to June"
                initialWidth={400}
                tooltip={<ChartTooltipContent indicator="dot" />}
              />
              <Separator />
              <div sx={styles.tableCellViewerDiv2}>
                <div sx={styles.tableCellViewerDiv3}>
                  Trending up by 5.2% this month{" "}
                  <IconPlaceholder
                    lucide="TrendingUpIcon"
                    tabler="IconTrendingUp"
                    hugeicons="ChartUpIcon"
                    phosphor="TrendUpIcon"
                    remixicon="RiArrowUpLine"
                    {...styleProps(styles.tableCellViewerIconPlaceholder)}
                  />
                </div>
                <div sx={styles.tableCellViewerDiv4}>
                  Showing total visitors for the last 6 months. This is just
                  some random text to test the layout. It spans multiple lines
                  and should wrap around.
                </div>
              </div>
              <Separator />
            </>
          )}
          <form sx={styles.tableCellViewerForm}>
            <div sx={styles.tableCellViewerDiv5}>
              <Label htmlFor="header">Header</Label>
              <Input id="header" defaultValue={item.header} />
            </div>
            <div sx={styles.tableCellViewerDiv6}>
              <div sx={styles.tableCellViewerDiv7}>
                <Label htmlFor="type">Type</Label>
                <Select
                  defaultValue={item.type}
                  items={[
                    { label: "Table of Contents", value: "Table of Contents" },
                    { label: "Executive Summary", value: "Executive Summary" },
                    {
                      label: "Technical Approach",
                      value: "Technical Approach",
                    },
                    { label: "Design", value: "Design" },
                    { label: "Capabilities", value: "Capabilities" },
                    { label: "Focus Documents", value: "Focus Documents" },
                    { label: "Narrative", value: "Narrative" },
                    { label: "Cover Page", value: "Cover Page" },
                  ]}
                >
                  <SelectTrigger
                    id="type"
                    sx={styles.tableCellViewerSelectTrigger}
                  >
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Table of Contents">
                        Table of Contents
                      </SelectItem>
                      <SelectItem value="Executive Summary">
                        Executive Summary
                      </SelectItem>
                      <SelectItem value="Technical Approach">
                        Technical Approach
                      </SelectItem>
                      <SelectItem value="Design">Design</SelectItem>
                      <SelectItem value="Capabilities">Capabilities</SelectItem>
                      <SelectItem value="Focus Documents">
                        Focus Documents
                      </SelectItem>
                      <SelectItem value="Narrative">Narrative</SelectItem>
                      <SelectItem value="Cover Page">Cover Page</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div sx={styles.tableCellViewerDiv8}>
                <Label htmlFor="status">Status</Label>
                <Select
                  defaultValue={item.status}
                  items={[
                    { label: "Done", value: "Done" },
                    { label: "In Progress", value: "In Progress" },
                    { label: "Not Started", value: "Not Started" },
                  ]}
                >
                  <SelectTrigger
                    id="status"
                    sx={styles.tableCellViewerSelectTrigger2}
                  >
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Done">Done</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Not Started">Not Started</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div sx={styles.tableCellViewerDiv9}>
              <div sx={styles.tableCellViewerDiv10}>
                <Label htmlFor="target">Target</Label>
                <Input id="target" defaultValue={item.target} />
              </div>
              <div sx={styles.tableCellViewerDiv11}>
                <Label htmlFor="limit">Limit</Label>
                <Input id="limit" defaultValue={item.limit} />
              </div>
            </div>
            <div sx={styles.tableCellViewerDiv12}>
              <Label htmlFor="reviewer">Reviewer</Label>
              <Select
                defaultValue={item.reviewer}
                items={[
                  { label: "Eddie Lake", value: "Eddie Lake" },
                  { label: "Jamik Tashpulatov", value: "Jamik Tashpulatov" },
                  { label: "Emily Whalen", value: "Emily Whalen" },
                ]}
              >
                <SelectTrigger
                  id="reviewer"
                  sx={styles.tableCellViewerSelectTrigger3}
                >
                  <SelectValue placeholder="Select a reviewer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Eddie Lake">Eddie Lake</SelectItem>
                    <SelectItem value="Jamik Tashpulatov">
                      Jamik Tashpulatov
                    </SelectItem>
                    <SelectItem value="Emily Whalen">Emily Whalen</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </form>
        </div>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose render={<Button variant="outline" />}>Done</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
