import type { BrowserProviderOption } from "vite-plus/test/node"

/** The engines `BROWSERS` names (`chromium` unless it says otherwise). */
export function browsers(): string[]

/** The `test` block of a preview app's config, with the app's own Playwright provider. */
export function browserTest(
  playwright: (options?: object) => BrowserProviderOption,
  options: { name: string; include?: string[]; setupFiles?: string[] }
): Record<string, unknown>

/** The dependency scan's entries under Vitest (every file a test may load), else nothing. */
export function browserDeps(entries: string[]): { entries?: string[] }

/** Under Vitest, `@/components/…` resolved to `stub` (the code block demos' text), else none. */
export function browserAliases(
  stub: string
): { find: RegExp; replacement: string }[]
