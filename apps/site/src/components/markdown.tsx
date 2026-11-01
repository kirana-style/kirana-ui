/** What markdown renders as on the site: docs-ui's map, `preview` included, and the site's own. */
import { createMarkdownComponents } from "@workspace/docs-ui/markdown/index.tsx"
import type { CommentRegistry } from "@workspace/docs-ui/markdown/comment-component.tsx"

import { FormsCards } from "./forms-cards"

export const markdownComponents = createMarkdownComponents({
  "forms-cards": FormsCards as CommentRegistry[string],
})
