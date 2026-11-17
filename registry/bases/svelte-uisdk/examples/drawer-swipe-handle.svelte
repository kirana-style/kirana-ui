<script lang="ts">
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
</script>

<div sx={page.example}>
  <Drawer showSwipeHandle>
    <DrawerTrigger>
      {#snippet asChild(props)}
        <Button {...props()} variant="secondary">
          Open Drawer
        </Button>
      {/snippet}
    </DrawerTrigger>
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>
          Drawer
        </DrawerTitle>
        <DrawerDescription>
          Drawer with a swipe handle.
        </DrawerDescription>
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
