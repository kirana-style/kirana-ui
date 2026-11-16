export default {
  trigger:
    "m-0 cursor-pointer rounded-lg border border-line bg-surface px-3 py-2 font-medium text-ink hover:bg-raised focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring data-popup-open:bg-raised",
  popup:
    "box-border min-w-40 origin-(--transform-origin) scale-100 rounded-lg border border-line bg-surface p-1 text-ink opacity-100 outline-none transition-[opacity,scale] duration-150 ease-[ease] data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0",
  item: "flex cursor-default items-center justify-between gap-4 rounded-md px-2 py-1 outline-none select-none data-disabled:text-quiet data-disabled:opacity-50 data-highlighted:bg-raised",
  indicator: "text-quiet",
  separator: "-mx-1 my-1 h-px border-0 bg-line",
}
