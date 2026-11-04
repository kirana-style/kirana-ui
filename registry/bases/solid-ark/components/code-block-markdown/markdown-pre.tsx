/** A fenced block: TanStack Markdown names its language in `data-lang`. */
import { textOf } from "../../../../lib/markdown-tree"
import type { MarkdownElement } from "../../../../lib/markdown-tree"
import { MarkdownCodeBlock } from "./markdown-code-block"

export function MarkdownPre(props: {
  node: MarkdownElement
  "data-lang"?: string
  [attribute: string]: unknown
}) {
  // The fence's text, its `code` element's, as React's reads `children.props.children`.
  return (
    <MarkdownCodeBlock
      code={textOf(props.node.children)}
      language={String(props["data-lang"] ?? "")}
    />
  )
}
