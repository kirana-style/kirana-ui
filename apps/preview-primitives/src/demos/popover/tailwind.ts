export default {
  trigger:
    "m-0 cursor-pointer rounded-lg border border-line bg-surface px-3 py-2 font-medium text-ink hover:bg-raised focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring data-popup-open:bg-raised",
  popup:
    "w-64 origin-(--transform-origin) scale-100 rounded-xl border border-line bg-surface p-4 text-ink opacity-100 outline-none transition-[opacity,scale] duration-150 ease-out data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0",
  title: "m-0 text-[1rem] leading-normal font-semibold",
  description: "mt-1 mb-4 text-quiet",
  close:
    "m-0 cursor-pointer rounded-lg border border-accent bg-accent px-3 py-1 font-medium text-on-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
}
