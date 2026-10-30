import { IconPlaceholder } from "../../../icons/icon-placeholder"
import * as React from "react"

import { useHighlightedCode } from "../../../lib/use-highlighted-code"
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
import { css, props as styleProps } from "@kirana-style/core"
import { containerSize, duration, easing, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { scrollFade } from "../../../styles/scroll-fade.styles"

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

export default function CodeBlockShowMore() {
  const [expanded, setExpanded] = React.useState(false)
  const lines = useHighlightedCode(code, "tsx")
  const id = React.useId()

  return (
    <div sx={page.example}>
      <div sx={styles.div}>
        <CodeBlock>
          <CodeBlockHeader>
            <CodeBlockTitle>components/chat.tsx</CodeBlockTitle>
            <CodeBlockActions>
              <CodeBlockCopyButton value={code} />
            </CodeBlockActions>
          </CodeBlockHeader>
          <CodeBlockContent
            id={id}
            lineNumbers
            sx={expanded ? undefined : [scrollFade, styles.codeBlockContent]}
          >
            {lines.map((line, index) => (
              <CodeBlockLine key={index}>{line}</CodeBlockLine>
            ))}
          </CodeBlockContent>
          <CodeBlockFooter sx={styles.codeBlockFooter}>
            <Button
              variant="ghost"
              size="xs"
              aria-expanded={expanded}
              aria-controls={id}
              onPress={() => setExpanded(!expanded)}
            >
              <IconPlaceholder
                lucide="ChevronDownIcon"
                tabler="IconChevronDown"
                hugeicons="ArrowDown01Icon"
                phosphor="CaretDownIcon"
                remixicon="RiArrowDownSLine"
                {...styleProps(
                  styles.iconPlaceholder,
                  expanded && styles.expanded
                )}
              />
              {expanded ? "Show less" : "Show more"}
            </Button>
          </CodeBlockFooter>
        </CodeBlock>
      </div>
    </div>
  )
}
