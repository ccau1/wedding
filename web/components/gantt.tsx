import React, { useEffect, useRef } from "react";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";

interface GanttProps {
  tasks: {
    data: Array<{
      id: number;
      text: string;
      start_date: string;
      duration: number;
      progress: number;
    }>;
    links: Array<{
      id: number;
      source: number;
      target: number;
      type: string;
    }>;
  };
}

const Gantt = ({ tasks }: GanttProps) => {
  const ganttContainer = useRef();
  useEffect(() => {
    (async () => {
      const gantt = (await import("dhtmlx-gantt")).gantt;
      gantt.init(ganttContainer.current);
      gantt.parse(tasks);
    })();
  }, []);

  return <div ref={ganttContainer} style={{ height: "100%" }}></div>;
};

export default Gantt;
