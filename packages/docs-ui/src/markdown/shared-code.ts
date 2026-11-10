/**
 * A demo's code per `framework/base` (`/r/demos/<item>.json` and `.parts.json`) writes a
 * combination whose code is another's, byte for byte, as `{ "same": "<framework/base>" }` (Vue's
 * two bases share their demos' files). This reads each such entry as the code it names.
 */
export function withShared<Entry>(
  sources: Record<string, Entry | { same: string }>
): Record<string, Entry> {
  const out: Record<string, Entry> = {}
  for (const [id, entry] of Object.entries(sources)) {
    const same =
      typeof entry === "object" && entry !== null && "same" in entry
        ? (entry as { same: unknown }).same
        : undefined
    out[id] = (typeof same === "string" ? sources[same] : entry) as Entry
  }
  return out
}
