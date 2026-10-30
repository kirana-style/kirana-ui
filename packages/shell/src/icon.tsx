/**
 * A Hugeicons glyph in the site's own chrome (the header, the docs, /create's toolbars). The
 * registry's components draw theirs through `IconPlaceholder`, in the design's icon library; the
 * site's chrome keeps one library, as upstream's does.
 *
 * A control declares how large its icons are by setting the registry's `ctx.iconSize`, and the
 * icon reads it (Tailwind's `[&_svg]:size-4`, which a class name Kirana hashes cannot match). An
 * explicit `size` still wins.
 */
import { css, props as styleProps } from "@kirana-style/core"
import { HugeiconsIcon } from "@hugeicons/react"

import { ctx } from "@workspace/registry/core/context"
import type { Sx } from "@workspace/registry/lib/sx"

const styles = {
  root: css({
    // Whatever the nearest control declared, 1rem otherwise.
    width: ctx.iconSize,
    height: ctx.iconSize,
    flexShrink: 0,
    // Icons are decoration inside controls; the control owns the interaction.
    pointerEvents: "none",
  }),
  explicit: (value: string) => css({ width: value, height: value }),
}

export type IconProps = Omit<
  React.ComponentProps<typeof HugeiconsIcon>,
  "className" | "size" | "width" | "height"
> & {
  /** Overrides the size the surrounding control asked for. */
  size?: string
  sx?: Sx
}

/** `strokeWidth` defaults to 2, not Hugeicons' 1.5: lucide's, which upstream's glyphs are drawn in. */
export function Icon({ size, sx, strokeWidth = 2, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      aria-hidden
      strokeWidth={strokeWidth}
      {...props}
      {...styleProps(styles.root, size != null && styles.explicit(size), sx)}
    />
  )
}
