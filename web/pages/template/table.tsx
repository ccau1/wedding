import React from "react";
import TemplateLayout from "@layouts/templateLayout";
import { useTable } from "react-table";
import { motion } from "framer-motion";
import { twCascade } from "@mariusmarais/tailwind-cascade";
import ListItem from "components/listItem";

const TableTemplatePage = () => {
  const data = React.useMemo(
    () => [
      {
        col1: {
          name: "Scarlett Johansson",
          description: "I'm a reporter",
          avatar: "/images/avatar-f-sample.jpg",
        },
        col2: "Minsk",
        col3: "27",
        col4: "rain",
      },
      {
        col1: {
          name: "Matt Damon",
          description: "I'm a reporter",
          avatar: "/images/avatar-m-sample.jpg",
        },
        col2: "Vilnius",
        col3: "30",
        col4: "rain",
      },
      {
        col1: {
          name: "Matt Damon",
          description: "I'm a reporter",
          avatar: "/images/avatar-m-sample.jpg",
        },
        col2: "London",
        col3: "23",
        col4: "rain",
      },
    ],
    []
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "Reporter",
        accessor: "col1", // accessor is the "key" in the data
        Cell: ({ value }) => {
          return (
            <ListItem
              className="text-left"
              title={value.name}
              subtitle={value.description}
              icon={value.avatar}
            />
          );
        },
      },
      {
        Header: "City",
        accessor: "col2", // accessor is the "key" in the data
      },
      {
        Header: "Temperature",
        accessor: "col3",
      },
      {
        Header: "Weather Forecast",
        accessor: "col4", // accessor is the "key" in the data
      },
      {
        Header: "Actions",
        Cell: (rowInfo) => {
          return (
            <div className="flex flex-row justify-center">
              <a className="link">Edit</a>
            </div>
          );
        },
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });
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
                    : "hover:bg-gray-200"
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
      <a
        href="https://react-table.tanstack.com/docs/overview"
        className="block mt-2"
        target="_blank"
      >
        [ Documentation ]
      </a>
    </TemplateLayout>
  );
};

export default TableTemplatePage;
