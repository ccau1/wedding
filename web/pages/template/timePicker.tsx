import TemplateLayout from "@layouts/templateLayout";
import moment from "moment";
import { useState } from "react";
import Datetime from "react-datetime";

const TimePickerTemplatePage = () => {
  const [datetime, setDateTime] = useState(moment());
  console.log("datetime", datetime);

  return (
    <TemplateLayout>
      <Datetime
        dateFormat={false}
        value={datetime}
        onChange={(value: moment.Moment) => setDateTime(value)}
      />
    </TemplateLayout>
  );
};

export default TimePickerTemplatePage;
