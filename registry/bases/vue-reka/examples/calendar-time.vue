<script setup lang="ts">
import { ref } from "vue"
import { css } from "@kirana-style/core"
import { Calendar } from "../ui/calendar"
import { Card, CardContent, CardFooter } from "../ui/card"
import { Field, FieldGroup, FieldLabel } from "../ui/field"
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group"
import { theme } from "../../../core/tokens"
import IconPlaceholder from "../../../icons/IconPlaceholder.vue"
import { cardCtx } from "../../../core/context"
import { page } from "../../../styles/page.styles"

const styles = {
  mxAutoWFit: css({ marginInline: "auto", width: "fit-content" }),
  p0: css({ padding: { "*": null, base: "0" } }),
  borderTBgCard: css({
    borderTopWidth: { "*": null, base: "1px" },
    borderTopColor: theme.border,
    backgroundColor: { "*": null, base: theme.card },
    // The footer's `[.border-t]:pt-(--card-spacing)`, which a class name cannot reach here.
    paddingBlockStart: cardCtx.spacing,
  }),
  appearanceNoneWebkitCale: css({
    appearance: "none",
    "::-webkit-calendar-picker-indicator": {
      display: "none",
      appearance: "none",
    },
  }),
  textMutedForeground: css({ color: theme.mutedForeground }),
}

const date = ref<Date | undefined>(
  new Date(new Date().getFullYear(), new Date().getMonth(), 12)
)
</script>

<template>
  <div :sx="page.example">
    <Card size="sm" :sx="styles.mxAutoWFit">
      <CardContent>
        <Calendar mode="single" v-model:selected="date" :sx="styles.p0" />
      </CardContent>
      <CardFooter :sx="styles.borderTBgCard">
        <FieldGroup>
          <Field>
            <FieldLabel for="time-from"> Start Time </FieldLabel>
            <InputGroup>
              <InputGroupInput
                id="time-from"
                type="time"
                step="1"
                default-value="10:30:00"
                :sx="styles.appearanceNoneWebkitCale"
              />
              <InputGroupAddon>
                <IconPlaceholder
                  lucide="Clock2Icon"
                  tabler="IconClockHour2"
                  hugeicons="Clock03Icon"
                  phosphor="ClockIcon"
                  remixicon="RiTimeLine"
                  :sx="styles.textMutedForeground"
                />
              </InputGroupAddon>
            </InputGroup>
          </Field>
          <Field>
            <FieldLabel for="time-to"> End Time </FieldLabel>
            <InputGroup>
              <InputGroupInput
                id="time-to"
                type="time"
                step="1"
                default-value="12:30:00"
                :sx="styles.appearanceNoneWebkitCale"
              />
              <InputGroupAddon>
                <IconPlaceholder
                  lucide="Clock2Icon"
                  tabler="IconClockHour2"
                  hugeicons="Clock03Icon"
                  phosphor="ClockIcon"
                  remixicon="RiTimeLine"
                  :sx="styles.textMutedForeground"
                />
              </InputGroupAddon>
            </InputGroup>
          </Field>
        </FieldGroup>
      </CardFooter>
    </Card>
  </div>
</template>
