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
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { css } from "@kirana-style/core"
import { breakpoint, containerSize, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

export default function DialogCloseButton() {
  const styles = {
    dialogContent: css({
      maxWidth: { [breakpoint.sm]: containerSize.md },
    }),
    div: css({
      display: "flex",
      alignItems: "center",
      gap: space[2],
    }),
    div2: css({
      display: "grid",
      flex: "1 1 0%",
      gap: space[2],
    }),
    label: css({
      borderWidth: { "*": null, base: "0" },
      clipPath: { "*": null, base: "inset(50%)" },
      height: { "*": null, base: "1px" },
      margin: { "*": null, base: "-1px" },
      overflow: { "*": null, base: "hidden" },
      padding: { "*": null, base: "0" },
      position: { "*": null, base: "absolute" },
      whiteSpace: { "*": null, base: "nowrap" },
      width: { "*": null, base: "1px" },
    }),
    dialogFooter: css({
      justifyContent: { [breakpoint.sm]: "flex-start" },
    }),
  }

  return (
    <div sx={page.example}>
      <Dialog>
        <DialogTrigger
          asChild={(props) => (
            <Button {...props()} variant="outline">
              Share
            </Button>
          )}
        />
        <DialogContent sx={styles.dialogContent}>
          <DialogHeader>
            <DialogTitle>Share link</DialogTitle>
            <DialogDescription>
              Anyone who has this link will be able to view this.
            </DialogDescription>
          </DialogHeader>
          <div sx={styles.div}>
            <div sx={styles.div2}>
              <Label for="link" sx={styles.label}>
                Link
              </Label>
              <Input
                id="link"
                value="https://ui.shadcn.com/docs/installation"
                readonly
              />
            </div>
          </div>
          <DialogFooter sx={styles.dialogFooter}>
            <DialogClose
              asChild={(props) => (
                <Button {...props()} type="button">
                  Close
                </Button>
              )}
            />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
