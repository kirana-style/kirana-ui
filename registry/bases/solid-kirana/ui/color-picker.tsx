import { createContext, For, omit, Show, useContext } from "solid-js"
import type { Accessor } from "solid-js"
import { props as styleProps } from "@kirana-style/core"
import { ColorPicker as ColorPickerPrimitive } from "@kirana-ui/solid/color-picker"
import type { RootProps } from "@kirana-ui/solid/color-picker"
import { Popover as PopoverPrimitive } from "@kirana-ui/solid/popover"
import type { RootProps as PopoverRootProps } from "@kirana-ui/solid/popover"
import type {
  ColorPickerInputChannel,
  ColorPickerSliderChannel,
} from "@kirana-ui/solid"
import { IconPlaceholder } from "./icon-placeholder"
import { buttonLabel } from "../../../styles/button.styles"
import { colorPicker } from "../../../styles/color-picker.styles"
import { input } from "../../../styles/input.styles"
import { slider } from "../../../styles/slider.styles"
import { visuallyHidden } from "../../../styles/visually-hidden.styles"
import { Button } from "./button"
import { PopoverContent, PopoverTrigger } from "./popover"
import type { JSX } from "@solidjs/web"
import type { Sx } from "@kirana-style/core"

type El = {
  class?: string
  sx?: Sx
  children?: JSX.Element
  [attribute: string]: unknown
}

/** What the parts inside a picker read of its root: whether it chooses an alpha. */
const ColorPickerContext = createContext<{ alpha: Accessor<boolean> }>({
  alpha: () => false,
})

/**
 * The picker's root, with a Popover inside it: its trigger and content open the picker in a popup.
 * Given no children, it draws both. Its parts written straight inside it draw the picker inline.
 * It takes Kirana UI's props as they are, the popover's `open`, `defaultOpen` and
 * `onOpenChange(open, details)` among them, so the popover's root is the primitive's own here.
 */
function ColorPicker(
  props: Omit<RootProps, "class" | "render"> &
    Pick<PopoverRootProps, "open" | "defaultOpen" | "onOpenChange"> & {
      class?: string
      sx?: Sx
    }
) {
  const rest = omit(
    props,
    "alpha",
    "thumbAlignment",
    "open",
    "defaultOpen",
    "onOpenChange",
    "class",
    "sx",
    "children"
  )
  const context = { alpha: () => props.alpha ?? false }
  return (
    <ColorPickerPrimitive.Root
      data-slot="color-picker"
      alpha={props.alpha ?? false}
      thumbAlignment={props.thumbAlignment ?? "edge"}
      {...rest}
      {...styleProps(props.class, colorPicker.root, props.sx)}
    >
      <ColorPickerContext value={context}>
        <PopoverPrimitive.Root
          open={props.open}
          defaultOpen={props.defaultOpen}
          onOpenChange={props.onOpenChange}
        >
          {props.children ?? (
            <>
              <ColorPickerTrigger />
              <ColorPickerContent />
            </>
          )}
        </PopoverPrimitive.Root>
      </ColorPickerContext>
    </ColorPickerPrimitive.Root>
  )
}

/** An outline Button that opens the picker: a swatch of the colour and its text, unless given children. */
function ColorPickerTrigger(props: El) {
  const rest = omit(props, "sx", "children")
  return (
    <PopoverTrigger
      data-slot="color-picker-trigger"
      asChild={(triggerProps) => (
        <Button {...triggerProps()} variant="outline" sx={props.sx} />
      )}
      {...rest}
    >
      {props.children ?? (
        <>
          <ColorPickerSwatch
            as="span"
            data-icon="inline-start"
            sx={colorPicker.triggerSwatch}
          />
          <ColorPickerPrimitive.ValueText
            data-slot="color-picker-value"
            {...styleProps(buttonLabel, colorPicker.valueText)}
          />
        </>
      )}
    </PopoverTrigger>
  )
}

