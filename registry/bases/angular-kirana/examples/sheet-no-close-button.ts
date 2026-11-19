import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { page } from "../../../styles/page.styles"
import { Button } from "../ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet"

@Component({
  selector: "sheet-no-close-button",
  imports: [
    Button,
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <ng-container kuiSheet>
        <button kuiButton kuiSheetTrigger variant="outline">Open Sheet</button>
        <div kuiSheetContent [showCloseButton]="false">
          <div kuiSheetHeader>
            <h2 kuiSheetTitle>No Close Button</h2>
            <p kuiSheetDescription>
              This sheet doesn't have a close button in the top-right corner.
              Click outside to close.
            </p>
          </div>
        </div>
      </ng-container>
    </div>
  `,
})
export default class SheetNoCloseButton {
  protected readonly page = page
}
