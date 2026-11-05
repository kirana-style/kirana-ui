import { Component, computed, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { breakpoint, space } from "../../../core/scales"
import { useIsMobile } from "../../../lib/angular/use-mobile"
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
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer"
import { Input } from "../ui/input"
import { Label } from "../ui/label"

const styles = {
  // `sm:max-w-[425px]`
  narrow: css({
    maxWidth: {
      "*": null,
      base: "calc(100% - 2rem)",
      [breakpoint.sm]: "425px",
    },
  }),
  textLeft: css({ textAlign: "left" }),
  p4: css({ padding: space[4] }),
  form: css({ display: "grid", alignItems: "start", gap: space[6] }),
  field: css({ display: "grid", gap: space[3] }),
}

@Component({
  selector: "drawer-dialog",
  imports: [
    Button,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
    Input,
    Label,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      @if (isDesktop()) {
        <ng-container kuiDialog [(open)]="open">
          <button kuiButton kuiDialogTrigger variant="outline">
            Edit Profile
          </button>
          <div kuiDialogContent [sx]="styles.narrow">
            <div kuiDialogHeader>
              <h2 kuiDialogTitle>Edit profile</h2>
              <p kuiDialogDescription>
                Make changes to your profile here. Click save when you're done.
              </p>
            </div>
            <form [sx]="[styles.form]">
              <div [sx]="styles.field">
                <label kuiLabel for="email">Email</label>
                <input
                  kuiInput
                  type="email"
                  id="email"
                  value="shadcn@example.com"
                />
              </div>
              <div [sx]="styles.field">
                <label kuiLabel for="username">Username</label>
                <input kuiInput id="username" value="@shadcn" />
              </div>
              <button kuiButton type="submit">Save changes</button>
            </form>
          </div>
        </ng-container>
      } @else {
        <ng-container kuiDrawer [(open)]="open">
          <button kuiButton kuiDrawerTrigger variant="outline">
            Edit Profile
          </button>
          <div kuiDrawerContent>
            <div kuiDrawerHeader [sx]="styles.textLeft">
              <h2 kuiDrawerTitle>Edit profile</h2>
              <p kuiDrawerDescription>
                Make changes to your profile here. Click save when you're done.
              </p>
            </div>
            <form [sx]="[styles.form, styles.p4]">
              <div [sx]="styles.field">
                <label kuiLabel for="email">Email</label>
                <input
                  kuiInput
                  type="email"
                  id="email"
                  value="shadcn@example.com"
                />
              </div>
              <div [sx]="styles.field">
                <label kuiLabel for="username">Username</label>
                <input kuiInput id="username" value="@shadcn" />
              </div>
              <button kuiButton type="submit">Save changes</button>
            </form>
          </div>
        </ng-container>
      }
    </div>
  `,
})
export default class DrawerDialog {
  protected readonly open = signal(false)
  protected readonly styles = styles
  protected readonly isMobile = useIsMobile()
  protected readonly isDesktop = computed(() => !this.isMobile())
  protected readonly page = page
}
