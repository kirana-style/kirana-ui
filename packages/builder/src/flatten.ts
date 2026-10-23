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
 * Removing a condition can change which entry wins (03, "Flattening, precisely"), so `check.ts` asks
 * Kirana for the winners before and after.
 */
import { only } from "./markers"
import type { RecipeHandle, StyleHandle, StyleObject } from "./kirana-stub"
import { entriesOf, isNestedStyleKey, setKey, valueOf } from "./styles"
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
    styles: handle.styles.map((style) => flattenStyle(style, classify)),
  }
}

export function flattenRecipe(
  handle: RecipeHandle,
  classify: Classify
): RecipeHandle {
  const config = handle.config as {
    base?: StyleObject
    variants?: Record<string, Record<string, StyleObject>>
    compoundVariants?: StyleObject[]
  }
  return {
    ...handle,
    config: {
      ...config,
      ...(config.base ? { base: flattenStyle(config.base, classify) } : {}),
      ...(config.variants
        ? {
            variants: Object.fromEntries(
              Object.entries(config.variants).map(([group, options]) => [
                group,
                Object.fromEntries(
                  Object.entries(options).map(([option, style]) => [
                    option,
                    flattenStyle(style, classify),
                  ])
                ),
              ])
            ),
          }
        : {}),
    },
  }
}
