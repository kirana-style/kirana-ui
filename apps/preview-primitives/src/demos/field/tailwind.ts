export default {
  root: "flex w-64 flex-col gap-1",
  label: "font-medium text-ink",
  control:
    "m-0 w-full rounded-lg border border-line bg-surface px-3 py-2 text-ink placeholder:text-quiet placeholder:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring data-invalid:border-danger",
  description: "m-0 text-[0.75rem] text-quiet",
  error:
    "text-[0.75rem] text-danger opacity-100 transition-opacity duration-150 ease-[ease] data-ending-style:opacity-0 data-starting-style:opacity-0",
}
