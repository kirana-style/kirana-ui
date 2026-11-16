/**
 * What a demo is given for each of its parts: the props that style it. `raw` gives none, so the
 * part is the browser's own.
 */
export type Styles<Part extends string> = Record<Part, { className?: string }>

/** Any part, with nothing on it. */
export const raw = new Proxy({}, { get: () => ({}) }) as Styles<string>

/** Class names by part (a CSS module, or a Tailwind list), as a demo takes them. */
export const classes = <Part extends string>(names: Record<Part, string>) =>
  new Proxy(names, {
    get: (all, part: string) => ({
      className: (all as Record<string, string>)[part] ?? "",
    }),
  }) as unknown as Styles<Part>
