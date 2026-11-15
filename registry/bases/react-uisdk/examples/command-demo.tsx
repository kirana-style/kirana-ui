import { css } from "@kirana-style/core"
import { IconPlaceholder } from "../../../icons/icon-placeholder"

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
import { containerSize } from "../../../core/scales"
import { axes } from "../../../core/axes"
import { radius, theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"

const styles = {
  framed: css({
    maxWidth: containerSize.sm,
    // Nova's and Vega's corners are `rounded-xl!`: a caller's corners do not reach them.
    borderRadius: {
      "*": null,
      base: radius.lg,
      [axes.style.nova]: radius.xl,
      [axes.style.vega]: radius.xl,
    },
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: theme.border,
  }),
}

export default function CommandDemo() {
  return (
    <div sx={page.example}>
      <Command sx={styles.framed}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>
              <IconPlaceholder
                lucide="CalendarIcon"
                tabler="IconCalendar"
                hugeicons="CalendarIcon"
                phosphor="CalendarIcon"
                remixicon="RiCalendarLine"
              />
              <span>Calendar</span>
            </CommandItem>
            <CommandItem>
              <IconPlaceholder
                lucide="SmileIcon"
                tabler="IconMoodSmile"
                hugeicons="SmileIcon"
                phosphor="SmileyIcon"
                remixicon="RiEmotionLine"
              />
              <span>Search Emoji</span>
            </CommandItem>
            <CommandItem disabled>
              <IconPlaceholder
                lucide="CalculatorIcon"
                tabler="IconCalculator"
                hugeicons="CalculatorIcon"
                phosphor="CalculatorIcon"
                remixicon="RiCalculatorLine"
              />
              <span>Calculator</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>
              <IconPlaceholder
                lucide="UserIcon"
                tabler="IconUser"
                hugeicons="UserIcon"
                phosphor="UserIcon"
                remixicon="RiUserLine"
              />
              <span>Profile</span>
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
              <span>Billing</span>
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
              <span>Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  )
}
