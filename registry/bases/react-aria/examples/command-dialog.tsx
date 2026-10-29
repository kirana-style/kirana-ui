import { css } from "@kirana-style/core"
import { IconPlaceholder } from "../../../icons/icon-placeholder"
import * as React from "react"

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
import {
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  space,
} from "../../../core/scales"
import { radius, theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"

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

export default function CommandDialogDemo() {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((wasOpen) => !wasOpen)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <div sx={page.example}>
      <>
        <p sx={styles.mutedSm}>
          Press{" "}
          <kbd sx={styles.kbd}>
            <span sx={styles.textXs}>⌘</span>J
          </kbd>
        </p>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList
            renderEmptyState={() => (
              <CommandEmpty>No results found.</CommandEmpty>
            )}
          >
            <CommandGroup heading="Suggestions">
              <CommandItem textValue="Calendar">
                <IconPlaceholder
                  lucide="CalendarIcon"
                  tabler="IconCalendar"
                  hugeicons="CalendarIcon"
                  phosphor="CalendarIcon"
                  remixicon="RiCalendarLine"
                />
                <span>Calendar</span>
              </CommandItem>
              <CommandItem textValue="Search Emoji">
                <IconPlaceholder
                  lucide="SmileIcon"
                  tabler="IconMoodSmile"
                  hugeicons="SmileIcon"
                  phosphor="SmileyIcon"
                  remixicon="RiEmotionLine"
                />
                <span>Search Emoji</span>
              </CommandItem>
              <CommandItem textValue="Calculator">
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
              <CommandItem textValue="Profile">
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
              <CommandItem textValue="Billing">
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
              <CommandItem textValue="Settings">
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
        </CommandDialog>
      </>
    </div>
  )
}
