/**
 * The chat runtime's switch, in the row of the page's bases (`frameworks.tsx`) on a page that
 * shows a chat demo, drawn as those bases are, and `<!-- ::start:runtime tanstack-ai -->` …
 * `<!-- ::end:runtime -->`: a page's text for one runtime, shown when the reader has chosen it
 * (`runtime.ts`). Every block stays in the page, the others hidden, so search and the page's
 * markdown twin read all of them.
 */
import type { ReactNode } from "react"
import { css } from "@kirana-style/core"
import type { Sx } from "@workspace/registry/lib/sx"
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@workspace/registry/bases/react-base/ui/tabs"

import { RUNTIMES, chooseRuntime, useRuntime } from "../runtime.ts"
import type { Runtime } from "../runtime.ts"

const styles = {
  root: css({ flexShrink: 0 }),
}

export function RuntimePicker({ sx }: { sx?: Sx }) {
  const runtime = useRuntime()
  return (
    <Tabs
      value={runtime}
      onValueChange={(value) => chooseRuntime(value as Runtime)}
      sx={[styles.root, sx]}
      data-slot="runtime-picker"
    >
      <TabsList aria-label="Chat runtime">
        {RUNTIMES.map((each) => (
          <TabsTrigger key={each.id} value={each.id}>
            {each.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}

export function MarkdownRuntime({
  name,
  children,
}: {
  name?: string
  children?: ReactNode
}) {
  const runtime = useRuntime()
  return (
    <div
      data-slot="runtime-block"
      data-runtime={name}
      hidden={name !== runtime}
    >
      {children}
    </div>
  )
}
