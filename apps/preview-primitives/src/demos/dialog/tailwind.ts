export default {
  row: "flex items-center gap-3",
  name: "font-medium",
  button:
    "m-0 cursor-pointer rounded-lg border border-line bg-surface px-3 py-2 font-medium text-ink hover:bg-raised focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
  backdrop:
    "fixed inset-0 bg-[rgb(0_0_0/0.4)] transition-[opacity] duration-150 ease-out data-ending-style:opacity-0 data-starting-style:opacity-0",
  popup:
    "fixed top-1/2 left-1/2 w-80 max-w-[calc(100vw-2rem)] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-line bg-surface p-6 text-ink transition-[opacity,scale] duration-150 ease-out data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0",
  title: "m-0 text-[1rem] font-semibold",
  description: "mx-0 mt-1 mb-4 text-quiet",
  form: "m-0 grid gap-4",
  input:
    "m-0 w-full rounded-lg border border-line bg-surface px-3 py-2 text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
  actions: "flex justify-end gap-2",
  save: "m-0 cursor-pointer rounded-lg border border-accent bg-accent px-3 py-2 font-medium text-on-accent hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
}
