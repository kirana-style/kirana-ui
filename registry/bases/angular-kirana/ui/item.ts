import { Directive, computed, input } from "@angular/core"
import { partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"

import { item } from "../../../styles/item.styles"
import { separator } from "../../../styles/separator.styles"

type ItemVariants = NonNullable<Parameters<typeof item.root>[0]>
type ItemMediaVariants = NonNullable<Parameters<typeof item.media>[0]>

@Directive({
  selector: "[kuiItem]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "item",
    "[attr.data-variant]": "variant()",
    "[attr.data-size]": "size()",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class Item {
  readonly variant = input<ItemVariants["variant"]>("default")
  readonly size = input<ItemVariants["size"]>("default")
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx(
      [item.scope, item.root({ variant: this.variant(), size: this.size() })],
      this.sx()
    )
  )
}

@Directive({
  selector: "[kuiItemActions]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "item-actions",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class ItemActions {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(item.actions, this.sx()))
}

@Directive({
  selector: "[kuiItemContent]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "item-content",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class ItemContent {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(item.content, this.sx()))
}

@Directive({
  selector: "[kuiItemDescription]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "item-description",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class ItemDescription {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(item.description, this.sx()))
}

@Directive({
  selector: "[kuiItemFooter]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "item-footer",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class ItemFooter {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(item.footer, this.sx()))
}

@Directive({
  selector: "[kuiItemGroup]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "item-group",
    role: "list",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class ItemGroup {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(item.group, this.sx()))
}

@Directive({
  selector: "[kuiItemHeader]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "item-header",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class ItemHeader {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(item.header, this.sx()))
}

@Directive({
  selector: "[kuiItemMedia]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "item-media",
    "[attr.data-variant]": "variant()",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class ItemMedia {
  readonly variant = input<ItemMediaVariants["variant"]>("default")
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx(item.media({ variant: this.variant() }), this.sx())
  )
}

/** A line between items. */
@Directive({
  selector: "[kuiItemSeparator]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "item-separator",
    role: "separator",
    "[attr.aria-orientation]": "orientation()",
    "[attr.data-orientation]": "orientation()",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class ItemSeparator {
  readonly orientation = input<"horizontal" | "vertical">("horizontal")
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx([separator, item.separator], this.sx())
  )
}

@Directive({
  selector: "[kuiItemTitle]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "item-title",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class ItemTitle {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(item.title, this.sx()))
}

export {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
}
