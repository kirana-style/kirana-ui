import { createContext, omit, useContext } from "solid-js"
import type { Accessor } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import { FileUpload as FileUploadPrimitive } from "@kirana-ui/solid/file-upload"
import type { ItemsProps, RootProps } from "@kirana-ui/solid/file-upload"
import type { FileUploadEntry } from "@kirana-ui/solid"
import { IconPlaceholder } from "./icon-placeholder"
import { empty } from "../../../styles/empty.styles"
import { fileUpload } from "../../../styles/file-upload.styles"
import { item } from "../../../styles/item.styles"
import { Button } from "./button"
import type { buttonVariants } from "./button"
import type { JSX } from "@solidjs/web"
import type { Sx } from "@kirana-style/core"

type ButtonVariants = NonNullable<Parameters<typeof buttonVariants>[0]>

/** The file an item is, for the parts inside it (the remove button's name). */
const FileUploadEntryContext = createContext<Accessor<
  FileUploadEntry | undefined
> | null>(null)

/**
 * The upload, taking Kirana UI's props as they are: `files`, `defaultFiles`,
 * `onFilesChange(files, details)` and `onFilesReject(rejections)`.
 */
function FileUpload(
  props: Omit<RootProps, "class" | "render"> & { class?: string; sx?: Sx }
) {
  const rest = omit(props, "class", "sx")
  return (
    <FileUploadPrimitive.Root
      data-slot="file-upload"
      {...rest}
      {...styleProps(props.class, fileUpload.root, props.sx)}
    />
  )
}

function FileUploadDropzone(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "class", "sx")
  return (
    <FileUploadPrimitive.Dropzone
      data-slot="file-upload-dropzone"
      {...rest}
      {...styleProps(props.class, empty.root, fileUpload.dropzone, props.sx)}
    />
  )
}

/** A Button that opens the file picker: outline unless told otherwise. */
function FileUploadTrigger(
  props: ButtonVariants & {
    class?: string
    sx?: Sx
    children?: JSX.Element
    [attribute: string]: unknown
  }
) {
  const rest = omit(props, "variant", "size", "sx")
  return (
    <FileUploadPrimitive.Trigger
      data-slot="file-upload-trigger"
      render={(triggerProps) => (
        <Button
          {...triggerProps()}
          variant={props.variant ?? "outline"}
          size={props.size ?? "default"}
          sx={props.sx}
        />
      )}
      {...rest}
    />
  )
}

/** The list of files. Without children it draws a `FileUploadItem` for each file. */
function FileUploadList(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "class", "sx", "children")
  return (
    <FileUploadPrimitive.List
      data-slot="file-upload-list"
      {...rest}
      {...styleProps(props.class, fileUpload.list, props.sx)}
    >
      {props.children ?? (
        <FileUploadItems>
          {(entry) => <FileUploadItem entry={entry} />}
        </FileUploadItems>
      )}
    </FileUploadPrimitive.List>
  )
}

/** Draws its child once for each file. It draws no element. */
function FileUploadItems(props: ItemsProps) {
  return <FileUploadPrimitive.Items {...props} />
}

/**
 * One file, a row in Item's outline. Without children it draws a file icon, the name, the size and
 * a button that removes it.
 */
function FileUploadItem(props: {
  entry: FileUploadEntry
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "class", "sx", "children")
  return (
    <FileUploadEntryContext value={() => props.entry}>
      <FileUploadPrimitive.Item
        data-slot="file-upload-item"
        {...rest}
        {...styleProps(
          props.class,
          item.root({ variant: "outline", size: "sm" }),
          fileUpload.item,
          props.sx
        )}
      >
        {props.children ?? (
          <>
            <IconPlaceholder
              lucide="FileIcon"
              tabler="IconFile"
              hugeicons="FileIcon"
              phosphor="FileIcon"
              remixicon="RiFileLine"
              aria-hidden="true"
              data-slot="file-upload-item-icon"
              {...styleProps(fileUpload.itemIcon)}
            />
            <FileUploadItemName />
            <FileUploadItemSize />
            <FileUploadItemRemove />
          </>
        )}
      </FileUploadPrimitive.Item>
    </FileUploadEntryContext>
  )
}

/** The file's name, unless given children. */
function FileUploadItemName(props: {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "class", "sx")
  return (
    <FileUploadPrimitive.ItemName
      data-slot="file-upload-item-name"
      {...rest}
      {...styleProps(props.class, fileUpload.itemName, props.sx)}
    />
  )
}

/** The file's size as people read one, unless given children. */
function FileUploadItemSize(props: {
  locale?: string
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  const rest = omit(props, "class", "sx")
  return (
    <FileUploadPrimitive.ItemSize
      data-slot="file-upload-item-size"
      {...rest}
      {...styleProps(props.class, fileUpload.itemSize, props.sx)}
    />
  )
}

/**
 * A ghost icon Button that removes its file. Without children it draws a cross, named "Remove"
 * and the file's name.
 */
function FileUploadItemRemove(
  props: ButtonVariants & {
    class?: string
    sx?: Sx
    children?: JSX.Element
    [attribute: string]: unknown
  }
) {
  const entry = useContext(FileUploadEntryContext)
  const rest = omit(props, "variant", "size", "sx", "children")
  return (
    <FileUploadPrimitive.ItemRemove
      data-slot="file-upload-item-remove"
      aria-label={
        props.children === undefined && entry?.()
          ? `Remove ${entry()?.file.name}`
          : undefined
      }
      render={(removeProps) => (
        <Button
          {...removeProps()}
          variant={props.variant ?? "ghost"}
          size={props.size ?? "icon-xs"}
          sx={props.sx}
        />
      )}
      {...rest}
    >
      {props.children ?? (
        <IconPlaceholder
          lucide="XIcon"
          tabler="IconX"
          hugeicons="Cancel01Icon"
          phosphor="XIcon"
          remixicon="RiCloseLine"
        />
      )}
    </FileUploadPrimitive.ItemRemove>
  )
}

/** A Button that removes every file: hidden while there is none. */
function FileUploadClear(
  props: ButtonVariants & {
    class?: string
    sx?: Sx
    children?: JSX.Element
    [attribute: string]: unknown
  }
) {
  const rest = omit(props, "variant", "size", "sx")
  return (
    <FileUploadPrimitive.Clear
      data-slot="file-upload-clear"
      render={(clearProps) => (
        <Button
          {...clearProps()}
          variant={props.variant ?? "ghost"}
          size={props.size ?? "sm"}
          sx={props.sx}
        />
      )}
      {...rest}
    />
  )
}

export {
  FileUpload,
  FileUploadDropzone,
  FileUploadTrigger,
  FileUploadList,
  FileUploadItems,
  FileUploadItem,
  FileUploadItemName,
  FileUploadItemSize,
  FileUploadItemRemove,
  FileUploadClear,
}
