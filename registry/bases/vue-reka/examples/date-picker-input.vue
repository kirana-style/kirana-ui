<script setup lang="ts">
import { ref } from "vue"
import IconPlaceholder from "../../../icons/IconPlaceholder.vue"
import { Calendar } from "../ui/calendar"
import { Field, FieldLabel } from "../ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../ui/input-group"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  field: css({
    marginInline: { "*": null, base: "auto" },
    width: { "*": null, base: space[48] },
  }),
  span: css({
    borderWidth: "0",
    clipPath: "inset(50%)",
    height: "1px",
    margin: "-1px",
    overflow: "hidden",
    padding: "0",
    position: "absolute",
    whiteSpace: "nowrap",
    width: "1px",
  }),
  popoverContent: css({
    width: { "*": null, base: "auto" },
    overflow: { "*": null, base: "hidden" },
    padding: { "*": null, base: space["0"] },
  }),
}

function formatDate(date: Date | undefined) {
  if (!date) {
    return ""
  }

  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}

function isValidDate(date: Date | undefined) {
  if (!date) {
    return false
  }
  return !isNaN(date.getTime())
}

const open = ref(false)
const date = ref<Date | undefined>(new Date("2025-06-01"))
const month = ref<Date | undefined>(date.value)
const value = ref(formatDate(date.value))
</script>

<template>
  <div :sx="page.example">
    <Field :sx="styles.field">
      <FieldLabel for="date-required"> Subscription Date </FieldLabel>
      <InputGroup>
        <InputGroupInput
          id="date-required"
          :value="value"
          placeholder="June 01, 2025"
          @input="
            (e: Event) => {
              const parsed = new Date((e.target as HTMLInputElement).value)
              value = (e.target as HTMLInputElement).value
              if (isValidDate(parsed)) {
                date = parsed
                month = parsed
              }
            }
          "
          @keydown="
            (e: KeyboardEvent) => {
              if (e.key === 'ArrowDown') {
                e.preventDefault()
                open = true
              }
            }
          "
        />
        <InputGroupAddon align="inline-end">
          <Popover v-model:open="open">
            <PopoverTrigger as-child>
              <InputGroupButton
                id="date-picker"
                variant="ghost"
                size="icon-xs"
                aria-label="Select date"
              >
                <IconPlaceholder
                  lucide="CalendarIcon"
                  tabler="IconCalendar"
                  hugeicons="CalendarIcon"
                  phosphor="CalendarIcon"
                  remixicon="RiCalendarLine"
                />
                <span :sx="styles.span"> Select date </span>
              </InputGroupButton>
            </PopoverTrigger>
            <PopoverContent
              :sx="styles.popoverContent"
              align="end"
              :align-offset="-8"
              :side-offset="10"
            >
              <Calendar
                mode="single"
                :selected="date"
                v-model:month="month"
                @update:selected="
                  (selected: Date | undefined) => {
                    date = selected
                    value = formatDate(selected)
                    open = false
                  }
                "
              />
            </PopoverContent>
          </Popover>
        </InputGroupAddon>
      </InputGroup>
    </Field>
  </div>
</template>
