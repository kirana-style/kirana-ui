import { IconPlaceholder } from "../../../icons/icon-placeholder"
import * as React from "react"
import { format } from "date-fns"
import { arSA, he } from "date-fns/locale"
import {
  arSA as arSADayPicker,
  he as heDayPicker,
} from "react-day-picker/locale"

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

const dayPickerLocales = {
  ar: arSADayPicker,
  he: heDayPicker,
} as const

const dateFnsLocales = {
  ar: arSA,
  he: he,
} as const

export default function DatePickerRtl() {
  const { dir, t, language } = useTranslation(translations, "ar")
  const [date, setDate] = React.useState<Date>()

  const dateFnsLocale =
    dir === "rtl"
      ? dateFnsLocales[language as keyof typeof dateFnsLocales]
      : undefined
  const dayPickerLocale =
    dir === "rtl"
      ? dayPickerLocales[language as keyof typeof dayPickerLocales]
      : undefined

  return (
    <div sx={page.example}>
      <Popover>
        <PopoverTrigger
          render={
            <Button
              variant={"outline"}
              data-empty={!date}
              sx={styles.button}
              dir={dir}
            />
          }
        >
          {date ? (
            format(date, "PPP", { locale: dateFnsLocale })
          ) : (
            <span>{t.placeholder}</span>
          )}
          <IconPlaceholder
            lucide="ChevronDownIcon"
            tabler="IconChevronDown"
            hugeicons="ArrowDown01Icon"
            phosphor="CaretDownIcon"
            remixicon="RiArrowDownSLine"
            data-icon="inline-end"
          />
        </PopoverTrigger>
        <PopoverContent sx={styles.popoverContent} align="start" dir={dir}>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            defaultMonth={date}
            dir={dir}
            locale={dayPickerLocale}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
