import { LoginForm } from "./components/login-form"
import { css } from "@kirana-style/core"
import { theme } from "../../../../core/tokens"
import { breakpoint, containerSize, space } from "../../../../core/scales"

const styles = {
  loginPageDiv: css({
    display: "flex",
    minHeight: "100svh",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.muted,
    padding: { base: space[6], [breakpoint.md]: space[10] },
  }),
  loginPageDiv2: css({
    width: "100%",
    maxWidth: { base: containerSize.sm, [breakpoint.md]: containerSize["4xl"] },
  }),
}

export default function LoginPage() {
  return (
    <div sx={styles.loginPageDiv}>
      <div sx={styles.loginPageDiv2}>
        <LoginForm />
      </div>
    </div>
  )
}
