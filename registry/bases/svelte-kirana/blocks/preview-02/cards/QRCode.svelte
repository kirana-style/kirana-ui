<script lang="ts">
  /**
   * A QR code as an SVG, `react-qr-code`'s markup (MIT): its light and dark modules each one path,
   * encoded by the same `qrcode-generator`.
   */
  import qrcode from "qrcode-generator"

  let {
    value,
    size = 256,
    level = "L",
    bgColor = "#FFFFFF",
    fgColor = "#000000",
    title,
  }: {
    value: string
    size?: number
    level?: "L" | "M" | "Q" | "H"
    bgColor?: string
    fgColor?: string
    title?: string
  } = $props()

  // As `react-qr-code`, the text is encoded as UTF-8.
  qrcode.stringToBytes = (text: string) =>
    Array.from(new TextEncoder().encode(text))

  const cells = $derived.by(() => {
    const qr = qrcode(0, level)
    qr.addData(value)
    qr.make()
    const count = qr.getModuleCount()
    return Array.from({ length: count }, (_row, row) =>
      Array.from({ length: count }, (_cell, column) => qr.isDark(row, column))
    )
  })
  const path = (dark: boolean) =>
    cells
      .map((row, rowIndex) =>
        row
          .map((cell, cellIndex) =>
            cell === dark ? `M ${cellIndex} ${rowIndex} l 1 0 0 1 -1 0 Z` : ""
          )
          .join(" ")
      )
      .join(" ")
</script>

<svg height={size} viewBox={`0 0 ${cells.length} ${cells.length}`} width={size} xmlns="http://www.w3.org/2000/svg">
  {#if title}
    <title>
      {title}
    </title>
  {/if}
  <path d={path(false)} fill={bgColor}></path>
  <path d={path(true)} fill={fgColor}></path>
</svg>
