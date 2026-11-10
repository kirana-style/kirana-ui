<script setup lang="ts">
import { ref } from "vue"
import { css } from "@kirana-style/core"
import { format } from "date-fns"
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

const date = ref<Date>()
</script>

<template>
  <Example title="Date Picker Simple">
    <Field :sx="styles.w72">
      <FieldLabel for="date-picker-simple"> Date </FieldLabel>
      <Popover>
        <PopoverTrigger as-child>
          <Button
            variant="outline"
            id="date-picker-simple"
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
            <template v-if="date">{{ format(date, "PPP") }}</template>
            <span v-else> Pick a date </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent :sx="styles.wAutoP0" align="start">
          <Calendar mode="single" v-model:selected="date" />
        </PopoverContent>
      </Popover>
    </Field>
  </Example>
</template>
