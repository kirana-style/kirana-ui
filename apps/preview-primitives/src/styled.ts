/**
 * What a demo is given for each of its parts: the props that style it. `raw` gives none, so the
 * part is the browser's own.
 */
export type Styles<Part extends string> = Record<Part, { className?: string }>

/** Any part, with nothing on it. */
export const raw = new Proxy({}, { get: () => ({}) }) as Styles<string>

/** Class names by part (a CSS module, or a Tailwind list), as a demo takes them. */
export function classes<Part extends string>(
  names: Record<Part, string>
): Styles<Part> {
  // A `Map`: a part's name finds a class that was written, never something an object inherits.
  const known = new Map<string, string>(Object.entries(names))
  return new Proxy(
    {},
    {
      get: (_all, part) => ({
        className: typeof part === "string" ? (known.get(part) ?? "") : "",
      }),
    }
  ) as Styles<Part>
}
