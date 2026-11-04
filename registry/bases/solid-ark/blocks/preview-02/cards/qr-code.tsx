import qrcode from "qrcode-generator"
import { Show, createMemo, mergeProps, splitProps } from "solid-js"
import type { Sx } from "@kirana-style/core"

export function QRCode(props: {
  value: string
  size?: number
  level?: "L" | "M" | "Q" | "H"
  bgColor?: string
  fgColor?: string
  title?: string
  sx?: Sx
  class?: string
}) {
  const [local] = splitProps(
    mergeProps(
      {
        size: 256,
        level: "L",
        bgColor: "#FFFFFF",
        fgColor: "#000000",
      } as const,
      props
    ),
    ["value", "size", "level", "bgColor", "fgColor", "title", "sx", "class"]
  )
  /**
   * A QR code as an SVG, `react-qr-code`'s markup (MIT): its light and dark modules each one path,
   * encoded by the same `qrcode-generator`.
   */

  // As `react-qr-code`, the text is encoded as UTF-8.
  qrcode.stringToBytes = (text: string) =>
    Array.from(new TextEncoder().encode(text))

  const cells = createMemo(() => {
    const qr = qrcode(0, local.level)
    qr.addData(local.value)
    qr.make()
    const count = qr.getModuleCount()
    return Array.from({ length: count }, (_row, row) =>
      Array.from({ length: count }, (_cell, column) => qr.isDark(row, column))
    )
  })
  const path = (dark: boolean) =>
    cells()
      .map((row, rowIndex) =>
        row
          .map((cell, cellIndex) =>
            cell === dark ? `M ${cellIndex} ${rowIndex} l 1 0 0 1 -1 0 Z` : ""
          )
          .join(" ")
      )
      .join(" ")

  return (
    <svg
      height={local.size}
      viewBox={`0 0 ${cells().length} ${cells().length}`}
      width={local.size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <Show when={local.title}>
        <title>{local.title}</title>
      </Show>
      <path d={path(false)} fill={local.bgColor} />
      <path d={path(true)} fill={local.fgColor} />
    </svg>
  )
}
