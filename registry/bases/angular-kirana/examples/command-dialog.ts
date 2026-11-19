import { Component, DestroyRef, inject, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import {
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  space,
} from "../../../core/scales"
import { radius, theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "../ui/command"

const styles = {
  mutedSm: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  }),
  kbd: css({
    pointerEvents: "none",
    display: "inline-flex",
    height: space[5],
    alignItems: "center",
    gap: space[1],
    borderRadius: radius.sm,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: theme.border,
    backgroundColor: theme.muted,
    paddingInline: space["1.5"],
    fontFamily: fontFamily.mono,
    fontSize: "10px",
    fontWeight: fontWeight.medium,
    color: theme.mutedForeground,
    opacity: 1,
    userSelect: "none",
  }),
  textXs: css({ fontSize: fontSize.xs, lineHeight: lineHeight.xs }),
}

@Component({
  selector: "command-dialog",
  imports: [
    CommandDialog,
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
      <p [sx]="styles.mutedSm">
        Press{{ " " }}
        <kbd [sx]="styles.kbd">
          <span [sx]="styles.textXs">⌘</span>
          J
        </kbd>
      </p>
      <kui-command-dialog [(open)]="open">
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
            <div kuiCommandItem>
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
      </kui-command-dialog>
    </div>
  `,
})
export default class CommandDialogExample {
  protected readonly open = signal(false)

  constructor() {
    // ⌘J or Ctrl+J opens and closes it.
    const down = (event: KeyboardEvent) => {
      if (event.key === "j" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        this.open.update((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    inject(DestroyRef).onDestroy(() =>
      document.removeEventListener("keydown", down)
    )
  }
  protected readonly styles = styles
  protected readonly page = page
}
