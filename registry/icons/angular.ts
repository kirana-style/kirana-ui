/**
 * `IconPlaceholder` for Angular: a directive on the `<svg>` a template writes
 * (`<svg iconPlaceholder lucide="…" tabler="…" hugeicons="…" phosphor="…" remixicon="…">`), which
 * draws the design system's library's icon into it. A directive on the element itself, not a
 * component around it, so the icon is the flex item a button or an input group lays out, and an
 * `[sx]` on it styles the `<svg>`. The library is provided once at the app's root under
 * `ICON_LIBRARY`, as a signal that follows the design.
 */
import {
  DestroyRef,
  Directive,
  ElementRef,
  InjectionToken,
  Renderer2,
  effect,
  inject,
  input,
  signal,
} from "@angular/core"
import type { Signal } from "@angular/core"

import { DEFAULT_DESIGN_SYSTEM } from "../core/config"
import type { IconLibrary } from "../core/config"
import { iconDataVersion, resolveIcon, subscribeIconData } from "./data"

export const ICON_LIBRARY = new InjectionToken<Signal<IconLibrary>>(
  "icon-library",
  { factory: () => signal(DEFAULT_DESIGN_SYSTEM.iconLibrary) }
)

const SVG = "http://www.w3.org/2000/svg"

/** The five libraries' names for an icon, which a placeholder draws from its library's data. */
export type IconNames = {
  lucide: string
  tabler: string
  hugeicons: string
  phosphor: string
  remixicon: string
}

/**
 * Draws an icon into its host `<svg>`: the placeholder below, and a part that is an icon of its own
 * (Spinner), which gives its names in code.
 */
@Directive()
export abstract class IconDrawing {
  protected abstract readonly names: () => IconNames

  readonly #library = inject(ICON_LIBRARY)
  readonly #element = inject<ElementRef<SVGSVGElement>>(ElementRef)
  readonly #renderer = inject(Renderer2)
  // Draws again when a library's data arrives (Tabler, Phosphor and Remix Icon load on demand).
  readonly #version = signal(iconDataVersion())
  #drawn: Element[] = []
  #attributes: string[] = []

  constructor() {
    inject(DestroyRef).onDestroy(
      subscribeIconData(() => this.#version.set(iconDataVersion()))
    )
    effect(() => {
      this.#version()
      this.#draw(resolveIcon(this.#library(), this.names()))
    })
  }

  #draw(resolved: ReturnType<typeof resolveIcon>) {
    const svg = this.#element.nativeElement
    for (const node of this.#drawn) this.#renderer.removeChild(svg, node)
    for (const name of this.#attributes)
      this.#renderer.removeAttribute(svg, name)
    this.#drawn = []
    this.#attributes = []
    // No icon: nothing drawn, as React's placeholder renders nothing.
    if (!resolved) {
      this.#renderer.setAttribute(svg, "hidden", "")
      this.#attributes.push("hidden")
      return
    }
    for (const [name, value] of Object.entries(resolved.svg)) {
      this.#renderer.setAttribute(svg, name, String(value))
      this.#attributes.push(name)
    }
    for (const [tag, attributes] of resolved.nodes) {
      const node = this.#renderer.createElement(tag, SVG) as Element
      for (const [name, value] of Object.entries(attributes))
        this.#renderer.setAttribute(node, name, String(value))
      this.#renderer.appendChild(svg, node)
      this.#drawn.push(node)
    }
  }
}

@Directive({
  selector: "svg[iconPlaceholder]",
  host: { "aria-hidden": "true" },
})
export class IconPlaceholder extends IconDrawing {
  readonly lucide = input.required<string>()
  readonly tabler = input.required<string>()
  readonly hugeicons = input.required<string>()
  readonly phosphor = input.required<string>()
  readonly remixicon = input.required<string>()

  protected readonly names = () => ({
    lucide: this.lucide(),
    tabler: this.tabler(),
    hugeicons: this.hugeicons(),
    phosphor: this.phosphor(),
    remixicon: this.remixicon(),
  })
}
