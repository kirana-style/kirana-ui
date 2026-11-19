import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { IconPlaceholder } from "../../../icons/angular"
import { Example, ExampleWrapper } from "../components/example"
import { Card, CardContent } from "../ui/card"
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
import { CommandBasic } from "../components/command-example/command-basic"
import { CommandManyItems } from "../components/command-example/command-many-items"
import { CommandWithGroups } from "../components/command-example/command-with-groups"
import { CommandWithShortcuts } from "../components/command-example/command-with-shortcuts"

const styles = {
  wFullP0: css({
    width: { "*": null, base: "100%" },
    padding: { "*": null, base: "0" },
  }),
  p0: css({ padding: { "*": null, base: "0" } }),
}

@Component({
  selector: "command-example",
  imports: [
    Card,
    CardContent,
    Command,
    CommandBasic,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandManyItems,
    CommandSeparator,
    CommandShortcut,
    CommandWithGroups,
    CommandWithShortcuts,
    Example,
    ExampleWrapper,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div kuiExampleWrapper>
      <!-- CommandInline -->
      <div kuiExample title="Inline">
        <div kuiCard [sx]="styles.wFullP0">
          <div kuiCardContent [sx]="styles.p0">
            <div kuiCommand>
              <div
                kuiCommandInput
                placeholder="Type a command or search..."
              ></div>
              <div kuiCommandList>
                <div kuiCommandEmpty>No results found.</div>
                <div kuiCommandGroup heading="Suggestions">
                  <div kuiCommandItem>
                    <svg
                      iconPlaceholder
                      lucide="CalendarIcon"
                      tabler="IconCalendar"
                      hugeicons="CalendarIcon"
                      phosphor="CalendarBlankIcon"
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
                      phosphor="GearIcon"
                      remixicon="RiSettingsLine"
                    ></svg>
                    <span>Settings</span>
                    <span kuiCommandShortcut>⌘S</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <kui-command-basic />
      <kui-command-with-shortcuts />
      <kui-command-with-groups />
      <kui-command-many-items />
    </div>
  `,
})
export default class CommandExample {
  protected readonly styles = styles
}
