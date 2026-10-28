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

const styles = {
  flex1P4: css({ flex: 1, padding: space[4] }),
  sizeFullRounded2XlBgMute: css({
    width: "100%",
    height: "100%",
    borderRadius: radius["2xl"],
    backgroundColor: theme.muted,
  }),
}

export default function DrawerWithSides() {
  return (
    <div sx={page.example}>
      <Drawer swipeDirection="left">
        <DrawerTrigger render={<Button variant="secondary" />}>
          Open Left Drawer
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Move Goal</DrawerTitle>
            <DrawerDescription>Set your daily activity goal.</DrawerDescription>
          </DrawerHeader>
          <div sx={styles.flex1P4}>
            <div sx={styles.sizeFullRounded2XlBgMute} />
          </div>
          <DrawerFooter>
            <DrawerClose render={<Button />}>Close</DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
