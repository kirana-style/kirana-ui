# Message

<!-- ::preview item="message-pattern" height="560" combinations="solid/ark" -->

Use Message for one turn in a thread. The person's text is a [Bubble](/docs/components/bubble) on a [Message](/docs/components/message) with `align="end"`. The agent's reply is markdown on a Message, with actions under it. A thread of these turns is [Chat](/docs/ai-elements/chat).

## Installation

Message is built with the [Message](/docs/components/message), [Bubble](/docs/components/bubble), and [Tooltip](/docs/components/tooltip) components.

<!-- ::installation name="message bubble tooltip" combinations="solid/ark" -->

## Usage

```ts showLineNumbers
import { CopyIcon } from "lucide-react"

import { Bubble, BubbleContent } from "@/components/ui/bubble"
import { Button } from "@/components/ui/button"
import { Message, MessageContent, MessageFooter } from "@/components/ui/message"
```

The example draws each step with its own parts, which you copy beside it:

```tsx showLineNumbers title="message-action.tsx"
import { splitProps } from "solid-js"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import type { JSX } from "solid-js"
import type { Sx } from "@kirana-style/core"

export function MessageAction(props: {
  label: string
  children?: JSX.Element
  [attribute: string]: unknown
  sx?: Sx
  class?: string
}) {
  const [local, rest] = splitProps(props, ["label", "children", "sx", "class"])
  return (
    <Tooltip>
      <TooltipTrigger
        asChild={(childProps) => (
          <Button
            {...childProps()}
            variant="ghost"
            size="icon-sm"
            aria-label={local.label}
            {...rest}
          >
            {local.children}
          </Button>
        )}
      />
      <TooltipContent>
        <p>{local.label}</p>
      </TooltipContent>
    </Tooltip>
  )
}
```

See [Message](/docs/components/message).

## Actions

Put actions in `MessageFooter`. It follows the message alignment, so on the person's turn the actions sit on the right. Use ghost icon buttons with a tooltip for each.

- **Copy** writes the reply to the clipboard and swaps to a check for two seconds.
- **Good response** and **Bad response** are toggles. Set `aria-pressed` so screen readers announce the state.
- **Retry** runs the turn again.
- **Edit** on the person's turn puts the text back in the field.

## Markdown

The reply streams as markdown. Render it with [Streamdown](https://streamdown.ai) and route fenced code to a [Code Block](/docs/components/code-block#markdown), so code in the reply gets line numbers and a copy button.

## AI SDK

Branch on the message role. The person's turn is the bubble. The agent's turn is the reply, and `regenerate` with the message id runs it again.
