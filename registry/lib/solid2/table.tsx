/**
 * TanStack Table on Solid 2, in place of `@tanstack/solid-table` (LF-032): that adapter (9.3.1) is
 * built on Solid 1 (`batch`, `observable`, `createComputed`, `mergeProps`, `solid-js/web`), and
 * none is published for Solid 2. This is its API as the registry uses it (`createTable`,
 * `FlexRender`, `flexRender` and everything of `@tanstack/table-core`), on the core it wraps, at
 * the same version.
 *
 * The table's state lives in TanStack Store atoms (the core's `storeReactivityBindings`), which
 * read their latest value at once: the core writes a state and reads it back in one call, where a
 * Solid 2 signal would answer with the value before the write until the next flush. Each atom has
 * a Solid signal beside it, bumped when the atom changes and read when the atom is read inside a
 * tracking scope, so JSX, memos and effects follow the table as they follow Solid's own state.
 */
import {
  Match,
  Show,
  Switch,
  createComponent,
  createEffect,
  createSignal,
  getObserver,
  onCleanup,
  untrack,
} from "solid-js"
import type { JSX } from "@solidjs/web"
import type {
  Cell,
  CellData,
  Header,
  RowData,
  Table,
  TableFeatures,
  TableOptions,
} from "@tanstack/table-core"
import { constructTable } from "@tanstack/table-core"
import { storeReactivityBindings } from "@tanstack/table-core/store-reactivity-bindings"

export * from "@tanstack/table-core"

type Subscription = { unsubscribe: () => void }
type TrackedAtom = {
  get: () => unknown
  subscribe: (listener: () => void) => Subscription
}

/** The core's store bindings, each atom's reads tracked by Solid through a signal of its own. */
function solidStoreReactivity() {
  const bindings = storeReactivityBindings()
  const subscriptions = new Set<Subscription>()
  function tracked<A extends object>(atom: A): A {
    const store = atom as unknown as TrackedAtom
    // Bumped from the core's writes, which may come in a component's body (its first state).
    const [version, setVersion] = createSignal(0, { ownedWrite: true })
    subscriptions.add(store.subscribe(() => setVersion((value) => value + 1)))
    const read = store.get.bind(store)
    store.get = () => {
      if (getObserver()) version()
      return read()
    }
    return atom
  }
  return {
    ...bindings,
    addSubscription: (subscription: Subscription) => {
      subscriptions.add(subscription)
    },
    unmount: () => {
      subscriptions.forEach((subscription) => subscription.unsubscribe())
      subscriptions.clear()
    },
    untrack: <T,>(fn: () => T) => untrack(fn),
    createReadonlyAtom: ((fn, options) =>
      tracked(
        bindings.createReadonlyAtom(fn, options)
      )) as typeof bindings.createReadonlyAtom,
    createWritableAtom: ((value, options) =>
      tracked(
        bindings.createWritableAtom(value, options)
      )) as typeof bindings.createWritableAtom,
  }
}

/** The options as they are now: each of the caller's getters read, its features left out. */
function readOptions<T extends object>(options: T): Partial<T> {
  const read: Partial<T> = {}
  for (const key of Object.keys(options) as (keyof T)[]) {
    if (key === "features") continue
    read[key] = options[key]
    if (key === "state" && read[key]) {
      for (const stateKey in read[key]) void read[key][stateKey]
    }
  }
  return read
}

export type SolidTable<
  TFeatures extends TableFeatures,
  TData extends RowData,
> = Table<TFeatures, TData> & {
  /** `<table.FlexRender cell={cell} />`, as `@tanstack/solid-table`'s. */
  FlexRender: typeof FlexRender
}

/**
 * A table whose state Solid follows: read its APIs or `table.atoms` in JSX, `createMemo` or
 * `createEffect`. The options are followed too: a getter (`get data() { … }`) that changes sets
 * them again.
 */
export function createTable<
  TFeatures extends TableFeatures,
  TData extends RowData,
>(tableOptions: TableOptions<TFeatures, TData>): SolidTable<TFeatures, TData> {
  const reactivity = solidStoreReactivity()
  const table = constructTable({
    ...untrack(() => readOptions(tableOptions)),
    features: {
      coreReactivityFeature: reactivity,
      ...tableOptions.features,
    },
  } as TableOptions<TFeatures, TData>) as SolidTable<TFeatures, TData>
  createEffect(
    () => readOptions(tableOptions),
    (options) => {
      table.setOptions((previous) => ({ ...previous, ...options }))
    },
    { defer: true }
  )
  onCleanup(() => reactivity.unmount())
  table.FlexRender = FlexRender
  return table
}

/** A header's, cell's or footer's template rendered with its context. */
export function flexRender<TProps extends object>(
  Comp: ((props: TProps) => JSX.Element) | JSX.Element | undefined,
  props: TProps
): JSX.Element {
  if (Comp === null || Comp === undefined) return null
  if (typeof Comp === "function")
    return createComponent(Comp as (props: TProps) => JSX.Element, props)
  return Comp
}

export type FlexRenderProps<
  TFeatures extends TableFeatures,
  TData extends RowData,
  TValue extends CellData = CellData,
> =
  | { cell: Cell<TFeatures, TData, TValue>; header?: never; footer?: never }
  | { header: Header<TFeatures, TData, TValue>; cell?: never; footer?: never }
  | { footer: Header<TFeatures, TData, TValue>; cell?: never; header?: never }

type AnyCell = Cell<TableFeatures, RowData, CellData> & {
  getIsAggregated?: () => boolean
  getIsPlaceholder?: () => boolean
}
type AnyHeader = Header<TableFeatures, RowData, CellData>
type Template = ((props: object) => JSX.Element) | JSX.Element | undefined
type Templates = { [part: string]: Template }

/** One cell's, header's or footer's template, as `@tanstack/solid-table`'s `FlexRender`. */
export function FlexRender<
  TFeatures extends TableFeatures,
  TData extends RowData,
  TValue extends CellData = CellData,
>(props: FlexRenderProps<TFeatures, TData, TValue>): JSX.Element {
  const cellOf = () =>
    "cell" in props ? (props.cell as unknown as AnyCell) : undefined
  const headerOf = () =>
    "header" in props ? (props.header as unknown as AnyHeader) : undefined
  const footerOf = () =>
    "footer" in props ? (props.footer as unknown as AnyHeader) : undefined
  const template = (of: { column: { columnDef: unknown } }, part: string) =>
    (of.column.columnDef as Templates)[part]
  return (
    <Switch>
      <Match when={cellOf()} keyed>
        {(cell: AnyCell) => (
          <Show
            when={cell.getIsAggregated?.()}
            fallback={
              <Show when={!cell.getIsPlaceholder?.()}>
                {flexRender(template(cell, "cell"), cell.getContext())}
              </Show>
            }
          >
            {flexRender(
              template(cell, "aggregatedCell") ?? template(cell, "cell"),
              cell.getContext()
            )}
          </Show>
        )}
      </Match>
      <Match when={headerOf()} keyed>
        {(header: AnyHeader) =>
          flexRender(template(header, "header"), header.getContext())
        }
      </Match>
      <Match when={footerOf()} keyed>
        {(footer: AnyHeader) =>
          flexRender(template(footer, "footer"), footer.getContext())
        }
      </Match>
    </Switch>
  )
}
