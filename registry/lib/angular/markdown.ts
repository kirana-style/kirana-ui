/**
 * TanStack Markdown on Angular: `<div [kuiMarkdown]="text" [components]="…" [extensions]="…">`,
 * React's `<Markdown>{text}</Markdown>`, drawn from the framework-free tree
 * (`lib/markdown-tree.ts`), since the package has no Angular adapter (LF-008). It fills the element
 * it is on, adding no element of its own, so a container's rules reach the blocks as its children.
 *
 * Angular's templates cannot name a tag at run time, so the tree is drawn with the DOM; an element
 * a page draws its own way (`components`) is that component, created in place with the element's
 * children projected into it and the element itself as its `node` input. A component reads what
 * its directive's ancestors provide (a `FenceOpen`, say), as React's reads its context.
 */
import {
  ApplicationRef,
  DestroyRef,
  Directive,
  ElementRef,
  EnvironmentInjector,
  Injector,
  createComponent,
  effect,
  inject,
  input,
  untracked,
} from "@angular/core"
import type { ComponentRef, Type } from "@angular/core"
import type { MarkdownInput, RenderOptions } from "@tanstack/markdown"

import { markdownTree } from "../markdown-tree"
import type { MarkdownElement, MarkdownTree } from "../markdown-tree"

/** A component that draws an element: it takes the element as its `node` input. */
export type MarkdownComponents = Partial<
  Record<string, Type<{ node: unknown }>>
>

/** An attribute's value as the DOM takes it: a table cell's alignment arrives as `{ textAlign }`. */
function attribute(element: HTMLElement, name: string, value: unknown) {
  if (value === undefined || value === null || value === false) return
  if (name === "style" && typeof value === "object") {
    for (const [key, entry] of Object.entries(value))
      element.style.setProperty(
        key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`),
        String(entry)
      )
    return
  }
  element.setAttribute(name, value === true ? "" : String(value))
}

@Directive({ selector: "[kuiMarkdown]" })
export class Markdown {
  readonly source = input.required<MarkdownInput>({ alias: "kuiMarkdown" })
  readonly components = input<MarkdownComponents>()
  readonly extensions = input<RenderOptions["extensions"]>()
  readonly highlighter = input<RenderOptions["highlighter"]>()
  readonly allowHtml = input(false)

  constructor() {
    const host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement
    const environmentInjector = inject(EnvironmentInjector)
    const elementInjector = inject(Injector)
    const application = inject(ApplicationRef)
    let created: ComponentRef<{ node: unknown }>[] = []

    const clear = () => {
      for (const component of created) {
        application.detachView(component.hostView)
        component.destroy()
      }
      created = []
    }

    const draw = (
      node: MarkdownTree,
      components: MarkdownComponents | undefined
    ): Node | null => {
      if (!node) return null
      if (typeof node === "string") return document.createTextNode(node)
      const element = node as MarkdownElement
      const children = () =>
        element.children
          .map((child) => draw(child, components))
          .filter((child): child is Node => child !== null)
      const custom = components?.[element.tag]
      if (custom) {
        const component = createComponent(custom, {
          environmentInjector,
          elementInjector,
          projectableNodes: [children()],
        })
        component.setInput("node", element)
        application.attachView(component.hostView)
        component.changeDetectorRef.detectChanges()
        created.push(component)
        return component.location.nativeElement as Node
      }
      const drawn = document.createElement(element.tag)
      for (const [name, value] of Object.entries(element.props))
        attribute(drawn, name, value)
      if (element.html !== undefined) drawn.innerHTML = element.html
      else drawn.append(...children())
      return drawn
    }

    effect(() => {
      const tree = markdownTree(this.source(), {
        extensions: this.extensions(),
        highlighter: this.highlighter(),
        allowHtml: this.allowHtml(),
      })
      const components = this.components()
      untracked(() => {
        clear()
        host.replaceChildren(
          ...tree
            .map((node) => draw(node, components))
            .filter((node): node is Node => node !== null)
        )
      })
    })
    inject(DestroyRef).onDestroy(clear)
  }
}
