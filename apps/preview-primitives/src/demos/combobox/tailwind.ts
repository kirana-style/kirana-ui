export default {
  control: "flex w-56 gap-1",
  input:
    "m-0 min-w-0 flex-1 rounded-lg border border-line bg-surface px-3 py-2 text-ink placeholder:text-quiet placeholder:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
  trigger:
    "m-0 w-10 cursor-pointer rounded-lg border border-line bg-surface p-0 text-quiet hover:bg-raised focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
  popup:
    "max-h-[min(var(--available-height),14rem)] min-w-(--anchor-width) origin-(--transform-origin) overflow-y-auto rounded-lg border border-line bg-surface p-1 text-ink transition-[opacity,scale] duration-150 ease-out data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0",
  item: "flex cursor-default items-center justify-between gap-2 rounded-md px-2 py-1 data-highlighted:bg-raised data-selected:font-medium",
  check: "text-[0.75rem]",
  empty: "px-2 py-1 text-quiet",
}
