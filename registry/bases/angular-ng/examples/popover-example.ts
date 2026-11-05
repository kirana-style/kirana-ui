import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { Example, ExampleWrapper } from "../components/example"
import { Button } from "../ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { Field, FieldGroup, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "../ui/popover"

const styles = {
  fit: css({ width: "fit-content" }),
  flexFlexColGap2: css({
    display: "flex",
    flexDirection: "column",
    gap: { "*": null, base: space[2] },
  }),
  flexFlexWrapGap2: css({
    display: "flex",
    flexWrap: "wrap",
    gap: { "*": null, base: space[2] },
  }),
  wFitCapitalize: css({
    width: "fit-content",
    textTransform: { "*": null, base: "capitalize" },
  }),
  w40: css({ width: { "*": null, base: space[40] } }),
  w64: css({ width: { "*": null, base: space[64] } }),
  gap4: css({ gap: { "*": null, base: space[4] } }),
  w12: css({ width: "50%" }),
  flexGap6: css({ display: "flex", gap: { "*": null, base: space[6] } }),
}

@Component({
  selector: "popover-example",
  imports: [
    Button,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    Example,
    ExampleWrapper,
    Field,
    FieldGroup,
    FieldLabel,
    Input,
    Popover,
    PopoverContent,
    PopoverDescription,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
    SxDirective,
  ],
  template: `
    <div kuiExampleWrapper>
      <!-- PopoverBasic -->
      <div kuiExample title="Basic">
        <ng-container kuiPopover>
          <button
            kuiButton
            kuiPopoverTrigger
            variant="outline"
            [sx]="styles.fit"
          >
            Open Popover
          </button>
          <div kuiPopoverContent align="start">
            <div kuiPopoverHeader>
              <h2 kuiPopoverTitle>Dimensions</h2>
              <p kuiPopoverDescription>Set the dimensions for the layer.</p>
            </div>
          </div>
        </ng-container>
      </div>
      <!-- PopoverSides -->
      <div kuiExample title="Sides">
        <div [sx]="styles.flexFlexColGap2">
          <div [sx]="styles.flexFlexWrapGap2">
            @for (side of ["inline-start", "left", "top"]; track side) {
              <ng-container kuiPopover>
                <button
                  kuiButton
                  kuiPopoverTrigger
                  variant="outline"
                  [sx]="styles.wFitCapitalize"
                >
                  {{ side.replace("-", " ") }}
                </button>
                <div kuiPopoverContent [side]="$any(side)" [sx]="styles.w40">
                  <p>
                    Popover on
                    {{ side.replace("-", " ") }}
                  </p>
                </div>
              </ng-container>
            }
          </div>
          <div [sx]="styles.flexFlexWrapGap2">
            @for (side of ["bottom", "right", "inline-end"]; track side) {
              <ng-container kuiPopover>
                <button
                  kuiButton
                  kuiPopoverTrigger
                  variant="outline"
                  [sx]="styles.wFitCapitalize"
                >
                  {{ side.replace("-", " ") }}
                </button>
                <div kuiPopoverContent [side]="$any(side)" [sx]="styles.w40">
                  <p>
                    Popover on
                    {{ side.replace("-", " ") }}
                  </p>
                </div>
              </ng-container>
            }
          </div>
        </div>
      </div>
      <!-- PopoverWithForm -->
      <div kuiExample title="With Form">
        <ng-container kuiPopover>
          <button kuiButton kuiPopoverTrigger variant="outline">
            Open Popover
          </button>
          <div kuiPopoverContent [sx]="styles.w64" align="start">
            <div kuiPopoverHeader>
              <h2 kuiPopoverTitle>Dimensions</h2>
              <p kuiPopoverDescription>Set the dimensions for the layer.</p>
            </div>
            <div kuiFieldGroup [sx]="styles.gap4">
              <div kuiField orientation="horizontal">
                <label kuiFieldLabel for="width" [sx]="styles.w12">Width</label>
                <input kuiInput id="width" value="100%" />
              </div>
              <div kuiField orientation="horizontal">
                <label kuiFieldLabel for="height" [sx]="styles.w12"
                  >Height</label
                >
                <input kuiInput id="height" value="25px" />
              </div>
            </div>
          </div>
        </ng-container>
      </div>
      <!-- PopoverAlignments -->
      <div kuiExample title="Alignments">
        <div [sx]="styles.flexGap6">
          <ng-container kuiPopover>
            <button kuiButton kuiPopoverTrigger variant="outline" size="sm">
              Start
            </button>
            <div kuiPopoverContent align="start" [sx]="styles.w40">
              Aligned to start
            </div>
          </ng-container>
          <ng-container kuiPopover>
            <button kuiButton kuiPopoverTrigger variant="outline" size="sm">
              Center
            </button>
            <div kuiPopoverContent align="center" [sx]="styles.w40">
              Aligned to center
            </div>
          </ng-container>
          <ng-container kuiPopover>
            <button kuiButton kuiPopoverTrigger variant="outline" size="sm">
              End
            </button>
            <div kuiPopoverContent align="end" [sx]="styles.w40">
              Aligned to end
            </div>
          </ng-container>
        </div>
      </div>
      <!-- PopoverInDialog -->
      <div kuiExample title="In Dialog">
        <ng-container kuiDialog>
          <button kuiButton kuiDialogTrigger variant="outline">
            Open Dialog
          </button>
          <div kuiDialogContent>
            <div kuiDialogHeader>
              <h2 kuiDialogTitle>Popover Example</h2>
              <p kuiDialogDescription>
                Click the button below to see the popover.
              </p>
            </div>
            <ng-container kuiPopover>
              <button
                kuiButton
                kuiPopoverTrigger
                variant="outline"
                [sx]="styles.fit"
              >
                Open Popover
              </button>
              <div kuiPopoverContent align="start">
                <div kuiPopoverHeader>
                  <h2 kuiPopoverTitle>Popover in Dialog</h2>
                  <p kuiPopoverDescription>
                    This popover appears inside a dialog. Click the button to
                    open it.
                  </p>
                </div>
              </div>
            </ng-container>
          </div>
        </ng-container>
      </div>
    </div>
  `,
})
export default class PopoverExample {
  protected readonly styles = styles
}