/**
 * The popover's popup, the picker's parts laid out in it. Given no children, it draws the area, the
 * hue slider (and the alpha one when the picker chooses an alpha), and a row with the hex input and
 * the eye dropper.
 */
function ColorPickerContent(
  props: El & {
    side?: "top" | "right" | "bottom" | "left" | "inline-start" | "inline-end"
    sideOffset?: number
    align?: "start" | "center" | "end"
    alignOffset?: number
  }
) {
  const context = useContext(ColorPickerContext)
  const rest = omit(props, "aria-label", "children")
  return (
    <PopoverContent
      data-slot="color-picker-content"
      aria-label={
        (props["aria-label"] as string | undefined) ?? "Colour picker"
      }
      {...rest}
    >
      {props.children ?? (
        <>
          <ColorPickerArea />
          <ColorPickerSlider channel="hue" />
          <Show when={context.alpha()}>
            <ColorPickerSlider channel="alpha" />
          </Show>
          <ColorPickerControls>
            <ColorPickerInput channel="hex" />
            <ColorPickerEyeDropper />
          </ColorPickerControls>
        </>
      )}
    </PopoverContent>
  )
}

/** The two-dimensional field, saturation across and brightness up. It draws its thumb unless given children. */
function ColorPickerArea(props: El) {
  const rest = omit(props, "class", "sx", "children")
  return (
    <ColorPickerPrimitive.Area
      data-slot="color-picker-area"
      {...rest}
      {...styleProps(props.class, colorPicker.area, props.sx)}
    >
      {props.children ?? <ColorPickerAreaThumb />}
    </ColorPickerPrimitive.Area>
  )
}

function ColorPickerAreaThumb(props: El) {
  const rest = omit(props, "aria-label", "class", "sx")
  return (
    <ColorPickerPrimitive.AreaThumb
      data-slot="color-picker-area-thumb"
      aria-label={(props["aria-label"] as string | undefined) ?? "Colour"}
      {...rest}
      {...styleProps(props.class, colorPicker.areaThumb, props.sx)}
    />
  )
}

/** A channel's slider, the hue or the alpha. It draws its track and thumb unless given children. */
function ColorPickerSlider(
  props: El & {
    channel: ColorPickerSliderChannel
    orientation?: "horizontal" | "vertical"
  }
) {
  const rest = omit(props, "class", "sx", "children")
  return (
    <ColorPickerPrimitive.ChannelSlider
      data-slot="color-picker-slider"
      {...rest}
      {...styleProps(props.class, colorPicker.slider, props.sx)}
    >
      {props.children ?? (
        <ColorPickerSliderTrack>
          <ColorPickerSliderThumb
            aria-label={props.channel === "alpha" ? "Alpha" : "Hue"}
          />
        </ColorPickerSliderTrack>
      )}
    </ColorPickerPrimitive.ChannelSlider>
  )
}

function ColorPickerSliderTrack(props: El) {
  const rest = omit(props, "class", "sx")
  return (
    <ColorPickerPrimitive.ChannelSliderTrack
      data-slot="color-picker-slider-track"
      {...rest}
      {...styleProps(props.class, slider.track, colorPicker.track, props.sx)}
    />
  )
}

