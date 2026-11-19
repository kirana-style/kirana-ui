import { getContext, setContext } from "svelte"

/** Whether a Trace collapsible's content stays in the page while closed (its `keepMounted`). */
type KeepMounted = { value: boolean }

const KEY = Symbol("trace-keep-mounted")

export const setKeepMounted = (state: KeepMounted) => setContext(KEY, state)
export const getKeepMounted = () => getContext<KeepMounted | undefined>(KEY)
