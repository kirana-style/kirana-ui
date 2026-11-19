import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet"

const styles = {
  fields: css({
    display: "grid",
    flex: "1 1 0%",
    gridAutoRows: "min-content",
    gap: space[6],
    paddingInline: space[4],
  }),
  field: css({ display: "grid", gap: space[3] }),
}

@Component({
  selector: "sheet-demo",
  imports: [
    Button,
    Input,
    Label,
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <ng-container kuiSheet>
        <button kuiButton kuiSheetTrigger variant="outline">Open</button>
        <div kuiSheetContent>
          <div kuiSheetHeader>
            <h2 kuiSheetTitle>Edit profile</h2>
            <p kuiSheetDescription>
              Make changes to your profile here. Click save when you're done.
            </p>
          </div>
          <div [sx]="styles.fields">
            <div [sx]="styles.field">
              <label kuiLabel for="sheet-demo-name">Name</label>
              <input kuiInput id="sheet-demo-name" value="Pedro Duarte" />
            </div>
            <div [sx]="styles.field">
              <label kuiLabel for="sheet-demo-username">Username</label>
              <input kuiInput id="sheet-demo-username" value="@peduarte" />
            </div>
          </div>
          <div kuiSheetFooter>
            <button kuiButton type="submit">Save changes</button>
            <button kuiButton kuiSheetClose variant="outline">Close</button>
          </div>
        </div>
      </ng-container>
    </div>
  `,
})
export default class SheetDemo {
  protected readonly styles = styles
  protected readonly page = page
}
