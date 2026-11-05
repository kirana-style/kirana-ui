/**
 * The AI SDK's `Chat` on Angular: the SDK's `AbstractChat` over a state held in signals, so
 * `chat.messages` and `chat.status` are reactive where a template or a `computed` reads them. The
 * chat demos use it as Svelte's and Solid's: `new Chat({ messages, transport })`.
 *
 * `@ai-sdk/angular`'s `Chat` would do, but keeps the message the stream writes in place, so a part
 * read through a signal input never shows its later states (a tool row stays "running"): this one
 * copies each message, as React's state does (LF-018, for `@ai-sdk/angular` 3.0.158).
 */
import { signal } from "@angular/core"
import { AbstractChat } from "ai"
import type { ChatInit, ChatState, ChatStatus, UIMessage } from "ai"

/**
 * A copy of a value, as React's chat state takes one: the SDK writes a streaming message in place
 * (a tool part's state, its output) and hands the same object back, and a signal notifies only
 * when its value is a new one.
 */
const snapshot = <T>(value: T): T => structuredClone(value)

class AngularChatState<M extends UIMessage> implements ChatState<M> {
  readonly #messages
  readonly #status = signal<ChatStatus>("ready")
  readonly #error = signal<Error | undefined>(undefined)

  constructor(messages: M[] = []) {
    this.#messages = signal<M[]>(messages)
  }

  get messages() {
    return this.#messages()
  }
  set messages(messages: M[]) {
    this.#messages.set(messages)
  }
  get status() {
    return this.#status()
  }
  set status(status: ChatStatus) {
    this.#status.set(status)
  }
  get error() {
    return this.#error()
  }
  set error(error: Error | undefined) {
    this.#error.set(error)
  }

  pushMessage = (message: M) =>
    this.#messages.update((all) => [...all, snapshot(message)])
  popMessage = () => this.#messages.update((all) => all.slice(0, -1))
  replaceMessage = (index: number, message: M) =>
    this.#messages.update((all) =>
      all.map((current, at) => (at === index ? snapshot(message) : current))
    )
  snapshot = snapshot
}

export class Chat<M extends UIMessage = UIMessage> extends AbstractChat<M> {
  constructor({ messages, ...init }: ChatInit<M>) {
    super({ ...init, state: new AngularChatState<M>(messages) })
  }
}
