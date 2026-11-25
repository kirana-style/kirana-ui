# AI Elements: the chat patterns, on the AI SDK or TanStack AI

The AI Elements (Reasoning, Tool, Message, Chain of Thought, Plan, Queue, Sources …) are the
registry's components (Trace, Message, Bubble, Code Block, Marker …) composed into chat patterns.
They render messages; the chat itself comes from a runtime. Pick one per chat, the one the project
uses, and never mix them in one chat.

## The packages

| Framework                            | AI SDK                                                                                       | TanStack AI                                                                                             |
| ------------------------------------ | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| React                                | `ai @ai-sdk/react` (`useChat`)                                                               | `@tanstack/ai @tanstack/ai-react` (`useChat`)                                                           |
| Vue                                  | `ai @ai-sdk/vue` (`useChat`)                                                                 | `@tanstack/ai @tanstack/ai-vue` (`useChat`)                                                             |
| Svelte                               | `ai @ai-sdk/svelte` (`new Chat()`)                                                           | `@tanstack/ai @tanstack/ai-svelte` (`createChat`)                                                       |
| Solid 1 (Ark UI base)                | `ai`: no current adapter, the demo's `Chat` is the SDK's `AbstractChat` over Solid's signals | `@tanstack/ai @tanstack/ai-solid` (`useChat`)                                                           |
| Solid 2 (Kirana UI and ui-sdk bases) | as Solid 1                                                                                   | `@tanstack/ai @tanstack/ai-client`: `@tanstack/ai-solid` is Solid 1 only; a `useChat` over `ChatClient` |
| Angular                              | `ai`: the demo's `Chat` over Angular's signals                                               | `@tanstack/ai @tanstack/ai-angular` (`injectChat`)                                                      |

Each pattern's docs page has an "AI SDK | TanStack AI" switch: its demo and its code follow it.

## What differs between them

|                     | AI SDK                                                 | TanStack AI                                                                                                       |
| ------------------- | ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------- |
| A message's text    | `part.type === "text"`, `part.text`                    | `part.type === "text"`, `part.content`                                                                            |
| Reasoning           | a `reasoning` part with `state: "streaming" \| "done"` | a `thinking` part, no state: it is still thinking while it is the streaming message's last part                   |
| A tool call         | a `tool-<name>` part (`input`, `output`, `state`)      | a `tool-call` part (`name`, `input`, `output`, `state`) and a `tool-result` part after it, which carries an error |
| Approval            | `tool-approval-request`                                | a tool with `needsApproval`: the chat raises an interrupt (`interrupts`, `resolveInterrupt(true \| false)`)       |
| Sources, data parts | `source-url`, `data-*` parts                           | none: a tool's output carries them (`searchWeb` returning `sources`)                                              |
| A chat's id         | optional                                               | `threadId` is required (any non-empty string)                                                                     |

## Scripted chats for demos and tests

`@shadcn/helpers` writes a conversation in code and streams it through the real chat, with no model,
route or network: `@shadcn/helpers/ai-sdk` and `@shadcn/helpers/tanstack-ai`
(`createChat().user("…").assistant(({ writer }) => { writer.reasoning("…"); writer.text("…") })`).
The TanStack AI helper declares TanStack AI 0.40 as its peer and works with 1.x: give the chat a
`threadId`. It cannot script approvals or custom events yet; leave the call without an output and
answer it on the client (`addToolResult`, or a client tool with `needsApproval`).
The site's Helpers pages (`/docs/helpers/ai-sdk`, `/docs/helpers/tanstack-ai`) have the full API.

## TanStack AI's own guidance

`@tanstack/ai` ships agent skills. With TanStack Intent: allow it in `package.json`
(`"intent": { "skills": ["@tanstack/ai"] }`), then
`npx @tanstack/intent load @tanstack/ai#ai-core/chat-experience` (also `#ai-core/tool-calling`,
`#ai-core/ag-ui-protocol`).
