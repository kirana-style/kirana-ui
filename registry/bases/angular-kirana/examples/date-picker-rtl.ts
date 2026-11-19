import { Component, computed, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { format } from "date-fns"
import { arSA, he } from "date-fns/locale"
import { useTranslation } from "../components/language-selector"
import type { Translations } from "../components/language-selector"
import { css } from "@kirana-style/core"
import { theme } from "../../../core/tokens"
import { fontWeight, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import { Button } from "../ui/button"
import { Calendar } from "../ui/calendar"
import { DirectionProvider } from "../ui/direction"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"

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

@Component({
  selector: "date-picker-rtl",
  imports: [
    Button,
    Calendar,
    DirectionProvider,
    Popover,
    PopoverContent,
    PopoverTrigger,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <ng-container kuiDirectionProvider [direction]="dir()">
      <div [sx]="page.example">
        <ng-container kuiPopover>
          <button
            kuiButton
            kuiPopoverTrigger
            variant="outline"
            [attr.data-empty]="!date()"
            [sx]="styles.button"
            [attr.dir]="dir()"
          >
            @if (date(); as chosen) {
              {{ format(chosen, "PPP", { locale: dateFnsLocale() }) }}
            } @else {
              <span>{{ t().placeholder }}</span>
            }
            <svg
              iconPlaceholder
              lucide="ChevronDownIcon"
              tabler="IconChevronDown"
              hugeicons="ArrowDown01Icon"
              phosphor="CaretDownIcon"
              remixicon="RiArrowDownSLine"
              data-icon="inline-end"
            ></svg>
          </button>
          <div
            kuiPopoverContent
            [sx]="styles.popoverContent"
            align="start"
            [attr.dir]="dir()"
          >
            <!-- Sunday first, as React's date-fns locales; Ark starts an Arabic week on Saturday. -->
            <div
              kuiCalendar
              mode="single"
              [(selected)]="date"
              [defaultMonth]="date()"
              [dir]="dir()"
              [locale]="dir() === 'rtl' ? locale() : undefined"
              [weekStartsOn]="0"
            ></div>
          </div>
        </ng-container>
      </div>
    </ng-container>
  `,
})
export default class DatePickerRtl {
  protected readonly i18n = useTranslation(translations, "ar")
  protected readonly dir = this.i18n.dir
  protected readonly t = this.i18n.t
  protected readonly language = this.i18n.language
  protected readonly locale = this.i18n.locale
  protected readonly dateFnsLocale = computed(() =>
    this.dir() === "rtl"
      ? dateFnsLocales[this.language() as keyof typeof dateFnsLocales]
      : undefined
  )

  protected readonly date = signal<Date | undefined>(undefined)
  protected readonly styles = styles
  protected readonly format = format
  protected readonly page = page
}
