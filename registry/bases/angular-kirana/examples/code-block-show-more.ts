import { Component, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import {
  HighlightedLine,
  useHighlightedCode,
} from "../../../lib/angular/use-highlighted-code"
import { css } from "@kirana-style/core"
import { containerSize, duration, easing, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { scrollFade } from "../../../styles/scroll-fade.styles"
import { IconPlaceholder } from "../../../icons/angular"
import { Button } from "../ui/button"
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockFooter,
  CodeBlockHeader,
  CodeBlockLine,
  CodeBlockTitle,
} from "../ui/code-block"

const styles = {
  div: css({
    width: "100%",
    maxWidth: containerSize.md,
  }),
  codeBlockContent: css({
    maxHeight: { "*": null, base: space[64] },
    overflowY: { "*": null, base: "hidden" },
  }),
  codeBlockFooter: css({
    justifyContent: { "*": null, base: "center" },
  }),
  iconPlaceholder: css({
    transitionDuration: duration[150],
    transitionProperty: "transform, translate, scale, rotate",
    transitionTimingFunction: easing.inOut,
  }),
  // Upstream's `in-aria-expanded:rotate-180`: the chevron turns while the code is expanded.
  expanded: css({ rotate: "180deg" }),
}

const code = `import * as React from "react"
import { useChat } from "@ai-sdk/react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Chat() {
  const [input, setInput] = React.useState("")
  const { messages, sendMessage, status } = useChat()

  return (
    <div className="flex flex-col gap-4">
      {messages.map((message) => (
        <div key={message.id}>
          {message.parts.map((part, index) =>
            part.type === "text" ? <p key={index}>{part.text}</p> : null
          )}
        </div>
      ))}
      <form
        onSubmit={(event) => {
          event.preventDefault()
          sendMessage({ text: input })
          setInput("")
        }}
      >
        <Input value={input} onChange={(event) => setInput(event.target.value)} />
        <Button disabled={status !== "ready"}>Send</Button>
      </form>
    </div>
  )
}`

const lines = useHighlightedCode(
  () => code,
  () => "tsx"
)
let next = 0

@Component({
  selector: "code-block-show-more",
  imports: [
    HighlightedLine,
    Button,
    CodeBlock,
    CodeBlockActions,
    CodeBlockContent,
    CodeBlockCopyButton,
    CodeBlockFooter,
    CodeBlockHeader,
    CodeBlockLine,
    CodeBlockTitle,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.div">
        <div kuiCodeBlock>
          <div kuiCodeBlockHeader>
            <div kuiCodeBlockTitle>components/chat.tsx</div>
            <div kuiCodeBlockActions>
              <button kuiCodeBlockCopyButton [value]="code"></button>
            </div>
          </div>
          <pre
            kuiCodeBlockContent
            [attr.id]="id"
            lineNumbers
            [sx]="
              expanded() ? undefined : [scrollFade, styles.codeBlockContent]
            "
          >@for (line of lines(); track index; let index = $index) {<span kuiCodeBlockLine><kui-highlighted-line [tokens]="line" /></span>}</pre>
          <div kuiCodeBlockFooter [sx]="styles.codeBlockFooter">
            <button
              kuiButton
              variant="ghost"
              size="xs"
              [attr.aria-expanded]="expanded()"
              [attr.aria-controls]="id"
              (click)="expanded.set(!expanded())"
            >
              <svg
                iconPlaceholder
                lucide="ChevronDownIcon"
                tabler="IconChevronDown"
                hugeicons="ArrowDown01Icon"
                phosphor="CaretDownIcon"
                remixicon="RiArrowDownSLine"
                [sx]="[styles.iconPlaceholder, expanded() && styles.expanded]"
              ></svg>
              {{ expanded() ? "Show less" : "Show more" }}
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class CodeBlockShowMore {
  protected readonly expanded = signal(false)
  protected readonly styles = styles
  protected readonly code = code
  protected readonly lines = lines
  protected readonly id = `code-block-show-more-${next++}`
  protected readonly page = page
  protected readonly scrollFade = scrollFade
}
