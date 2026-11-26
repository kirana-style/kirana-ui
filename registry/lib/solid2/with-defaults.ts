/**
 * A part's props with its defaults: a default holds while the prop is missing or `undefined`.
 *
 * Solid 2's `merge(defaults, props)` lets an `undefined` in `props` win, where Solid 1's
 * `mergeProps` skipped it: a wrapper that forwards `variant={props.variant}` unset would lose the
 * part's default. Each default is read through a getter laid over the props, so it follows them as
 * they change.
 */
import { merge } from "solid-js"

// An intersection, not `Omit`: a part's props often take any attribute (an index signature), and
// `Omit` over one loses the declared keys' types.
export type WithDefaults<Defaults, Props> = Props & {
  [Key in keyof Defaults]: Key extends keyof Props
    ? Exclude<Props[Key], undefined>
    : Defaults[Key]
}

export function withDefaults<Defaults extends object, Props extends object>(
  defaults: Defaults,
  props: Props
): WithDefaults<Defaults, Props> {
  const filled = {}
  for (const key of Object.keys(defaults) as (keyof Defaults & string)[]) {
    Object.defineProperty(filled, key, {
      enumerable: true,
      get() {
        const value = (props as Record<string, unknown>)[key]
        return value === undefined ? defaults[key] : value
      },
    })
  }
  return merge(props, filled) as WithDefaults<Defaults, Props>
}
