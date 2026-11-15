<script setup lang="ts">
import { css } from "@kirana-style/core"
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
import { radius, theme } from "../../../core/tokens"
import { drawerScope } from "../../../styles/drawer.styles"

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

const SNAP_POINTS = ["31rem", 1]
</script>

<template>
  <div :sx="page.example">
    <Drawer :snap-points="SNAP_POINTS" show-swipe-handle>
      <DrawerTrigger as-child>
        <Button variant="outline"> Open Snap Drawer </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle> Snap points </DrawerTitle>
          <DrawerDescription>
            Drag the drawer to snap between a compact peek and a near
            full-height view.
          </DrawerDescription>
        </DrawerHeader>
        <div :sx="styles.flex1P4">
          <div :sx="styles.rounded2XlBgMutedGroupDa"></div>
        </div>
        <DrawerFooter>
          <DrawerClose as-child>
            <Button> Close </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  </div>
</template>
