import { css } from "@kirana-style/core"

import { useIsMobile } from "../../../lib/use-mobile"
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
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { theme } from "../../../core/tokens"
import { drawerScope } from "../../../styles/drawer.styles"

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

export default function DrawerNested() {
  const isMobile = useIsMobile()

  const swipeDirection = isMobile ? "down" : "right"

  return (
    <div sx={page.example}>
      <Drawer showSwipeHandle={isMobile} swipeDirection={swipeDirection}>
        <DrawerTrigger render={<Button variant="secondary" />}>
          Open Drawer
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Drawer</DrawerTitle>
            <DrawerDescription>
              Open another drawer from the same direction.
            </DrawerDescription>
          </DrawerHeader>
          <div sx={styles.flex1P4}>
            <div sx={styles.bgMutedGroupDataSwipeAxi} />
          </div>
          <DrawerFooter>
            <Drawer showSwipeHandle={isMobile} swipeDirection={swipeDirection}>
              <DrawerTrigger render={<Button variant="outline" />}>
                Open Nested Drawer
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Nested Drawer</DrawerTitle>
                  <DrawerDescription>
                    The parent drawer stays mounted behind this one.
                  </DrawerDescription>
                </DrawerHeader>
                <div sx={styles.flex1P4}>
                  <div sx={styles.bgMutedGroupDataSwipeAxi} />
                </div>
                <DrawerFooter>
                  <Drawer
                    showSwipeHandle={isMobile}
                    swipeDirection={swipeDirection}
                  >
                    <DrawerTrigger render={<Button variant="outline" />}>
                      Open Third Drawer
                    </DrawerTrigger>
                    <DrawerContent>
                      <DrawerHeader>
                        <DrawerTitle>Third Drawer</DrawerTitle>
                        <DrawerDescription>
                          Two drawers are stacked behind this one.
                        </DrawerDescription>
                      </DrawerHeader>
                      <div sx={styles.flex1P4}>
                        <div sx={styles.bgMutedGroupDataSwipeAxi} />
                      </div>
                      <DrawerFooter>
                        <Drawer
                          showSwipeHandle={isMobile}
                          swipeDirection={swipeDirection}
                        >
                          <DrawerTrigger render={<Button variant="outline" />}>
                            Open Fourth Drawer
                          </DrawerTrigger>
                          <DrawerContent>
                            <DrawerHeader>
                              <DrawerTitle>Fourth Drawer</DrawerTitle>
                              <DrawerDescription>
                                This is the frontmost drawer in the stack.
                              </DrawerDescription>
                            </DrawerHeader>
                            <div sx={styles.flex1P4}>
                              <div sx={styles.bgMutedGroupDataSwipeAxi} />
                            </div>
                            <DrawerFooter>
                              <DrawerClose
                                render={<Button variant="outline" />}
                              >
                                Close
                              </DrawerClose>
                            </DrawerFooter>
                          </DrawerContent>
                        </Drawer>
                        <DrawerClose render={<Button variant="outline" />}>
                          Close
                        </DrawerClose>
                      </DrawerFooter>
                    </DrawerContent>
                  </Drawer>
                  <DrawerClose render={<Button variant="outline" />}>
                    Close
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
            <DrawerClose render={<Button variant="outline" />}>
              Close
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
