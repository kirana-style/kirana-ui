import {
  Component,
  DestroyRef,
  Directive,
  ElementRef,
  afterNextRender,
  afterRenderEffect,
  booleanAttribute,
  computed,
  effect,
  inject,
  input,
  numberAttribute,
  signal,
  viewChild,
} from "@angular/core"
import { SxDirective, partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"

import { IconPlaceholder } from "../../../icons/angular"
import { button } from "../../../styles/button.styles"
import { codeBlock } from "../../../styles/code-block.styles"
import { visuallyHidden } from "../../../styles/visually-hidden.styles"

type ButtonVariants = NonNullable<Parameters<typeof button>[0]>

@Directive({
  selector: "[kuiCodeBlock]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "code-block",
    "[attr.data-variant]": "variant()",
    "[attr.data-size]": "size()",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class CodeBlock {
  readonly variant = input<"default" | "destructive">("default")
  readonly size = input<"default" | "sm">("default")
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(codeBlock.root, this.sx()))
}

@Directive({
  selector: "[kuiCodeBlockActions]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "code-block-actions",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class CodeBlockActions {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(codeBlock.actions, this.sx()))
}

/** One line: `<span kuiCodeBlockLine variant="added">`. An empty one holds a newline, so copying keeps it. */
@Component({
  selector: "span[kuiCodeBlockLine]",
  imports: [SxDirective],
  providers: [provideSxPart()],
  host: {
    "data-slot": "code-block-line",
    "[attr.data-variant]": "variant()",
    "[class]": "part().class",
    "[style]": "part().style",
  },
  template: `<span
    #content
    data-slot="code-block-line-content"
    [sx]="lineContent"
    ><ng-content
  /></span>`,
})
class CodeBlockLine {
  readonly variant = input<"default" | "added" | "removed" | "highlighted">(
    "default"
  )
  readonly sx = input<SxInput>()
  protected readonly lineContent = codeBlock.lineContent
  protected readonly part = computed(() => partSx(codeBlock.line, this.sx()))
  private readonly content =
    viewChild.required<ElementRef<HTMLElement>>("content")

  constructor() {
    afterRenderEffect(() => {
      const element = this.content().nativeElement
      const empty = ![...element.childNodes].some(
        (node) =>
          node.nodeType !== Node.COMMENT_NODE &&
          node.textContent !== "" &&
          node.textContent !== "\n"
      )
      if (empty && element.textContent !== "\n") element.append("\n")
    })
  }
}

/**
 * The code: `<pre kuiCodeBlockContent>`, its content inside a `<code>`. Numbered (`lineNumbers`), it
 * takes the code as `code` and draws a line per line of it, as React's splits a string child; or
 * the caller's own `CodeBlockLine`s.
 */
@Component({
  selector: "pre[kuiCodeBlockContent]",
  imports: [CodeBlockLine, SxDirective],
  providers: [provideSxPart()],
  host: {
    "data-slot": "code-block-content",
    "[attr.data-wrap]": "wrap() || null",
    "[attr.data-numbered]": "lineNumbers() || null",
    dir: "ltr",
    tabindex: "0",
    "[style.counter-reset]": "'line ' + (startLine() - 1)",
    "[class]": "part().class",
    "[style]": "part().style",
  },
  template: `<code data-slot="code-block-code" [sx]="codeStyle">
    @if (lines(); as lines) {
      @for (line of lines; track $index) {
        <span kuiCodeBlockLine>{{ line }}</span>
      }
    } @else {
      <ng-content />
    }
  </code>`,
})
class CodeBlockContent {
  readonly wrap = input(false, { transform: booleanAttribute })
  readonly lineNumbers = input(false, { transform: booleanAttribute })
  readonly startLine = input(1, { transform: numberAttribute })
  readonly code = input<string>()
  readonly sx = input<SxInput>()
  protected readonly codeStyle = codeBlock.code
  protected readonly lines = computed(() => {
    const code = this.code()
    return this.lineNumbers() && code !== undefined
      ? code.replace(/\n$/, "").split("\n")
      : null
  })
  protected readonly part = computed(() =>
    partSx(
      [codeBlock.content, this.wrap() ? codeBlock.contentWrap : undefined],
      this.sx()
    )
  )
}

/**
 * Copies `value` and says so for two seconds: a Button (`ghost`, `icon-xs`) whose icon turns to a
 * check, and, after it, the polite announcement React's draws beside it.
 */
@Component({
  selector: "button[kuiCodeBlockCopyButton]",
  imports: [IconPlaceholder],
  providers: [provideSxPart()],
  host: {
    type: "button",
    "data-slot": "code-block-copy-button",
    "[attr.data-copied]": "copied() || null",
    "[attr.aria-label]": "copied() ? 'Copied' : 'Copy'",
    "[class]": "part().class",
    "[style]": "part().style",
    "(click)": "copy()",
  },
  template: `
    @if (copied()) {
      <svg
        iconPlaceholder
        lucide="CheckIcon"
        tabler="IconCheck"
        hugeicons="Tick02Icon"
        phosphor="CheckIcon"
        remixicon="RiCheckLine"
      ></svg>
    } @else {
      <svg
        iconPlaceholder
        lucide="CopyIcon"
        tabler="IconCopy"
        hugeicons="Copy01Icon"
        phosphor="CopyIcon"
        remixicon="RiFileCopyLine"
      ></svg>
    }
  `,
})
class CodeBlockCopyButton {
  readonly value = input.required<string>()
  readonly variant = input<ButtonVariants["variant"]>("ghost")
  readonly size = input<ButtonVariants["size"]>("icon-xs")
  readonly sx = input<SxInput>()
  protected readonly copied = signal(false)
  protected readonly part = computed(() =>
    partSx(
      [
        button({ variant: this.variant(), size: this.size() }),
        codeBlock.copyButton,
      ],
      this.sx()
    )
  )
  #timer: ReturnType<typeof setTimeout> | undefined

  constructor() {
    const element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement
    const live = document.createElement("span")
    live.setAttribute("aria-live", "polite")
    live.className = partSx(visuallyHidden, undefined).class ?? ""
    afterNextRender(() => element.after(live))
    effect(() => (live.textContent = this.copied() ? "Copied" : ""))
    inject(DestroyRef).onDestroy(() => {
      clearTimeout(this.#timer)
      live.remove()
    })
  }

  protected copy() {
    navigator.clipboard
      .writeText(this.value())
      .then(() => {
        this.copied.set(true)
        clearTimeout(this.#timer)
        this.#timer = setTimeout(() => this.copied.set(false), 2000)
      })
      .catch(() => {})
  }
}

@Directive({
  selector: "[kuiCodeBlockFooter]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "code-block-footer",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class CodeBlockFooter {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(codeBlock.footer, this.sx()))
}

@Directive({
  selector: "[kuiCodeBlockHeader]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "code-block-header",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class CodeBlockHeader {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(codeBlock.header, this.sx()))
}

@Directive({
  selector: "[kuiCodeBlockTitle]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "code-block-title",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class CodeBlockTitle {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(codeBlock.title, this.sx()))
}

export {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockFooter,
  CodeBlockHeader,
  CodeBlockLine,
  CodeBlockTitle,
}
