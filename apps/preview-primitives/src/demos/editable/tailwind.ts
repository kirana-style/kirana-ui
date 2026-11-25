const ring =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"

export default {
  root: "flex w-72 gap-2",
  preview:
    "min-w-0 flex-1 cursor-text truncate rounded-md border border-transparent px-3 py-1.5 font-medium text-ink hover:bg-raised data-placeholder:text-quiet",
  input: `m-0 min-w-0 flex-1 rounded-md border border-line bg-surface px-3 py-1.5 font-medium text-ink ${ring}`,
  edit: `m-0 cursor-pointer rounded-md border border-line bg-surface px-2 py-0 text-ink hover:bg-raised ${ring}`,
  icon: "block align-middle",
  save: `m-0 cursor-pointer rounded-md border border-accent bg-accent px-3 py-1.5 font-medium text-on-accent hover:opacity-90 ${ring}`,
  cancel: `m-0 cursor-pointer rounded-md border border-line bg-surface px-3 py-1.5 font-medium text-ink hover:bg-raised ${ring}`,
}
