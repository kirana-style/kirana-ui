import { Component, computed, input } from "@angular/core"
import qrcode from "qrcode-generator"

/**
 * A QR code as an SVG, `react-qr-code`'s markup (MIT): its light and dark modules each one path,
 * encoded by the same `qrcode-generator`.
 */

// As `react-qr-code`, the text is encoded as UTF-8.
qrcode.stringToBytes = (text: string) =>
  Array.from(new TextEncoder().encode(text))

@Component({
  selector: "kui-qr-code",
  imports: [],
  host: { style: "display: contents" },
  template: `
    <svg
      [attr.height]="size()"
      [attr.viewBox]="'0 0 ' + cells().length + ' ' + cells().length"
      [attr.width]="size()"
      xmlns="http://www.w3.org/2000/svg"
    >
      @if (title()) {
        <title>{{ title() }}</title>
      }
      <path [attr.d]="path(false)" [attr.fill]="bgColor()"></path>
      <path [attr.d]="path(true)" [attr.fill]="fgColor()"></path>
    </svg>
  `,
})
export class QrCode {
  readonly value = input.required<string>()
  readonly size = input(256)
  readonly level = input<"L" | "M" | "Q" | "H">("L")
  readonly bgColor = input("#FFFFFF")
  readonly fgColor = input("#000000")
  readonly title = input<string>()
  protected readonly cells = computed(() => {
    const qr = qrcode(0, this.level())
    qr.addData(this.value())
    qr.make()
    const count = qr.getModuleCount()
    return Array.from({ length: count }, (_row, row) =>
      Array.from({ length: count }, (_cell, column) => qr.isDark(row, column))
    )
  })

  /** The light modules' path, or the dark ones'. */
  protected path(dark: boolean) {
    return this.cells()
      .map((row, rowIndex) =>
        row
          .map((cell, cellIndex) =>
            cell === dark ? `M ${cellIndex} ${rowIndex} l 1 0 0 1 -1 0 Z` : ""
          )
          .join(" ")
      )
      .join(" ")
  }
}
