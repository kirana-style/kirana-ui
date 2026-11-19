import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { leading, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Button } from "../ui/button"
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
  div: css({
    display: "flex",
    flexWrap: "wrap",
    gap: space[2],
  }),
  button: css({
    textTransform: { "*": null, base: "capitalize" },
  }),
  sheetContent: css({
    maxHeight: { '[data-side="bottom"]': "50vh", '[data-side="top"]': "50vh" },
  }),
  div2: css({
    scrollbarWidth: "none",
    overflowY: "auto",
    paddingInline: space[4],
  }),
  p: css({
    marginBottom: space[2],
    lineHeight: leading.relaxed,
  }),
}

const SHEET_SIDES = ["top", "right", "bottom", "left"] as const

@Component({
  selector: "sheet-side",
  imports: [
    Button,
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
      <div [sx]="styles.div">
        @for (side of SHEET_SIDES; track side) {
          <ng-container kuiSheet>
            <button
              kuiButton
              kuiSheetTrigger
              variant="outline"
              [sx]="styles.button"
            >
              {{ side }}
            </button>
            <div kuiSheetContent [side]="side" [sx]="styles.sheetContent">
              <div kuiSheetHeader>
                <h2 kuiSheetTitle>Edit profile</h2>
                <p kuiSheetDescription>
                  Make changes to your profile here. Click save when you're
                  done.
                </p>
              </div>
              <div [sx]="styles.div2">
                @for (
                  _ of Array.from({ length: 10 });
                  track index;
                  let index = $index
                ) {
                  <p [sx]="styles.p">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </p>
                }
              </div>
              <div kuiSheetFooter>
                <button kuiButton type="submit">Save changes</button>
                <button kuiButton kuiSheetClose variant="outline">
                  Cancel
                </button>
              </div>
            </div>
          </ng-container>
        }
      </div>
    </div>
  `,
})
export default class SheetSide {
  protected readonly styles = styles
  protected readonly SHEET_SIDES = SHEET_SIDES
  protected readonly page = page
  protected readonly Array = Array
}
