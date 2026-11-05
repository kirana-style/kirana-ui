import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { leading, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Button } from "../ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
  selector: "dialog-sticky-footer",
  imports: [
    Button,
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <ng-container kuiDialog>
        <button kuiButton kuiDialogTrigger variant="outline">
          Sticky Footer
        </button>
        <div kuiDialogContent>
          <div kuiDialogHeader>
            <h2 kuiDialogTitle>Sticky Footer</h2>
            <p kuiDialogDescription>
              This dialog has a sticky footer that stays visible while the
              content scrolls.
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
          <div kuiDialogFooter>
            <button kuiButton kuiDialogClose variant="outline">Close</button>
          </div>
        </div>
      </ng-container>
    </div>
  `,
})
export default class DialogStickyFooter {
  protected readonly styles = styles
  protected readonly page = page
  protected readonly Array = Array
}
