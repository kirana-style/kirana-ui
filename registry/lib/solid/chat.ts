/**
 * The AI SDK's `Chat` on Solid, as `@ai-sdk/svelte` and `@ai-sdk/vue` build theirs: the SDK's
 * `AbstractChat` over a state Solid follows, so `chat.messages` and `chat.status` are reactive where
 * a component reads them. The SDK has no Solid adapter for its current major (`@ai-sdk/solid`
 * stops at 1.x), so the chat demos use this one: `new Chat({ messages, transport })`, as Svelte's.
 *
 * The messages are a store. The SDK writes a streaming message in place and hands the same object
 * back on every update, so each update is reconciled into the store: a part's new state or text
 * reaches whatever reads it, and each message and part keeps its identity, so a `For` over them
 * keeps its rows (a row opened while it streams stays open).
 */
import { AbstractChat } from "ai"
import type { ChatInit, ChatState, ChatStatus, UIMessage } from "ai"
import { createSignal } from "solid-js"
import { createStore, reconcile, unwrap } from "solid-js/store"

/** A plain copy of a value, out of the store if it is in it. */
const snapshot = <T>(value: T): T => structuredClone(unwrap(value))

class SolidChatState<M extends UIMessage> implements ChatState<M> {
  #store
  #status
  #error

  constructor(messages: M[] = []) {
    this.#store = createStore<{ messages: M[] }>({
      messages: snapshot(messages),
    })
    this.#status = createSignal<ChatStatus>("ready")
    this.#error = createSignal<Error | undefined>(undefined)
  }

  get messages() {
    return this.#store[0].messages
  }
  set messages(messages: M[]) {
    this.#store[1]("messages", snapshot(messages))
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

  pushMessage = (message: M) =>
    this.#store[1]("messages", (all) => [...all, snapshot(message)])
  popMessage = () => this.#store[1]("messages", (all) => all.slice(0, -1))
  replaceMessage = (index: number, message: M) =>
    this.#store[1](
      "messages",
      index,
      reconcile(snapshot(message), { merge: true })
    )
  snapshot = snapshot
}

export class Chat<M extends UIMessage = UIMessage> extends AbstractChat<M> {
  constructor({ messages, ...init }: ChatInit<M>) {
    super({ ...init, state: new SolidChatState<M>(messages) })
  }
}
