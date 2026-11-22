# Tool

<!-- ::preview item="tool-demo" height="490" combinations="angular/kirana" runtimes="ai-sdk,tanstack-ai" -->

Tool is a tool call the agent makes, such as running a command or reading a file. The line follows the call from input to output, including errors and calls that wait for approval.

Tool is built with `Trace` with a `TraceCollapsible` for each call that has output.

## Installation

Tool is built with the [Trace](/docs/components/trace) and [Code Block](/docs/components/code-block) components.

<!-- ::installation name="trace code-block" combinations="angular/kirana" runtimes="ai-sdk,tanstack-ai" -->

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

<!-- ::demo-source item="tool-demo" parts="true" combinations="angular/kirana" -->

## States

Trace does not read tool parts. Map each part's `state` to a `status` and a title.

<!-- ::preview item="tool-states" height="300" combinations="angular/kirana" -->

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

A tool that runs on the client stays `input-available` after the chat stops until you call `addToolOutput`. Treat it as waiting, not failed.

<!-- ::end:runtime -->

<!-- ::start:runtime tanstack-ai -->

| Tool call state                                                      | `status`                             | Title                                                                |
| -------------------------------------------------------------------- | ------------------------------------ | -------------------------------------------------------------------- |
| `awaiting-input`, `input-streaming`, `input-complete`                | `"running"` while the chat streams   | Running …                                                            |
| `awaiting-input`, `input-streaming`, `input-complete` after it stops | `"error"`                            | Failed to run …                                                      |
| `approval-requested`, or a `tool-approval` interrupt for the call    | -                                    | Not a line. An `Item` outside `Trace` with Approve and Deny buttons. |
| `approval-responded`                                                 | `"running"` if approved, none if not | Running … if approved, Denied … if not                               |
| `complete`                                                           | none                                 | Ran …                                                                |
| `error`                                                              | `"error"`                            | Failed to run …                                                      |

A tool call is a `tool-call` part, and its result a `tool-result` part after it, which holds the `error` of a call that failed.

A client tool with no `execute` stays `input-complete` after the chat stops until you call `addToolResult`. Treat it as waiting, not failed.

<!-- ::end:runtime -->

A tool is a plain `TraceLine` while it runs, and a `TraceCollapsible` once its output arrives.

## Output in a Sheet

<!-- ::preview item="tool-sheet" height="410" combinations="angular/kirana" runtimes="ai-sdk,tanstack-ai" -->

See [Trace](/docs/components/trace#dialog).

## Approval

A pending approval is a question for the person, not a step the agent took, so it sits outside `Trace` as an `Item`. Once the person answers, the tool goes back to being a line. See [Confirmation](/docs/ai-elements/confirmation).

<!-- ::preview item="tool-approval" height="410" combinations="angular/kirana" runtimes="ai-sdk,tanstack-ai" -->

<!-- ::start:runtime ai-sdk -->

Pass `sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithApprovalResponses` to the `Chat` so the chat continues once every approval has an answer.

<!-- ::end:runtime -->

<!-- ::start:runtime tanstack-ai -->

Give the tool `needsApproval: true` and pass it to `injectChat` in `tools`. A call that needs an answer is one of the chat's `interrupts()`, a `tool-approval` with the call's `toolCallId` and `originalArgs`: answer it with `resolveInterrupt(true)` or `resolveInterrupt(false)`. The chat continues on its own once every interrupt has an answer: an approved client tool runs, and a denied one ends in an error result.

<!-- ::end:runtime -->

## API Reference

See [Trace](/docs/components/trace#api-reference).
