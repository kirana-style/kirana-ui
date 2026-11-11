<script lang="ts">
  import { Button } from "../ui/button"
  import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "../ui/dialog"
  import { css } from "@kirana-style/core"
  import { leading, space } from "../../../core/scales"
  import { page } from "../../../styles/page.styles"

  const styles = {
    div: css({
      scrollbarWidth: "none",
      marginInline: `calc(${space[4]} * -1)`,
      maxHeight: "50vh",
      overflowY: "auto",
      paddingInline: space[4],
    }),
    p: css({
      marginBottom: space[4],
      lineHeight: leading.normal,
    }),
  }
</script>

<div sx={page.example}>
  <Dialog>
    <DialogTrigger>
      {#snippet asChild(props)}
        <Button {...props()} variant="outline">
          Sticky Footer
        </Button>
      {/snippet}
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          Sticky Footer
        </DialogTitle>
        <DialogDescription>
          This dialog has a sticky footer that stays visible while the content scrolls.
        </DialogDescription>
      </DialogHeader>
      <div sx={styles.div}>
        {#each Array.from({ length: 10 }) as _, index (index)}
          <p sx={styles.p}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        {/each}
      </div>
      <DialogFooter>
        <DialogClose>
          {#snippet asChild(props)}
            <Button {...props()} variant="outline">
              Close
            </Button>
          {/snippet}
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</div>
