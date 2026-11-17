import { css, select } from "@kirana-style/core"
import { theme } from "../../../core/tokens"
import {
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
  space,
} from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  h1: css({
    scrollMarginBlock: space[20],
    scrollMarginInline: space[20],
    fontSize: fontSize["4xl"],
    lineHeight: lineHeight["4xl"],
    fontWeight: fontWeight.extrabold,
    letterSpacing: letterSpacing.tight,
    textWrap: "balance",
  }),
  p: css({
    fontSize: fontSize.xl,
    lineHeight: "1.75rem",
    color: theme.mutedForeground,
    marginTop: { ":not(:first-child)": space[6] },
  }),
  h2: css({
    marginTop: { base: space[10], ":first-child": space["0"] },
    scrollMarginBlock: space[20],
    scrollMarginInline: space[20],
    borderBottomWidth: "1px",
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderBottomColor: theme.border,
    paddingBottom: space[2],
    fontSize: fontSize["3xl"],
    lineHeight: lineHeight["3xl"],
    fontWeight: fontWeight.semibold,
    letterSpacing: letterSpacing.tight,
    transitionDuration: "0.15s",
    transitionProperty:
      "color, background-color, border-color, outline-color, text-decoration-color, fill, stroke",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
  }),
  p2: css({
    lineHeight: "1.75rem",
    marginTop: { ":not(:first-child)": space[6] },
  }),
  a: css({
    fontWeight: fontWeight.medium,
    color: theme.primary,
    textDecorationLine: "underline",
    textUnderlineOffset: "4px",
  }),
  blockquote: css({
    marginTop: space[6],
    borderLeftWidth: "2px",
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderLeftColor: theme.border,
    paddingLeft: space[6],
    fontStyle: "italic",
  }),
  h3: css({
    marginTop: space[8],
    scrollMarginBlock: space[20],
    scrollMarginInline: space[20],
    fontSize: fontSize["2xl"],
    lineHeight: lineHeight["2xl"],
    fontWeight: fontWeight.semibold,
    letterSpacing: letterSpacing.tight,
  }),
  p3: css({
    lineHeight: "1.75rem",
    marginTop: { ":not(:first-child)": space[6] },
  }),
  ul: css({
    marginBlock: space[6],
    marginLeft: space[6],
    listStyleType: "disc",
    [select.child("li")]: {
      marginTop: space[2],
    },
  }),
  p4: css({
    lineHeight: "1.75rem",
    marginTop: { ":not(:first-child)": space[6] },
  }),
  h32: css({
    marginTop: space[8],
    scrollMarginBlock: space[20],
    scrollMarginInline: space[20],
    fontSize: fontSize["2xl"],
    lineHeight: lineHeight["2xl"],
    fontWeight: fontWeight.semibold,
    letterSpacing: letterSpacing.tight,
  }),
  p5: css({
    lineHeight: "1.75rem",
    marginTop: { ":not(:first-child)": space[6] },
  }),
  p6: css({
    lineHeight: "1.75rem",
    marginTop: { ":not(:first-child)": space[6] },
  }),
  h33: css({
    marginTop: space[8],
    scrollMarginBlock: space[20],
    scrollMarginInline: space[20],
    fontSize: fontSize["2xl"],
    lineHeight: lineHeight["2xl"],
    fontWeight: fontWeight.semibold,
    letterSpacing: letterSpacing.tight,
  }),
  p7: css({
    lineHeight: "1.75rem",
    marginTop: { ":not(:first-child)": space[6] },
  }),
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
  p8: css({
    lineHeight: "1.75rem",
    marginTop: { ":not(:first-child)": space[6] },
  }),
  p9: css({
    lineHeight: "1.75rem",
    marginTop: { ":not(:first-child)": space[6] },
  }),
}

export default function TypographyDemo() {
  return (
    <div sx={page.example}>
      <div>
        <h1 sx={styles.h1}>Taxing Laughter: The Joke Tax Chronicles</h1>
        <p sx={styles.p}>
          Once upon a time, in a far-off land, there was a very lazy king who
          spent all day lounging on his throne. One day, his advisors came to
          him with a problem: the kingdom was running out of money.
        </p>
        <h2 sx={styles.h2}>The King&apos;s Plan</h2>
        <p sx={styles.p2}>
          The king thought long and hard, and finally came up with{" "}
          <a href="#" sx={styles.a}>
            a brilliant plan
          </a>
          : he would tax the jokes in the kingdom.
        </p>
        <blockquote sx={styles.blockquote}>
          &quot;After all,&quot; he said, &quot;everyone enjoys a good joke, so
          it&apos;s only fair that they should pay for the privilege.&quot;
        </blockquote>
        <h3 sx={styles.h3}>The Joke Tax</h3>
        <p sx={styles.p3}>
          The king&apos;s subjects were not amused. They grumbled and
          complained, but the king was firm:
        </p>
        <ul sx={styles.ul}>
          <li>1st level of puns: 5 gold coins</li>
          <li>2nd level of jokes: 10 gold coins</li>
          <li>3rd level of one-liners : 20 gold coins</li>
        </ul>
        <p sx={styles.p4}>
          As a result, people stopped telling jokes, and the kingdom fell into a
          gloom. But there was one person who refused to let the king&apos;s
          foolishness get him down: a court jester named Jokester.
        </p>
        <h3 sx={styles.h32}>Jokester&apos;s Revolt</h3>
        <p sx={styles.p5}>
          Jokester began sneaking into the castle in the middle of the night and
          leaving jokes all over the place: under the king&apos;s pillow, in his
          soup, even in the royal toilet. The king was furious, but he
          couldn&apos;t seem to stop Jokester.
        </p>
        <p sx={styles.p6}>
          And then, one day, the people of the kingdom discovered that the jokes
          left by Jokester were so funny that they couldn&apos;t help but laugh.
          And once they started laughing, they couldn&apos;t stop.
        </p>
        <h3 sx={styles.h33}>The People&apos;s Rebellion</h3>
        <p sx={styles.p7}>
          The people of the kingdom, feeling uplifted by the laughter, started
          to tell jokes and puns again, and soon the entire kingdom was in on
          the joke.
        </p>
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
        <p sx={styles.p8}>
          The king, seeing how much happier his subjects were, realized the
          error of his ways and repealed the joke tax. Jokester was declared a
          hero, and the kingdom lived happily ever after.
        </p>
        <p sx={styles.p9}>
          The moral of the story is: never underestimate the power of a good
          laugh and always be careful of bad ideas.
        </p>
      </div>
    </div>
  )
}
