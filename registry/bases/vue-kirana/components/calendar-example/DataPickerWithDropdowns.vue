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
import { theme } from "../../../../core/tokens"

const styles = {
  wAutoP0: css({ width: "auto", padding: { "*": null, base: "0" } }),
  w72: css({ marginInline: "auto", width: { "*": null, base: space[72] } }),
  justifyStartPx25FontNorm: css({
    justifyContent: "flex-start",
    paddingInline: { "*": null, base: spacing(2.5) },
    fontWeight: { "*": null, base: fontWeight.normal },
  }),
  mlAuto: css({ marginLeft: "auto" }),
  flexGap2BorderTP2: css({
    display: "flex",
    gap: { "*": null, base: space[2] },
    borderTopWidth: "1px",
    borderTopColor: theme.border,
    padding: space[2],
  }),
  full: css({ width: "100%" }),
}

const date = ref<Date>()
const open = ref(false)
</script>

<template>
  <Example title="Date Picker with Dropdowns">
    <Field :sx="styles.w72">
      <Popover v-model:open="open">
        <FieldLabel for="date-picker-with-dropdowns-desktop"> Date </FieldLabel>
        <PopoverTrigger as-child>
          <Button
            variant="outline"
            id="date-picker-with-dropdowns-desktop"
            :sx="styles.justifyStartPx25FontNorm"
          >
            <template v-if="date">{{ format(date, "PPP") }}</template>
            <span v-else> Pick a date </span>
            <IconPlaceholder
              lucide="ChevronDownIcon"
              tabler="IconChevronDown"
              hugeicons="ArrowDownIcon"
              phosphor="CaretDownIcon"
              remixicon="RiArrowDownSLine"
              data-icon="inline-start"
              :sx="styles.mlAuto"
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent :sx="styles.wAutoP0" align="start">
          <Calendar
            mode="single"
            v-model:selected="date"
            caption-layout="dropdown"
          />
          <div :sx="styles.flexGap2BorderTP2">
            <Button
              variant="outline"
              size="sm"
              :sx="styles.full"
              @click="() => (open = false)"
            >
              Done
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </Field>
  </Example>
</template>
