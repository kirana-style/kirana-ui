import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { radius, theme } from "../../../core/tokens"
import { drawerScope } from "../../../styles/drawer.styles"
import { Button } from "../ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer"

const styles = {
  flex1P4: css({ flex: 1, padding: space[4] }),
  rounded2XlBgMutedGroupDa: css({
    borderRadius: radius["2xl"],
    backgroundColor: theme.muted,
    width: {
      [drawerScope.within('[data-swipe-axis="x"]')]: "100%",
      [drawerScope.within('[data-swipe-axis="y"]')]: "100%",
    },
    height: {
      [drawerScope.within('[data-swipe-axis="x"]')]: "100%",
      [drawerScope.within('[data-swipe-axis="y"]')]: space[80],
    },
  }),
}

@Component({
  selector: "drawer-non-modal",
  imports: [
    Button,
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <ng-container
        kuiDrawer
        [modal]="false"
        disable-pointer-dismissal
        swipeDirection="right"
      >
        <button kuiButton kuiDrawerTrigger variant="outline">Non Modal</button>
        <div kuiDrawerContent>
          <div kuiDrawerHeader>
            <h2 kuiDrawerTitle>Non Modal Drawer</h2>
          </div>
          <div [sx]="styles.flex1P4">
            <div [sx]="styles.rounded2XlBgMutedGroupDa"></div>
          </div>
          <div kuiDrawerFooter>
            <button kuiButton kuiDrawerClose>Close</button>
          </div>
        </div>
      </ng-container>
    </div>
  `,
})
export default class DrawerNonModal {
  protected readonly styles = styles
  protected readonly page = page
}
