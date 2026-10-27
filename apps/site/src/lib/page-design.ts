import { useRouterState } from "@tanstack/react-router"

import { readPreviewDesign } from "@workspace/registry/core/preview"
import type { PreviewDesign } from "@workspace/registry/core/preview"

/**
 * The design a page is in: on a preview, the one its URL names; the site's pages take the default
 * until the customizer reaches them. Read from the router's location, not the route's context: a
 * prerendered page's context is the one it was rendered with, without the query the reader opened
 * it at.
 */
export function usePageDesign(): PreviewDesign {
  const query = useRouterState({
    select: ({ location }) =>
      location.pathname.startsWith("/preview/") ? location.searchStr : "",
  })
  return readPreviewDesign(new URLSearchParams(query))
}
