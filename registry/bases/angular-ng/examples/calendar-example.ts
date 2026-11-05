import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { fontWeight, spacing } from "../../../core/scales"
import { IconPlaceholder } from "../../../icons/angular"
import { Example, ExampleWrapper } from "../components/example"
import { Button } from "../ui/button"
import { Calendar } from "../ui/calendar"
import { Card, CardContent } from "../ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { CalendarBookedDates } from "../components/calendar-example/calendar-booked-dates"
import { CalendarCustomDays } from "../components/calendar-example/calendar-custom-days"
import { CalendarRange } from "../components/calendar-example/calendar-range"
import { CalendarRangeMultipleMonths } from "../components/calendar-example/calendar-range-multiple-months"
import { CalendarSingle } from "../components/calendar-example/calendar-single"
import { CalendarWeekNumbers } from "../components/calendar-example/calendar-week-numbers"
import { CalendarWithPresets } from "../components/calendar-example/calendar-with-presets"
import { CalendarWithTime } from "../components/calendar-example/calendar-with-time"
import { DataPickerWithDropdowns } from "../components/calendar-example/data-picker-with-dropdowns"
import { DatePickerSimple } from "../components/calendar-example/date-picker-simple"
import { DatePickerWithRange } from "../components/calendar-example/date-picker-with-range"

const styles = {
  mxAutoWFitP0: css({
    marginInline: "auto",
    width: "fit-content",
    padding: { "*": null, base: "0" },
  }),
  p0: css({ padding: { "*": null, base: "0" } }),
  px25FontNormal: css({
    paddingInline: { "*": null, base: spacing(2.5) },
    fontWeight: { "*": null, base: fontWeight.normal },
  }),
  wAutoP0: css({ width: "auto", padding: { "*": null, base: "0" } }),
}

@Component({
  selector: "calendar-example",
  imports: [
    Button,
    Calendar,
    CalendarBookedDates,
    CalendarCustomDays,
    CalendarRange,
    CalendarRangeMultipleMonths,
    CalendarSingle,
    CalendarWeekNumbers,
    CalendarWithPresets,
    CalendarWithTime,
    Card,
    CardContent,
    DataPickerWithDropdowns,
    DatePickerSimple,
    DatePickerWithRange,
    Example,
    ExampleWrapper,
    Popover,
    PopoverContent,
    PopoverTrigger,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div kuiExampleWrapper>
      <kui-calendar-single />
      <!-- CalendarMultiple -->
      <div kuiExample title="Multiple">
        <div kuiCard [sx]="styles.mxAutoWFitP0">
          <div kuiCardContent [sx]="styles.p0">
            <div kuiCalendar mode="multiple"></div>
          </div>
        </div>
      </div>
      <kui-calendar-week-numbers />
      <kui-calendar-booked-dates />
      <kui-calendar-range />
      <kui-calendar-range-multiple-months />
      <kui-calendar-with-time />
      <kui-calendar-with-presets />
      <kui-calendar-custom-days />
      <kui-date-picker-simple />
      <kui-data-picker-with-dropdowns />
      <kui-date-picker-with-range />
      <!-- CalendarInCard -->
      <div kuiExample title="In Card">
        <div kuiCard [sx]="styles.mxAutoWFitP0">
          <div kuiCardContent [sx]="styles.p0">
            <div kuiCalendar mode="single"></div>
          </div>
        </div>
      </div>
      <!-- CalendarInPopover -->
      <div kuiExample title="In Popover">
        <ng-container kuiPopover>
          <button
            kuiButton
            kuiPopoverTrigger
            variant="outline"
            [sx]="styles.px25FontNormal"
          >
            <svg
              iconPlaceholder
              lucide="CalendarIcon"
              tabler="IconCalendar"
              hugeicons="CalendarIcon"
              phosphor="CalendarBlankIcon"
              remixicon="RiCalendarLine"
              data-icon="inline-start"
            ></svg>
            Open Calendar
          </button>
          <div kuiPopoverContent [sx]="styles.wAutoP0" align="start">
            <div kuiCalendar mode="single"></div>
          </div>
        </ng-container>
      </div>
    </div>
  `,
})
export default class CalendarExample {
  protected readonly styles = styles
}
