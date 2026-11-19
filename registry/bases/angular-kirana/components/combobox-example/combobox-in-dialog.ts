import { Component, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { toast } from "ngx-sonner"
import { breakpoint } from "../../../../core/scales"
import { visuallyHidden } from "../../../../styles/visually-hidden.styles"
import { Example } from "../../components/example"
import { Button } from "../../ui/button"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "../../ui/combobox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog"
import { Field, FieldLabel } from "../../ui/field"

const styles = {
  narrow: css({
    maxWidth: {
      "*": null,
      base: "calc(100% - 2rem)",
      [breakpoint.sm]: "425px",
    },
  }),
}

const frameworks = [
  "Next.js",
  "SvelteKit",
  "Nuxt.js",
  "Remix",
  "Astro",
] as const

@Component({
  selector: "kui-combobox-in-dialog",
  imports: [
    Button,
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    Example,
    Field,
    FieldLabel,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    <div kuiExample title="Combobox in Dialog">
      <ng-container kuiDialog [(open)]="open">
        <button kuiButton kuiDialogTrigger variant="outline">
          Open Dialog
        </button>
        <div kuiDialogContent [sx]="styles.narrow">
          <div kuiDialogHeader>
            <h2 kuiDialogTitle>Select Framework</h2>
            <p kuiDialogDescription>
              Choose your preferred framework from the list below.
            </p>
          </div>
          <div kuiField>
            <label kuiFieldLabel for="framework-dialog" [sx]="visuallyHidden"
              >Framework</label
            >
            <ng-container kuiCombobox [items]="frameworks">
              <div
                kuiComboboxInput
                id="framework-dialog"
                placeholder="Select a framework"
              ></div>
              <div kuiComboboxContent>
                <div kuiComboboxEmpty>No items found.</div>
                <div kuiComboboxList>
                  <ng-template let-item>
                    <div kuiComboboxItem [value]="item">{{ item }}</div>
                  </ng-template>
                </div>
              </div>
            </ng-container>
          </div>
          <div kuiDialogFooter>
            <button
              kuiButton
              type="button"
              variant="outline"
              (click)="open.set(false)"
            >
              Cancel
            </button>
            <button
              kuiButton
              type="button"
              (click)="toast('Framework selected.'); open.set(false)"
            >
              Confirm
            </button>
          </div>
        </div>
      </ng-container>
    </div>
  `,
})
export class ComboboxInDialog {
  protected readonly open = signal(false)
  protected readonly styles = styles
  protected readonly frameworks = frameworks
  protected readonly toast = toast
  protected readonly visuallyHidden = visuallyHidden
}
