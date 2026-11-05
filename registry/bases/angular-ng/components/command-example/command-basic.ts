import { Component, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { example } from "../../../../styles/example.styles"
import { space } from "../../../../core/scales"
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
} from "../../ui/command"

const styles = {
  flexCol4: css({ display: "flex", flexDirection: "column", gap: space[4] }),
  wFit: css({ width: { "*": null, base: "fit-content" } }),
}

@Component({
  selector: "kui-command-basic",
  imports: [
    Button,
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    Example,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    <div kuiExample title="Basic">
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
              <div kuiCommandGroup heading="Suggestions">
                <div kuiCommandItem>Calendar</div>
                <div kuiCommandItem>Search Emoji</div>
                <div kuiCommandItem>Calculator</div>
              </div>
            </div>
          </div>
        </kui-command-dialog>
      </div>
    </div>
  `,
})
export class CommandBasic {
  protected readonly open = signal(false)
  protected readonly styles = styles
  protected readonly example = example
}
