export default {
  button:
    "cursor-pointer rounded-lg border border-line bg-surface px-3 py-2 font-medium text-ink hover:bg-raised focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
  viewport: "fixed right-4 bottom-4 w-72",
  toast:
    "absolute right-0 bottom-0 z-[calc(10-var(--toast-index))] flex w-full origin-top [translate:var(--toast-swipe-movement-x,0px)_calc(var(--toast-index)*-0.5rem)] scale-[calc(1-var(--toast-index)*0.05)] items-start gap-3 rounded-lg border border-line bg-surface p-3 transition-[translate,scale,transform,opacity] duration-250 ease-[ease] select-none after:absolute after:top-full after:left-0 after:h-2 after:w-full after:content-[''] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring data-ending-style:[transform:translateY(100%)] data-ending-style:opacity-0 data-expanded:[translate:var(--toast-swipe-movement-x,0px)_calc(var(--toast-index)*-0.5rem-var(--toast-offset-y,0px))] data-expanded:scale-100 data-limited:opacity-0 data-starting-style:[transform:translateY(100%)] data-starting-style:opacity-0 data-swiping:duration-0",
  content: "flex-1",
  title: "font-medium text-ink",
  description: "text-quiet",
  close:
    "flex size-6 cursor-pointer items-center justify-center rounded-md border-0 bg-transparent p-0 text-lg/none text-quiet hover:bg-raised hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
}
