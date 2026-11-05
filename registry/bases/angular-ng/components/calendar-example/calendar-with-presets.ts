import { Component, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { addDays } from "date-fns"
import { space, spacing } from "../../../../core/scales"
import { theme } from "../../../../core/tokens"
import { calendarCtx, cardCtx } from "../../../../core/context"
import { Example } from "../../components/example"
import { Button } from "../../ui/button"
import { Calendar } from "../../ui/calendar"
import { Card, CardContent, CardFooter } from "../../ui/card"

const styles = {
  mxAutoWFitMaxW300Px: css({
    marginInline: "auto",
    width: "fit-content",
    maxWidth: { "*": null, base: "300px" },
  }),
  p0CellSizeSpacing95: css({
    padding: { "*": null, base: "0" },
    [calendarCtx.cellSize]: { "*": null, base: spacing(9.5) },
  }),
  flexFlexWrapGap2BorderT: css({
    display: "flex",
    flexWrap: "wrap",
    gap: { "*": null, base: space[2] },
    borderTopWidth: "1px",
    borderTopColor: theme.border,
    // The footer's `[.border-t]:pt-(--card-spacing)`, which a class name cannot reach here.
    paddingBlockStart: cardCtx.spacing,
  }),
  flex1: css({ flex: 1 }),
}

@Component({
  selector: "kui-calendar-with-presets",
  imports: [
    Button,
    Calendar,
    Card,
    CardContent,
    CardFooter,
    Example,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    <div kuiExample title="With Presets">
      <div kuiCard [sx]="styles.mxAutoWFitMaxW300Px" size="sm">
        <div kuiCardContent>
          <div
            kuiCalendar
            mode="single"
            [(selected)]="date"
            [(month)]="currentMonth"
            fixedWeeks
            [sx]="styles.p0CellSizeSpacing95"
          ></div>
        </div>
        <div kuiCardFooter [sx]="styles.flexFlexWrapGap2BorderT">
          @for (
            preset of [
              { label: "Today", value: 0 },
              { label: "Tomorrow", value: 1 },
              { label: "In 3 days", value: 3 },
              { label: "In a week", value: 7 },
              { label: "In 2 weeks", value: 14 },
            ];
            track preset.value
          ) {
            <button
              kuiButton
              variant="outline"
              size="sm"
              [sx]="styles.flex1"
              (click)="choose(preset.value)"
            >
              {{ preset.label }}
            </button>
          }
        </div>
      </div>
    </div>
  `,
})
export class CalendarWithPresets {
  protected readonly date = signal<Date | undefined>(
    new Date(new Date().getFullYear(), 1, 12)
  )
  protected readonly currentMonth = signal<Date>(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  )
  protected readonly styles = styles
  protected readonly addDays = addDays

  protected choose(days: number) {
    const date = addDays(new Date(), days)
    this.date.set(date)
    this.currentMonth.set(new Date(date.getFullYear(), date.getMonth(), 1))
  }
}
