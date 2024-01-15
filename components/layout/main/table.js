/* eslint-disable react/jsx-key */
import React, { useState } from "react";
import {
  useTable,
  usePagination,
  useGlobalFilter,
  useSortBy,
} from "react-table";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function Table({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      autoResetGlobalFilter: false,
      autoResetPage: true,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const [filterInput, setFilterInput] = useState("");

  const handleFilterChange = (e) => {
    const value = e.target.value || undefined || "";
    setGlobalFilter(value || undefined || "");
    setFilterInput(value);
  };

  return (
    <div className="pb-2">
      <div className="row mb-1">
        <div className="row">
          <div className="col-sm-12 col-md-6 col-lg-3 py-2">
            <input
              className="form-control"
              value={filterInput}
              onChange={handleFilterChange}
              placeholder={"Search..."}
            />
          </div>
          <div className="col-sm-12 col-md-6 col-lg-3 py-2">
            <select
              className="form-control form-select"
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      {/* <div className="table-responsive"> */}
      <table
        className={"table table-bordered bg-white text-center table-striped"}
        {...getTableProps()}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(
                (column) =>
                  column.Header !== "empty" && (
                    <th
                      style={{ verticalAlign: "middle" }}
                      {...column.getHeaderProps({
                        style: { width: column.width },
                      })}
                      className={
                        column.isSorted
                          ? column.isSortedDesc
                            ? "sort-desc"
                            : "sort-asc"
                          : ""
                      }
                    >
                      {column.render("Header")}
                    </th>
                  )
              )}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr
                style={{
                  backgroundColor: "#fffab8",
                }}
                {...row.getRowProps()}
                key={i}
              >
                {row.cells.map((cell, i) => {
                  return <td key={i}>{cell.render("Cell")}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* </div> */}
      <div className="pagination">
        <div className="btn-group">
          <button
            className="btn btn-white btn-sm"
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >
            <FaAngleDoubleLeft />
          </button>{" "}
          <button
            className="btn btn-white btn-sm"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            <IoIosArrowBack />
          </button>{" "}
          <button
            className="btn btn-white btn-sm"
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            <IoIosArrowForward />
          </button>{" "}
          <button
            className="btn btn-white btn-sm"
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            <FaAngleDoubleRight />
          </button>{" "}
        </div>
        &nbsp;
        <span className="my-auto">
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
      </div>
    </div>
  );
}

// export default App;
