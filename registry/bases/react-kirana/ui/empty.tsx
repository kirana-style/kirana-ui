import * as React from "react"

import type { Sx } from "../../../lib/sx"
import { empty } from "../../../styles/empty.styles"

type El = Omit<React.ComponentProps<"div">, "className"> & { sx?: Sx }
type MediaVariants = NonNullable<Parameters<typeof empty.media>[0]>

function Empty({ sx, ...props }: El) {
  return <div data-slot="empty" {...props} sx={[empty.root, sx]} />
}

function EmptyHeader({ sx, ...props }: El) {
  return <div data-slot="empty-header" {...props} sx={[empty.header, sx]} />
}

function EmptyMedia({ sx, variant = "default", ...props }: El & MediaVariants) {
  return (
    <div
      data-slot="empty-icon"
      data-variant={variant}
      {...props}
      sx={[empty.media({ variant }), sx]}
    />
  )
}

function EmptyTitle({ sx, ...props }: El) {
  return <div data-slot="empty-title" {...props} sx={[empty.title, sx]} />
}

function EmptyDescription({ sx, ...props }: El) {
  return (
    <div
      data-slot="empty-description"
      {...props}
      sx={[empty.description, sx]}
    />
  )
}

function EmptyContent({ sx, ...props }: El) {
  return <div data-slot="empty-content" {...props} sx={[empty.content, sx]} />
}

export {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
  EmptyMedia,
}
