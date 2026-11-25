"use client"

import * as React from "react"

import type { FileUploadEntry } from "@kirana-ui/react"
import { FileUpload as FileUploadPrimitive } from "@kirana-ui/react/file-upload"
import { props as styleProps } from "@kirana-style/core"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
import type { Sx } from "../../../lib/sx"
import { empty } from "../../../styles/empty.styles"
import { fileUpload } from "../../../styles/file-upload.styles"
import { item } from "../../../styles/item.styles"
import type { buttonVariants } from "./button"
import { Button } from "./button"

type Props<P> = Omit<P, "className"> & { sx?: Sx }
type ButtonVariants = NonNullable<Parameters<typeof buttonVariants>[0]>

/** The file an item is, for the parts inside it (the remove button's name). */
const FileUploadEntryContext = React.createContext<FileUploadEntry | null>(null)

function FileUpload({
  sx,
  ...props
}: Props<React.ComponentProps<typeof FileUploadPrimitive.Root>>) {
  return (
    <FileUploadPrimitive.Root
      data-slot="file-upload"
      {...props}
      {...styleProps(fileUpload.root, sx)}
    />
  )
}

function FileUploadDropzone({
  sx,
  ...props
}: Props<React.ComponentProps<typeof FileUploadPrimitive.Dropzone>>) {
  return (
    <FileUploadPrimitive.Dropzone
      data-slot="file-upload-dropzone"
      {...props}
      {...styleProps(empty.root, fileUpload.dropzone, sx)}
    />
  )
}

/** A Button that opens the file picker: outline unless told otherwise. */
function FileUploadTrigger({
  sx,
  variant = "outline",
  size = "default",
  ...props
}: Props<React.ComponentProps<typeof FileUploadPrimitive.Trigger>> &
  ButtonVariants) {
  return (
    <FileUploadPrimitive.Trigger
      data-slot="file-upload-trigger"
      render={<Button variant={variant} size={size} sx={sx} />}
      {...props}
    />
  )
}

/** The list of files. Without children it draws a `FileUploadItem` for each file. */
function FileUploadList({
  sx,
  children,
  ...props
}: Props<React.ComponentProps<typeof FileUploadPrimitive.List>>) {
  return (
    <FileUploadPrimitive.List
      data-slot="file-upload-list"
      {...props}
      {...styleProps(fileUpload.list, sx)}
    >
      {children ?? (
        <FileUploadItems>
          {(entry) => <FileUploadItem entry={entry} />}
        </FileUploadItems>
      )}
    </FileUploadPrimitive.List>
  )
}

/** Draws its child once for each file. It draws no element. */
function FileUploadItems(
  props: React.ComponentProps<typeof FileUploadPrimitive.Items>
) {
  return <FileUploadPrimitive.Items {...props} />
}

/**
 * One file, a row in Item's outline. Without children it draws a file icon, the name, the size and
 * a button that removes it.
 */
function FileUploadItem({
  sx,
  entry,
  children,
  ...props
}: Props<React.ComponentProps<typeof FileUploadPrimitive.Item>>) {
  return (
    <FileUploadEntryContext.Provider value={entry}>
      <FileUploadPrimitive.Item
        data-slot="file-upload-item"
        entry={entry}
        {...props}
        {...styleProps(
          item.root({ variant: "outline", size: "sm" }),
          fileUpload.item,
          sx
        )}
      >
        {children ?? (
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
    </FileUploadEntryContext.Provider>
  )
}

/** The file's name, unless given children. */
function FileUploadItemName({
  sx,
  ...props
}: Props<React.ComponentProps<typeof FileUploadPrimitive.ItemName>>) {
  return (
    <FileUploadPrimitive.ItemName
      data-slot="file-upload-item-name"
      {...props}
      {...styleProps(fileUpload.itemName, sx)}
    />
  )
}

/** The file's size as people read one, unless given children. */
function FileUploadItemSize({
  sx,
  ...props
}: Props<React.ComponentProps<typeof FileUploadPrimitive.ItemSize>>) {
  return (
    <FileUploadPrimitive.ItemSize
      data-slot="file-upload-item-size"
      {...props}
      {...styleProps(fileUpload.itemSize, sx)}
    />
  )
}

/**
 * A ghost icon Button that removes its file. Without children it draws a cross, named "Remove"
 * and the file's name.
 */
function FileUploadItemRemove({
  sx,
  variant = "ghost",
  size = "icon-xs",
  children,
  ...props
}: Props<React.ComponentProps<typeof FileUploadPrimitive.ItemRemove>> &
  ButtonVariants) {
  const entry = React.useContext(FileUploadEntryContext)
  return (
    <FileUploadPrimitive.ItemRemove
      data-slot="file-upload-item-remove"
      aria-label={
        children === undefined && entry
          ? `Remove ${entry.file.name}`
          : undefined
      }
      render={<Button variant={variant} size={size} sx={sx} />}
      {...props}
    >
      {children ?? (
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
function FileUploadClear({
  sx,
  variant = "ghost",
  size = "sm",
  ...props
}: Props<React.ComponentProps<typeof FileUploadPrimitive.Clear>> &
  ButtonVariants) {
  return (
    <FileUploadPrimitive.Clear
      data-slot="file-upload-clear"
      render={<Button variant={variant} size={size} sx={sx} />}
      {...props}
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
