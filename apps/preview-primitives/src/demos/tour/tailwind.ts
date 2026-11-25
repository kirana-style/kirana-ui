export default {
  root: "flex flex-col items-center gap-4",
  start:
    "m-0 cursor-pointer rounded-lg border border-accent bg-accent px-3 py-2 font-medium text-on-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
  targets: "flex gap-2",
  target:
    "rounded-full border border-line bg-surface px-3 py-1 font-medium text-ink",
  spotlight:
    "fixed inset-0 opacity-100 transition-opacity duration-150 ease-[ease] before:absolute before:top-(--spotlight-top) before:left-(--spotlight-left) before:h-(--spotlight-height) before:w-(--spotlight-width) before:rounded-lg before:transition-[top,left,width,height] before:duration-200 before:ease-[ease] before:content-[''] before:[box-shadow:0_0_0_9999px_rgb(0_0_0/0.4)] data-ending-style:opacity-0 data-starting-style:opacity-0",
  popup:
    "w-64 origin-(--transform-origin) scale-100 rounded-xl border border-line bg-surface p-4 text-ink opacity-100 outline-none transition-[opacity,scale] duration-150 ease-out data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0",
  arrow:
    "size-2 rotate-45 border border-transparent bg-surface data-[side=bottom]:-top-1 data-[side=bottom]:border-t-line data-[side=bottom]:border-l-line data-[side=left]:-right-1 data-[side=left]:border-t-line data-[side=left]:border-r-line data-[side=right]:-left-1 data-[side=right]:border-b-line data-[side=right]:border-l-line data-[side=top]:-bottom-1 data-[side=top]:border-r-line data-[side=top]:border-b-line",
  title: "m-0 text-[1rem] leading-normal font-semibold",
  description: "mt-1 mb-4 text-quiet",
  footer: "flex items-center gap-2",
  count: "me-auto text-[0.75rem] text-quiet tabular-nums",
  back: "m-0 cursor-pointer rounded-lg border border-line bg-surface px-3 py-1 font-medium text-ink hover:not-data-disabled:bg-raised focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring data-disabled:cursor-default data-disabled:opacity-50",
  next: "m-0 cursor-pointer rounded-lg border border-accent bg-accent px-3 py-1 font-medium text-on-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
}
