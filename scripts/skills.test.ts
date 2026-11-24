import { expect, it } from "vite-plus/test"

import { problems } from "./skills"

it("every agent skill is as npx skills reads it, the primitives' one the package's", () => {
  expect(problems()).toEqual([])
})
