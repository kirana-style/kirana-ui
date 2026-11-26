/**
 * A part's defaults on Solid 2 (`registry/lib/solid2/with-defaults.ts`): a prop passed as
 * `undefined` keeps the default, which `merge(defaults, props)` alone loses, and the result
 * follows the props.
 */
import { createRoot, createSignal, flush, merge } from "solid-js"
import { describe, expect, it } from "vite-plus/test"

import { withDefaults } from "@workspace/registry/lib/solid2/with-defaults"

describe("withDefaults", () => {
  it("keeps a default while the prop is undefined", () => {
    const props: { variant?: "default" | "outline"; id?: string } = {
      variant: undefined,
      id: "a",
    }
    // What the parts did before: Solid 2's merge lets the undefined win.
    expect(merge({ variant: "default" } as const, props).variant).toBe(
      undefined
    )
    const local = withDefaults({ variant: "default" } as const, props)
    expect(local.variant).toBe("default")
    expect(local.id).toBe("a")
  })

  it("lets a set prop win, false and null among them", () => {
    const local = withDefaults(
      { open: true, label: "x" } as { open: boolean; label: string | null },
      {
        open: false,
        label: null,
      }
    )
    expect(local.open).toBe(false)
    expect(local.label).toBe(null)
  })

  it("follows the props as they change", () => {
    const [variant, setVariant] = createSignal<"outline" | undefined>()
    // The root holds what reads the signal; the write is outside it, as Solid 2 asks.
    const { local, dispose } = createRoot((end) => ({
      local: withDefaults({ variant: "default" } as const, {
        get variant() {
          return variant()
        },
      }),
      dispose: end,
    }))
    expect(local.variant).toBe("default")
    setVariant("outline")
    flush()
    expect(local.variant).toBe("outline")
    dispose()
  })
})
