"use client"

import * as React from "react"

import { ColorPicker as ColorPickerPrimitive } from "@kirana-ui/react/color-picker"
import type { Popover as PopoverPrimitive } from "@kirana-ui/react/popover"
import { props as styleProps } from "@kirana-style/core"

import { IconPlaceholder } from "../../../icons/icon-placeholder"
import type { Sx } from "../../../lib/sx"
import { buttonLabel } from "../../../styles/button.styles"
import { colorPicker } from "../../../styles/color-picker.styles"
import { input } from "../../../styles/input.styles"
import { slider } from "../../../styles/slider.styles"
import { visuallyHidden } from "../../../styles/visually-hidden.styles"
import { Button } from "./button"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"

type Props<P> = Omit<P, "className"> & { sx?: Sx }

type ColorPickerInputChannel = React.ComponentProps<
  typeof ColorPickerPrimitive.ChannelInput
>["channel"]

/** What the parts inside a picker read of its root: whether it chooses an alpha. */
const ColorPickerContext = React.createContext<{ alpha: boolean }>({
  alpha: false,
})

/**
 * The picker's root, with a Popover inside it: its trigger and content open the picker in a popup.
 * Given no children, it draws both. Its parts written straight inside it draw the picker inline.
 */
function ColorPicker({
  sx,
  alpha = false,
  thumbAlignment = "edge",
  open,
  defaultOpen,
  onOpenChange,
  children,
  ...props
}: Props<React.ComponentProps<typeof ColorPickerPrimitive.Root>> &
  Pick<
    React.ComponentProps<typeof PopoverPrimitive.Root>,
    "open" | "defaultOpen" | "onOpenChange"
  >) {
  const context = React.useMemo(() => ({ alpha }), [alpha])
  return (
    <ColorPickerPrimitive.Root
      data-slot="color-picker"
      alpha={alpha}
      thumbAlignment={thumbAlignment}
      {...props}
      {...styleProps(colorPicker.root, sx)}
    >
      <ColorPickerContext value={context}>
        <Popover
          open={open}
          defaultOpen={defaultOpen}
          onOpenChange={onOpenChange}
        >
          {children ?? (
            <>
              <ColorPickerTrigger />
              <ColorPickerContent />
            </>
          )}
        </Popover>
      </ColorPickerContext>
    </ColorPickerPrimitive.Root>
  )
}

