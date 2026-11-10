<script setup lang="ts">
import { ref } from "vue"
import IconPlaceholder from "../../../icons/IconPlaceholder.vue"
import { format } from "date-fns"
import { Button } from "../ui/button"
import { Calendar } from "../ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { css } from "@kirana-style/core"
import { theme } from "../../../core/tokens"
import { fontWeight, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  button: css({
    width: { "*": null, base: "212px" },
    justifyContent: { "*": null, base: "space-between" },
    textAlign: { "*": null, base: "left" },
    fontWeight: { "*": null, base: fontWeight.normal },
    color: { '[data-empty="true"]': theme.mutedForeground },
  }),
  popoverContent: css({
    width: { "*": null, base: "auto" },
    padding: { "*": null, base: space["0"] },
  }),
}

const date = ref<Date>()
</script>

<template>
  <div :sx="page.example">
    <Popover>
      <PopoverTrigger as-child>
        <Button variant="outline" :data-empty="!date" :sx="styles.button">
          <template v-if="date">{{ format(date, "PPP") }}</template>
          <span v-else> Pick a date </span>
          <IconPlaceholder
            lucide="ChevronDownIcon"
            tabler="IconChevronDown"
            hugeicons="ArrowDown01Icon"
            phosphor="CaretDownIcon"
            remixicon="RiArrowDownSLine"
            data-icon="inline-end"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent :sx="styles.popoverContent" align="start">
        <Calendar mode="single" v-model:selected="date" :default-month="date" />
      </PopoverContent>
    </Popover>
  </div>
</template>
