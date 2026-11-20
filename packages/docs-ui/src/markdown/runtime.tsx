/**
 * The chat runtime's picker, over a chat demo's preview, and `<!-- ::start:runtime tanstack-ai -->`
 * … `<!-- ::end:runtime -->`: a page's text for one runtime, shown when the reader has chosen it
 * (`runtime.ts`). Every block stays in the page, the others hidden, so search and the page's
 * markdown twin read all of them.
 */
import type { ReactNode } from "react"
import { css } from "@kirana-style/core"
import type { Sx } from "@workspace/registry/lib/sx"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@workspace/registry/bases/react-base/ui/toggle-group"

import { RUNTIMES, chooseRuntime, useRuntime } from "../runtime.ts"
import type { Runtime } from "../runtime.ts"

const styles = {
  picker: css({ flexShrink: 0 }),
}

export function RuntimePicker({ sx }: { sx?: Sx }) {
  const runtime = useRuntime()
  return (
    <ToggleGroup
      variant="outline"
      size="sm"
      spacing={0}
      value={[runtime]}
      onValueChange={(value) => {
        const next = value[0] as Runtime | undefined
        if (next) chooseRuntime(next)
      }}
      aria-label="Chat runtime"
      data-slot="runtime-picker"
      sx={[styles.picker, sx]}
    >
      {RUNTIMES.map((each) => (
        <ToggleGroupItem key={each.id} value={each.id}>
          {each.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
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
