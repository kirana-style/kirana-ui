import { For } from "solid-js"
import { Button } from "../ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { css } from "@kirana-style/core"
import { leading, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

export default function DialogScrollableContent() {
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

  return (
    <div sx={page.example}>
      <Dialog>
        <DialogTrigger
          asChild={(props) => (
            <Button {...props()} variant="outline">
              Scrollable Content
            </Button>
          )}
        />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Scrollable Content</DialogTitle>
            <DialogDescription>
              This is a dialog with scrollable content.
            </DialogDescription>
          </DialogHeader>
          <div sx={styles.div}>
            <For each={Array.from({ length: 10 })}>
              {() => (
                <p sx={styles.p}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
              )}
            </For>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
