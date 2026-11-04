import { DirectionProvider } from "../ui/direction"
import { IconPlaceholder } from "../ui/icon-placeholder"
import { useTranslation } from "../components/language-selector"
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
import { css } from "@kirana-style/core"
import { radius, theme } from "../../../core/tokens"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import type { Translations } from "../components/language-selector"

export default function CommandRtl() {
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

  const translation = useTranslation(translations, "ar")

  return (
    <DirectionProvider locale={translation.locale}>
      <div sx={page.example}>
        <Command sx={styles.command} dir={translation.dir}>
          <CommandInput
            placeholder={translation.t.placeholder}
            dir={translation.dir}
          />
          <CommandList>
            <CommandEmpty>{translation.t.empty}</CommandEmpty>
            <CommandGroup heading={translation.t.suggestions}>
              <CommandItem>
                <IconPlaceholder
                  lucide="CalendarIcon"
                  tabler="IconCalendar"
                  hugeicons="CalendarIcon"
                  phosphor="CalendarIcon"
                  remixicon="RiCalendarLine"
                />
                <span>{translation.t.calendar}</span>
              </CommandItem>
              <CommandItem>
                <IconPlaceholder
                  lucide="SmileIcon"
                  tabler="IconMoodSmile"
                  hugeicons="SmileIcon"
                  phosphor="SmileyIcon"
                  remixicon="RiEmotionLine"
                />
                <span>{translation.t.searchEmoji}</span>
              </CommandItem>
              <CommandItem disabled>
                <IconPlaceholder
                  lucide="CalculatorIcon"
                  tabler="IconCalculator"
                  hugeicons="CalculatorIcon"
                  phosphor="CalculatorIcon"
                  remixicon="RiCalculatorLine"
                />
                <span>{translation.t.calculator}</span>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading={translation.t.settings}>
              <CommandItem>
                <IconPlaceholder
                  lucide="UserIcon"
                  tabler="IconUser"
                  hugeicons="UserIcon"
                  phosphor="UserIcon"
                  remixicon="RiUserLine"
                />
                <span>{translation.t.profile}</span>
                <CommandShortcut>⌘P</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <IconPlaceholder
                  lucide="CreditCardIcon"
                  tabler="IconCreditCard"
                  hugeicons="CreditCardIcon"
                  phosphor="CreditCardIcon"
                  remixicon="RiBankCardLine"
                />
                <span>{translation.t.billing}</span>
                <CommandShortcut>⌘B</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <IconPlaceholder
                  lucide="SettingsIcon"
                  tabler="IconSettings"
                  hugeicons="SettingsIcon"
                  phosphor="TerminalIcon"
                  remixicon="RiSettingsLine"
                />
                <span>{translation.t.settings}</span>
                <CommandShortcut>⌘S</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
    </DirectionProvider>
  )
}
