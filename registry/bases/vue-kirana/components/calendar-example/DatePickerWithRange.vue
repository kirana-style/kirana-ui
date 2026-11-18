<script setup lang="ts">
import { ref } from "vue"
import { css } from "@kirana-style/core"
import { addDays, format } from "date-fns"
import type { DateRange } from "../../ui/calendar"
import { Example } from "../../components/example"
import { Button } from "../../ui/button"
import { Calendar } from "../../ui/calendar"
import { Field, FieldLabel } from "../../ui/field"
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover"
import IconPlaceholder from "../../../../icons/IconPlaceholder.vue"
import { fontWeight, space, spacing } from "../../../../core/scales"

const styles = {
  wAutoP0: css({ width: "auto", padding: { "*": null, base: "0" } }),
  w72: css({ marginInline: "auto", width: { "*": null, base: space[72] } }),
  justifyStartPx25FontNorm: css({
    justifyContent: "flex-start",
    paddingInline: { "*": null, base: spacing(2.5) },
    fontWeight: { "*": null, base: fontWeight.normal },
  }),
}

const date = ref<DateRange | undefined>({
  from: new Date(new Date().getFullYear(), 0, 20),
  to: addDays(new Date(new Date().getFullYear(), 0, 20), 20),
})
</script>

<template>
  <Example title="Date Picker Range">
    <Field :sx="styles.w72">
      <FieldLabel for="date-picker-range"> Date Picker Range </FieldLabel>
      <Popover>
        <PopoverTrigger as-child>
          <Button
            variant="outline"
            id="date-picker-range"
            :sx="styles.justifyStartPx25FontNorm"
          >
            <IconPlaceholder
              lucide="CalendarIcon"
              tabler="IconCalendar"
              hugeicons="CalendarIcon"
              phosphor="CalendarBlankIcon"
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
        <PopoverContent :sx="styles.wAutoP0" align="start">
          <Calendar
            mode="range"
            :default-month="date?.from"
            v-model:selected="date"
            :number-of-months="2"
          />
        </PopoverContent>
      </Popover>
    </Field>
  </Example>
</template>
