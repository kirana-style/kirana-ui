import { css } from "@kirana-style/core"

import { Calendar } from "../ui/calendar"
import { Card, CardContent } from "../ui/card"
import { page } from "../../../styles/page.styles"

const styles = {
  mxAutoWFitP0: css({
    marginInline: "auto",
    width: "fit-content",
    padding: { "*": null, base: "0" },
  }),
  p0: css({ padding: { "*": null, base: "0" } }),
}

export default function CalendarMultiple() {
  return (
    <div sx={page.example}>
      <Card sx={styles.mxAutoWFitP0}>
        <CardContent sx={styles.p0}>
          <Calendar mode="multiple" />
        </CardContent>
      </Card>
    </div>
  )
}
