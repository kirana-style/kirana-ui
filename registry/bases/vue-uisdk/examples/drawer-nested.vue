<script setup lang="ts">
import { computed } from "vue"
import { css } from "@kirana-style/core"
import { useIsMobile } from "../../../lib/vue/use-mobile"
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

const isMobile = useIsMobile()

const swipeDirection = computed(() => (isMobile.value ? "down" : "right"))
</script>

<template>
  <div :sx="page.example">
    <Drawer :show-swipe-handle="isMobile" :swipe-direction="swipeDirection">
      <DrawerTrigger as-child>
        <Button variant="secondary"> Open Drawer </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle> Drawer </DrawerTitle>
          <DrawerDescription>
            Open another drawer from the same direction.
          </DrawerDescription>
        </DrawerHeader>
        <div :sx="styles.flex1P4">
          <div :sx="styles.bgMutedGroupDataSwipeAxi"></div>
        </div>
        <DrawerFooter>
          <Drawer
            :show-swipe-handle="isMobile"
            :swipe-direction="swipeDirection"
          >
            <DrawerTrigger as-child>
              <Button variant="outline"> Open Nested Drawer </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle> Nested Drawer </DrawerTitle>
                <DrawerDescription>
                  The parent drawer stays mounted behind this one.
                </DrawerDescription>
              </DrawerHeader>
              <div :sx="styles.flex1P4">
                <div :sx="styles.bgMutedGroupDataSwipeAxi"></div>
              </div>
              <DrawerFooter>
                <Drawer
                  :show-swipe-handle="isMobile"
                  :swipe-direction="swipeDirection"
                >
                  <DrawerTrigger as-child>
                    <Button variant="outline"> Open Third Drawer </Button>
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader>
                      <DrawerTitle> Third Drawer </DrawerTitle>
                      <DrawerDescription>
                        Two drawers are stacked behind this one.
                      </DrawerDescription>
                    </DrawerHeader>
                    <div :sx="styles.flex1P4">
                      <div :sx="styles.bgMutedGroupDataSwipeAxi"></div>
                    </div>
                    <DrawerFooter>
                      <Drawer
                        :show-swipe-handle="isMobile"
                        :swipe-direction="swipeDirection"
                      >
                        <DrawerTrigger as-child>
                          <Button variant="outline">
                            Open Fourth Drawer
                          </Button>
                        </DrawerTrigger>
                        <DrawerContent>
                          <DrawerHeader>
                            <DrawerTitle> Fourth Drawer </DrawerTitle>
                            <DrawerDescription>
                              This is the frontmost drawer in the stack.
                            </DrawerDescription>
                          </DrawerHeader>
                          <div :sx="styles.flex1P4">
                            <div :sx="styles.bgMutedGroupDataSwipeAxi"></div>
                          </div>
                          <DrawerFooter>
                            <DrawerClose as-child>
                              <Button variant="outline"> Close </Button>
                            </DrawerClose>
                          </DrawerFooter>
                        </DrawerContent>
                      </Drawer>
                      <DrawerClose as-child>
                        <Button variant="outline"> Close </Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
                <DrawerClose as-child>
                  <Button variant="outline"> Close </Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
          <DrawerClose as-child>
            <Button variant="outline"> Close </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  </div>
</template>
