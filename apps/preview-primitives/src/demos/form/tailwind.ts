export default {
  form: "flex w-64 flex-col gap-3",
  field: "flex flex-col gap-1",
  label: "font-medium text-ink",
  control:
    "m-0 w-full rounded-lg border border-line bg-surface px-3 py-2 text-ink placeholder:text-quiet placeholder:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring data-invalid:border-danger",
  error:
    "text-[0.75rem] text-danger opacity-100 transition-opacity duration-150 ease-[ease] data-ending-style:opacity-0 data-starting-style:opacity-0",
  submit:
    "m-0 cursor-pointer rounded-lg border-0 bg-accent px-3 py-2 font-medium text-on-accent hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
  status: "m-0 min-h-[1.5em] text-quiet",
}
