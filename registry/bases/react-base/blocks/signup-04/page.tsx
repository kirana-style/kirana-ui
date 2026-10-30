import { SignupForm } from "./components/signup-form"
import { css } from "@kirana-style/core"
import { theme } from "../../../../core/tokens"
import { breakpoint, containerSize, space } from "../../../../core/scales"

const styles = {
  signupPageDiv: css({
    display: "flex",
    minHeight: "100svh",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.muted,
    padding: { base: space[6], [breakpoint.md]: space[10] },
  }),
  signupPageDiv2: css({
    width: "100%",
    maxWidth: { base: containerSize.sm, [breakpoint.md]: containerSize["4xl"] },
  }),
}

export default function SignupPage() {
  return (
    <div sx={styles.signupPageDiv}>
      <div sx={styles.signupPageDiv2}>
        <SignupForm />
      </div>
    </div>
  )
}
