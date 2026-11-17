<script lang="ts">
  import { css } from "@kirana-style/core"
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
</script>

<div sx={page.example}>
  <Drawer modal={false} disablePointerDismissal swipeDirection="right">
    <DrawerTrigger>
      {#snippet asChild(props)}
        <Button {...props()} variant="outline">
          Non Modal
        </Button>
      {/snippet}
    </DrawerTrigger>
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>
          Non Modal Drawer
        </DrawerTitle>
      </DrawerHeader>
      <div sx={styles.flex1P4}>
        <div sx={styles.rounded2XlBgMutedGroupDa}></div>
      </div>
      <DrawerFooter>
        <DrawerClose>
          {#snippet asChild(props)}
            <Button {...props()}>
              Close
            </Button>
          {/snippet}
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
</div>
