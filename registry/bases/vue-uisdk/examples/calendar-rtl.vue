<script setup lang="ts">
import { DirectionProvider } from "../ui/direction"
import { ref } from "vue"
import { useTranslation } from "../components/language-selector"
import type { Translations } from "../components/language-selector"
import { Calendar } from "../ui/calendar"
import { css } from "@kirana-style/core"
import { calendarCtx } from "../../../core/context"
import { radius, theme } from "../../../core/tokens"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  // `rounded-lg border [--cell-size:--spacing(9)]`: the border in its colour (upstream's base layer
  // gives every border `border-border`), the cell size through the calendar's own variable.
  calendar: css({
    borderRadius: { "*": null, base: radius.lg },
    borderStyle: { "*": null, base: "solid" },
    borderWidth: { "*": null, base: "1px" },
    borderColor: theme.border,
    [calendarCtx.cellSize]: { "*": null, base: space[9] },
  }),
}

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {},
  },
  ar: {
    dir: "rtl",
    values: {},
  },
  he: {
    dir: "rtl",
    values: {},
  },
}

const { dir, locale } = useTranslation(translations, "ar")
const date = ref<Date | undefined>(new Date())
</script>

<template>
  <!-- React's demo passes date-fns' `arSA` and `he`, whose weeks start on Sunday; Ark reads the
       week from the locale's tag, and starts an Arabic one on Saturday. -->
  <DirectionProvider :locale="locale">
    <div :sx="page.example">
      <Calendar
        mode="single"
        v-model:selected="date"
        :sx="styles.calendar"
        caption-layout="dropdown"
        :dir="dir"
        :locale="dir === 'rtl' ? locale : undefined"
        :week-starts-on="0"
      />
    </div>
  </DirectionProvider>
</template>
