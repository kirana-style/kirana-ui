import { Component, input } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { useIsMobile } from "../../../../../lib/angular/use-mobile"
import { chart, chartConfig, styles } from "./table"
import type { Item } from "./table"
import { IconPlaceholder } from "../../../../../icons/angular"
import { Button } from "../../../ui/button"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../../ui/chart"
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

const typeItems = [
  { label: "Table of Contents", value: "Table of Contents" },
  { label: "Executive Summary", value: "Executive Summary" },
  { label: "Technical Approach", value: "Technical Approach" },
  { label: "Design", value: "Design" },
  { label: "Capabilities", value: "Capabilities" },
  { label: "Focus Documents", value: "Focus Documents" },
  { label: "Narrative", value: "Narrative" },
  { label: "Cover Page", value: "Cover Page" },
]
const statusItems = [
  { label: "Done", value: "Done" },
  { label: "In Progress", value: "In Progress" },
  { label: "Not Started", value: "Not Started" },
]
const reviewerItems = [
  { label: "Eddie Lake", value: "Eddie Lake" },
  { label: "Jamik Tashpulatov", value: "Jamik Tashpulatov" },
  { label: "Emily Whalen", value: "Emily Whalen" },
]

@Component({
  selector: "kui-table-cell-viewer",
  imports: [
    Button,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
    Input,
    Label,
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Separator,
    IconPlaceholder,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    <ng-container kuiDrawer [swipeDirection]="isMobile() ? 'down' : 'right'">
      <button
        kuiButton
        kuiDrawerTrigger
        variant="link"
        [sx]="styles.tableCellViewerButton"
      >
        {{ item().header }}
      </button>
      <div kuiDrawerContent>
        <div kuiDrawerHeader [sx]="styles.tableCellViewerDrawerHeader">
          <h2 kuiDrawerTitle>{{ item().header }}</h2>
          <p kuiDrawerDescription>
            Showing total visitors for the last 6 months
          </p>
        </div>
        <div [sx]="styles.tableCellViewerDiv">
          @if (!isMobile()) {
            <div
              kuiChartContainer
              [config]="chartConfig"
              [definition]="chart"
              ariaLabel="Desktop and mobile visitors, January to June"
              [initialWidth]="400"
            >
              <ng-template kuiChartTooltip>
                <div kuiChartTooltipContent indicator="dot"></div>
              </ng-template>
            </div>
            <div kuiSeparator></div>
            <div [sx]="styles.tableCellViewerDiv2">
              <div [sx]="styles.tableCellViewerDiv3">
                Trending up by 5.2% this month
                <svg
                  iconPlaceholder
                  lucide="TrendingUpIcon"
                  tabler="IconTrendingUp"
                  hugeicons="ChartUpIcon"
                  phosphor="TrendUpIcon"
                  remixicon="RiArrowUpLine"
                  [sx]="styles.tableCellViewerIconPlaceholder"
                ></svg>
              </div>
              <div [sx]="styles.tableCellViewerDiv4">
                Showing total visitors for the last 6 months. This is just some
                random text to test the layout. It spans multiple lines and
                should wrap around.
              </div>
            </div>
            <div kuiSeparator></div>
          }
          <form [sx]="styles.tableCellViewerForm">
            <div [sx]="styles.tableCellViewerDiv5">
              <label kuiLabel for="header">Header</label>
              <input kuiInput id="header" [value]="item().header" />
            </div>
            <div [sx]="styles.tableCellViewerDiv6">
              <div [sx]="styles.tableCellViewerDiv7">
                <label kuiLabel for="type">Type</label>
                <ng-container
                  kuiSelect
                  [defaultValue]="item().type"
                  [items]="typeItems"
                >
                  <button
                    kuiSelectTrigger
                    id="type"
                    [sx]="styles.tableCellViewerSelectTrigger"
                  >
                    <span kuiSelectValue placeholder="Select a type"></span>
                  </button>
                  <div kuiSelectContent>
                    <div kuiSelectGroup>
                      <div kuiSelectItem value="Table of Contents">
                        Table of Contents
                      </div>
                      <div kuiSelectItem value="Executive Summary">
                        Executive Summary
                      </div>
                      <div kuiSelectItem value="Technical Approach">
                        Technical Approach
                      </div>
                      <div kuiSelectItem value="Design">Design</div>
                      <div kuiSelectItem value="Capabilities">Capabilities</div>
                      <div kuiSelectItem value="Focus Documents">
                        Focus Documents
                      </div>
                      <div kuiSelectItem value="Narrative">Narrative</div>
                      <div kuiSelectItem value="Cover Page">Cover Page</div>
                    </div>
                  </div>
                </ng-container>
              </div>
              <div [sx]="styles.tableCellViewerDiv8">
                <label kuiLabel for="status">Status</label>
                <ng-container
                  kuiSelect
                  [defaultValue]="item().status"
                  [items]="statusItems"
                >
                  <button
                    kuiSelectTrigger
                    id="status"
                    [sx]="styles.tableCellViewerSelectTrigger2"
                  >
                    <span kuiSelectValue placeholder="Select a status"></span>
                  </button>
                  <div kuiSelectContent>
                    <div kuiSelectGroup>
                      <div kuiSelectItem value="Done">Done</div>
                      <div kuiSelectItem value="In Progress">In Progress</div>
                      <div kuiSelectItem value="Not Started">Not Started</div>
                    </div>
                  </div>
                </ng-container>
              </div>
            </div>
            <div [sx]="styles.tableCellViewerDiv9">
              <div [sx]="styles.tableCellViewerDiv10">
                <label kuiLabel for="target">Target</label>
                <input kuiInput id="target" [value]="item().target" />
              </div>
              <div [sx]="styles.tableCellViewerDiv11">
                <label kuiLabel for="limit">Limit</label>
                <input kuiInput id="limit" [value]="item().limit" />
              </div>
            </div>
            <div [sx]="styles.tableCellViewerDiv12">
              <label kuiLabel for="reviewer">Reviewer</label>
              <ng-container
                kuiSelect
                [defaultValue]="item().reviewer"
                [items]="reviewerItems"
              >
                <button
                  kuiSelectTrigger
                  id="reviewer"
                  [sx]="styles.tableCellViewerSelectTrigger3"
                >
                  <span kuiSelectValue placeholder="Select a reviewer"></span>
                </button>
                <div kuiSelectContent>
                  <div kuiSelectGroup>
                    <div kuiSelectItem value="Eddie Lake">Eddie Lake</div>
                    <div kuiSelectItem value="Jamik Tashpulatov">
                      Jamik Tashpulatov
                    </div>
                    <div kuiSelectItem value="Emily Whalen">Emily Whalen</div>
                  </div>
                </div>
              </ng-container>
            </div>
          </form>
        </div>
        <div kuiDrawerFooter>
          <button kuiButton>Submit</button>
          <button kuiButton kuiDrawerClose variant="outline">Done</button>
        </div>
      </div>
    </ng-container>
  `,
})
export class TableCellViewer {
  readonly item = input.required<Item>()
  protected readonly isMobile = useIsMobile()
  protected readonly typeItems = typeItems
  protected readonly statusItems = statusItems
  protected readonly reviewerItems = reviewerItems
  protected readonly chart = chart
  protected readonly chartConfig = chartConfig
  protected readonly styles = styles
}
