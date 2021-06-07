import { parseISO, format } from "date-fns";

const DateComponent = ({ dateString }) => {
  const date = parseISO(
    typeof dateString === "string" ? dateString : dateString.toISOString()
  );

  return <time dateTime={dateString}>{format(date, "LLLL d, yyyy")}</time>;
};

export default DateComponent;
