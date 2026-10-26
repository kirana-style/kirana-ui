/**
 * A style module flattened to one style and one base, as an installed project gets it: for each
 * property's entries,
 *
 * 1. drop every entry under another style's condition or another base's state key;
 * 2. remove the chosen style's condition from the rest (it always holds in the project);
 * 3. merge the entries that now share a condition set, the one that had the style's condition
 *    winning (it outranked the other on the site);
 * 4. write `{ base: x }` as `x`.
 *
 * Styles that are merged must be flattened merged. A recipe's variant merges over its base entry by
 * entry, and a style's entry in the base outranks the variant's plain one on the site (it has one
 * condition more), but not once its condition is removed. So a variant is written as what it changes
 * in the flattened base (`flattenRecipe`), and a handle of several style objects as one.
 *
 * Removing a condition can change which entry wins (03, "Flattening, precisely"), so `check.ts` asks
 * Kirana for the winners before and after.
 */
import { only, split } from "./markers"
import type { RecipeHandle, StyleHandle, StyleObject } from "./kirana-stub"
import {
  byConditionSet,
  entriesOf,
  isNestedStyleKey,
  mergeStyles,
  setKey,
  valueOf,
} from "./styles"
import type { Entry } from "./styles"

export type Base = "base" | "aria" | "ark"

export type Target = { style: string; base: Base }

/** What a condition is to the target: its style's, another style's or base's, or neither. */
export type Classify = (condition: string) => "target" | "drop" | "keep"

/**
 * The classifier for a target: style conditions are reads of the `ui` relation for
 * `[data-style="…"]`; state keys carry their base (`tagStates`), so a key another base writes is
 * dropped and one that only looks like it (a component's own `data-orientation`) is not.
 */
export function classifier(target: Target): Classify {
  return (condition) => {
    const marker = only(condition)
    if (marker?.kind === "read" && marker.relation === "ui") {
      const style = /^\[data-style="([^"]+)"\]$/.exec(marker.condition)?.[1]
      if (style) return style === target.style ? "target" : "drop"
    }
    if (marker?.kind === "state")
      return marker.base === target.base ? "keep" : "drop"
    // A read of a state key (`collapsibleScope.within(disclosure.open.base)`): its base's alone.
    if (marker?.kind === "read")
      for (const part of split(marker.condition))
        if (typeof part !== "string" && part.kind === "state")
          if (part.base !== target.base) return "drop"
    return "keep"
  }
}

/** A kept condition as Kirana reads it: a state key is its plain text. */
export function plain(condition: string) {
  const marker = only(condition)
  return marker?.kind === "state" ? marker.key : condition
}

/** One property's value, flattened; `undefined` when every entry was another style's or base's. */
export function flattenValue(value: unknown, classify: Classify): unknown {
  const kept = new Map<string, { entry: Entry; styled: boolean }>()
  for (const entry of entriesOf(value)) {
    const kinds = entry.path.map(classify)
    if (kinds.includes("drop")) continue
    const styled = kinds.includes("target")
    const path = entry.path
      .filter((_, index) => kinds[index] !== "target")
      .map(plain)
    const key = setKey(path)
    const earlier = kept.get(key)
    if (!earlier || styled || !earlier.styled) {
      kept.set(key, {
        entry: { path: earlier?.entry.path ?? path, value: entry.value },
        styled: styled || !!earlier?.styled,
      })
    }
  }
  if (kept.size === 0) return undefined
  return valueOf([...kept.values()].map(({ entry }) => entry))
}

/** A style object with every property flattened, nested styles too. */
export function flattenStyle(
  style: StyleObject,
  classify: Classify
): StyleObject {
  const flat: StyleObject = {}
  for (const [key, value] of Object.entries(style)) {
    const result = isNestedStyleKey(key)
      ? flattenStyle(value as StyleObject, classify)
      : flattenValue(value, classify)
    if (
      result !== undefined &&
      !(
        isNestedStyleKey(key) && Object.keys(result as StyleObject).length === 0
      )
    ) {
      flat[key] = result
    }
  }
  return flat
}

export function flattenHandle(
  handle: StyleHandle,
  classify: Classify
): StyleHandle {
  return {
    ...handle,
    styles: [flattenStyle(handle.styles.reduce(mergeStyles, {}), classify)],
  }
}

/**
 * What `style` changes when merged over `base`, both flattened: the entries whose value differs or
 * whose condition set `base` lacks. A property `style` removed is `null`; one that lost some of
 * `base`'s entries is written whole, the rest dropped with `"*": null`.
 */
export function changesFrom(
  base: StyleObject,
  style: StyleObject
): StyleObject {
  const changes: StyleObject = {}
  for (const key of new Set([...Object.keys(base), ...Object.keys(style)])) {
    if (!(key in style)) {
      changes[key] = null
    } else if (isNestedStyleKey(key)) {
      const nested = changesFrom(
        (base[key] ?? {}) as StyleObject,
        style[key] as StyleObject
      )
      if (Object.keys(nested).length) changes[key] = nested
    } else if (!(key in base)) {
      changes[key] = style[key]
    } else {
      const before = byConditionSet(entriesOf(base[key]))
      const after = byConditionSet(entriesOf(style[key]))
      const differing = [...after].filter(
        ([set, entry]) => before.get(set)?.value !== entry.value
      )
      if ([...before.keys()].some((set) => !after.has(set))) {
        const whole = valueOf([...after.values()])
        changes[key] = {
          "*": null,
          ...(typeof whole === "object" && whole !== null
            ? (whole as StyleObject)
            : { base: whole }),
        }
      } else if (differing.length) {
        changes[key] = valueOf(differing.map(([, entry]) => entry))
      }
    }
  }
  return changes
}

/**
 * A recipe flattened: its base, and each variant as what it changes in the flattened base, so that
 * merging the two picks what flattening them merged picks.
 */
export function flattenRecipe(
  handle: RecipeHandle,
  classify: Classify
): RecipeHandle {
  const config = handle.config as {
    base?: StyleObject
    variants?: Record<string, Record<string, StyleObject>>
    compoundVariants?: unknown[]
  }
  if (config.compoundVariants?.length)
    throw new Error("A recipe's compound variants are not flattened yet.")
  const base = config.base ?? {}
  const flatBase = flattenStyle(base, classify)
  return {
    ...handle,
    config: {
      ...config,
      ...(config.base ? { base: flatBase } : {}),
      ...(config.variants
        ? {
            variants: Object.fromEntries(
              Object.entries(config.variants).map(([group, options]) => [
                group,
                Object.fromEntries(
                  Object.entries(options).map(([option, style]) => [
                    option,
                    changesFrom(
                      flatBase,
                      flattenStyle(mergeStyles(base, style), classify)
                    ),
                  ])
                ),
              ])
            ),
          }
        : {}),
    },
  }
}
