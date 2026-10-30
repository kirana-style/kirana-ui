import { SignupForm } from "./components/signup-form"
import { css } from "@kirana-style/core"
import { breakpoint, containerSize, space } from "../../../../core/scales"

const styles = {
  pageDiv: css({
    display: "flex",
    minHeight: "100svh",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: { base: space[6], [breakpoint.md]: space[10] },
  }),
  pageDiv2: css({
    width: "100%",
    maxWidth: containerSize.sm,
  }),
}

export default function Page() {
  return (
    <div sx={styles.pageDiv}>
      <div sx={styles.pageDiv2}>
        <SignupForm />
      </div>
    </div>
  )
}
