import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { axes } from "../../../core/axes"
import { leading, space } from "../../../core/scales"
import { Example, ExampleWrapper } from "../components/example"
import { Button } from "../ui/button"
import { Field, FieldGroup, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"
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
  sheetWithFormDiv: css({
    paddingInline: {
      [axes.style.vega]: space[4],
      [axes.style.nova]: space[4],
      [axes.style.lyra]: space[4],
      [axes.style.maia]: space[6],
      [axes.style.mira]: space[6],
      [axes.style.luma]: space[6],
      [axes.style.rhea]: space[6],
    },
  }),
  sheetWithSidesDiv: css({
    display: "flex",
    flexWrap: "wrap",
    gap: space[2],
  }),
  sheetWithSidesButton: css({
    textTransform: { "*": null, base: "capitalize" },
  }),
  sheetWithSidesSheetContent: css({
    maxHeight: { '[data-side="bottom"]': "50vh", '[data-side="top"]': "50vh" },
  }),
  sheetWithSidesDiv2: css({
    scrollbarWidth: "none",
    overflowY: "auto",
    paddingInline: {
      [axes.style.vega]: space[4],
      [axes.style.nova]: space[4],
      [axes.style.lyra]: space[4],
      [axes.style.maia]: space[6],
      [axes.style.mira]: space[6],
      [axes.style.luma]: space[6],
      [axes.style.rhea]: space[6],
    },
  }),
  sheetWithSidesP: css({
    marginBottom: { base: space[4], [axes.style.lyra]: space[2] },
    lineHeight: { base: leading.normal, [axes.style.lyra]: leading.relaxed },
  }),
}

const SHEET_SIDES = ["top", "right", "bottom", "left"] as const

@Component({
  selector: "sheet-example",
  imports: [
    Button,
    Example,
    ExampleWrapper,
    Field,
    FieldGroup,
    FieldLabel,
    Input,
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
    <div kuiExampleWrapper>
      <!-- SheetWithForm -->
      <div kuiExample title="With Form">
        <ng-container kuiSheet>
          <button kuiButton kuiSheetTrigger variant="outline">Open</button>
          <div kuiSheetContent>
            <div kuiSheetHeader>
              <h2 kuiSheetTitle>Edit profile</h2>
              <p kuiSheetDescription>
                Make changes to your profile here. Click save when you're done.
              </p>
            </div>
            <div [sx]="styles.sheetWithFormDiv">
              <div kuiFieldGroup>
                <div kuiField>
                  <label kuiFieldLabel for="sheet-demo-name">Name</label>
                  <input kuiInput id="sheet-demo-name" value="Pedro Duarte" />
                </div>
                <div kuiField>
                  <label kuiFieldLabel for="sheet-demo-username"
                    >Username</label
                  >
                  <input kuiInput id="sheet-demo-username" value="@peduarte" />
                </div>
              </div>
            </div>
            <div kuiSheetFooter>
              <button kuiButton type="submit">Save changes</button>
              <button kuiButton kuiSheetClose variant="outline">Close</button>
            </div>
          </div>
        </ng-container>
      </div>
      <!-- SheetNoCloseButton -->
      <div kuiExample title="No Close Button">
        <ng-container kuiSheet>
          <button kuiButton kuiSheetTrigger variant="outline">
            No Close Button
          </button>
          <div kuiSheetContent [showCloseButton]="false">
            <div kuiSheetHeader>
              <h2 kuiSheetTitle>No Close Button</h2>
              <p kuiSheetDescription>
                This sheet doesn't have a close button in the top-right corner.
                You can only close it using the button below.
              </p>
            </div>
          </div>
        </ng-container>
      </div>
      <!-- SheetWithSides -->
      <div kuiExample title="Sides">
        <div [sx]="styles.sheetWithSidesDiv">
          @for (side of SHEET_SIDES; track side) {
            <ng-container kuiSheet>
              <button
                kuiButton
                kuiSheetTrigger
                variant="outline"
                [sx]="styles.sheetWithSidesButton"
              >
                {{ side }}
              </button>
              <div
                kuiSheetContent
                [side]="side"
                [sx]="styles.sheetWithSidesSheetContent"
              >
                <div kuiSheetHeader>
                  <h2 kuiSheetTitle>Edit profile</h2>
                  <p kuiSheetDescription>
                    Make changes to your profile here. Click save when you're
                    done.
                  </p>
                </div>
                <div [sx]="styles.sheetWithSidesDiv2">
                  @for (
                    _ of Array.from({ length: 10 });
                    track index;
                    let index = $index
                  ) {
                    <p [sx]="styles.sheetWithSidesP">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum.
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
    </div>
  `,
})
export default class SheetExample {
  protected readonly styles = styles
  protected readonly SHEET_SIDES = SHEET_SIDES
  protected readonly Array = Array
}
