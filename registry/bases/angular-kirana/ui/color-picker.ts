import {
  Component,
  Directive,
  ElementRef,
  booleanAttribute,
  computed,
  inject,
  input,
  numberAttribute,
} from "@angular/core"
import {
  KpColorPicker,
  KpColorPickerArea,
  KpColorPickerAreaThumb,
  KpColorPickerChannelInput,
  KpColorPickerChannelSlider,
  KpColorPickerChannelSliderThumb,
  KpColorPickerChannelSliderTrack,
  KpColorPickerEyeDropperTrigger,
  KpColorPickerFormatTrigger,
  KpColorPickerSwatch,
  KpColorPickerSwatchTrigger,
  KpColorPickerValueText,
  KpPopover,
  KpPopoverPopup,
  KpPopoverPortal,
  KpPopoverPositioner,
  KpPopoverTrigger,
  hostInputs,
} from "@kirana-ui/angular"
import type { Align, ColorPickerInputChannel, Side } from "@kirana-ui/angular"
import { SxDirective, partSx, provideSxPart } from "@kirana-style/angular"
import type { SxInput } from "@kirana-style/angular"

import { IconPlaceholder } from "../../../icons/angular"
import { button, buttonLabel } from "../../../styles/button.styles"
import { colorPicker } from "../../../styles/color-picker.styles"
import { input as inputStyle } from "../../../styles/input.styles"
import { popupMotion } from "../../../styles/overlay.styles"
import { popover } from "../../../styles/popover.styles"
import { slider } from "../../../styles/slider.styles"
import { visuallyHidden } from "../../../styles/visually-hidden.styles"
import { buttonLabels } from "./button"

