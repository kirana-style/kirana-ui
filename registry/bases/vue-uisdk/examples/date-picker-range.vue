<script setup lang="ts">
import { ref } from "vue"
import IconPlaceholder from "../../../icons/IconPlaceholder.vue"
import { addDays, format } from "date-fns"
import type { DateRange } from "../ui/calendar"
import { Button } from "../ui/button"
import { Calendar } from "../ui/calendar"
import { Field, FieldLabel } from "../ui/field"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { css } from "@kirana-style/core"
import { fontWeight, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  datePickerWithRangeField: css({
    marginInline: { "*": null, base: "auto" },
    width: { "*": null, base: space[60] },
  }),
  datePickerWithRangeButton: css({
    justifyContent: { "*": null, base: "flex-start" },
    paddingInline: { "*": null, base: space["2.5"] },
    fontWeight: { "*": null, base: fontWeight.normal },
  }),
  datePickerWithRangePopoverContent: css({
    width: { "*": null, base: "auto" },
    padding: { "*": null, base: space["0"] },
  }),
}

const date = ref<DateRange | undefined>({
  from: new Date(new Date().getFullYear(), 0, 20),
  to: addDays(new Date(new Date().getFullYear(), 0, 20), 20),
})
</script>

<template>
  <div :sx="page.example">
    <Field :sx="styles.datePickerWithRangeField">
      <FieldLabel for="date-picker-range"> Date Picker Range </FieldLabel>
      <Popover>
        <PopoverTrigger as-child>
          <Button
            variant="outline"
            id="date-picker-range"
            :sx="styles.datePickerWithRangeButton"
          >
            <IconPlaceholder
              lucide="CalendarIcon"
              tabler="IconCalendar"
              hugeicons="CalendarIcon"
              phosphor="CalendarIcon"
              remixicon="RiCalendarLine"
              data-icon="inline-start"
            />
            <template v-if="date?.from">
              <template v-if="date.to">
                {{ format(date.from, "LLL dd, y") }} -{{ " "
                }}{{ format(date.to, "LLL dd, y") }}
              </template>
              <template v-else>{{ format(date.from, "LLL dd, y") }}</template>
            </template>
            <span v-else> Pick a date </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          :sx="styles.datePickerWithRangePopoverContent"
          align="start"
        >
          <Calendar
            mode="range"
            :default-month="date?.from"
            v-model:selected="date"
            :number-of-months="2"
          />
        </PopoverContent>
      </Popover>
    </Field>
  </div>
</template>
