/**
 * TanStack AI's `useChat` on Solid 2, in place of `@tanstack/ai-solid`, which is built on Solid 1
 * (its peer is `solid-js` ^1.9: `createMemo(on(...))`, `onMount`) and has no Solid 2 release (LF-041). This
 * is the part of its API the chat demos use, on the framework-free `ChatClient` it wraps, at the
 * same version: `messages`, `status`, `isLoading` and `error` as accessors, and `append`,
 * `sendMessage`, `setMessages`, `stop`, `clear`, `reload` and `addToolResult`.
 *
 * The client publishes a frozen snapshot of its state and replaces it on every change; a signal
 * holds it, so JSX, memos and effects follow the chat. Solid 2 applies a write at its next flush,
 * and a read outside a tracking scope returns the value before it, where an event handler reads
 * what it has just changed (`setMessages`, then `messages()`): an accessor read outside one asks
 * the client itself (`getObserver()`), as `chat.ts` does for the AI SDK.
 */
import { ChatClient } from "@tanstack/ai-client"
import { createSignal, getObserver, onCleanup, onSettled } from "solid-js"
import type { AnyClientTool, ModelMessage } from "@tanstack/ai"
import type {
  ChatClientOptions,
  MultimodalContent,
  SendMessageOptions,
  UIMessage,
} from "@tanstack/ai-client"

type Snapshot<TTools extends ReadonlyArray<AnyClientTool>> = ReturnType<
  ChatClient<TTools>["getSnapshot"]
>

export function useChat<
  const TTools extends ReadonlyArray<AnyClientTool> = any,
>(options: ChatClientOptions<TTools>) {
  const client = new ChatClient<TTools>(options)
  const [snapshot, setSnapshot] = createSignal<Snapshot<TTools>>(
    client.getSnapshot(),
    { ownedWrite: true }
  )
  onCleanup(client.subscribeSnapshot(() => setSnapshot(client.getSnapshot())))

  // The client is idle until a view attaches it, and stops what it streams when the view goes.
  onSettled(() => {
    client.attach()
    return () => {
      client.detach()
      client.stop()
      client.dispose()
    }
  })

  /** One field of the snapshot: tracked in a scope, the client's own value outside one. */
  const pick =
    <TKey extends keyof Snapshot<TTools>>(key: TKey) =>
    (): Snapshot<TTools>[TKey] =>
      getObserver() ? snapshot()[key] : client.getSnapshot()[key]

  return {
    messages: pick("messages"),
    status: pick("status"),
    isLoading: pick("isLoading"),
    error: pick("error"),
    append: (message: ModelMessage | UIMessage<TTools>) =>
      client.append(message),
    sendMessage: (
      content: string | MultimodalContent,
      sendOptions?: SendMessageOptions
    ) => client.sendMessage(content, undefined, sendOptions),
    setMessages: (messages: ReadonlyArray<UIMessage<TTools>>) =>
      client.setMessagesManually(messages),
    stop: () => client.stop(),
    clear: () => client.clear(),
    reload: () => client.reload(),
    addToolResult: (
      result: Parameters<ChatClient<TTools>["addToolResult"]>[0]
    ) => client.addToolResult(result),
  }
}
