import { Directive, computed, input } from "@angular/core"
import { partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"

import { message } from "../../../styles/message.styles"

@Directive({
  selector: "[kuiMessage]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "message",
    "[attr.data-align]": "align()",
    // `align` is also HTML's presentational attribute (text-align), which the caller's `align="end"` would
    // leave on the element.
    "[attr.align]": "null",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class Message {
  readonly align = input<"start" | "end">("start")
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(message.root, this.sx()))
}

@Directive({
  selector: "[kuiMessageAvatar]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "message-avatar",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class MessageAvatar {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(message.avatar, this.sx()))
}

@Directive({
  selector: "[kuiMessageContent]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "message-content",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class MessageContent {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(message.content, this.sx()))
}

@Directive({
  selector: "[kuiMessageFooter]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "message-footer",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class MessageFooter {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(message.footer, this.sx()))
}

@Directive({
  selector: "[kuiMessageGroup]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "message-group",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class MessageGroup {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(message.group, this.sx()))
}

@Directive({
  selector: "[kuiMessageHeader]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "message-header",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class MessageHeader {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(message.header, this.sx()))
}

export {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageGroup,
  MessageHeader,
}
