import {
  Component,
  Directive,
  computed,
  inject,
  input,
  signal,
} from "@angular/core"
import { KpAvatar, KpAvatarFallback, KpAvatarImage } from "@kirana-ui/angular"
import type { ImageStatus } from "@kirana-ui/angular"
import { partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"

import { avatar } from "../../../styles/avatar.styles"

/** Where the avatar's picture is in its loading, as Kirana UI's root reports it. */
class AvatarState {
  readonly status = signal<ImageStatus>("idle")
}

/**
 * An avatar: `<span kuiAvatar size="sm">` around its image and fallback, on Kirana UI's avatar
 * (`KpAvatar`), the frame its picture and stand-in share.
 */
@Directive({
  selector: "span[kuiAvatar]",
  hostDirectives: [KpAvatar],
  providers: [provideSxPart(), AvatarState],
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

  constructor() {
    const state = inject(AvatarState)
    inject(KpAvatar).loadingStatusChanged.subscribe((status) =>
      state.status.set(status)
    )
  }
}

/**
 * Its picture, `<img kuiAvatarImage src="…" alt="…">`: Kirana UI's image on the caller's own
 * `<img>` (`KpAvatarImage`, Base UI's `keepMounted` image), which loads itself and is hidden until
 * it has, which is when the fallback goes.
 */
@Directive({
  selector: "img[kuiAvatarImage]",
  providers: [provideSxPart()],
  hostDirectives: [KpAvatarImage],
  host: {
    "data-slot": "avatar-image",
    "[style.display]": "state.status() === 'loaded' ? null : 'none'",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class AvatarImage {
  readonly sx = input<SxInput>()
  protected readonly state = inject(AvatarState)
  protected readonly part = computed(() => partSx(avatar.image, this.sx()))
}

/**
 * What stands in for the picture (initials) until it loads, or when it fails: `<span
 * kuiAvatarFallback>CN</span>`, shown after `delay` milliseconds when given one, as Base UI's.
 * Kirana UI's fallback is a structural part, which an attribute cannot put around its own element:
 * the part draws it in its template, its children projected into it, and its own element stays
 * where it was written, drawing nothing (its corner handed down, which the fallback inherits).
 */
@Component({
  selector: "span[kuiAvatarFallback]",
  imports: [KpAvatarFallback],
  providers: [provideSxPart()],
  host: { style: "display: contents; border-radius: inherit" },
  template: `
    <span
      *kpAvatarFallback="{ delay: delay() }"
      data-slot="avatar-fallback"
      [class]="part().class"
      [style]="part().style"
    >
      <ng-content />
    </span>
  `,
})
class AvatarFallback {
  readonly delay = input<number>()
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(avatar.fallback, this.sx()))
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
