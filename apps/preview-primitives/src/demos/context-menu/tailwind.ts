export default {
  area: "flex h-32 w-64 flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-line text-ink select-none data-popup-open:bg-raised",
  hint: "text-[0.75rem] text-quiet",
  popup:
    "min-w-40 origin-(--transform-origin) rounded-lg border border-line bg-surface p-1 text-ink transition-[opacity,scale] duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0",
  item: "cursor-default rounded-md px-2 py-1 data-highlighted:bg-raised",
  separator: "-mx-1 my-1 h-px bg-line",
}
