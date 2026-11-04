/**
 * The AI SDK's `Chat` on Solid, as `@ai-sdk/svelte` and `@ai-sdk/vue` build theirs: the SDK's
 * `AbstractChat` over a state held in signals, so `chat.messages` and `chat.status` are reactive
 * where a component reads them. The SDK has no Solid adapter for its current major (`@ai-sdk/solid`
 * stops at 1.x), so the chat demos use this one: `new Chat({ messages, transport })`, as Svelte's.
 */
import { AbstractChat } from "ai"
import type { ChatInit, ChatState, ChatStatus, UIMessage } from "ai"
import { createSignal } from "solid-js"

/**
 * A copy of a message with its parts copied: the SDK writes a streaming message in place, and
 * Solid follows a value only when it is a new one.
 */
function snapshot<T>(value: T): T {
  if (
    value === null ||
    typeof value !== "object" ||
    !("parts" in value) ||
    !Array.isArray(value.parts)
  )
    return value
  return { ...value, parts: value.parts.map((part: object) => ({ ...part })) }
}

class SolidChatState<M extends UIMessage> implements ChatState<M> {
  #messages
  #status
  #error

  constructor(messages: M[] = []) {
    this.#messages = createSignal<M[]>(messages)
    this.#status = createSignal<ChatStatus>("ready")
    this.#error = createSignal<Error | undefined>(undefined)
  }

  get messages() {
    return this.#messages[0]()
  }
  set messages(messages: M[]) {
    this.#messages[1](messages)
  }
  get status() {
    return this.#status[0]()
  }
  set status(status: ChatStatus) {
    this.#status[1](status)
  }
  get error() {
    return this.#error[0]()
  }
  set error(error: Error | undefined) {
    this.#error[1](() => error)
  }

  pushMessage = (message: M) => this.#messages[1]((all) => [...all, message])
  popMessage = () => this.#messages[1]((all) => all.slice(0, -1))
  replaceMessage = (index: number, message: M) =>
    this.#messages[1]((all) =>
      all.map((current, at) => (at === index ? message : current))
    )
  snapshot = snapshot
}

export class Chat<M extends UIMessage = UIMessage> extends AbstractChat<M> {
  constructor({ messages, ...init }: ChatInit<M>) {
    super({ ...init, state: new SolidChatState<M>(messages) })
  }
}
