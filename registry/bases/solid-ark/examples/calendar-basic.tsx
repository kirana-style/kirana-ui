import { css } from "@kirana-style/core"
import { Calendar } from "../ui/calendar"
import { radius, theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"

export default function CalendarBasic() {
  const styles = {
    bordered: css({
      borderRadius: radius.lg,
      borderWidth: "1px",
      borderColor: theme.border,
    }),
  }

  return (
    <div sx={page.example}>
      <Calendar mode="single" sx={styles.bordered} />
    </div>
  )
}
