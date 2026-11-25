import {
  Component,
  DestroyRef,
  ElementRef,
  Injector,
  afterNextRender,
  computed,
  effect,
  inject,
  input,
  numberAttribute,
  output,
  runInInjectionContext,
  signal,
} from "@angular/core"
import type { OnInit } from "@angular/core"
import { SxDirective, partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"

import { IconPlaceholder } from "../../../icons/angular"
import { useCopyToClipboard } from "../../../lib/angular/use-copy-to-clipboard"
import { button } from "../../../styles/button.styles"
import { copyButton } from "../../../styles/copy-button.styles"
import { visuallyHidden } from "../../../styles/visually-hidden.styles"
import { buttonLabels } from "./button"

type ButtonVariants = NonNullable<Parameters<typeof button>[0]>

/**
 * A Button that copies `value` when pressed and, for `timeout`, shows that it did:
 * `<button kuiCopyButton [value]="command">`. Its copy icon turns to a check, `data-copied` is
 * written, and its name becomes `copiedLabel`. Without content it is an icon button named by
 * `copyLabel`; content is drawn beside the icon and names it, each run of text labelled as a
 * Button's. `copied` is emitted with the value once it is on the clipboard, `copyError` when the
 * clipboard refuses it. A screen reader hears `copiedLabel` from a polite live region placed after
 * the button.
 */
@Component({
  selector: "button[kuiCopyButton]",
  imports: [IconPlaceholder, SxDirective],
  providers: [provideSxPart()],
  host: {
    type: "button",
    "data-slot": "copy-button",
    "[attr.data-copied]": "isCopied() || null",
    "[attr.aria-label]":
      "iconOnly() ? (isCopied() ? copiedLabel() : copyLabel()) : null",
    "[class]": "part().class",
    "[style]": "part().style",
    "(click)": "copy()",
  },
  template: `<span
      data-slot="copy-button-icon"
      [attr.data-icon]="iconOnly() ? null : 'inline-start'"
      [sx]="icon"
      ><svg
        iconPlaceholder
        lucide="CopyIcon"
        tabler="IconCopy"
        hugeicons="Copy01Icon"
        phosphor="CopyIcon"
        remixicon="RiFileCopyLine"
      ></svg
      ><svg
        iconPlaceholder
        lucide="CheckIcon"
        tabler="IconCheck"
        hugeicons="Tick02Icon"
        phosphor="CheckIcon"
        remixicon="RiCheckLine"
      ></svg></span
    ><ng-content />`,
})
class CopyButton implements OnInit {
  readonly value = input.required<string>()
  readonly timeout = input(2000, { transform: numberAttribute })
  readonly copyLabel = input("Copy")
  readonly copiedLabel = input("Copied")
  readonly variant = input<ButtonVariants["variant"]>("ghost")
  readonly size = input<ButtonVariants["size"]>("icon-sm")
  readonly sx = input<SxInput>()
  readonly copied = output<string>()
  readonly copyError = output<void>()

  protected readonly icon = copyButton.icon
  protected readonly part = computed(() =>
    partSx(
      [button({ variant: this.variant(), size: this.size() }), copyButton.root],
      this.sx()
    )
  )
  /** Whether the button holds nothing but its icon, read once it is drawn. */
  protected readonly iconOnly = signal(true)
  readonly #injector = inject(Injector)
  readonly #clipboard = signal<
    ReturnType<typeof useCopyToClipboard> | undefined
  >(undefined)
  protected readonly isCopied = computed(
    () => this.#clipboard()?.isCopied() ?? false
  )

  constructor() {
    buttonLabels()
    const element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement
    const live = document.createElement("span")
    live.setAttribute("aria-live", "polite")
    live.className = partSx(visuallyHidden, undefined).class ?? ""
    afterNextRender(() => {
      element.after(live)
      this.iconOnly.set(
        !Array.from(element.childNodes).some((node) =>
          node.nodeType === Node.ELEMENT_NODE
            ? (node as HTMLElement).dataset.slot !== "copy-button-icon"
            : node.nodeType === Node.TEXT_NODE && !!node.textContent?.trim()
        )
      )
    })
    effect(() => (live.textContent = this.isCopied() ? this.copiedLabel() : ""))
    inject(DestroyRef).onDestroy(() => live.remove())
  }

  // The helper reads its timeout once, so it is made once the inputs are set.
  ngOnInit() {
    runInInjectionContext(this.#injector, () =>
      this.#clipboard.set(useCopyToClipboard({ timeout: this.timeout() }))
    )
  }

  protected async copy() {
    const value = this.value()
    if (await this.#clipboard()?.copyToClipboard(value)) this.copied.emit(value)
    else this.copyError.emit()
  }
}

export { CopyButton }
