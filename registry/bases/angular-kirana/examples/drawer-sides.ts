import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { radius, theme } from "../../../core/tokens"
import { Button } from "../ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer"

const styles = {
  flex1P4: css({ flex: 1, padding: space[4] }),
  sizeFullRounded2XlBgMute: css({
    width: "100%",
    height: "100%",
    borderRadius: radius["2xl"],
    backgroundColor: theme.muted,
  }),
}

@Component({
  selector: "drawer-sides",
  imports: [
    Button,
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <ng-container kuiDrawer swipeDirection="left">
        <button kuiButton kuiDrawerTrigger variant="secondary">
          Open Left Drawer
        </button>
        <div kuiDrawerContent>
          <div kuiDrawerHeader>
            <h2 kuiDrawerTitle>Move Goal</h2>
            <p kuiDrawerDescription>Set your daily activity goal.</p>
          </div>
          <div [sx]="styles.flex1P4">
            <div [sx]="styles.sizeFullRounded2XlBgMute"></div>
          </div>
          <div kuiDrawerFooter>
            <button kuiButton kuiDrawerClose>Close</button>
          </div>
        </div>
      </ng-container>
    </div>
  `,
})
export default class DrawerSides {
  protected readonly styles = styles
  protected readonly page = page
}
