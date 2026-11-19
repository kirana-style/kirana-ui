import { Component, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { calendarCtx } from "../../../../../core/context"
import { axes } from "../../../../../core/axes"
import { breakpoint, space, spacing } from "../../../../../core/scales"
import { Badge } from "../../../ui/badge"
import { Calendar } from "../../../ui/calendar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../ui/card"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "../../../ui/item"

const styles = {
  cardContent: css({
    display: { "*": null, base: "flex" },
    flexDirection: { "*": null, base: "column" },
    gap: { "*": null, base: space[4] },
  }),
  item: css({
    justifyContent: { "*": null, base: "center" },
  }),
  calendar: css({
    width: { "*": null, base: "100%" },
    [calendarCtx.cellSize]: {
      "*": null,
      base: spacing(8),
      [breakpoint.md]: spacing(10),
      [axes.style.sera]: {
        [breakpoint.md]: spacing(9),
      },
    },
  }),
  itemGroup: css({
    width: { "*": null, base: "100%" },
  }),
}

@Component({
  selector: "kui-upcoming-payments",
  imports: [
    Badge,
    Calendar,
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    Item,
    ItemContent,
    ItemDescription,
    ItemGroup,
    ItemTitle,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    <div kuiCard>
      <div kuiCardHeader>
        <div kuiCardTitle>Upcoming Payments</div>
        <div kuiCardDescription>Select a date to view scheduled payments.</div>
      </div>
      <div kuiCardContent [sx]="styles.cardContent">
        <div kuiItem variant="outline" [sx]="styles.item">
          <div
            kuiCalendar
            mode="single"
            [(selected)]="date"
            [sx]="styles.calendar"
          ></div>
        </div>
        <div kuiItemGroup [sx]="styles.itemGroup">
          <div kuiItem variant="muted">
            <div kuiItemContent>
              <div kuiItemTitle>Netflix Subscription</div>
              <p kuiItemDescription>Apr 15, 2024</p>
            </div>
            <span kuiBadge variant="secondary">$19.99</span>
          </div>
          <div kuiItem variant="muted">
            <div kuiItemContent>
              <div kuiItemTitle>Rent Payment</div>
              <p kuiItemDescription>Apr 1, 2024</p>
            </div>
            <span kuiBadge variant="secondary">$2,400.00</span>
          </div>
          <div kuiItem variant="muted">
            <div kuiItemContent>
              <div kuiItemTitle>Auto Insurance</div>
              <p kuiItemDescription>Apr 22, 2024</p>
            </div>
            <span kuiBadge variant="secondary">$186.00</span>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class UpcomingPayments {
  protected readonly date = signal<Date | undefined>(new Date())
  protected readonly styles = styles
}
