# Tool

<!-- ::preview item="tool-demo" runtimes="ai-sdk,tanstack-ai" height="490" combinations="solid/kirana" -->

Tool is a tool call the agent makes, such as running a command or reading a file. The line follows the call from input to output, including errors and calls that wait for approval.

Tool is built with `Trace` with a `TraceCollapsible` for each call that has output.

## Installation

Tool is built with the [Trace](/docs/components/trace) and [Code Block](/docs/components/code-block) components.

<!-- ::installation name="trace code-block" combinations="solid/kirana" runtimes="ai-sdk,tanstack-ai" -->

## Usage

```ts showLineNumbers
import { CodeBlock, CodeBlockContent } from "@/components/ui/code-block"
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "@/components/ui/trace"
```

The example draws each step with its own parts, which you copy beside it:

<!-- ::start:runtime ai-sdk -->

<!-- ::demo-source item="tool-demo" parts="true" combinations="solid/kirana" -->

<!-- ::end:runtime -->

<!-- ::start:runtime tanstack-ai -->

<!-- ::demo-source item="tool-demo-tanstack-ai" parts="true" combinations="solid/kirana" -->

<!-- ::end:runtime -->

## States

Trace does not read tool parts. Map each part's `state` to a `status` and a title.

<!-- ::preview item="tool-states" height="300" combinations="solid/kirana" -->

<!-- ::start:runtime ai-sdk -->

| Tool part state                                           | `status`                             | Title                                                                |
| --------------------------------------------------------- | ------------------------------------ | -------------------------------------------------------------------- |
| `input-streaming`, `input-available`                      | `"running"` while the chat streams   | Running …                                                            |
| `input-streaming`, `input-available` after the chat stops | `"error"`                            | Failed to run …                                                      |
| `approval-requested`                                      | -                                    | Not a line. An `Item` outside `Trace` with Approve and Deny buttons. |
| `approval-responded`                                      | `"running"` if approved, none if not | Running … if approved, Denied … if not                               |
| `output-available`                                        | none                                 | Ran …                                                                |
| `output-error`                                            | `"error"`                            | Failed to run …                                                      |
| `output-denied`                                           | none                                 | Denied …                                                             |

A tool is a plain `TraceLine` while it runs, and a `TraceCollapsible` once its output arrives.

A tool that runs on the client stays `input-available` after the chat stops until you call `addToolOutput`. Treat it as waiting, not failed.

<!-- ::end:runtime -->

<!-- ::start:runtime tanstack-ai -->

| `tool-call` part state                                                     | `status`                             | Title                                                                |
| -------------------------------------------------------------------------- | ------------------------------------ | -------------------------------------------------------------------- |
| `awaiting-input`, `input-streaming`, `input-complete`                      | `"running"` while the chat streams   | Running …                                                            |
| `awaiting-input`, `input-streaming`, `input-complete` after the chat stops | `"error"`                            | Failed to run …                                                      |
| `approval-requested`                                                       | -                                    | Not a line. An `Item` outside `Trace` with Approve and Deny buttons. |
| `approval-responded`                                                       | `"running"` if approved, none if not | Running … if approved, Denied … if not                               |
| `complete`                                                                 | none                                 | Ran …                                                                |
| `error`                                                                    | `"error"`                            | Failed to run …                                                      |

A tool is a plain `TraceLine` while it runs, and a `TraceCollapsible` once its result arrives. A failed tool's message is the `error` of the `tool-result` part that follows its `tool-call` part.

A tool that runs on the client stays `input-complete` until its `execute` returns or you call `addToolResult`. Treat it as waiting, not failed.

<!-- ::end:runtime -->

## Output in a Sheet

<!-- ::preview item="tool-sheet" runtimes="ai-sdk,tanstack-ai" height="410" combinations="solid/kirana" -->

See [Trace](/docs/components/trace#dialog).

## Approval

A pending approval is a question for the person, not a step the agent took, so it sits outside `Trace` as an `Item`. Once the person answers, the tool goes back to being a line. See [Confirmation](/docs/ai-elements/confirmation).

<!-- ::preview item="tool-approval" runtimes="ai-sdk,tanstack-ai" height="410" combinations="solid/kirana" -->

<!-- ::start:runtime ai-sdk -->

Pass `sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithApprovalResponses` to the `Chat` so the chat continues once every approval has an answer.

<!-- ::end:runtime -->

<!-- ::start:runtime tanstack-ai -->

Define the tool with `needsApproval: true`. TanStack AI pauses the run there, and `useChat` lists the pause in `interrupts()`; answer with `interrupt.resolveInterrupt(true)` or `false`, and the run goes on once every interrupt has an answer. The demo cannot send an interrupt: its command is a client tool that waits for the person's answer, as in [Confirmation](/docs/ai-elements/confirmation).

<!-- ::end:runtime -->

## API Reference

See [Trace](/docs/components/trace#api-reference).
