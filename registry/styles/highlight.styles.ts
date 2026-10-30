/**
 * The colours of highlighted code, one handle per token class of TanStack Highlight (MIT): GitHub's
 * light and dark themes, as shadcn/ui's code block takes them from Shiki, each a `light-dark()` pair
 * that follows the page's scheme. `registry/lib/highlighter.tsx` puts them on the tokens.
 */
import { css } from "@kirana-style/core"

export const highlight = {
  attr: css({ color: "light-dark(#0550ae, #79c0ff)" }),
  "code-inline": css({ color: "light-dark(#953800, #ffa657)" }),
  command: css({ color: "light-dark(#8250df, #d2a8ff)" }),
  comment: css({ color: "light-dark(#6e7781, #8b949e)" }),
  deleted: css({ color: "light-dark(#cf222e, #ff7b72)" }),
  function: css({ color: "light-dark(#8250df, #d2a8ff)" }),
  heading: css({ color: "light-dark(#0550ae, #79c0ff)" }),
  inserted: css({ color: "light-dark(#1a7f37, #7ee787)" }),
  keyword: css({ color: "light-dark(#cf222e, #ff7b72)" }),
  link: css({ color: "light-dark(#0969da, #58a6ff)" }),
  literal: css({ color: "light-dark(#0550ae, #79c0ff)" }),
  meta: css({ color: "light-dark(#57606a, #8b949e)" }),
  number: css({ color: "light-dark(#0550ae, #79c0ff)" }),
  operator: css({ color: "light-dark(#8250df, #d2a8ff)" }),
  property: css({ color: "light-dark(#0550ae, #79c0ff)" }),
  selector: css({ color: "light-dark(#116329, #7ee787)" }),
  string: css({ color: "light-dark(#0a7f64, #a5d6ff)" }),
  tag: css({ color: "light-dark(#116329, #7ee787)" }),
  type: css({ color: "light-dark(#953800, #ffa657)" }),
  variable: css({ color: "light-dark(#953800, #ffa657)" }),
}