/** An outline Button that opens the picker: a swatch of the colour and its text, unless given children. */
function ColorPickerTrigger({
  sx,
  children,
  ...props
}: Props<React.ComponentProps<typeof PopoverPrimitive.Trigger>>) {
  return (
    <PopoverTrigger
      data-slot="color-picker-trigger"
      render={<Button variant="outline" sx={sx} />}
      {...props}
    >
      {children ?? (
        <>
          <ColorPickerSwatch
            render={<span />}
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
function ColorPickerContent({
  "aria-label": ariaLabel = "Colour picker",
  children,
  ...props
}: React.ComponentProps<typeof PopoverContent>) {
  const { alpha } = React.use(ColorPickerContext)
  return (
    <PopoverContent
      data-slot="color-picker-content"
      aria-label={ariaLabel}
      {...props}
    >
      {children ?? (
        <>
          <ColorPickerArea />
          <ColorPickerSlider channel="hue" />
          {alpha && <ColorPickerSlider channel="alpha" />}
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
function ColorPickerArea({
  sx,
  children,
  ...props
}: Props<React.ComponentProps<typeof ColorPickerPrimitive.Area>>) {
  return (
    <ColorPickerPrimitive.Area
      data-slot="color-picker-area"
      {...props}
      {...styleProps(colorPicker.area, sx)}
    >
      {children ?? <ColorPickerAreaThumb />}
    </ColorPickerPrimitive.Area>
  )
}

function ColorPickerAreaThumb({
  sx,
  "aria-label": ariaLabel = "Colour",
  ...props
}: Props<React.ComponentProps<typeof ColorPickerPrimitive.AreaThumb>>) {
  return (
    <ColorPickerPrimitive.AreaThumb
      data-slot="color-picker-area-thumb"
      aria-label={ariaLabel}
      {...props}
      {...styleProps(colorPicker.areaThumb, sx)}
    />
  )
}

/** A channel's slider, the hue or the alpha. It draws its track and thumb unless given children. */
function ColorPickerSlider({
  sx,
  children,
  ...props
}: Props<React.ComponentProps<typeof ColorPickerPrimitive.ChannelSlider>>) {
  return (
    <ColorPickerPrimitive.ChannelSlider
      data-slot="color-picker-slider"
      {...props}
      {...styleProps(colorPicker.slider, sx)}
    >
      {children ?? (
        <ColorPickerSliderTrack>
          <ColorPickerSliderThumb
            aria-label={props.channel === "alpha" ? "Alpha" : "Hue"}
          />
        </ColorPickerSliderTrack>
      )}
    </ColorPickerPrimitive.ChannelSlider>
  )
}

function ColorPickerSliderTrack({
  sx,
  ...props
}: Props<
  React.ComponentProps<typeof ColorPickerPrimitive.ChannelSliderTrack>
>) {
  return (
    <ColorPickerPrimitive.ChannelSliderTrack
      data-slot="color-picker-slider-track"
      {...props}
      {...styleProps(slider.track, colorPicker.track, sx)}
    />
  )
}

function ColorPickerSliderThumb({
  sx,
  ...props
}: Props<
  React.ComponentProps<typeof ColorPickerPrimitive.ChannelSliderThumb>
>) {
  return (
    <ColorPickerPrimitive.ChannelSliderThumb
      data-slot="color-picker-slider-thumb"
      {...props}
      {...styleProps(slider.thumb, colorPicker.thumb, sx)}
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
function ColorPickerInput({
  sx,
  channel,
  "aria-label": ariaLabel = CHANNEL_LABELS[channel],
  ...props
}: Props<React.ComponentProps<typeof ColorPickerPrimitive.ChannelInput>>) {
  return (
    <ColorPickerPrimitive.ChannelInput
      data-slot="color-picker-input"
      channel={channel}
      aria-label={ariaLabel}
      {...props}
      {...styleProps(input, colorPicker.input, sx)}
    />
  )
}

/** The colour now, over a checkerboard. */
function ColorPickerSwatch({
  sx,
  ...props
}: Props<React.ComponentProps<typeof ColorPickerPrimitive.Swatch>>) {
  return (
    <ColorPickerPrimitive.Swatch
      data-slot="color-picker-swatch"
      {...props}
      {...styleProps(colorPicker.swatch, sx)}
    />
  )
}

/** The presets: a trigger for each of `values`, unless given children. */
function ColorPickerSwatches({
  sx,
  values,
  children,
  ...props
}: Props<React.ComponentProps<"div">> & { values?: readonly string[] }) {
  return (
    <div
      data-slot="color-picker-swatches"
      {...props}
      sx={[colorPicker.swatches, sx]}
    >
      {children ??
        values?.map((value) => (
          <ColorPickerSwatchTrigger key={value} value={value} />
        ))}
    </div>
  )
}

/** A preset colour: pressed, the colour is this one. Named by its value unless given a label. */
function ColorPickerSwatchTrigger({
  sx,
  value,
  "aria-label": ariaLabel = value,
  ...props
}: Props<React.ComponentProps<typeof ColorPickerPrimitive.SwatchTrigger>>) {
  return (
    <ColorPickerPrimitive.SwatchTrigger
      data-slot="color-picker-swatch-trigger"
      value={value}
      aria-label={ariaLabel}
      {...props}
      {...styleProps(colorPicker.swatchTrigger, sx)}
    />
  )
}

/** A ghost icon Button that picks a colour from the screen; hidden where the browser has no eye dropper. */
function ColorPickerEyeDropper({
  sx,
  children,
  ...props
}: Props<React.ComponentProps<typeof ColorPickerPrimitive.EyeDropperTrigger>>) {
  return (
    <ColorPickerPrimitive.EyeDropperTrigger
      data-slot="color-picker-eye-dropper"
      render={<Button variant="ghost" size="icon" sx={sx} />}
      {...props}
    >
      {children ?? (
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
function ColorPickerFormatTrigger({
  sx,
  children,
  ...props
}: Props<React.ComponentProps<typeof ColorPickerPrimitive.FormatTrigger>>) {
  return (
    <ColorPickerPrimitive.FormatTrigger
      data-slot="color-picker-format-trigger"
      render={<Button variant="ghost" size="icon" sx={sx} />}
      {...props}
    >
      {children ?? (
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
function ColorPickerValue({
  sx,
  ...props
}: Props<React.ComponentProps<typeof ColorPickerPrimitive.ValueText>>) {
  return (
    <ColorPickerPrimitive.ValueText
      data-slot="color-picker-value"
      {...props}
      {...styleProps(colorPicker.valueText, sx)}
    />
  )
}

/** A row of the picker's controls: a swatch, an input, an icon button. */
function ColorPickerControls({
  sx,
  ...props
}: Props<React.ComponentProps<"div">>) {
  return (
    <div
      data-slot="color-picker-controls"
      {...props}
      sx={[colorPicker.controls, sx]}
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
