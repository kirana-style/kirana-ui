<script setup lang="ts">
import { ref } from "vue"
import { format } from "date-fns"
import { Button } from "../ui/button"
import { Calendar } from "../ui/calendar"
import { Field, FieldLabel } from "../ui/field"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { css } from "@kirana-style/core"
import { fontWeight, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  datePickerSimpleField: css({
    marginInline: { "*": null, base: "auto" },
    width: { "*": null, base: space[44] },
  }),
  datePickerSimpleButton: css({
    justifyContent: { "*": null, base: "flex-start" },
    fontWeight: { "*": null, base: fontWeight.normal },
  }),
  datePickerSimplePopoverContent: css({
    width: { "*": null, base: "auto" },
    padding: { "*": null, base: space["0"] },
  }),
}

const date = ref<Date>()
</script>

<template>
  <div :sx="page.example">
    <Field :sx="styles.datePickerSimpleField">
      <FieldLabel for="date-picker-simple"> Date </FieldLabel>
      <Popover>
        <PopoverTrigger as-child>
          <Button
            variant="outline"
            id="date-picker-simple"
            :sx="styles.datePickerSimpleButton"
          >
            <template v-if="date">{{ format(date, "PPP") }}</template>
            <span v-else> Pick a date </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          :sx="styles.datePickerSimplePopoverContent"
          align="start"
        >
          <Calendar
            mode="single"
            v-model:selected="date"
            :default-month="date"
          />
        </PopoverContent>
      </Popover>
    </Field>
  </div>
</template>
