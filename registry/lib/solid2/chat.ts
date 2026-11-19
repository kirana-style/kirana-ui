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
 *
 * Solid 2 applies a write at its next flush, and a read outside a tracking scope returns the value
 * before it, where the SDK reads what it has just written (`pushMessage`, then `lastMessage`). So
 * the state is kept twice: plain, which the SDK reads, and in the store and signals, which a
 * component reads; a getter hands out the one its caller needs (`getObserver()`).
 */
import { AbstractChat } from "ai"
import type { ChatInit, ChatState, ChatStatus, UIMessage } from "ai"
import {
  createSignal,
  createStore,
  getObserver,
  reconcile,
  snapshot as storeSnapshot,
} from "solid-js"

/** A plain copy of a value, out of the store if it is in it. */
const snapshot = <T>(value: T): T => structuredClone(storeSnapshot(value))

class SolidChatState<M extends UIMessage> implements ChatState<M> {
  #messages: M[]
  #status: ChatStatus = "ready"
  #error: Error | undefined
  #store
  #statusSignal
  #errorSignal

  constructor(messages: M[] = []) {
    this.#messages = snapshot(messages)
    this.#store = createStore<{ messages: M[] }>({
      messages: snapshot(this.#messages),
    })
    this.#statusSignal = createSignal<ChatStatus>(this.#status)
    this.#errorSignal = createSignal<Error | undefined>(undefined)
  }

  get messages() {
    return getObserver() ? this.#store[0].messages : this.#messages
  }
  set messages(messages: M[]) {
    this.#messages = snapshot(messages)
    this.#store[1]((state) => {
      state.messages = snapshot(this.#messages)
    })
  }
  get status() {
    return getObserver() ? this.#statusSignal[0]() : this.#status
  }
  set status(status: ChatStatus) {
    this.#status = status
    this.#statusSignal[1](status)
  }
  get error() {
    return getObserver() ? this.#errorSignal[0]() : this.#error
  }
  set error(error: Error | undefined) {
    this.#error = error
    this.#errorSignal[1](() => error)
  }

  pushMessage = (message: M) => {
    this.#messages = [...this.#messages, snapshot(message)]
    this.#store[1]((state) => {
      state.messages.push(snapshot(message))
    })
  }
  popMessage = () => {
    this.#messages = this.#messages.slice(0, -1)
    this.#store[1]((state) => {
      state.messages.pop()
    })
  }
  // Reconciled by place (`null`): parts have no `id`, and a key they lack would replace them.
  replaceMessage = (index: number, message: M) => {
    this.#messages = this.#messages.map((current, at) =>
      at === index ? snapshot(message) : current
    )
    this.#store[1]((state) => {
      reconcile(snapshot(message), null)(state.messages[index]!)
    })
  }
  snapshot = snapshot
}

export class Chat<M extends UIMessage = UIMessage> extends AbstractChat<M> {
  constructor({ messages, ...init }: ChatInit<M>) {
    super({ ...init, state: new SolidChatState<M>(messages) })
  }
}
