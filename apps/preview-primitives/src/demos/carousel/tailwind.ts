const ring =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"

export default {
  root: "w-72",
  viewport: `flex snap-x snap-mandatory overflow-x-auto scroll-smooth rounded-xl [scrollbar-width:none] ${ring}`,
  item: "flex h-32 w-full flex-none snap-start flex-col items-center justify-center gap-1 bg-raised",
  title: "m-0 font-medium text-ink",
  text: "m-0 text-quiet",
  controls: "mt-3 flex items-center justify-between",
  arrow: `size-8 cursor-pointer rounded-full border border-line bg-surface p-0 text-ink hover:bg-raised data-disabled:cursor-not-allowed data-disabled:opacity-40 ${ring}`,
  dots: "flex gap-2",
  dot: `size-2 cursor-pointer rounded-full border-none bg-line p-0 data-current:bg-accent ${ring}`,
}
