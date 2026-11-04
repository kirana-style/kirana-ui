import { Component, Directive, computed, input } from "@angular/core"
import { SxDirective, partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"

import { table } from "../../../styles/table.styles"

/**
 * A table in its scrolling container (`<div kuiTable>` holding the rows): the container is the
 * host, the `<table>` inside takes the caller's `sx`, as React's spreads its props on the table.
 */
@Component({
  selector: "[kuiTable]",
  imports: [SxDirective],
  providers: [provideSxPart()],
  host: {
    "data-slot": "table-container",
    "[class]": "part().class",
    "[style]": "part().style",
  },
  template: `
    <table data-slot="table" [sx]="inner()">
      <ng-content />
    </table>
  `,
})
class Table {
  readonly sx = input<SxInput>()
  protected readonly table = table
  protected readonly inner = computed(() => [table.root, this.sx()] as SxInput)
  protected readonly part = computed(() => partSx(table.container, undefined))
}

@Directive({
  selector: "[kuiTableBody]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "table-body",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class TableBody {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(table.body, this.sx()))
}

@Directive({
  selector: "[kuiTableCaption]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "table-caption",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class TableCaption {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(table.caption, this.sx()))
}

@Directive({
  selector: "[kuiTableCell]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "table-cell",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class TableCell {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(table.cell, this.sx()))
}

@Directive({
  selector: "[kuiTableFooter]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "table-footer",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class TableFooter {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(table.footer, this.sx()))
}

@Directive({
  selector: "[kuiTableHead]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "table-head",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class TableHead {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(table.head, this.sx()))
}

@Directive({
  selector: "[kuiTableHeader]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "table-header",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class TableHeader {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(table.header, this.sx()))
}

@Directive({
  selector: "[kuiTableRow]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "table-row",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class TableRow {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(table.row, this.sx()))
}

export {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
}
