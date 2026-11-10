/**
 * The framework and base the reader chose (`vue/ark`), where a route's loader runs: the cookie the
 * choice writes on the server, the saved choice on the client. A shared URL
 * (`/docs/components/button`) goes to that page when the component has it.
 */
import { createIsomorphicFn } from "@tanstack/react-start"
import { getCookie } from "@tanstack/react-start/server"

import {
  COMBINATION_COOKIE,
  savedCombination,
} from "@workspace/docs-ui/combination.ts"

export const readerCombination = createIsomorphicFn()
  .server((): string | undefined => {
    const value = getCookie(COMBINATION_COOKIE)
    return value ? decodeURIComponent(value) : undefined
  })
  .client((): string | undefined => savedCombination() ?? undefined)
