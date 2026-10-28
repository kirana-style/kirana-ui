/**
 * The framework and base a component page shows (`react/base`, `react/aria`, `vue/ark` …), one
 * choice for the whole site: the preview, the code panel and every tab group named after the
 * combinations follow it. Kept in localStorage and read as an external store, as `preferences.ts`
 * keeps the layout's choices: the server renders the first combination, the client the saved one.
 */
import { use, useSyncExternalStore } from "react"

import { PageContext } from "./page-context.ts"

import { useDocs } from "./provider.tsx"

const KEY = "docs-ui:combination"
const EVENT = "docs-ui:combination"

function read(): string | null {
  try {
    return localStorage.getItem(KEY)
  } catch {
    return null
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

export function chooseCombination(id: string) {
  try {
    localStorage.setItem(KEY, id)
  } catch {}
  window.dispatchEvent(new Event(EVENT))
}

/** The saved choice alone, for a page outside the docs that has no provider (the home showcase). */
export function useSavedCombination(): string | null {
  return useSyncExternalStore(subscribe, read, () => null)
}

/**
 * The combinations an item has (`only`, ids; every one the site knows without it), and the one
 * shown: the saved choice when the item has it, else its first.
 */
export function useCombination(only?: readonly string[]) {
  const { combinations = [] } = useDocs()
  const available = combinations.filter(
    (combination) => !only || only.includes(combination.id)
  )
  const saved = useSyncExternalStore(subscribe, read, () => null)
  // A page published for one variant shows that one, whatever was saved.
  const page = use(PageContext)?.variant?.id
  const current =
    available.find((combination) => combination.id === page) ??
    available.find((combination) => combination.id === saved) ??
    available[0]
  return { available, current }
}

/** `"react/base,react/aria"` as a list, for an embed's attribute. */
export function combinationList(value: string | undefined) {
  return value
    ? value
        .split(",")
        .map((id) => id.trim())
        .filter(Boolean)
    : undefined
}
