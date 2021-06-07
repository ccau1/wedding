import TemplateLayout from "@layouts/templateLayout";
import moment from "moment";
import { useState } from "react";
import { DateRangePicker } from "react-dates";

const DateRangeTemplatePage = () => {
  const [dateRange, setDateRange] = useState({
    startDate: moment().subtract(1, "month"),
    endDate: moment().add(1, "month"),
  });
  const [focusedInput, setFocusedInput] = useState(false);

  return (
    <TemplateLayout>
      <DateRangePicker
        startDate={dateRange.startDate} // momentPropTypes.momentObj or null,
        startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
        endDate={dateRange.endDate} // momentPropTypes.momentObj or null,
        endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
        onDatesChange={(newDateRange) => setDateRange(newDateRange)} // PropTypes.func.isRequired,
        focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
        onFocusChange={(focusedInput) => setFocusedInput(focusedInput)} // PropTypes.func.isRequired,
      />
      <a
        href="https://github.com/airbnb/react-dates"
        className="block mt-2"
        target="_blank"
      >
        [ Documentation ]
      </a>
    </TemplateLayout>
  );
};

export default DateRangeTemplatePage;
