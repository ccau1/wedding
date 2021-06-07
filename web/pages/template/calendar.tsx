import TemplateLayout from "@layouts/templateLayout";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = momentLocalizer(moment); // or globalizeLocalizer

const today = moment();

const myEventsList = [
  {
    id: 0,
    title: "All Day Event very long title",
    allDay: true,
    start: new Date(today.year(), today.month(), 0),
    end: new Date(today.year(), today.month(), 1),
  },
  {
    id: 1,
    title: "Long Event",
    start: new Date(today.year(), today.month(), 7),
    end: new Date(today.year(), today.month(), 10),
  },
  {
    id: 2,
    title: "DTS STARTS",
    start: new Date(today.year(), 2, 13, 0, 0, 0),
    end: new Date(today.year(), 2, 20, 0, 0, 0),
  },
];

const CalendarTemplatePage = () => {
  return (
    <TemplateLayout>
      <Calendar
        localizer={localizer}
        events={myEventsList}
        startAccessor="start"
        endAccessor="end"
      />
      <a
        href="https://github.com/jquense/react-big-calendar"
        className="block mt-2"
        target="_blank"
      >
        [ Documentation ]
      </a>
    </TemplateLayout>
  );
};

export default CalendarTemplatePage;
