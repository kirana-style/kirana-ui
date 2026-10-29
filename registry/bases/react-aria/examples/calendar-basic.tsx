import { css } from "@kirana-style/core"

import { Calendar } from "../ui/calendar"
import { radius, theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"

const styles = {
  bordered: css({
    borderRadius: radius.lg,
    borderWidth: "1px",
    borderColor: theme.border,
  }),
}

export default function CalendarBasic() {
  return (
    <div sx={page.example}>
      <Calendar sx={styles.bordered} />
    </div>
  )
}
