---
title: Chat
description: The thread. Message Scroller keeps your place while the reply streams.
section: ai-elements
variants: [react/base, react/aria]
keywords: [chat, ai elements, agent, chat]
---

# Chat

<!-- ::preview item="chat-demo" height="840" combinations="react/base,react/aria" -->

Chat is the thread of a conversation with the agent. Each turn is a [Message](/docs/ai-elements/message) inside [Message Scroller](/docs/components/message-scroller). The person's message is the scroll anchor, so a new question settles near the top and the reply streams in under it. The field is a [Prompt Input](/docs/ai-elements/prompt-input).

## Installation

Chat is built with the [Message Scroller](/docs/components/message-scroller), [Message](/docs/components/message), [Bubble](/docs/components/bubble), and [Input Group](/docs/components/input-group) components.

<!-- ::installation name="message-scroller message bubble input-group" combinations="react/base,react/aria" -->

## Usage

```tsx showLineNumbers
<MessageScrollerProvider autoScroll>
  <MessageScroller>
    <MessageScrollerViewport>
      <MessageScrollerContent>
        <MessageScrollerItem messageId={id} scrollAnchor>
          <Message align="end">
            <MessageContent>
              <Bubble align="end" variant="muted">
                <BubbleContent>{text}</BubbleContent>
              </Bubble>
            </MessageContent>
          </Message>
        </MessageScrollerItem>
      </MessageScrollerContent>
    </MessageScrollerViewport>
    <MessageScrollerButton />
  </MessageScroller>
</MessageScrollerProvider>
```

`scrollAnchor` goes on the person's turn. `autoScroll` follows the reply while the person stays at the live edge.

See [Message Scroller](/docs/components/message-scroller).

## AI SDK Helper

To build without a model, script the conversation with [`createChat`](https://ui.shadcn.com/docs/helpers/ai-sdk) (`@shadcn/helpers`). Each agent turn streams reasoning, a tool call and a reply. `chat.next()` fills the field with the next scripted message, and a string `fallback` replies once the script runs out.

```ts showLineNumbers
const chat = createChat()
  .user("Add a dark mode toggle to the settings page.")
  .assistant(({ writer }) => {
    writer.reasoning("I need to know how themes are set up first.")
    writer
      .tool("runCommand", { input: { command: "rg -l ThemeProvider app" } })
      .output({ stdout: "app/layout.tsx" })
    writer.text("next-themes is already set up, so I added a ModeToggle.")
  })

const transport = chat.transport({
  fallback:
    "This demo only knows the scripted turns. Press reset to start over.",
})

const nextMessage = chat.next(messages)
```

## Migrating from AI SDK Elements

If you added Conversation from [AI SDK Elements](https://elements.ai-sdk.dev), your project has a `components/ai-elements/conversation.tsx` wrapper. Paste this prompt into your coding agent to rebuild it on Message Scroller. Every export keeps its name and props, so the code that uses it keeps working.

<!-- ::start:only react/base -->

```txt title="Prompt" prompt
Migrate components/ai-elements/conversation.tsx from AI SDK Elements to kirana/ui's Message Scroller component.

Keep every export, with the same name and props, so the code that imports it keeps working. Only change how each part renders.

1. Install Message Scroller: npx kirana-style ui add message-scroller
2. Read https://ui.kirana.style/docs/ai-elements/react/base/chat.md and build Chat the same way.
3. Rebuild each part:
   - Conversation renders a MessageScrollerProvider with autoScroll and a MessageScroller, instead of StickToBottom.
   - ConversationContent renders a MessageScrollerViewport and a MessageScrollerContent.
   - ConversationScrollButton renders a MessageScrollerButton.
   - Keep ConversationEmptyState, ConversationDownload and messagesToMarkdown as they are.
4. In the code that renders the thread, wrap each message in a MessageScrollerItem with its messageId, and set scrollAnchor on the person's messages. This is the only change outside the file.
5. Remove use-stick-to-bottom from the dependencies.
6. Remove the imports the file no longer uses.
7. Run the type checker and fix any errors.
```

<!-- ::end:only -->

<!-- ::start:only react/aria -->

```txt title="Prompt" prompt
Migrate components/ai-elements/conversation.tsx from AI SDK Elements to kirana/ui's Message Scroller component.

Keep every export, with the same name and props, so the code that imports it keeps working. Only change how each part renders.

1. Install Message Scroller: npx kirana-style ui add message-scroller
2. Read https://ui.kirana.style/docs/ai-elements/react/aria/chat.md and build Chat the same way.
3. Rebuild each part:
   - Conversation renders a MessageScrollerProvider with autoScroll and a MessageScroller, instead of StickToBottom.
   - ConversationContent renders a MessageScrollerViewport and a MessageScrollerContent.
   - ConversationScrollButton renders a MessageScrollerButton.
   - Keep ConversationEmptyState, ConversationDownload and messagesToMarkdown as they are.
4. In the code that renders the thread, wrap each message in a MessageScrollerItem with its messageId, and set scrollAnchor on the person's messages. This is the only change outside the file.
5. Remove use-stick-to-bottom from the dependencies.
6. Remove the imports the file no longer uses.
7. Run the type checker and fix any errors.
```

<!-- ::end:only -->
