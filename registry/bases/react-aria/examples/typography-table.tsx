import { css } from "@kirana-style/core"
import { theme } from "../../../core/tokens"
import { fontWeight, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  div: css({
    marginBlock: space[6],
    width: "100%",
    overflowY: "auto",
  }),
  table: css({
    width: "100%",
  }),
  tr: css({
    margin: space["0"],
    borderTopWidth: "1px",
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderTopColor: theme.border,
    padding: space["0"],
    backgroundColor: { ":nth-child(even)": theme.muted },
  }),
  th: css({
    borderWidth: "1px",
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderColor: theme.border,
    paddingInline: space[4],
    paddingBlock: space[2],
    textAlign: {
      base: "left",
      "[align=center]": "center",
      "[align=right]": "right",
    },
    fontWeight: fontWeight.bold,
  }),
  th2: css({
    borderWidth: "1px",
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderColor: theme.border,
    paddingInline: space[4],
    paddingBlock: space[2],
    textAlign: {
      base: "left",
      "[align=center]": "center",
      "[align=right]": "right",
    },
    fontWeight: fontWeight.bold,
  }),
  tr2: css({
    margin: space["0"],
    borderTopWidth: "1px",
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderTopColor: theme.border,
    padding: space["0"],
    backgroundColor: { ":nth-child(even)": theme.muted },
  }),
  td: css({
    borderWidth: "1px",
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderColor: theme.border,
    paddingInline: space[4],
    paddingBlock: space[2],
    textAlign: {
      base: "left",
      "[align=center]": "center",
      "[align=right]": "right",
    },
  }),
  td2: css({
    borderWidth: "1px",
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderColor: theme.border,
    paddingInline: space[4],
    paddingBlock: space[2],
    textAlign: {
      base: "left",
      "[align=center]": "center",
      "[align=right]": "right",
    },
  }),
  tr3: css({
    margin: space["0"],
    borderTopWidth: "1px",
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderTopColor: theme.border,
    padding: space["0"],
    backgroundColor: { ":nth-child(even)": theme.muted },
  }),
  td3: css({
    borderWidth: "1px",
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderColor: theme.border,
    paddingInline: space[4],
    paddingBlock: space[2],
    textAlign: {
      base: "left",
      "[align=center]": "center",
      "[align=right]": "right",
    },
  }),
  td4: css({
    borderWidth: "1px",
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderColor: theme.border,
    paddingInline: space[4],
    paddingBlock: space[2],
    textAlign: {
      base: "left",
      "[align=center]": "center",
      "[align=right]": "right",
    },
  }),
  tr4: css({
    margin: space["0"],
    borderTopWidth: "1px",
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderTopColor: theme.border,
    padding: space["0"],
    backgroundColor: { ":nth-child(even)": theme.muted },
  }),
  td5: css({
    borderWidth: "1px",
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderColor: theme.border,
    paddingInline: space[4],
    paddingBlock: space[2],
    textAlign: {
      base: "left",
      "[align=center]": "center",
      "[align=right]": "right",
    },
  }),
  td6: css({
    borderWidth: "1px",
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderColor: theme.border,
    paddingInline: space[4],
    paddingBlock: space[2],
    textAlign: {
      base: "left",
      "[align=center]": "center",
      "[align=right]": "right",
    },
  }),
}

export default function TypographyTable() {
  return (
    <div sx={page.example}>
      <div sx={styles.div}>
        <table sx={styles.table}>
          <thead>
            <tr sx={styles.tr}>
              <th sx={styles.th}>King&apos;s Treasury</th>
              <th sx={styles.th2}>People&apos;s happiness</th>
            </tr>
          </thead>
          <tbody>
            <tr sx={styles.tr2}>
              <td sx={styles.td}>Empty</td>
              <td sx={styles.td2}>Overflowing</td>
            </tr>
            <tr sx={styles.tr3}>
              <td sx={styles.td3}>Modest</td>
              <td sx={styles.td4}>Satisfied</td>
            </tr>
            <tr sx={styles.tr4}>
              <td sx={styles.td5}>Full</td>
              <td sx={styles.td6}>Ecstatic</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
