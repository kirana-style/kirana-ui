import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { leading, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Button } from "../ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"

const styles = {
  div: css({
    scrollbarWidth: "none",
    marginInline: `calc(${space[4]} * -1)`,
    maxHeight: "50vh",
    overflowY: "auto",
    paddingInline: space[4],
  }),
  p: css({
    marginBottom: space[4],
    lineHeight: leading.normal,
  }),
}

@Component({
  selector: "dialog-scrollable-content",
  imports: [
    Button,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <ng-container kuiDialog>
        <button kuiButton kuiDialogTrigger variant="outline">
          Scrollable Content
        </button>
        <div kuiDialogContent>
          <div kuiDialogHeader>
            <h2 kuiDialogTitle>Scrollable Content</h2>
            <p kuiDialogDescription>
              This is a dialog with scrollable content.
            </p>
          </div>
          <div [sx]="styles.div">
            @for (
              _ of Array.from({ length: 10 });
              track index;
              let index = $index
            ) {
              <p [sx]="styles.p">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            }
          </div>
        </div>
      </ng-container>
    </div>
  `,
})
export default class DialogScrollableContent {
  protected readonly styles = styles
  protected readonly page = page
  protected readonly Array = Array
}
