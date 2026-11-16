export default {
  list: "m-0 flex list-none gap-1 p-0",
  trigger:
    "m-0 flex cursor-pointer items-center gap-1 rounded-lg border-0 bg-transparent px-3 py-2 font-medium text-ink hover:bg-raised focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring data-popup-open:bg-raised",
  icon: "rotate-[0deg] text-quiet transition-[rotate] duration-200 ease-out data-popup-open:rotate-[180deg]",
  link: "block rounded-lg bg-transparent px-3 py-2 font-medium text-ink no-underline hover:bg-raised focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
  popup:
    "relative h-[calc(var(--popup-height)+2px)] w-[calc(var(--popup-width)+2px)] origin-(--transform-origin) scale-100 overflow-hidden rounded-xl border border-line bg-surface text-ink opacity-100 transition-[opacity,scale,width,height] duration-200 ease-out data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0",
  content:
    "static top-0 left-0 grid w-72 gap-1 p-2 opacity-100 transition-[opacity] duration-200 ease-out data-ending-style:absolute data-ending-style:opacity-0 data-starting-style:opacity-0",
  card: "block rounded-lg bg-transparent px-3 py-2 text-ink no-underline hover:bg-raised focus-visible:outline-2 focus-visible:outline-ring",
  cardTitle: "block font-medium",
  cardText: "block text-quiet",
}
