import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { useTranslation } from "../components/language-selector"
import type { Translations } from "../components/language-selector"
import { css } from "@kirana-style/core"
import { radius, theme } from "../../../core/tokens"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "../ui/command"
import { DirectionProvider } from "../ui/direction"

const styles = {
  command: css({
    maxWidth: { "*": null, base: containerSize.sm },
    borderRadius: { "*": null, base: radius.lg },
    borderStyle: { "*": null, base: "solid" },
    borderWidth: { "*": null, base: "1px" },
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderColor: theme.border,
  }),
}

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      placeholder: "Type a command or search...",
      empty: "No results found.",
      suggestions: "Suggestions",
      calendar: "Calendar",
      searchEmoji: "Search Emoji",
      calculator: "Calculator",
      settings: "Settings",
      profile: "Profile",
      billing: "Billing",
    },
  },
  ar: {
    dir: "rtl",
    values: {
      placeholder: "اكتب أمرًا أو ابحث...",
      empty: "لم يتم العثور على نتائج.",
      suggestions: "اقتراحات",
      calendar: "التقويم",
      searchEmoji: "البحث عن الرموز التعبيرية",
      calculator: "الآلة الحاسبة",
      settings: "الإعدادات",
      profile: "الملف الشخصي",
      billing: "الفوترة",
    },
  },
  he: {
    dir: "rtl",
    values: {
      placeholder: "הקלד פקודה או חפש...",
      empty: "לא נמצאו תוצאות.",
      suggestions: "הצעות",
      calendar: "לוח שנה",
      searchEmoji: "חפש אמוג'י",
      calculator: "מחשבון",
      settings: "הגדרות",
      profile: "פרופיל",
      billing: "חיוב",
    },
  },
}

@Component({
  selector: "command-rtl",
  imports: [
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
    DirectionProvider,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <ng-container kuiDirectionProvider [direction]="dir()">
      <div [sx]="page.example">
        <div kuiCommand [sx]="styles.command" [attr.dir]="dir()">
          <div
            kuiCommandInput
            [placeholder]="t().placeholder"
            [attr.dir]="dir()"
          ></div>
          <div kuiCommandList>
            <div kuiCommandEmpty>{{ t().empty }}</div>
            <div kuiCommandGroup [heading]="t().suggestions">
              <div kuiCommandItem>
                <svg
                  iconPlaceholder
                  lucide="CalendarIcon"
                  tabler="IconCalendar"
                  hugeicons="CalendarIcon"
                  phosphor="CalendarIcon"
                  remixicon="RiCalendarLine"
                ></svg>
                <span>{{ t().calendar }}</span>
              </div>
              <div kuiCommandItem>
                <svg
                  iconPlaceholder
                  lucide="SmileIcon"
                  tabler="IconMoodSmile"
                  hugeicons="SmileIcon"
                  phosphor="SmileyIcon"
                  remixicon="RiEmotionLine"
                ></svg>
                <span>{{ t().searchEmoji }}</span>
              </div>
              <div kuiCommandItem disabled>
                <svg
                  iconPlaceholder
                  lucide="CalculatorIcon"
                  tabler="IconCalculator"
                  hugeicons="CalculatorIcon"
                  phosphor="CalculatorIcon"
                  remixicon="RiCalculatorLine"
                ></svg>
                <span>{{ t().calculator }}</span>
              </div>
            </div>
            <div kuiCommandSeparator></div>
            <div kuiCommandGroup [heading]="t().settings">
              <div kuiCommandItem>
                <svg
                  iconPlaceholder
                  lucide="UserIcon"
                  tabler="IconUser"
                  hugeicons="UserIcon"
                  phosphor="UserIcon"
                  remixicon="RiUserLine"
                ></svg>
                <span>{{ t().profile }}</span>
                <span kuiCommandShortcut>⌘P</span>
              </div>
              <div kuiCommandItem>
                <svg
                  iconPlaceholder
                  lucide="CreditCardIcon"
                  tabler="IconCreditCard"
                  hugeicons="CreditCardIcon"
                  phosphor="CreditCardIcon"
                  remixicon="RiBankCardLine"
                ></svg>
                <span>{{ t().billing }}</span>
                <span kuiCommandShortcut>⌘B</span>
              </div>
              <div kuiCommandItem>
                <svg
                  iconPlaceholder
                  lucide="SettingsIcon"
                  tabler="IconSettings"
                  hugeicons="SettingsIcon"
                  phosphor="TerminalIcon"
                  remixicon="RiSettingsLine"
                ></svg>
                <span>{{ t().settings }}</span>
                <span kuiCommandShortcut>⌘S</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ng-container>
  `,
})
export default class CommandRtl {
  protected readonly i18n = useTranslation(translations, "ar")
  protected readonly dir = this.i18n.dir
  protected readonly t = this.i18n.t
  protected readonly locale = this.i18n.locale
  protected readonly styles = styles
  protected readonly page = page
}
