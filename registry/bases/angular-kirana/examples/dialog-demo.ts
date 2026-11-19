import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { breakpoint, containerSize } from "../../../core/scales"
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
import { Field, FieldGroup } from "../ui/field"
import { Input } from "../ui/input"
import { Label } from "../ui/label"

const styles = {
  dialogContent: css({
    maxWidth: { [breakpoint.sm]: containerSize.sm },
  }),
}

@Component({
  selector: "dialog-demo",
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
    Field,
    FieldGroup,
    Input,
    Label,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <ng-container kuiDialog>
        <form>
          <button kuiButton kuiDialogTrigger variant="outline">
            Open Dialog
          </button>
          <div kuiDialogContent [sx]="styles.dialogContent">
            <div kuiDialogHeader>
              <h2 kuiDialogTitle>Edit profile</h2>
              <p kuiDialogDescription>
                Make changes to your profile here. Click save when you're done.
              </p>
            </div>
            <div kuiFieldGroup>
              <div kuiField>
                <label kuiLabel for="name-1">Name</label>
                <input kuiInput id="name-1" name="name" value="Pedro Duarte" />
              </div>
              <div kuiField>
                <label kuiLabel for="username-1">Username</label>
                <input
                  kuiInput
                  id="username-1"
                  name="username"
                  value="@peduarte"
                />
              </div>
            </div>
            <div kuiDialogFooter>
              <button kuiButton kuiDialogClose variant="outline">Cancel</button>
              <button kuiButton type="submit">Save changes</button>
            </div>
          </div>
        </form>
      </ng-container>
    </div>
  `,
})
export default class DialogDemo {
  protected readonly styles = styles
  protected readonly page = page
}
