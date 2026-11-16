const button =
  "cursor-pointer rounded-lg border px-3 py-2 font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"

export default {
  trigger: `${button} border-line bg-surface text-danger hover:bg-raised`,
  backdrop:
    "fixed inset-0 bg-[rgb(0_0_0/0.4)] transition-opacity duration-150 ease-[ease-out] data-ending-style:opacity-0 data-starting-style:opacity-0",
  popup:
    "fixed inset-0 m-auto h-fit w-88 max-w-[calc(100vw-2rem)] rounded-xl border border-line bg-surface p-5 text-ink transition-[opacity,scale] duration-150 ease-[ease-out] data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0",
  title: "m-0 text-[1.125rem] font-semibold",
  description: "m-0 mt-1 text-quiet",
  actions: "mt-5 flex justify-end gap-2",
  cancel: `${button} border-line bg-surface text-ink hover:bg-raised`,
  confirm: `${button} border-danger bg-danger text-surface hover:opacity-90`,
}
