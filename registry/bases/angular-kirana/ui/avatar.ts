import {
  DestroyRef,
  Directive,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  input,
  signal,
} from "@angular/core"
import { KuiAvatar } from "@kirana-ui/angular"
import { partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"

import { avatar } from "../../../styles/avatar.styles"

/** What the avatar's image tells its fallback: whether the picture has loaded. */
class AvatarState {
  readonly loaded = signal(false)
}

/**
 * An avatar: `<span kuiAvatar size="sm">` around its image and fallback, on Kirana UI's avatar
 * (`KuiAvatar`), the frame its picture and stand-in share.
 */
@Directive({
  selector: "span[kuiAvatar]",
  hostDirectives: [KuiAvatar],
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
}

/**
 * Its picture, `<img kuiAvatarImage src="…" alt="…">`, hidden until it has loaded, which is when
 * the fallback goes.
 *
 * PF-037: Kirana UI's image is structural only (`<img *kuiAvatarImage="address">`, drawn by the
 * part) and tells nothing of its loading, so a part on the caller's own `<img>`, with its `src`,
 * `alt` and bindings, cannot be Kirana UI's: the part follows the element's own `load` and `error`.
 */
@Directive({
  selector: "img[kuiAvatarImage]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "avatar-image",
    "[style.display]": "state.loaded() ? null : 'none'",
    "[class]": "part().class",
    "[style]": "part().style",
    "(load)": "state.loaded.set(true)",
    "(error)": "state.loaded.set(false)",
  },
})
class AvatarImage {
  readonly sx = input<SxInput>()
  protected readonly state = inject(AvatarState)
  protected readonly part = computed(() => partSx(avatar.image, this.sx()))
  readonly #element =
    inject<ElementRef<HTMLImageElement>>(ElementRef).nativeElement

  constructor() {
    // A picture already in the browser's cache has loaded before the listener was there.
    afterNextRender(() => {
      if (this.#element.complete && this.#element.naturalWidth > 0)
        this.state.loaded.set(true)
    })
    inject(DestroyRef).onDestroy(() => this.state.loaded.set(false))
  }
}

/**
 * What stands in for the picture (initials) until it loads, or when it fails: `<span
 * kuiAvatarFallback>CN</span>`, shown after `delay` milliseconds when given one, as Base UI's (PF-037:
 * Kirana UI's fallback takes no `delay`, and follows only its own image). The caller's element is the
 * fallback, a child of the avatar as the design's selectors want it; while the picture shows it is
 * hidden and loses its slot, as Base UI's leaves the page.
 */
@Directive({
  selector: "span[kuiAvatarFallback]",
  providers: [provideSxPart()],
  host: {
    "[attr.data-slot]": "shown() ? 'avatar-fallback' : null",
    "[style.display]": "shown() ? null : 'none'",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class AvatarFallback {
  readonly delay = input<number>()
  readonly sx = input<SxInput>()
  readonly #state = inject(AvatarState)
  readonly #waited = signal(false)
  protected readonly shown = computed(
    () => this.#waited() && !this.#state.loaded()
  )
  protected readonly part = computed(() => partSx(avatar.fallback, this.sx()))

  constructor() {
    afterNextRender(() => {
      const delay = this.delay()
      if (!delay) {
        this.#waited.set(true)
        return
      }
      this.#timer = setTimeout(() => this.#waited.set(true), delay)
    })
    inject(DestroyRef).onDestroy(() => clearTimeout(this.#timer))
  }

  #timer: ReturnType<typeof setTimeout> | undefined
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
