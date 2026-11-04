import { createContext } from "solid-js"
import type { JSX } from "solid-js"

/** True while the reply's last code fence has not closed yet (Streamdown's `useIsCodeFenceIncomplete`). */
export const FenceOpenContext = createContext<() => boolean>(() => false)

export function FenceOpen(props: { value: boolean; children?: JSX.Element }) {
  return (
    <FenceOpenContext.Provider value={() => props.value}>
      {props.children}
    </FenceOpenContext.Provider>
  )
}