/** The colour now, over a checkerboard: `<div kuiColorPickerSwatch>`, Kirana UI's swatch. */
@Directive({
  selector: "[kuiColorPickerSwatch]",
  hostDirectives: [KpColorPickerSwatch],
  providers: [provideSxPart()],
  host: {
    "data-slot": "color-picker-swatch",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class ColorPickerSwatch {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx(colorPicker.swatch, this.sx())
  )
}

/** The colour written in its format: `<span kuiColorPickerValue>`. */
@Directive({
  selector: "[kuiColorPickerValue]",
  hostDirectives: [KpColorPickerValueText],
  providers: [provideSxPart()],
  host: {
    "data-slot": "color-picker-value",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class ColorPickerValue {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx(colorPicker.valueText, this.sx())
  )
}

/** The area's thumb, named "Colour" unless given an `aria-label`. */
@Directive({
  selector: "[kuiColorPickerAreaThumb]",
  hostDirectives: [KpColorPickerAreaThumb],
  providers: [provideSxPart()],
  host: {
    "data-slot": "color-picker-area-thumb",
    "[attr.aria-label]": "ariaLabel()",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class ColorPickerAreaThumb {
  readonly ariaLabel = input("Colour", { alias: "aria-label" })
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx(colorPicker.areaThumb, this.sx())
  )
}

/** The two-dimensional field, saturation across and brightness up. It draws its thumb unless given content. */
@Component({
  selector: "[kuiColorPickerArea]",
  imports: [ColorPickerAreaThumb],
  hostDirectives: [KpColorPickerArea],
  providers: [provideSxPart()],
  host: {
    "data-slot": "color-picker-area",
    "[class]": "part().class",
    "[style]": "part().style",
  },
  template: `<ng-content><div kuiColorPickerAreaThumb></div></ng-content>`,
})
class ColorPickerArea {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(colorPicker.area, this.sx()))
}

/** A channel slider's track, drawn as the registry's Slider's. */
@Directive({
  selector: "[kuiColorPickerSliderTrack]",
  hostDirectives: [KpColorPickerChannelSliderTrack],
  providers: [provideSxPart()],
  host: {
    "data-slot": "color-picker-slider-track",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class ColorPickerSliderTrack {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx([slider.track, colorPicker.track], this.sx())
  )
}

/** A channel slider's thumb, drawn as the registry's Slider's. */
@Directive({
  selector: "[kuiColorPickerSliderThumb]",
  hostDirectives: [KpColorPickerChannelSliderThumb],
  providers: [provideSxPart()],
  host: {
    "data-slot": "color-picker-slider-thumb",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class ColorPickerSliderThumb {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx([slider.thumb, colorPicker.thumb], this.sx())
  )
}

/**
 * A channel's slider: `<div kuiColorPickerSlider [channel]="'hue'">`, Kirana UI's (its `channel`
 * and `orientation` the primitive's). It draws its track and thumb, the thumb named "Hue" or
 * "Alpha", unless given content.
 */
@Component({
  selector: "[kuiColorPickerSlider]",
  imports: [ColorPickerSliderThumb, ColorPickerSliderTrack],
  hostDirectives: [
    {
      directive: KpColorPickerChannelSlider,
      inputs: ["channel", "orientation"],
    },
  ],
  providers: [provideSxPart()],
  host: {
    "data-slot": "color-picker-slider",
    "[class]": "part().class",
    "[style]": "part().style",
  },
  template: `
    <ng-content>
      <div kuiColorPickerSliderTrack>
        <div kuiColorPickerSliderThumb [attr.aria-label]="thumbLabel()"></div>
      </div>
    </ng-content>
  `,
})
class ColorPickerSlider {
  readonly sx = input<SxInput>()
  private readonly slider = inject(KpColorPickerChannelSlider)
  protected readonly thumbLabel = computed(() =>
    this.slider.channel() === "alpha" ? "Alpha" : "Hue"
  )
  protected readonly part = computed(() =>
    partSx(colorPicker.slider, this.sx())
  )
}

const CHANNEL_LABELS: Record<ColorPickerInputChannel, string> = {
  hex: "Hex",
  red: "Red",
  green: "Green",
  blue: "Blue",
  hue: "Hue",
  saturation: "Saturation",
  lightness: "Lightness",
  alpha: "Alpha",
}

/**
 * A channel's input, with the Input's chrome: `<input kuiColorPickerInput [channel]="'hex'">`,
 * Kirana UI's (its `channel` the primitive's), named for its channel unless given an `aria-label`.
 */
@Directive({
  selector: "input[kuiColorPickerInput]",
  hostDirectives: [
    { directive: KpColorPickerChannelInput, inputs: ["channel"] },
  ],
  providers: [provideSxPart()],
  host: {
    "data-slot": "color-picker-input",
    "[attr.aria-label]": "label()",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class ColorPickerInput {
  readonly ariaLabel = input<string | undefined>(undefined, {
    alias: "aria-label",
  })
  readonly sx = input<SxInput>()
  private readonly channel = inject(KpColorPickerChannelInput).channel
  protected readonly label = computed(
    () => this.ariaLabel() ?? CHANNEL_LABELS[this.channel()]
  )
  protected readonly part = computed(() =>
    partSx([inputStyle, colorPicker.input], this.sx())
  )
}

/**
 * A preset colour: `<button kuiColorPickerSwatchTrigger [value]="'#ef4444'">`, Kirana UI's (its
 * `value` the primitive's): pressed, the colour is this one. Named by its value unless given an
 * `aria-label`.
 */
@Directive({
  selector: "[kuiColorPickerSwatchTrigger]",
  hostDirectives: [
    { directive: KpColorPickerSwatchTrigger, inputs: ["value"] },
  ],
  providers: [provideSxPart()],
  host: {
    "data-slot": "color-picker-swatch-trigger",
    "[attr.aria-label]": "label()",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class ColorPickerSwatchTrigger {
  readonly ariaLabel = input<string | undefined>(undefined, {
    alias: "aria-label",
  })
  readonly sx = input<SxInput>()
  private readonly value = inject(KpColorPickerSwatchTrigger).value
  protected readonly label = computed(() => this.ariaLabel() ?? this.value())
  protected readonly part = computed(() =>
    partSx(colorPicker.swatchTrigger, this.sx())
  )
}

/** The presets: `<div kuiColorPickerSwatches [values]="presets">`, a trigger for each of `values`, unless given content. */
@Component({
  selector: "[kuiColorPickerSwatches]",
  imports: [ColorPickerSwatchTrigger],
  providers: [provideSxPart()],
  host: {
    "data-slot": "color-picker-swatches",
    "[class]": "part().class",
    "[style]": "part().style",
  },
  template: `
    <ng-content>
      @for (value of values() ?? []; track value) {
        <button kuiColorPickerSwatchTrigger [value]="value"></button>
      }
    </ng-content>
  `,
})
class ColorPickerSwatches {
  readonly values = input<readonly string[]>()
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx(colorPicker.swatches, this.sx())
  )
}

/**
 * A ghost icon Button that picks a colour from the screen: `<button kuiColorPickerEyeDropper>`,
 * hidden where the browser has no eye dropper.
 */
@Component({
  selector: "button[kuiColorPickerEyeDropper]",
  imports: [IconPlaceholder, SxDirective],
  hostDirectives: [KpColorPickerEyeDropperTrigger],
  providers: [provideSxPart()],
  host: {
    "data-slot": "color-picker-eye-dropper",
    "[class]": "part().class",
    "[style]": "part().style",
  },
  template: `
    <ng-content>
      <svg
        iconPlaceholder
        lucide="PipetteIcon"
        tabler="IconColorPicker"
        hugeicons="PipetteIcon"
        phosphor="EyedropperIcon"
        remixicon="RiDropperLine"
      ></svg>
      <span [sx]="hidden">Pick a colour from the screen</span>
    </ng-content>
  `,
})
class ColorPickerEyeDropper {
  readonly sx = input<SxInput>()
  protected readonly hidden = visuallyHidden
  protected readonly part = computed(() =>
    partSx(button({ variant: "ghost", size: "icon" }), this.sx())
  )

  constructor() {
    buttonLabels()
  }
}

/**
 * A ghost icon Button that writes the colour in the next format, hex, then rgb, then hsl:
 * `<button kuiColorPickerFormatTrigger>`.
 */
@Component({
  selector: "button[kuiColorPickerFormatTrigger]",
  imports: [IconPlaceholder, SxDirective],
  hostDirectives: [KpColorPickerFormatTrigger],
  providers: [provideSxPart()],
  host: {
    "data-slot": "color-picker-format-trigger",
    "[class]": "part().class",
    "[style]": "part().style",
  },
  template: `
    <ng-content>
      <svg
        iconPlaceholder
        lucide="ArrowLeftRightIcon"
        tabler="IconArrowsLeftRight"
        hugeicons="ArrowDataTransferHorizontalIcon"
        phosphor="ArrowsLeftRightIcon"
        remixicon="RiArrowLeftRightLine"
      ></svg>
      <span [sx]="hidden">Change the format</span>
    </ng-content>
  `,
})
class ColorPickerFormatTrigger {
  readonly sx = input<SxInput>()
  protected readonly hidden = visuallyHidden
  protected readonly part = computed(() =>
    partSx(button({ variant: "ghost", size: "icon" }), this.sx())
  )

  constructor() {
    buttonLabels()
  }
}

/** A row of the picker's controls: a swatch, an input, an icon button. */
@Directive({
  selector: "[kuiColorPickerControls]",
  providers: [provideSxPart()],
  host: {
    "data-slot": "color-picker-controls",
    "[class]": "part().class",
    "[style]": "part().style",
  },
})
class ColorPickerControls {
  readonly sx = input<SxInput>()
  protected readonly part = computed(() =>
    partSx(colorPicker.controls, this.sx())
  )
}

/**
 * An outline Button that opens the picker: `<button kuiColorPickerTrigger>`, the Popover's trigger,
 * drawing a swatch of the colour and its text unless given content.
 */
@Component({
  selector: "button[kuiColorPickerTrigger]",
  imports: [ColorPickerSwatch, KpColorPickerValueText],
  hostDirectives: [KpPopoverTrigger],
  providers: [provideSxPart()],
  host: {
    "data-slot": "color-picker-trigger",
    "[class]": "part().class",
    "[style]": "part().style",
  },
  template: `
    <ng-content>
      <span
        kuiColorPickerSwatch
        data-icon="inline-start"
        [sx]="triggerSwatch"
      ></span>
      <span
        kpColorPickerValueText
        data-slot="color-picker-value"
        [class]="valueText"
      ></span>
    </ng-content>
  `,
})
class ColorPickerTrigger {
  readonly sx = input<SxInput>()
  protected readonly triggerSwatch = colorPicker.triggerSwatch
  protected readonly valueText = partSx(
    [buttonLabel, colorPicker.valueText],
    undefined
  ).class
  protected readonly part = computed(() =>
    partSx(button({ variant: "outline" }), this.sx())
  )

  constructor() {
    buttonLabels()
  }
}

/**
 * The popover's popup, the picker's parts laid out in it: `<div kuiColorPickerContent
 * aria-label="Brand colour">`, named "Colour picker" unless given an `aria-label`, placed as the
 * registry's PopoverContent (`side`, `align`, `sideOffset` 4, `alignOffset` 0). Given no content, it
 * draws the area, the hue slider (and the alpha one when the picker chooses an alpha), and a row
 * with the hex input and the eye dropper. As PopoverContent, it draws Kirana UI's portal, the
 * positioner and the popup in its template, its own element staying where it was written, drawing
 * nothing.
 */
@Component({
  selector: "[kuiColorPickerContent]",
  imports: [
    ColorPickerArea,
    ColorPickerControls,
    ColorPickerEyeDropper,
    ColorPickerInput,
    ColorPickerSlider,
    KpPopoverPopup,
    KpPopoverPortal,
    KpPopoverPositioner,
  ],
  providers: [provideSxPart()],
  host: {
    style: "display: contents",
    // The popup takes these: Angular leaves the caller's static attributes on this element too.
    "[attr.aria-label]": "null",
    "[attr.align]": "null",
  },
  template: `
    <ng-template kpPopoverPortal>
      <div
        kpPopoverPositioner
        [side]="side()"
        [align]="align()"
        [sideOffset]="sideOffset()"
        [alignOffset]="alignOffset()"
        [class]="positioner"
      >
        <div
          kpPopoverPopup
          data-slot="color-picker-content"
          [attr.aria-label]="ariaLabel()"
          [attr.dir]="host.getAttribute('dir')"
          [class]="part().class"
          [style]="part().style"
        >
          <ng-content>
            <div kuiColorPickerArea></div>
            <div kuiColorPickerSlider [channel]="'hue'"></div>
            @if (alpha()) {
              <div kuiColorPickerSlider [channel]="'alpha'"></div>
            }
            <div kuiColorPickerControls>
              <input kuiColorPickerInput [channel]="'hex'" />
              <button kuiColorPickerEyeDropper></button>
            </div>
          </ng-content>
        </div>
      </div>
    </ng-template>
  `,
})
class ColorPickerContent {
  readonly side = input<Side>("bottom")
  readonly align = input<Align>("center")
  readonly sideOffset = input(4, { transform: numberAttribute })
  readonly alignOffset = input(0, { transform: numberAttribute })
  readonly ariaLabel = input("Colour picker", { alias: "aria-label" })
  readonly sx = input<SxInput>()
  private readonly picker = inject(ColorPicker, { optional: true })
  /** Whether the picker around it chooses an alpha. */
  protected readonly alpha = computed(() => this.picker?.alpha() ?? false)
  protected readonly host =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement
  protected readonly positioner = partSx(popover.positioner, undefined).class
  protected readonly part = computed(() =>
    partSx([popupMotion, popover.content], this.sx())
  )
}

/**
 * The picker: `<div kuiColorPicker [defaultValue]="'#2563eb'">`, on Kirana UI's color picker
 * (`KpColorPicker`): its `[(value)]`, `defaultValue`, `[(format)]`, `defaultFormat`, `disabled`,
 * `readOnly`, `required`, `name`, `form` and `getAriaValueText` are the primitive's,
 * `(valueChanged)`, `(valueCommitted)` and `(formatChanged)` its outputs, `alpha` (false) and
 * `thumbAlignment` (`"edge"`) given to it here. It is also the Popover's root (Kirana UI's
 * `KpPopover`, its `[(open)]` and `defaultOpen`), so its trigger and content open the picker in a
 * popup: given no content, it draws both. Its parts written straight inside it draw the picker
 * inline.
 */
@Component({
  selector: "[kuiColorPicker]",
  imports: [ColorPickerContent, ColorPickerTrigger],
  hostDirectives: [
    {
      directive: KpColorPicker,
      inputs: [
        "value",
        "defaultValue",
        "format",
        "defaultFormat",
        "disabled",
        "readOnly",
        "required",
        "name",
        "form",
        "getAriaValueText",
      ],
      outputs: [
        "valueChange",
        "valueChanged",
        "valueCommitted",
        "formatChange",
        "formatChanged",
      ],
    },
    {
      directive: KpPopover,
      inputs: ["open", "defaultOpen"],
      outputs: ["openChange"],
    },
  ],
  providers: [provideSxPart()],
  host: {
    "data-slot": "color-picker",
    // The primitive's inputs: Angular leaves a caller's static attributes on the element too.
    "[attr.name]": "null",
    "[attr.disabled]": "null",
    "[attr.required]": "null",
    "[class]": "part().class",
    "[style]": "part().style",
  },
  template: `
    <ng-content>
      <button kuiColorPickerTrigger></button>
      <div kuiColorPickerContent></div>
    </ng-content>
  `,
})
class ColorPicker {
  readonly alpha = input(false, { transform: booleanAttribute })
  readonly thumbAlignment = input<"center" | "edge">("edge")
  readonly sx = input<SxInput>()
  protected readonly part = computed(() => partSx(colorPicker.root, this.sx()))

  constructor() {
    hostInputs(KpColorPicker, {
      alpha: () => this.alpha(),
      thumbAlignment: () => this.thumbAlignment(),
    })
  }
}

export {
  ColorPicker,
  ColorPickerArea,
  ColorPickerAreaThumb,
  ColorPickerContent,
  ColorPickerControls,
  ColorPickerEyeDropper,
  ColorPickerFormatTrigger,
  ColorPickerInput,
  ColorPickerSlider,
  ColorPickerSliderThumb,
  ColorPickerSliderTrack,
  ColorPickerSwatch,
  ColorPickerSwatches,
  ColorPickerSwatchTrigger,
  ColorPickerTrigger,
  ColorPickerValue,
}
