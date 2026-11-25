export default {
  root: "inline-flex",
  trigger:
    "m-0 flex cursor-pointer items-center gap-2 rounded-lg border border-line bg-surface py-1 pr-3 pl-1 font-medium text-ink hover:bg-raised focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring data-popup-open:bg-raised",
  swatch: "block size-7 rounded-md border border-line bg-(--color)",
  value: "tabular-nums",
  popup:
    "flex w-60 origin-(--transform-origin) scale-100 flex-col gap-3 rounded-xl border border-line bg-surface p-3 text-ink opacity-100 outline-none transition-[opacity,scale] duration-150 ease-out data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0",
  area: "relative h-36 cursor-crosshair rounded-md [background-image:linear-gradient(to_top,#000,transparent),linear-gradient(to_right,#fff,var(--hue-color))]",
  areaThumb:
    "size-4 rounded-full border-2 border-surface bg-(--color) [box-shadow:0_0_0_1px_var(--ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
  slider: "flex h-4 cursor-pointer items-center",
  track:
    "relative h-3 w-full rounded-full [background-image:linear-gradient(to_right,#f00,#ff0,#0f0,#0ff,#00f,#f0f,#f00)]",
  sliderThumb:
    "size-4 rounded-full border-2 border-surface bg-(--color) [box-shadow:0_0_0_1px_var(--ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
  label: "flex items-center gap-2",
  labelText: "font-medium text-quiet",
  input:
    "m-0 w-full min-w-0 rounded-md border border-line bg-surface px-2 py-1 text-ink tabular-nums focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
}
