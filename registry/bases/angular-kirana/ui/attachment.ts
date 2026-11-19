import { Directive, ElementRef, computed, inject, input } from "@angular/core"
import { partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"

import { attachment } from "../../../styles/attachment.styles"
import { button } from "../../../styles/button.styles"
import { buttonLabels } from "./button"

type ButtonVariants = NonNullable<Parameters<typeof button>[0]>

@Directive({
  selector: "[kuiAttachment]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "attachment",
    "[attr.data-state]": "state()",
    "[attr.data-size]": "size()",
    "[attr.data-orientation]": "orientation()",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class Attachment {
  readonly state = input<
    "idle" | "uploading" | "processing" | "error" | "done"
  >("done")
  readonly size = input<"default" | "sm" | "xs">("default")
  readonly orientation = input<"horizontal" | "vertical">("horizontal")
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(attachment.root, this.sx()))
}

/** An action on the attachment (remove, retry), drawn as a Button (`ghost`, `icon-xs`). */
@Directive({
  selector: "button[kuiAttachmentAction]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "attachment-action",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class AttachmentAction {
  readonly variant = input<ButtonVariants["variant"]>("ghost")
  readonly size = input<ButtonVariants["size"]>("icon-xs")
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx(button({ variant: this.variant(), size: this.size() }), this.sx())
  )

  constructor() {
    buttonLabels()
  }
}

@Directive({
  selector: "[kuiAttachmentActions]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "attachment-actions",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class AttachmentActions {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx(attachment.actions, this.sx())
  )
}

@Directive({
  selector: "[kuiAttachmentContent]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "attachment-content",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class AttachmentContent {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx(attachment.content, this.sx())
  )
}

@Directive({
  selector: "[kuiAttachmentDescription]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "attachment-description",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class AttachmentDescription {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx(attachment.description, this.sx())
  )
}

@Directive({
  selector: "[kuiAttachmentGroup]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "attachment-group",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class AttachmentGroup {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(attachment.group, this.sx()))
}

@Directive({
  selector: "[kuiAttachmentMedia]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "attachment-media",
    "[attr.data-variant]": "variant()",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class AttachmentMedia {
  readonly variant = input<"icon" | "image">("icon")
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx(
      [attachment.media, this.variant() === "image" && attachment.mediaImage],
      this.sx()
    )
  )
}

@Directive({
  selector: "[kuiAttachmentTitle]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "attachment-title",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class AttachmentTitle {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx([attachment.title, attachment.titleWorking], this.sx())
  )
}

/** What opens the attachment: a button by default, or the element it is written on. */
@Directive({
  selector: "[kuiAttachmentTrigger]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "attachment-trigger",
    "[attr.type]": "isButton ? (type() ?? 'button') : (type() ?? null)",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class AttachmentTrigger {
  readonly type = input<"button" | "submit" | "reset">()
  readonly sx = input<SxInput>()
  protected readonly isButton =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement.tagName ===
    "BUTTON"
  protected readonly part = computed(() =>
    partSx(attachment.trigger, this.sx())
  )
}

export {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
  AttachmentTrigger,
}
