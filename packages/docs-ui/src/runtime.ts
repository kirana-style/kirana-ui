/**
 * The chat runtime a chat demo runs on, one choice for the whole site, as the framework and base
 * are (`combination.ts`): the AI SDK's `useChat` or TanStack AI's. A preview that names `runtimes`
 * shows its item on the reader's runtime (a TanStack AI demo is the AI SDK one's twin,
 * `<item>-tanstack-ai`), and a page's `::start:runtime` blocks show the reader's runtime's text.
 * Kept in localStorage and read as an external store: the server renders the AI SDK, the client
 * the saved choice.
 */
import { useSyncExternalStore } from "react"

export const RUNTIMES = [
  { id: "ai-sdk", label: "AI SDK" },
  { id: "tanstack-ai", label: "TanStack AI" },
] as const

export type Runtime = (typeof RUNTIMES)[number]["id"]

const KEY = "docs-ui:runtime"
const EVENT = "docs-ui:runtime"
const DEFAULT: Runtime = "ai-sdk"

const isRuntime = (value: string | null): value is Runtime =>
  RUNTIMES.some((runtime) => runtime.id === value)

function read(): Runtime {
  try {
    const saved = localStorage.getItem(KEY)
    return isRuntime(saved) ? saved : DEFAULT
  } catch {
    return DEFAULT
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange)
  window.addEventListener(EVENT, onChange)
  return () => {
    window.removeEventListener("storage", onChange)
    window.removeEventListener(EVENT, onChange)
  }
}

export function chooseRuntime(runtime: Runtime) {
  try {
    localStorage.setItem(KEY, runtime)
  } catch {}
  window.dispatchEvent(new Event(EVENT))
}

/** The reader's runtime: the AI SDK on the server and until the page has hydrated. */
export function useRuntime(): Runtime {
  return useSyncExternalStore(subscribe, read, () => DEFAULT)
}

/** The item a preview draws on `runtime`: the AI SDK's as named, TanStack AI's its twin. */
export const itemOn = (item: string, runtime: Runtime) =>
  runtime === "tanstack-ai" ? `${item}-tanstack-ai` : item
