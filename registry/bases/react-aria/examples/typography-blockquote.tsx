import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"

const styles = {
  blockquote: css({
    marginTop: space[6],
    borderLeftWidth: "2px",
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderLeftColor: theme.border,
    paddingLeft: space[6],
    fontStyle: "italic",
  }),
}

export default function TypographyBlockquote() {
  return (
    <div sx={page.example}>
      <blockquote sx={styles.blockquote}>
        &quot;After all,&quot; he said, &quot;everyone enjoys a good joke, so
        it&apos;s only fair that they should pay for the privilege.&quot;
      </blockquote>
    </div>
  )
}
