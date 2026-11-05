import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize } from "../../../core/scales"
import { axes } from "../../../core/axes"
import { radius, theme } from "../../../core/tokens"
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

@Component({
  selector: "command-demo",
  imports: [
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div kuiCommand [sx]="styles.framed">
        <div kuiCommandInput placeholder="Type a command or search..."></div>
        <div kuiCommandList>
          <div kuiCommandEmpty>No results found.</div>
          <div kuiCommandGroup heading="Suggestions">
            <div kuiCommandItem>
              <svg
                iconPlaceholder
                lucide="CalendarIcon"
                tabler="IconCalendar"
                hugeicons="CalendarIcon"
                phosphor="CalendarIcon"
                remixicon="RiCalendarLine"
              ></svg>
              <span>Calendar</span>
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
              <span>Search Emoji</span>
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
              <span>Calculator</span>
            </div>
          </div>
          <div kuiCommandSeparator></div>
          <div kuiCommandGroup heading="Settings">
            <div kuiCommandItem>
              <svg
                iconPlaceholder
                lucide="UserIcon"
                tabler="IconUser"
                hugeicons="UserIcon"
                phosphor="UserIcon"
                remixicon="RiUserLine"
              ></svg>
              <span>Profile</span>
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
              <span>Billing</span>
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
              <span>Settings</span>
              <span kuiCommandShortcut>⌘S</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class CommandDemo {
  protected readonly styles = styles
  protected readonly page = page
}
