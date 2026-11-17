/**
 * `render` for the registry's own parts on Kirana UI Primitives (a badge, a breadcrumb link, an
 * item): the prop the library's parts take, `render={<a href="/x" />}` or `(props, state) => …`, for
 * an element that is not a primitive. `@kirana-ui/react` exports no such step for a plain element
 * (PF-002), so this one keeps Base UI's shape (`useRender`, `mergeProps`), the one React's Base UI
 * parts are written against, and the merge rule `llms.txt` states for a part's `render`: later
 * props win, classes and styles join, every handler runs (the earlier's first); its `state` is
 * written as data attributes, as Base UI's is. Remove it with the
 * release that exports the library's own.
 */
import { cloneElement, createElement, isValidElement } from "react"
import type {
  ComponentPropsWithRef,
  CSSProperties,
  ElementType,
  ReactElement,
  Ref,
} from "react"

type Props = Record<string, unknown>

/** A type's declared keys, without an index signature's `[attribute: string]`. */
type Known<T> = {
  [
    K in keyof T as string extends K ? never : number extends K ? never : K
  ]: T[K]
}

/**
 * A part's props as its element's: the part's own declared props over the HTML attributes an
 * element takes. `@kirana-ui/react` types a part's other props `[attribute: string]: unknown`
 * (PF-003), so a wrapper typed with `React.ComponentProps<typeof X.Part>` gets `unknown` for
 * `children`, `className` and every handler. Remove with the release that types them.
 */
/**
 * A callback whose value is `unknown` (or a list of it) as one taking `any` (PF-017): `onValueChange={setPosition}`
 * then takes a state setter, as Base UI's generic parts do.
 */
type LooseValue<Value> = unknown extends Value
  ? any
  : Value extends readonly (infer Each)[]
    ? unknown extends Each
      ? any[]
      : Value
    : Value

type Loose<T> = {
  [K in keyof T]: Exclude<T[K], undefined> extends (
    value: infer Value,
    ...rest: infer Rest
  ) => infer Result
    ?
        | ((value: LooseValue<Value>, ...rest: Rest) => Result)
        | Extract<T[K], undefined>
    : T[K]
}

export type PartProps<Part extends React.JSXElementConstructor<any>> = Omit<
  React.AllHTMLAttributes<HTMLElement>,
  // `size`: the registry's wrappers name their own (`"sm" | "default"`), never the element's.
  keyof Known<React.ComponentProps<Part>> | "size"
> &
  Loose<Known<React.ComponentProps<Part>>> & {
    ref?: React.Ref<HTMLElement>
    [data: `data-${string}`]: unknown
  }

const isHandler = (key: string, value: unknown) =>
  /^on[A-Z]/.test(key) && typeof value === "function"

/** Each of `props` over the ones before it: classes and styles joined, handlers all run. */
export function mergeProps<Tag extends ElementType = "div">(
  ...props: (Props | ComponentPropsWithRef<Tag> | undefined)[]
): ComponentPropsWithRef<Tag> {
  const result: Props = {}
  for (const each of props) {
    if (!each) continue
    for (const [key, value] of Object.entries(each as Props)) {
      const before = result[key]
      if (isHandler(key, before) && isHandler(key, value)) {
        result[key] = (...args: unknown[]) => {
          ;(before as (...args: unknown[]) => unknown)(...args)
          return (value as (...args: unknown[]) => unknown)(...args)
        }
      } else if (key === "className" && before && value) {
        result[key] = `${String(before)} ${String(value)}`
      } else if (key === "style" && before && value) {
        result[key] = {
          ...(before as CSSProperties),
          ...(value as CSSProperties),
        }
      } else if (value !== undefined) {
        result[key] = value
      }
    }
  }
  return result as ComponentPropsWithRef<Tag>
}

type RenderProp<State> =
  | ReactElement<Props>
  | ((props: Props, state: State) => ReactElement)

/** A part's element: `render`'s in its place, given the part's props, else `defaultTagName`. */
export function useRender<State = undefined>({
  defaultTagName = "div",
  render,
  props = {},
  state,
  ref,
}: {
  defaultTagName?: keyof React.JSX.IntrinsicElements
  render?: RenderProp<State>
  props?: object
  state?: State
  ref?: Ref<unknown>
}): ReactElement {
  // Base UI's `useRender` writes its `state` as data attributes (`slot: "badge"` as
  // `data-slot="badge"`, `true` as present, `false` and `undefined` as absent), under the props: a
  // sidebar button a dropdown's trigger draws stays `dropdown-menu-trigger`, as on Base UI.
  const attributes: Props = {}
  for (const [key, value] of Object.entries((state ?? {}) as Props)) {
    if (value === false || value === undefined || value === null) continue
    const name = `data-${key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)}`
    attributes[name] = value === true ? "" : String(value)
  }
  const own: Props = { ...attributes, ...props, ...(ref ? { ref } : {}) }
  if (typeof render === "function") return render(own, state as State)
  if (isValidElement<Props>(render))
    return cloneElement(render, mergeProps<"div">(own, render.props) as Props)
  return createElement(defaultTagName, own)
}

/** A part's props: its element's, and `render` (Base UI's `useRender.ComponentProps`). */
export type RenderProps<
  Tag extends keyof React.JSX.IntrinsicElements,
  // `any`: a part names its own state where it calls `useRender`.
  State = any,
> = Omit<ComponentPropsWithRef<Tag>, "children"> & {
  children?: React.ReactNode
  render?: RenderProp<State>
}

/**
 * Base UI's precedence for a part's `render` element (PF-026): the element's own props win over
 * the part's (its `data-slot`, its children, `disabled`), classes and styles joined and handlers
 * chained, where the primitives keep the part's. The element's props move onto the part, and the
 * part renders the element's type alone. Remove with the release that takes Base UI's order.
 */
export function renderOver<P extends { render?: unknown }>(props: P): P {
  const { render } = props
  if (!isValidElement<Props>(render)) return props
  const { ref, ...own } = render.props
  const rest: Props = { ...(props as Props) }
  delete rest.render
  return {
    ...mergeProps<"div">(rest, own),
    render: createElement(render.type, ref ? { ref } : null),
  } as unknown as P
}
