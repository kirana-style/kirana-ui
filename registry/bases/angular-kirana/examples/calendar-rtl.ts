import { Component, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { useTranslation } from "../components/language-selector"
import type { Translations } from "../components/language-selector"
import { css } from "@kirana-style/core"
import { calendarCtx } from "../../../core/context"
import { radius, theme } from "../../../core/tokens"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Calendar } from "../ui/calendar"
import { DirectionProvider } from "../ui/direction"

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

@Component({
  selector: "calendar-rtl",
  imports: [Calendar, DirectionProvider, SxDirective],
  template: `
    <!-- React's demo passes date-fns' \`arSA\` and \`he\`, whose weeks start on Sunday; Ark reads the
       week from the locale's tag, and starts an Arabic one on Saturday. -->
    <ng-container kuiDirectionProvider [direction]="dir()">
      <div [sx]="page.example">
        <div
          kuiCalendar
          mode="single"
          [(selected)]="date"
          [sx]="styles.calendar"
          captionLayout="dropdown"
          [dir]="dir()"
          [locale]="dir() === 'rtl' ? locale() : undefined"
          [weekStartsOn]="0"
        ></div>
      </div>
    </ng-container>
  `,
})
export default class CalendarRtl {
  protected readonly i18n = useTranslation(translations, "ar")
  protected readonly dir = this.i18n.dir
  protected readonly locale = this.i18n.locale
  protected readonly date = signal<Date | undefined>(new Date())
  protected readonly styles = styles
  protected readonly page = page
}
