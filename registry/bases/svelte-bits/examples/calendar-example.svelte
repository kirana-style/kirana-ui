<script lang="ts">
  import { css } from "@kirana-style/core"
  import { Example, ExampleWrapper } from "../components/example"
  import { Button } from "../ui/button"
  import { Calendar } from "../ui/calendar"
  import { Card, CardContent } from "../ui/card"
  import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
  import IconPlaceholder from "../../../icons/IconPlaceholder.svelte"
  import { fontWeight, spacing } from "../../../core/scales"
  import CalendarSingle from "../components/calendar-example/CalendarSingle.svelte"
  import CalendarWeekNumbers from "../components/calendar-example/CalendarWeekNumbers.svelte"
  import CalendarBookedDates from "../components/calendar-example/CalendarBookedDates.svelte"
  import CalendarRange from "../components/calendar-example/CalendarRange.svelte"
  import CalendarRangeMultipleMonths from "../components/calendar-example/CalendarRangeMultipleMonths.svelte"
  import CalendarWithTime from "../components/calendar-example/CalendarWithTime.svelte"
  import CalendarWithPresets from "../components/calendar-example/CalendarWithPresets.svelte"
  import CalendarCustomDays from "../components/calendar-example/CalendarCustomDays.svelte"
  import DatePickerSimple from "../components/calendar-example/DatePickerSimple.svelte"
  import DataPickerWithDropdowns from "../components/calendar-example/DataPickerWithDropdowns.svelte"
  import DatePickerWithRange from "../components/calendar-example/DatePickerWithRange.svelte"

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
</script>

<ExampleWrapper>
  <CalendarSingle />
  <!-- CalendarMultiple -->
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
  <!-- CalendarInCard -->
  <Example title="In Card">
    <Card sx={styles.mxAutoWFitP0}>
      <CardContent sx={styles.p0}>
        <Calendar mode="single" />
      </CardContent>
    </Card>
  </Example>
  <!-- CalendarInPopover -->
  <Example title="In Popover">
    <Popover>
      <PopoverTrigger>
        {#snippet asChild(props)}
          <Button {...props()} class={props().class} style={props().style} variant="outline" sx={styles.px25FontNormal}>
            <IconPlaceholder lucide="CalendarIcon" tabler="IconCalendar" hugeicons="CalendarIcon" phosphor="CalendarBlankIcon" remixicon="RiCalendarLine" data-icon="inline-start" />
            Open Calendar
          </Button>
        {/snippet}
      </PopoverTrigger>
      <PopoverContent sx={styles.wAutoP0} align="start">
        <Calendar mode="single" />
      </PopoverContent>
    </Popover>
  </Example>
</ExampleWrapper>
