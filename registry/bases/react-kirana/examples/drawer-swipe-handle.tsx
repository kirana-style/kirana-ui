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

export default function DrawerSwipeHandle() {
  return (
    <div sx={page.example}>
      <Drawer showSwipeHandle>
        <DrawerTrigger render={<Button variant="secondary" />}>
          Open Drawer
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Drawer</DrawerTitle>
            <DrawerDescription>Drawer with a swipe handle.</DrawerDescription>
          </DrawerHeader>
          <div sx={styles.flex1P4}>
            <div sx={styles.rounded2XlBgMutedGroupDa} />
          </div>
          <DrawerFooter>
            <DrawerClose render={<Button />}>Close</DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
