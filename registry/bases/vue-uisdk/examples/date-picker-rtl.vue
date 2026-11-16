<script setup lang="ts">
import { DirectionProvider } from "../ui/direction"
import { computed, ref } from "vue"
import IconPlaceholder from "../../../icons/IconPlaceholder.vue"
import { format } from "date-fns"
import { arSA, he } from "date-fns/locale"
import { useTranslation } from "../components/language-selector"
import type { Translations } from "../components/language-selector"
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

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      placeholder: "Pick a date",
    },
  },
  ar: {
    dir: "rtl",
    values: {
      placeholder: "اختر تاريخًا",
    },
  },
  he: {
    dir: "rtl",
    values: {
      placeholder: "בחר תאריך",
    },
  },
}

const dateFnsLocales = {
  ar: arSA,
  he: he,
} as const

const { dir, t, language, locale } = useTranslation(translations, "ar")
const date = ref<Date>()
const dateFnsLocale = computed(() =>
  dir.value === "rtl"
    ? dateFnsLocales[language.value as keyof typeof dateFnsLocales]
    : undefined
)
</script>

<template>
  <DirectionProvider :locale="locale">
    <div :sx="page.example">
      <Popover>
        <PopoverTrigger as-child>
          <Button
            variant="outline"
            :data-empty="!date"
            :sx="styles.button"
            :dir="dir"
          >
            <template v-if="date">{{
              format(date, "PPP", { locale: dateFnsLocale })
            }}</template>
            <span v-else>
              {{ t.placeholder }}
            </span>
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
        <PopoverContent :sx="styles.popoverContent" align="start" :dir="dir">
          <!-- Sunday first, as React's date-fns locales; Ark starts an Arabic week on Saturday. -->
          <Calendar
            mode="single"
            v-model:selected="date"
            :default-month="date"
            :dir="dir"
            :locale="dir === 'rtl' ? locale : undefined"
            :week-starts-on="0"
          />
        </PopoverContent>
      </Popover>
    </div>
  </DirectionProvider>
</template>
