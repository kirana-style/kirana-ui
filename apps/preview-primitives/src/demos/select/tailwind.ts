export default {
  trigger:
    "flex w-48 cursor-pointer items-center justify-between gap-2 rounded-lg border border-line bg-surface px-3 py-2 text-ink hover:bg-raised focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
  value: "data-placeholder:text-quiet",
  icon: "block shrink-0 text-quiet",
  popup:
    "max-h-(--available-height) min-w-(--anchor-width) origin-(--transform-origin) overflow-y-auto rounded-lg border border-line bg-surface p-1 text-ink outline-none transition-[opacity,scale] duration-150 ease-[ease] data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0",
  item: "flex cursor-default items-center justify-between gap-2 rounded-md px-2 py-1 outline-none select-none data-highlighted:bg-raised data-selected:font-medium",
  indicator: "text-quiet",
}
