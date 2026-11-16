<script setup lang="ts">
import { ref } from "vue"
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
    overflow: { "*": null, base: "hidden" },
    padding: { "*": null, base: space["0"] },
  }),
}

const open = ref(false)
const date = ref<Date | undefined>(undefined)
</script>

<template>
  <div :sx="page.example">
    <Field :sx="styles.datePickerSimpleField">
      <FieldLabel for="date"> Date of birth </FieldLabel>
      <Popover v-model:open="open">
        <PopoverTrigger as-child>
          <Button
            variant="outline"
            id="date"
            :sx="styles.datePickerSimpleButton"
          >
            {{ date ? date.toLocaleDateString() : "Select date" }}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          :sx="styles.datePickerSimplePopoverContent"
          align="start"
        >
          <Calendar
            mode="single"
            :selected="date"
            :default-month="date"
            caption-layout="dropdown"
            @update:selected="
              (selected: Date | undefined) => {
                date = selected
                open = false
              }
            "
          />
        </PopoverContent>
      </Popover>
    </Field>
  </div>
</template>
