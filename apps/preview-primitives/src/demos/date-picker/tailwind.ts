export default {
  control: "inline-flex gap-1",
  field:
    "inline-flex items-center rounded-lg border border-line bg-surface px-3 py-2 text-ink tabular-nums data-invalid:border-danger",
  segment:
    "rounded-md px-1 py-0 caret-transparent focus-visible:bg-raised focus-visible:outline-2 focus-visible:outline-ring data-placeholder:text-quiet data-[segment=literal]:p-0 data-[segment=literal]:text-quiet",
  trigger:
    "m-0 w-10 cursor-pointer rounded-lg border border-line bg-surface p-0 text-quiet hover:bg-raised focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
  popup:
    "origin-(--transform-origin) rounded-xl border border-line bg-surface p-3 text-ink transition-[opacity,scale] duration-150 ease-out data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0",
  header: "mb-2 flex items-center justify-between",
  heading: "font-medium",
  nav: "m-0 flex size-8 cursor-pointer items-center justify-center rounded-md border-0 border-transparent bg-transparent p-0 text-ink hover:bg-raised focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
  grid: "border-collapse border-spacing-0",
  weekday: "size-8 p-0 text-center text-[0.75rem] font-normal text-quiet",
  cell: "p-0 text-center",
  day: "m-0 block size-8 cursor-pointer rounded-md border-0 border-transparent bg-transparent p-0 text-ink tabular-nums hover:bg-raised focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring data-outside-month:opacity-50 data-selected:bg-accent data-selected:text-on-accent data-today:font-semibold data-today:underline",
}
