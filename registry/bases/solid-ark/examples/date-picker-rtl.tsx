import { createMemo, createSignal } from "solid-js"
import { DirectionProvider } from "../ui/direction"
import { IconPlaceholder } from "../ui/icon-placeholder"
import { format } from "date-fns"
import { arSA, he } from "date-fns/locale"
import { useTranslation } from "../components/language-selector"
import { Button } from "../ui/button"
import { Calendar } from "../ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { css } from "@kirana-style/core"
import { theme } from "../../../core/tokens"
import { fontWeight, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import type { Translations } from "../components/language-selector"

export default function DatePickerRtl() {
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

  const translation = useTranslation(translations, "ar")
  const [date, setDate] = createSignal<Date>()
  const dateFnsLocale = createMemo(() =>
    translation.dir === "rtl"
      ? dateFnsLocales[translation.language as keyof typeof dateFnsLocales]
      : undefined
  )

  return (
    <DirectionProvider locale={translation.locale}>
      <div sx={page.example}>
        <Popover>
          <PopoverTrigger
            asChild={(props) => (
              <Button
                {...props()}
                variant="outline"
                data-empty={!date()}
                sx={styles.button}
                dir={translation.dir}
              >
                {date() ? (
                  format(date()!, "PPP", { locale: dateFnsLocale() })
                ) : (
                  <span>{translation.t.placeholder}</span>
                )}
                <IconPlaceholder
                  lucide="ChevronDownIcon"
                  tabler="IconChevronDown"
                  hugeicons="ArrowDown01Icon"
                  phosphor="CaretDownIcon"
                  remixicon="RiArrowDownSLine"
                  data-icon="inline-end"
                />
              </Button>
            )}
          />
          <PopoverContent
            sx={styles.popoverContent}
            align="start"
            dir={translation.dir}
          >
            <Calendar
              mode="single"
              selected={date()}
              onSelectedChange={(details: {
                selected: ReturnType<typeof date>
              }) => setDate(details.selected)}
              defaultMonth={date()}
              dir={translation.dir}
              locale={
                translation.dir === "rtl" ? translation.locale : undefined
              }
              weekStartsOn={0}
            />
          </PopoverContent>
        </Popover>
      </div>
    </DirectionProvider>
  )
}
