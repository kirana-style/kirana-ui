export default {
  button:
    "m-0 cursor-pointer rounded-lg border border-line bg-surface px-3 py-2 font-medium text-ink hover:bg-raised focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
  backdrop:
    "fixed inset-0 bg-[rgb(0_0_0/0.4)] opacity-[calc(1-var(--drawer-swipe-progress,0))] transition-[opacity] duration-300 ease-out data-ending-style:opacity-0 data-starting-style:opacity-0 data-swiping:duration-0",
  popup:
    "fixed right-0 bottom-0 left-0 mx-auto my-0 max-w-[28rem] translate-y-[var(--drawer-swipe-movement-y,0px)] touch-none rounded-t-xl border border-b-0 border-line bg-surface px-6 pt-3 pb-6 text-ink transition-[translate] duration-300 ease-out data-ending-style:translate-y-full data-starting-style:translate-y-full data-swiping:duration-0",
  handle: "mx-auto mt-0 mb-3 h-1 w-10 rounded-full bg-line",
  title: "m-0 text-[1rem] font-semibold",
  description: "mx-0 mt-1 mb-4 text-quiet",
}
