import { CalendarSingle } from "../components/calendar-example/calendar-single"
import { CalendarWeekNumbers } from "../components/calendar-example/calendar-week-numbers"
import { CalendarBookedDates } from "../components/calendar-example/calendar-booked-dates"
import { CalendarRange } from "../components/calendar-example/calendar-range"
import { CalendarRangeMultipleMonths } from "../components/calendar-example/calendar-range-multiple-months"
import { CalendarWithTime } from "../components/calendar-example/calendar-with-time"
import { CalendarWithPresets } from "../components/calendar-example/calendar-with-presets"
import { CalendarCustomDays } from "../components/calendar-example/calendar-custom-days"
import { DatePickerSimple } from "../components/calendar-example/date-picker-simple"
import { DataPickerWithDropdowns } from "../components/calendar-example/data-picker-with-dropdowns"
import { DatePickerWithRange } from "../components/calendar-example/date-picker-with-range"
import { css } from "@kirana-style/core"
import { Example, ExampleWrapper } from "../components/example"
import { Button } from "../ui/button"
import { Calendar } from "../ui/calendar"
import { Card, CardContent } from "../ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { IconPlaceholder } from "../ui/icon-placeholder"
import { fontWeight, spacing } from "../../../core/scales"

export default function CalendarExample() {
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

  return (
    <ExampleWrapper>
      <CalendarSingle />
      <Example title="Multiple">
        <Card sx={styles.mxAutoWFitP0}>
          <CardContent sx={styles.p0}>
            <Calendar mode="multiple" />
          </CardContent>
        </Card>
      </Example>
      <CalendarWeekNumbers />
      <CalendarBookedDates />
      <CalendarRange />
      <CalendarRangeMultipleMonths />
      <CalendarWithTime />
      <CalendarWithPresets />
      <CalendarCustomDays />
      <DatePickerSimple />
      <DataPickerWithDropdowns />
      <DatePickerWithRange />
      <Example title="In Card">
        <Card sx={styles.mxAutoWFitP0}>
          <CardContent sx={styles.p0}>
            <Calendar mode="single" />
          </CardContent>
        </Card>
      </Example>
      <Example title="In Popover">
        <Popover>
          <PopoverTrigger
            asChild={(props) => (
              <Button {...props()} variant="outline" sx={styles.px25FontNormal}>
                <IconPlaceholder
                  lucide="CalendarIcon"
                  tabler="IconCalendar"
                  hugeicons="CalendarIcon"
                  phosphor="CalendarBlankIcon"
                  remixicon="RiCalendarLine"
                  data-icon="inline-start"
                />{" "}
                Open Calendar
              </Button>
            )}
          />
          <PopoverContent sx={styles.wAutoP0} align="start">
            <Calendar mode="single" />
          </PopoverContent>
        </Popover>
      </Example>
    </ExampleWrapper>
  )
}
