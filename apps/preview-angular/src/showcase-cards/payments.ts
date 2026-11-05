import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { theme } from "@workspace/registry/core/tokens"
import { space } from "@workspace/registry/core/scales"
import { IconPlaceholder } from "@workspace/registry/icons/angular"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@workspace/registry/bases/angular-ng/ui/breadcrumb"
import { Button } from "@workspace/registry/bases/angular-ng/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
} from "@workspace/registry/bases/angular-ng/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/registry/bases/angular-ng/ui/dropdown-menu"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@workspace/registry/bases/angular-ng/ui/item"

const styles = {
  cardHeader: css({
    display: { "*": null, base: "flex" },
    flexDirection: { "*": null, base: "column" },
    gap: { "*": null, base: space[3] },
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
  div: css({
    width: "100%",
  }),
  iconPlaceholder: css({
    width: space[4],
    height: space[4],
    flexShrink: "0",
    color: theme.mutedForeground,
  }),
  div2: css({
    width: "100%",
  }),
  iconPlaceholder2: css({
    width: space[4],
    height: space[4],
    flexShrink: "0",
    color: theme.mutedForeground,
  }),
  div3: css({
    width: "100%",
  }),
  iconPlaceholder3: css({
    width: space[4],
    height: space[4],
    flexShrink: "0",
    color: theme.mutedForeground,
  }),
}

@Component({
  selector: "kui-payments",
  imports: [
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
    Button,
    Card,
    CardContent,
    CardHeader,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
    Item,
    ItemContent,
    ItemDescription,
    ItemGroup,
    ItemMedia,
    ItemTitle,
    IconPlaceholder,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    <div kuiCard>
      <div kuiCardHeader [sx]="styles.cardHeader">
        <nav kuiBreadcrumb>
          <ol kuiBreadcrumbList>
            <li kuiBreadcrumbItem>
              <a kuiBreadcrumbLink href="#">Home</a>
            </li>
            <li kuiBreadcrumbSeparator></li>
            <li kuiBreadcrumbItem>
              <ng-container kuiDropdownMenu>
                <button
                  kuiButton
                  kuiDropdownMenuTrigger
                  size="icon-sm"
                  variant="ghost"
                  aria-label="Account options"
                >
                  <svg
                    iconPlaceholder
                    lucide="MoreHorizontalIcon"
                    tabler="IconDots"
                    hugeicons="MoreHorizontalCircle01Icon"
                    phosphor="DotsThreeOutlineIcon"
                    remixicon="RiMoreLine"
                  ></svg>
                  <span [sx]="styles.span">Account options</span>
                </button>
                <div kuiDropdownMenuContent align="start">
                  <div kuiDropdownMenuGroup>
                    <div kuiDropdownMenuItem>Profile</div>
                    <div kuiDropdownMenuItem>Statements</div>
                    <div kuiDropdownMenuItem>Documents</div>
                  </div>
                </div>
              </ng-container>
            </li>
            <li kuiBreadcrumbSeparator></li>
            <li kuiBreadcrumbItem>
              <span kuiBreadcrumbPage>Payments</span>
            </li>
          </ol>
        </nav>
      </div>
      <div kuiCardContent>
        <div kuiItemGroup>
          <div role="listitem" [sx]="styles.div">
            <a kuiItem variant="muted" href="#">
              <div kuiItemMedia variant="icon">
                <svg
                  iconPlaceholder
                  lucide="GaugeIcon"
                  tabler="IconGauge"
                  hugeicons="Settings01Icon"
                  phosphor="GaugeIcon"
                  remixicon="RiDashboardLine"
                ></svg>
              </div>
              <div kuiItemContent>
                <div kuiItemTitle>Change transfer limit</div>
                <p kuiItemDescription>
                  Adjust how much you can send from your balance.
                </p>
              </div>
              <svg
                iconPlaceholder
                lucide="ChevronRightIcon"
                tabler="IconChevronRight"
                hugeicons="ArrowRight01Icon"
                phosphor="CaretRightIcon"
                remixicon="RiArrowRightSLine"
                [sx]="styles.iconPlaceholder"
              ></svg>
            </a>
          </div>
          <div role="listitem" [sx]="styles.div2">
            <a kuiItem variant="muted" href="#">
              <div kuiItemMedia variant="icon">
                <svg
                  iconPlaceholder
                  lucide="CalendarIcon"
                  tabler="IconCalendar"
                  hugeicons="Calendar03Icon"
                  phosphor="CalendarIcon"
                  remixicon="RiCalendarLine"
                ></svg>
              </div>
              <div kuiItemContent>
                <div kuiItemTitle>Scheduled transfers</div>
                <p kuiItemDescription>
                  Set up a transfer to send at a later date.
                </p>
              </div>
              <svg
                iconPlaceholder
                lucide="ChevronRightIcon"
                tabler="IconChevronRight"
                hugeicons="ArrowRight01Icon"
                phosphor="CaretRightIcon"
                remixicon="RiArrowRightSLine"
                [sx]="styles.iconPlaceholder2"
              ></svg>
            </a>
          </div>
          <div role="listitem" [sx]="styles.div3">
            <a kuiItem variant="muted" href="#">
              <div kuiItemMedia variant="icon">
                <svg
                  iconPlaceholder
                  lucide="RefreshCwIcon"
                  tabler="IconRefresh"
                  hugeicons="RefreshIcon"
                  phosphor="ArrowClockwiseIcon"
                  remixicon="RiRefreshLine"
                ></svg>
              </div>
              <div kuiItemContent>
                <div kuiItemTitle>Recurring card payments</div>
                <p kuiItemDescription>
                  Manage your repeated card transactions.
                </p>
              </div>
              <svg
                iconPlaceholder
                lucide="ChevronRightIcon"
                tabler="IconChevronRight"
                hugeicons="ArrowRight01Icon"
                phosphor="CaretRightIcon"
                remixicon="RiArrowRightSLine"
                [sx]="styles.iconPlaceholder3"
              ></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class Payments {
  protected readonly styles = styles
}
