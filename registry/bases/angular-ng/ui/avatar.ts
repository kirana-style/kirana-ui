import { Directive, computed, input } from "@angular/core"
import { partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"
import {
  NgpAvatar,
  NgpAvatarFallback,
  NgpAvatarImage,
  NgpAvatarStatus,
  injectAvatarState,
} from "ng-primitives/avatar"

import { presence } from "../../../lib/angular/presence"
import { avatar } from "../../../styles/avatar.styles"

/**
 * An avatar: `<span kuiAvatar size="sm">` around its image and fallback, on ng-primitives'
 * `NgpAvatar`, which writes the image's `data-status`.
 */
@Directive({
  selector: "span[kuiAvatar]",
  hostDirectives: [NgpAvatar],
  providers: [provideSxPart()],
  host: {
    "data-slot": "avatar",
    "[attr.data-size]": "size()",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class Avatar {
  readonly size = input<"default" | "sm" | "lg">("default")
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(avatar.root, this.sx()))
}

/** Its picture, `<img kuiAvatarImage src="…" alt="…">`, hidden until it has loaded. */
@Directive({
  selector: "img[kuiAvatarImage]",
  hostDirectives: [NgpAvatarImage],
  providers: [provideSxPart()],
  host: {
    "data-slot": "avatar-image",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class AvatarImage {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(avatar.image, this.sx()))
}

/**
 * What stands in for the picture (initials) until it loads, or when it fails: `<span
 * kuiAvatarFallback>CN</span>`. Gone from the page while the picture is shown, as Base UI's is
 * (`presence`).
 */
@Directive({
  selector: "span[kuiAvatarFallback]",
  hostDirectives: [
    {
      directive: NgpAvatarFallback,
      inputs: ["ngpAvatarFallbackDelay: delay"],
    },
  ],
  providers: [provideSxPart()],
  host: {
    "data-slot": "avatar-fallback",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class AvatarFallback {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(avatar.fallback, this.sx()))

  constructor() {
    const state = injectAvatarState()
    presence(() => state().status() !== NgpAvatarStatus.Loaded)
  }
}

/** A dot at its corner (a status). */
@Directive({
  selector: "[kuiAvatarBadge]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "avatar-badge",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class AvatarBadge {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(avatar.badge, this.sx()))
}

/** Avatars overlapping in a row. */
@Directive({
  selector: "[kuiAvatarGroup]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "avatar-group",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class AvatarGroup {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(avatar.group, this.sx()))
}

/** The count of avatars a group leaves out (`+3`). */
@Directive({
  selector: "[kuiAvatarGroupCount]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "avatar-group-count",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class AvatarGroupCount {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(avatar.groupCount, this.sx()))
}

export {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
}
