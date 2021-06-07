import React from "react";
import TemplateLayout from "@layouts/templateLayout";
import { useTable } from "react-table";
import { motion } from "framer-motion";
import { twCascade } from "@mariusmarais/tailwind-cascade";
import ListItem from "components/listItem";
import { FaBan, FaCheckCircle, FaPaperPlane } from "react-icons/fa";
import Tippy from "@tippyjs/react";
import { format } from "date-fns";

const RsvpTrackingPage = () => {
  const data = React.useMemo(
    () => [
      {
        col1: {
          name: "Scarlett Johansson",
          description: "CA | 4323894 | scarlett.johansson@gmail.com",
          gender: "f",
        },
        col2: 1,
        col3: "backlog",
        col4: new Date(),
      },
      {
        col1: {
          name: "Matt Damon",
          description: "CA | 4323894 | scarlett.johansson@gmail.com",
          gender: "m",
        },
        col2: 2,
        col3: "pending",
        col4: null,
      },
      {
        col1: {
          name: "Matt Damon",
          description: "CA | 4323894 | scarlett.johansson@gmail.com",
          gender: "f",
        },
        col2: 1,
        col3: "accepted",
        col4: new Date(),
      },
    ],
    []
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "Participant",
        accessor: "col1", // accessor is the "key" in the data
        Cell: ({ value }) => {
          return (
            <ListItem
              className="text-left py-1"
              subtitleClassName="text-xs"
              title={value.name}
              subtitle={value.description}
              icon={`/images/avatar_${value.gender || "m"}.png`}
            />
          );
        },
      },
      {
        Header: `Head Count (${data.reduce((sum, d) => sum + d.col2, 0)})`,
        accessor: "col2", // accessor is the "key" in the data
      },
      {
        Header: "Status",
        accessor: "col3",
      },
      {
        Header: "E-mail Sent",
        accessor: "col4", // accessor is the "key" in the data
        Cell: ({ value }) => {
          return (
            <div className="flex flex-row justify-center">
              {value ? (
                <Tippy
                  // options
                  content={`${format(value, "LLLL d, yyyy")} [Sent]`}
                  placement="bottom"
                  trigger="mouseenter"
                >
                  <div>
                    <FaCheckCircle size={20} className="text-green-400" />
                  </div>
                </Tippy>
              ) : (
                <FaBan size={20} className="text-red-200" />
              )}
            </div>
          );
        },
      },
      {
        Header: "Actions",
        Cell: (rowInfo) => {
          return (
            <div className="flex flex-row justify-center">
              <Tippy
                // options
                content="send invitation"
                placement="bottom"
                trigger="mouseenter"
              >
                <a className="link p-2 rounded-full hover:bg-gray-100 active:bg-gray-200">
                  <FaPaperPlane size={20} className="pr-1" />
                </a>
              </Tippy>
            </div>
          );
        },
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });
  return (
    <TemplateLayout>
      <table
        {...getTableProps()}
        className="rounded-md overflow-hidden shadow w-full"
      >
        <thead className="bg-gray-50 border-b border-gray-200">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className="p-3 text-sm font-normal text-gray-500 cursor-pointer hover:bg-gray-100"
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <motion.tbody
          {...getTableBodyProps()}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.3,
              },
            },
          }}
          initial="hidden"
          animate="show"
        >
          {rows.map((row, rowIndex) => {
            prepareRow(row);
            return (
              <motion.tr
                variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
                {...row.getRowProps()}
                className={twCascade(
                  rowIndex % 2 === 0
                    ? "bg-primary-50 hover:bg-primary-100"
                    : "hover:bg-gray-100"
                )}
              >
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      className={twCascade("p-2 text-center")}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </motion.tr>
            );
          })}
        </motion.tbody>
      </table>
    </TemplateLayout>
  );
};

export default RsvpTrackingPage;
