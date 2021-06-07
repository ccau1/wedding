import TemplateLayout from "@layouts/templateLayout";
import moment from "moment";
import { useState } from "react";
import { SingleDatePicker } from "react-dates";

const DatePickerTemplatePage = () => {
  const [date, setDate] = useState(moment());
  const [focused, setFocused] = useState(false);
  return (
    <TemplateLayout>
      <SingleDatePicker
        date={date} // momentPropTypes.momentObj or null
        onDateChange={(date) => setDate(date)} // PropTypes.func.isRequired
        focused={focused} // PropTypes.bool
        onFocusChange={({ focused }) => setFocused(focused)} // PropTypes.func.isRequired
        id="your_unique_id" // PropTypes.string.isRequired,
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

export default DatePickerTemplatePage;
