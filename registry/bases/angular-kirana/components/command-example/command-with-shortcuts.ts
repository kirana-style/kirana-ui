import { Component, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { example } from "../../../../styles/example.styles"
import { space } from "../../../../core/scales"
import { IconPlaceholder } from "../../../../icons/angular"
import { Example } from "../../components/example"
import { Button } from "../../ui/button"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "../../ui/command"

const styles = {
  flexCol4: css({ display: "flex", flexDirection: "column", gap: space[4] }),
  wFit: css({ width: { "*": null, base: "fit-content" } }),
}

@Component({
  selector: "kui-command-with-shortcuts",
  imports: [
    Button,
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandShortcut,
    Example,
    IconPlaceholder,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    <div kuiExample title="With Shortcuts">
      <div [sx]="[styles.flexCol4, example.row]">
        <button
          kuiButton
          (click)="open.set(true)"
          variant="outline"
          [sx]="styles.wFit"
        >
          Open Menu
        </button>
        <kui-command-dialog [(open)]="open">
          <div kuiCommand>
            <div
              kuiCommandInput
              placeholder="Type a command or search..."
            ></div>
            <div kuiCommandList>
              <div kuiCommandEmpty>No results found.</div>
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
        </kui-command-dialog>
      </div>
    </div>
  `,
})
export class CommandWithShortcuts {
  protected readonly open = signal(false)
  protected readonly styles = styles
  protected readonly example = example
}
