/**
 * A tar archive (ustar) from files in memory, as the site serves a skeleton: paths under one top
 * folder, which `init --template` strips as `giget` would, every file mode 644 and dated at the
 * epoch, so the same files give the same bytes. Gzip is the caller's (`node:zlib` in the build
 * script).
 */
const BLOCK = 512

function octal(value: number, length: number): Uint8Array {
  const text = value.toString(8).padStart(length - 1, "0")
  return new TextEncoder().encode(`${text}\0`)
}

function header(name: string, size: number): Uint8Array {
  const block = new Uint8Array(BLOCK)
  const encoder = new TextEncoder()
  const bytes = encoder.encode(name)
  // ustar keeps a 100-byte name and a 155-byte prefix: split long paths at a slash.
  let prefix = new Uint8Array(0)
  let base = bytes
  if (bytes.length > 100) {
    const text = name
    let cut = text.lastIndexOf("/", 155)
    while (cut > 0 && encoder.encode(text.slice(cut + 1)).length > 100)
      cut = text.lastIndexOf("/", cut - 1)
    if (cut <= 0) throw new Error(`${name}: too long for a tar entry`)
    prefix = encoder.encode(text.slice(0, cut))
    base = encoder.encode(text.slice(cut + 1))
  }
  block.set(base, 0)
  block.set(octal(0o644, 8), 100)
  block.set(octal(0, 8), 108)
  block.set(octal(0, 8), 116)
  block.set(octal(size, 12), 124)
  block.set(octal(0, 12), 136)
  block.fill(0x20, 148, 156)
  block[156] = 0x30
  block.set(encoder.encode("ustar\0"), 257)
  block.set(encoder.encode("00"), 263)
  block.set(prefix, 345)
  let sum = 0
  for (const byte of block) sum += byte
  block.set(encoder.encode(`${sum.toString(8).padStart(6, "0")}\0 `), 148)
  return block
}

/** The archive, every file under `top/`. */
export function tar(
  files: ReadonlyMap<string, string | Uint8Array>,
  top: string
): Uint8Array {
  const encoder = new TextEncoder()
  const parts: Uint8Array[] = []
  for (const name of [...files.keys()].sort()) {
    const value = files.get(name)!
    const body = typeof value === "string" ? encoder.encode(value) : value
    parts.push(header(`${top}/${name}`, body.length), body)
    const rest = body.length % BLOCK
    if (rest) parts.push(new Uint8Array(BLOCK - rest))
  }
  parts.push(new Uint8Array(BLOCK * 2))
  const length = parts.reduce((sum, part) => sum + part.length, 0)
  const archive = new Uint8Array(length)
  let at = 0
  for (const part of parts) {
    archive.set(part, at)
    at += part.length
  }
  return archive
}

/** The files of an archive `tar` wrote, for the tests: path (under `top/`) to text. */
export function untar(archive: Uint8Array): Map<string, string> {
  const files = new Map<string, string>()
  const decoder = new TextDecoder()
  const text = (from: number, length: number) =>
    decoder.decode(archive.subarray(from, from + length)).replace(/\0.*$/s, "")
  for (let at = 0; at + BLOCK <= archive.length;) {
    const name = text(at, 100)
    if (name === "") break
    const size = Number.parseInt(text(at + 124, 12).trim(), 8)
    const prefix = text(at + 345, 155)
    files.set(
      prefix ? `${prefix}/${name}` : name,
      decoder.decode(archive.subarray(at + BLOCK, at + BLOCK + size))
    )
    at += BLOCK + Math.ceil(size / BLOCK) * BLOCK
  }
  return files
}