function ColorPickerSliderThumb(props: El) {
  const rest = omit(props, "class", "sx")
  return (
    <ColorPickerPrimitive.ChannelSliderThumb
      data-slot="color-picker-slider-thumb"
      {...rest}
      {...styleProps(props.class, slider.thumb, colorPicker.thumb, props.sx)}
    />
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

/** A channel's input, with the Input's chrome, named for its channel unless given a label. */
function ColorPickerInput(props: El & { channel: ColorPickerInputChannel }) {
  const rest = omit(props, "aria-label", "class", "sx")
  return (
    <ColorPickerPrimitive.ChannelInput
      data-slot="color-picker-input"
      aria-label={
        (props["aria-label"] as string | undefined) ??
        CHANNEL_LABELS[props.channel]
      }
      {...rest}
      {...styleProps(props.class, input, colorPicker.input, props.sx)}
    />
  )
}

/** The colour now, over a checkerboard. */
function ColorPickerSwatch(props: El) {
  const rest = omit(props, "class", "sx")
  return (
    <ColorPickerPrimitive.Swatch
      data-slot="color-picker-swatch"
      {...rest}
      {...styleProps(props.class, colorPicker.swatch, props.sx)}
    />
  )
}

/** The presets: a trigger for each of `values`, unless given children. */
function ColorPickerSwatches(props: El & { values?: readonly string[] }) {
  const rest = omit(props, "values", "class", "sx", "children")
  return (
    <div
      data-slot="color-picker-swatches"
      {...rest}
      {...styleProps(props.class, colorPicker.swatches, props.sx)}
    >
      {props.children ?? (
        <For each={props.values ?? []}>
          {(value) => <ColorPickerSwatchTrigger value={value} />}
        </For>
      )}
    </div>
  )
}

/** A preset colour: pressed, the colour is this one. Named by its value unless given a label. */
function ColorPickerSwatchTrigger(props: El & { value: string }) {
  const rest = omit(props, "aria-label", "class", "sx")
  return (
    <ColorPickerPrimitive.SwatchTrigger
      data-slot="color-picker-swatch-trigger"
      aria-label={(props["aria-label"] as string | undefined) ?? props.value}
      {...rest}
      {...styleProps(props.class, colorPicker.swatchTrigger, props.sx)}
    />
  )
}

/** A ghost icon Button that picks a colour from the screen; hidden where the browser has no eye dropper. */
function ColorPickerEyeDropper(props: El) {
  const rest = omit(props, "sx", "children")
  return (
    <ColorPickerPrimitive.EyeDropperTrigger
      data-slot="color-picker-eye-dropper"
      render={(dropperProps) => (
        <Button {...dropperProps()} variant="ghost" size="icon" sx={props.sx} />
      )}
      {...rest}
    >
      {props.children ?? (
        <>
          <IconPlaceholder
            lucide="PipetteIcon"
            tabler="IconColorPicker"
            hugeicons="PipetteIcon"
            phosphor="EyedropperIcon"
            remixicon="RiDropperLine"
          />
          <span sx={visuallyHidden}>Pick a colour from the screen</span>
        </>
      )}
    </ColorPickerPrimitive.EyeDropperTrigger>
  )
}

/** A ghost icon Button that writes the colour in the next format: hex, then rgb, then hsl. */
function ColorPickerFormatTrigger(props: El) {
  const rest = omit(props, "sx", "children")
  return (
    <ColorPickerPrimitive.FormatTrigger
      data-slot="color-picker-format-trigger"
      render={(formatProps) => (
        <Button {...formatProps()} variant="ghost" size="icon" sx={props.sx} />
      )}
      {...rest}
    >
      {props.children ?? (
        <>
          <IconPlaceholder
            lucide="ArrowLeftRightIcon"
            tabler="IconArrowsLeftRight"
            hugeicons="ArrowDataTransferHorizontalIcon"
            phosphor="ArrowsLeftRightIcon"
            remixicon="RiArrowLeftRightLine"
          />
          <span sx={visuallyHidden}>Change the format</span>
        </>
      )}
    </ColorPickerPrimitive.FormatTrigger>
  )
}

/** The colour written in its format. */
function ColorPickerValue(props: El) {
  const rest = omit(props, "class", "sx")
  return (
    <ColorPickerPrimitive.ValueText
      data-slot="color-picker-value"
      {...rest}
      {...styleProps(props.class, colorPicker.valueText, props.sx)}
    />
  )
}

/** A row of the picker's controls: a swatch, an input, an icon button. */
function ColorPickerControls(props: El) {
  const rest = omit(props, "class", "sx")
  return (
    <div
      data-slot="color-picker-controls"
      {...rest}
      {...styleProps(props.class, colorPicker.controls, props.sx)}
    />
  )
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
