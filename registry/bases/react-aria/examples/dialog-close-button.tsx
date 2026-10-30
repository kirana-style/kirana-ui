import { Button } from "../ui/button"
import {
  Dialog,
  DialogClose,
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

const styles = {
  dialog: css({
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

export default function DialogCloseButton() {
  return (
    <div sx={page.example}>
      <DialogTrigger>
        <Button variant="outline">Share</Button>
        <Dialog sx={styles.dialog}>
          <DialogHeader>
            <DialogTitle>Share link</DialogTitle>
            <DialogDescription>
              Anyone who has this link will be able to view this.
            </DialogDescription>
          </DialogHeader>
          <div sx={styles.div}>
            <div sx={styles.div2}>
              <Label htmlFor="link" sx={styles.label}>
                Link
              </Label>
              <Input
                id="link"
                defaultValue="https://ui.shadcn.com/docs/installation"
                readOnly
              />
            </div>
          </div>
          <DialogFooter sx={styles.dialogFooter}>
            <DialogClose type="button">Close</DialogClose>
          </DialogFooter>
        </Dialog>
      </DialogTrigger>
    </div>
  )
}
