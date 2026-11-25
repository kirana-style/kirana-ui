import type { ElementRef } from "@angular/core"
import {
  Component,
  Directive,
  afterNextRender,
  computed,
  inject,
  input,
  signal,
  viewChild,
} from "@angular/core"
import {
  KpFileUpload,
  KpFileUploadClear,
  KpFileUploadDropzone,
  KpFileUploadItem,
  KpFileUploadItemName,
  KpFileUploadItemRemove,
  KpFileUploadItemSize,
  KpFileUploadItems,
  KpFileUploadList,
  KpFileUploadTrigger,
} from "@kirana-ui/angular"
import type { FileUploadEntry } from "@kirana-ui/angular"
import { SxDirective, partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"

import { IconPlaceholder } from "../../../icons/angular"
import { button } from "../../../styles/button.styles"
import { empty } from "../../../styles/empty.styles"
import { fileUpload } from "../../../styles/file-upload.styles"
import { item } from "../../../styles/item.styles"
import { buttonLabels } from "./button"

type ButtonVariants = NonNullable<Parameters<typeof button>[0]>

/**
 * Files chosen with a button or dropped on an area: `<div kuiFileUpload [multiple]="true">`, on
 * Kirana UI's file upload (`KpFileUpload`): its `[(files)]`, `defaultFiles`, `accept`, `multiple`,
 * `maxFiles`, `maxSize`, `minSize`, `validate`, `disabled`, `required`, `name` and `form` are the
 * primitive's, `(filesChanged)` and `(filesRejected)` its outputs.
 */
@Directive({
  selector: "[kuiFileUpload]",
  hostDirectives: [
    {
      directive: KpFileUpload,
      inputs: [
        "files",
        "defaultFiles",
        "accept",
        "multiple",
        "maxFiles",
        "maxSize",
        "minSize",
        "validate",
        "disabled",
        "required",
        "name",
        "form",
      ],
      outputs: ["filesChange", "filesChanged", "filesRejected"],
    },
  ],
  providers: [provideSxPart()],
  host: {
    "data-slot": "file-upload",
    // The primitive's inputs: Angular leaves a caller's static attributes on the element too.
    "[attr.accept]": "null",
    "[attr.multiple]": "null",
    "[attr.disabled]": "null",
    "[attr.required]": "null",
    "[attr.name]": "null",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class FileUpload {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(fileUpload.root, this.sx()))
}

/** Where files are dropped, pasted or pressed to be picked, drawn as Empty's dashed area. */
@Directive({
  selector: "[kuiFileUploadDropzone]",
  hostDirectives: [KpFileUploadDropzone],
  providers: [provideSxPart()],
  host: {
    "data-slot": "file-upload-dropzone",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class FileUploadDropzone {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx([empty.root, fileUpload.dropzone], this.sx())
  )
}

/** A Button that opens the file picker: `<button kuiFileUploadTrigger size="sm">`, outline unless told otherwise. */
@Directive({
  selector: "button[kuiFileUploadTrigger]",
  hostDirectives: [KpFileUploadTrigger],
  providers: [provideSxPart()],
  host: {
    "data-slot": "file-upload-trigger",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class FileUploadTrigger {
  readonly variant = input<ButtonVariants["variant"]>("outline")
  readonly size = input<ButtonVariants["size"]>("default")
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx(button({ variant: this.variant(), size: this.size() }), this.sx())
  )

  constructor() {
    buttonLabels()
  }
}

/**
 * Draws its element once for each file: `<li *kuiFileUploadItems="let entry">`, Kirana UI's
 * (`*kpFileUploadItems`), each given its `FileUploadEntry`.
 */
@Directive({
  selector: "[kuiFileUploadItems]",
  hostDirectives: [KpFileUploadItems],
})
class FileUploadItems {
  static ngTemplateContextGuard(
    _directive: FileUploadItems,
    _context: unknown
  ): _context is { $implicit: FileUploadEntry } {
    return true
  }
}

/** The file's name, unless given content. */
@Directive({
  selector: "[kuiFileUploadItemName]",
  hostDirectives: [KpFileUploadItemName],
  providers: [provideSxPart()],
  host: {
    "data-slot": "file-upload-item-name",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class FileUploadItemName {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx(fileUpload.itemName, this.sx())
  )
}

/** The file's size as people read one, unless given content; `locale` is the primitive's. */
@Directive({
  selector: "[kuiFileUploadItemSize]",
  hostDirectives: [{ directive: KpFileUploadItemSize, inputs: ["locale"] }],
  providers: [provideSxPart()],
  host: {
    "data-slot": "file-upload-item-size",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class FileUploadItemSize {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx(fileUpload.itemSize, this.sx())
  )
}

/**
 * A ghost icon Button that removes its file. Without content it draws a cross, named "Remove" and
 * the file's name (its item's entry), unless the caller gives an `aria-label`.
 */
@Component({
  selector: "button[kuiFileUploadItemRemove]",
  imports: [IconPlaceholder],
  hostDirectives: [KpFileUploadItemRemove],
  providers: [provideSxPart()],
  host: {
    "data-slot": "file-upload-item-remove",
    "[attr.aria-label]": "label()",
    "[class]": "part().class",
    "[style]": "part().style",
  },
  template: `<ng-content
    ><svg
      #fallback
      iconPlaceholder
      lucide="XIcon"
      tabler="IconX"
      hugeicons="Cancel01Icon"
      phosphor="XIcon"
      remixicon="RiCloseLine"
    ></svg
  ></ng-content>`,
})
class FileUploadItemRemove {
  readonly variant = input<ButtonVariants["variant"]>("ghost")
  readonly size = input<ButtonVariants["size"]>("icon-xs")
  readonly ariaLabel = input<string | undefined>(undefined, {
    alias: "aria-label",
  })
  readonly sx = input<SxInput>()
  private readonly entry = inject(KpFileUploadItem, { optional: true })?.entry
  private readonly fallback = viewChild<ElementRef>("fallback")
  /** Whether it draws its own cross: known once it is drawn. */
  private readonly bare = signal(false)
  protected readonly label = computed(() => {
    const entry = this.entry?.()
    return (
      this.ariaLabel() ??
      (this.bare() && entry ? `Remove ${entry.file.name}` : null)
    )
  })
  protected readonly part = computed(() =>
    partSx(button({ variant: this.variant(), size: this.size() }), this.sx())
  )

  constructor() {
    buttonLabels()
    afterNextRender(() => this.bare.set(!!this.fallback()))
  }
}

/**
 * One file, a row in Item's outline: `<li kuiFileUploadItem [entry]="entry">`, Kirana UI's
 * (`KpFileUploadItem`). Without content it draws a file icon, the name, the size and a button that
 * removes it.
 */
@Component({
  selector: "[kuiFileUploadItem]",
  imports: [
    FileUploadItemName,
    FileUploadItemRemove,
    FileUploadItemSize,
    IconPlaceholder,
    SxDirective,
  ],
  hostDirectives: [{ directive: KpFileUploadItem, inputs: ["entry"] }],
  providers: [provideSxPart()],
  host: {
    "data-slot": "file-upload-item",
    "[class]": "part().class",
    "[style]": "part().style",
  },
  template: `
    <ng-content>
      <svg
        iconPlaceholder
        lucide="FileIcon"
        tabler="IconFile"
        hugeicons="FileIcon"
        phosphor="FileIcon"
        remixicon="RiFileLine"
        data-slot="file-upload-item-icon"
        [sx]="itemIcon"
      ></svg>
      <span kuiFileUploadItemName></span>
      <span kuiFileUploadItemSize></span>
      <button kuiFileUploadItemRemove></button>
    </ng-content>
  `,
})
class FileUploadItem {
  readonly sx = input<SxInput>()
  protected readonly itemIcon = fileUpload.itemIcon
  protected readonly part = computed(() =>
    partSx(
      [item.root({ variant: "outline", size: "sm" }), fileUpload.item],
      this.sx()
    )
  )
}

/** The list of files: `<ul kuiFileUploadList>`. Without content it draws a `FileUploadItem` for each file. */
@Component({
  selector: "[kuiFileUploadList]",
  imports: [FileUploadItem, KpFileUploadItems],
  hostDirectives: [KpFileUploadList],
  providers: [provideSxPart()],
  host: {
    "data-slot": "file-upload-list",
    "[class]": "part().class",
    "[style]": "part().style",
  },
  template: `
    <ng-content>
      <li *kpFileUploadItems="let entry" kuiFileUploadItem [entry]="entry"></li>
    </ng-content>
  `,
})
class FileUploadList {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(fileUpload.list, this.sx()))
}

/** A Button that removes every file: `<button kuiFileUploadClear>`, hidden while there is none. */
@Directive({
  selector: "button[kuiFileUploadClear]",
  hostDirectives: [KpFileUploadClear],
  providers: [provideSxPart()],
  host: {
    "data-slot": "file-upload-clear",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class FileUploadClear {
  readonly variant = input<ButtonVariants["variant"]>("ghost")
  readonly size = input<ButtonVariants["size"]>("sm")
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx(button({ variant: this.variant(), size: this.size() }), this.sx())
  )

  constructor() {
    buttonLabels()
  }
}

export {
  FileUpload,
  FileUploadClear,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemName,
  FileUploadItemRemove,
  FileUploadItemSize,
  FileUploadItems,
  FileUploadList,
  FileUploadTrigger,
}
