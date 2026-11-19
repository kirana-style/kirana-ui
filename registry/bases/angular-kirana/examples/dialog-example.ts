import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { axes } from "../../../core/axes"
import { leading, space } from "../../../core/scales"
import { example } from "../../../styles/example.styles"
import { Example, ExampleWrapper } from "../components/example"
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
import { Field, FieldGroup, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"

const { nova, vega, lyra, maia, mira, luma, rhea } = axes.style

const BLEED = {
  [nova]: space[4],
  [vega]: space[6],
  [lyra]: space[4],
  [maia]: space[6],
  [mira]: space[4],
  [luma]: space[6],
  [rhea]: space[6],
}

const styles = {
  scroll: css({
    maxHeight: "70vh",
    overflowY: "auto",
    scrollbarWidth: "none",
    "::-webkit-scrollbar": { display: "none" },
    marginInline: {
      [nova]: `calc(${space[4]} * -1)`,
      [vega]: `calc(${space[6]} * -1)`,
      [lyra]: `calc(${space[4]} * -1)`,
      [maia]: `calc(${space[6]} * -1)`,
      [mira]: `calc(${space[4]} * -1)`,
      [luma]: `calc(${space[6]} * -1)`,
      [rhea]: `calc(${space[6]} * -1)`,
    },
    paddingInline: BLEED,
  }),
  paragraph: css({
    marginBottom: { base: space[4], [lyra]: space[2] },
    lineHeight: { base: leading.normal, [lyra]: leading.relaxed },
  }),
}

@Component({
  selector: "dialog-example",
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
    Example,
    ExampleWrapper,
    Field,
    FieldGroup,
    FieldLabel,
    Input,
    SxDirective,
  ],
  template: `
    <div kuiExampleWrapper>
      <!-- DialogWithForm -->
      <div kuiExample title="With Form" [sx]="example.centred">
        <ng-container kuiDialog>
          <form>
            <button kuiButton kuiDialogTrigger variant="outline">
              Edit Profile
            </button>
            <div kuiDialogContent>
              <div kuiDialogHeader>
                <h2 kuiDialogTitle>Edit profile</h2>
                <p kuiDialogDescription>
                  Make changes to your profile here. Click save when you're
                  done. Your profile will be updated immediately.
                </p>
              </div>
              <div kuiFieldGroup>
                <div kuiField>
                  <label kuiFieldLabel for="name-1">Name</label>
                  <input
                    kuiInput
                    id="name-1"
                    name="name"
                    value="Pedro Duarte"
                  />
                </div>
                <div kuiField>
                  <label kuiFieldLabel for="username-1">Username</label>
                  <input
                    kuiInput
                    id="username-1"
                    name="username"
                    value="@peduarte"
                  />
                </div>
              </div>
              <div kuiDialogFooter>
                <button kuiButton kuiDialogClose variant="outline">
                  Cancel
                </button>
                <button kuiButton type="submit">Save changes</button>
              </div>
            </div>
          </form>
        </ng-container>
      </div>
      <!-- DialogScrollableContent -->
      <div kuiExample title="Scrollable Content" [sx]="example.centred">
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
            <div [sx]="styles.scroll">
              @for (
                _ of Array.from({ length: 10 });
                track index;
                let index = $index
              ) {
                <p [sx]="styles.paragraph">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
              }
            </div>
          </div>
        </ng-container>
      </div>
      <!-- DialogWithStickyFooter -->
      <div kuiExample title="With Sticky Footer" [sx]="example.centred">
        <ng-container kuiDialog>
          <button kuiButton kuiDialogTrigger variant="outline">
            Sticky Footer
          </button>
          <div kuiDialogContent>
            <div kuiDialogHeader>
              <h2 kuiDialogTitle>Scrollable Content</h2>
              <p kuiDialogDescription>
                This is a dialog with scrollable content.
              </p>
            </div>
            <div [sx]="styles.scroll">
              @for (
                _ of Array.from({ length: 10 });
                track index;
                let index = $index
              ) {
                <p [sx]="styles.paragraph">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
              }
            </div>
            <div kuiDialogFooter>
              <button kuiButton kuiDialogClose variant="outline">Close</button>
            </div>
          </div>
        </ng-container>
      </div>
      <!-- DialogNoCloseButton -->
      <div kuiExample title="No Close Button" [sx]="example.centred">
        <ng-container kuiDialog>
          <button kuiButton kuiDialogTrigger variant="outline">
            No Close Button
          </button>
          <div kuiDialogContent [showCloseButton]="false">
            <div kuiDialogHeader>
              <h2 kuiDialogTitle>No Close Button</h2>
              <p kuiDialogDescription>
                This dialog doesn't have a close button in the top-right corner.
              </p>
            </div>
            <div kuiDialogFooter>
              <button kuiButton kuiDialogClose variant="outline">Close</button>
            </div>
          </div>
        </ng-container>
      </div>
    </div>
  `,
})
export default class DialogExample {
  protected readonly styles = styles
  protected readonly example = example
  protected readonly Array = Array
}
