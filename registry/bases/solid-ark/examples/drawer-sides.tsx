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

export default function DrawerSides() {
  const styles = {
    flex1P4: css({ flex: 1, padding: space[4] }),
    sizeFullRounded2XlBgMute: css({
      width: "100%",
      height: "100%",
      borderRadius: radius["2xl"],
      backgroundColor: theme.muted,
    }),
  }

  return (
    <div sx={page.example}>
      <Drawer swipeDirection="left">
        <DrawerTrigger
          asChild={(props) => (
            <Button {...props()} variant="secondary">
              Open Left Drawer
            </Button>
          )}
        />
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Move Goal</DrawerTitle>
            <DrawerDescription>Set your daily activity goal.</DrawerDescription>
          </DrawerHeader>
          <div sx={styles.flex1P4}>
            <div sx={styles.sizeFullRounded2XlBgMute} />
          </div>
          <DrawerFooter>
            <DrawerClose
              asChild={(props) => <Button {...props()}>Close</Button>}
            />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
