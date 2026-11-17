import { css } from "@kirana-style/core"

import { breakpoint, containerSize, space } from "../../../../core/scales"
import { LoginForm } from "./components/login-form"

const styles = {
  page: css({
    display: "flex",
    minHeight: "100svh",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: { base: space[6], [breakpoint.md]: space[10] },
  }),
  column: css({ width: "100%", maxWidth: containerSize.sm }),
}

export default function Page() {
  return (
    <div sx={styles.page}>
      <div sx={styles.column}>
        <LoginForm />
      </div>
    </div>
  )
}
