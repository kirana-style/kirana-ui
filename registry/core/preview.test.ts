import { describe, expect, it } from "vite-plus/test"

import { DEFAULT_DESIGN_SYSTEM } from "./config"
import { encodePreset } from "./preset"
import {
  DESIGN_MESSAGE,
  documentAttributes,
  listenForDesign,
  previewQuery,
  readPageDesign,
  readPreviewDesign,
} from "./preview"

const params = (query: string) => new URLSearchParams(query)

describe("the preview's design", () => {
  it("is the default design with no query", () => {
    const design = readPreviewDesign(params(""))
    expect(design.system).toEqual(DEFAULT_DESIGN_SYSTEM)
    expect(design.options).toEqual({ rtl: false, pointer: false })
  })

  it("reads a shadcn/ui preset and the options", () => {
    // `b6ZjlcKFk` is Mira on Mauve, as ui.shadcn.com writes it.
    const design = readPreviewDesign(
      params("preset=b6ZjlcKFk&rtl=true&pointer=1")
    )
    expect(design.system.style).toBe("mira")
    expect(design.system.baseColor).toBe("mauve")
    expect(design.options).toEqual({ rtl: true, pointer: true })
  })

  it("lets an axis parameter override the preset, as upstream's query does", () => {
    const design = readPreviewDesign(params("preset=b0&style=lyra"))
    expect(design.system.style).toBe("lyra")
    // The preset's radius stays; Lyra draws its corners square in the stylesheet.
    expect(design.system.radius).toBe("default")
  })

  it("writes every axis's attribute, the direction and the pointer", () => {
    const attributes = documentAttributes(
      readPreviewDesign(params("style=vega&baseColor=stone&rtl=true"))
    )
    expect(attributes).toMatchObject({
      "data-style": "vega",
      "data-base-color": "stone",
      "data-theme": "stone",
      dir: "rtl",
      "data-pointer": undefined,
    })
    expect(Object.keys(attributes)).toHaveLength(11)
  })

  it("names itself with a k preset that reads back the same", () => {
    const design = readPreviewDesign(
      params("style=maia&theme=blue&pointer=true")
    )
    expect(readPreviewDesign(params(previewQuery(design)))).toEqual(design)
  })
})

describe("the framing page's messages", () => {
  function frame() {
    const parent = {}
    const listeners = new Set<(event: MessageEvent) => void>()
    const target = {
      parent,
      addEventListener: (_: string, listener: (event: MessageEvent) => void) =>
        listeners.add(listener),
      removeEventListener: (
        _: string,
        listener: (event: MessageEvent) => void
      ) => listeners.delete(listener),
    } as unknown as Window
    const post = (data: unknown, source: unknown = parent) => {
      for (const listener of listeners)
        listener({ data, source } as MessageEvent)
    }
    return { target, post, listeners }
  }

  it("takes upstream's design-system-params and ignores the rest", () => {
    const { target, post, listeners } = frame()
    const seen: string[] = []
    const stop = listenForDesign(target, (design) =>
      seen.push(design.system.style)
    )
    post({
      type: DESIGN_MESSAGE,
      data: { preset: "b0", style: "lyra", rtl: false },
    })
    post({ type: "something-else", data: { style: "vega" } })
    post({ type: DESIGN_MESSAGE, data: { style: "maia" } }, {})
    expect(seen).toEqual(["lyra"])
    stop()
    expect(listeners.size).toBe(0)
  })
})

describe("a page's design", () => {
  it("is the URL's when it names one, over the saved one", () => {
    const design = readPageDesign("?style=lyra", "kui-preset=k0")
    expect(design.system.style).toBe("lyra")
  })

  it("is the saved one when the URL names none, with the URL's options", () => {
    const saved = readPreviewDesign(params("style=maia&theme=blue")).system
    const design = readPageDesign(
      "?rtl=true",
      `kirana-theme=dark; kui-preset=${encodePreset(saved)}`
    )
    expect(design.system).toEqual(saved)
    expect(design.options.rtl).toBe(true)
  })

  it("is the default with neither", () => {
    expect(readPageDesign("", "").system).toEqual(DEFAULT_DESIGN_SYSTEM)
  })

  it("reads a colour mode in `theme` as the mode, not the design", () => {
    const saved = encodePreset(readPreviewDesign(params("theme=blue")).system)
    const design = readPageDesign("?theme=dark", `kui-preset=${saved}`)
    expect(design.system.theme).toBe("blue")
    expect(readPageDesign("?theme=rose", "").system.theme).toBe("rose")
  })
})
