import { Component, computed } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { useIsMobile } from "../../../lib/angular/use-mobile"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { theme } from "../../../core/tokens"
import { drawerScope } from "../../../styles/drawer.styles"
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
  bgMutedGroupDataSwipeAxi: css({
    backgroundColor: theme.muted,
    width: {
      [drawerScope.within('[data-swipe-axis="x"]')]: "100%",
      [drawerScope.within('[data-swipe-axis="y"]')]: "100%",
    },
    height: { [drawerScope.within('[data-swipe-axis="x"]')]: "100%" },
    aspectRatio: { [drawerScope.within('[data-swipe-axis="y"]')]: "16 / 9" },
  }),
}

@Component({
  selector: "drawer-nested",
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
      <ng-container
        kuiDrawer
        [showSwipeHandle]="isMobile()"
        [swipeDirection]="swipeDirection()"
      >
        <button kuiButton kuiDrawerTrigger variant="secondary">
          Open Drawer
        </button>
        <div kuiDrawerContent>
          <div kuiDrawerHeader>
            <h2 kuiDrawerTitle>Drawer</h2>
            <p kuiDrawerDescription>
              Open another drawer from the same direction.
            </p>
          </div>
          <div [sx]="styles.flex1P4">
            <div [sx]="styles.bgMutedGroupDataSwipeAxi"></div>
          </div>
          <div kuiDrawerFooter>
            <ng-container
              kuiDrawer
              [showSwipeHandle]="isMobile()"
              [swipeDirection]="swipeDirection()"
            >
              <button kuiButton kuiDrawerTrigger variant="outline">
                Open Nested Drawer
              </button>
              <div kuiDrawerContent>
                <div kuiDrawerHeader>
                  <h2 kuiDrawerTitle>Nested Drawer</h2>
                  <p kuiDrawerDescription>
                    The parent drawer stays mounted behind this one.
                  </p>
                </div>
                <div [sx]="styles.flex1P4">
                  <div [sx]="styles.bgMutedGroupDataSwipeAxi"></div>
                </div>
                <div kuiDrawerFooter>
                  <ng-container
                    kuiDrawer
                    [showSwipeHandle]="isMobile()"
                    [swipeDirection]="swipeDirection()"
                  >
                    <button kuiButton kuiDrawerTrigger variant="outline">
                      Open Third Drawer
                    </button>
                    <div kuiDrawerContent>
                      <div kuiDrawerHeader>
                        <h2 kuiDrawerTitle>Third Drawer</h2>
                        <p kuiDrawerDescription>
                          Two drawers are stacked behind this one.
                        </p>
                      </div>
                      <div [sx]="styles.flex1P4">
                        <div [sx]="styles.bgMutedGroupDataSwipeAxi"></div>
                      </div>
                      <div kuiDrawerFooter>
                        <ng-container
                          kuiDrawer
                          [showSwipeHandle]="isMobile()"
                          [swipeDirection]="swipeDirection()"
                        >
                          <button kuiButton kuiDrawerTrigger variant="outline">
                            Open Fourth Drawer
                          </button>
                          <div kuiDrawerContent>
                            <div kuiDrawerHeader>
                              <h2 kuiDrawerTitle>Fourth Drawer</h2>
                              <p kuiDrawerDescription>
                                This is the frontmost drawer in the stack.
                              </p>
                            </div>
                            <div [sx]="styles.flex1P4">
                              <div [sx]="styles.bgMutedGroupDataSwipeAxi"></div>
                            </div>
                            <div kuiDrawerFooter>
                              <button
                                kuiButton
                                kuiDrawerClose
                                variant="outline"
                              >
                                Close
                              </button>
                            </div>
                          </div>
                        </ng-container>
                        <button kuiButton kuiDrawerClose variant="outline">
                          Close
                        </button>
                      </div>
                    </div>
                  </ng-container>
                  <button kuiButton kuiDrawerClose variant="outline">
                    Close
                  </button>
                </div>
              </div>
            </ng-container>
            <button kuiButton kuiDrawerClose variant="outline">Close</button>
          </div>
        </div>
      </ng-container>
    </div>
  `,
})
export default class DrawerNested {
  protected readonly styles = styles
  protected readonly isMobile = useIsMobile()
  protected readonly swipeDirection = computed(() =>
    this.isMobile() ? ("down" as const) : ("right" as const)
  )
  protected readonly page = page
}
