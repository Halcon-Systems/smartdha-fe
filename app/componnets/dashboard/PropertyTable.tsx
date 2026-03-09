"use client";

import { useState, useEffect } from "react";
import { fetchPropertyList } from "../../lib/api-client";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

type PropertyRow = {
  id: string;
  idSpot: string;
  category: string;
  type: string;
  possessionType: string;
  propertyTagDate: string;
  phase: string;
  zone: string;
  khayaban: string;
  floor: string;
};

export default function PropertyTable() {
  const [properties, setProperties] = useState<PropertyRow[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");

    fetchPropertyList({
      isActive: true,
      pageNumber: currentPage - 1,
      pageSize: rowsPerPage,
    })
      .then((data) => {
        const items = Array.isArray(data?.data?.items)
          ? data.data.items.map((item: any, idx: number) => ({
              id: item.id?.toString() || idx.toString(),
              idSpot: item.serialNo?.toString() || item.id?.toString() || idx.toString(),
              category: item.category || "",
              type: item.type || "",
              possessionType: item.possessionType || "",
              propertyTagDate: item.propertyTag || "",
              phase: item.phase || "",
              zone: item.zone || "",
              khayaban: item.khayaban || "",
              floor: item.floor?.toString() || "",
            }))
          : [];

        setProperties(items);

        if (typeof data?.data?.totalPages === "number") {
          setTotalPages(data.data.totalPages);
        }

        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load property list");
        setLoading(false);
      });
  }, [currentPage, rowsPerPage]);

  const rowStyle = (index: number) =>
    index % 2 !== 0 ? "bg-[#F4FFF1]" : "bg-white";

  return (
    <div className="w-full mt-6">
      <div className="bg-transparent rounded-bl-xl rounded-br-xl overflow-hidden">
        {/* Header */}
        <div className="py-3 flex justify-between items-center">
          <h2 className="text-xl font-bold">Property List</h2>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold">Rows :</span>

            <select
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="border border-gray-300 rounded px-2 py-1 text-xs"
            >
              {[5, 10, 20, 30].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="text-center py-10 text-gray-500">
            Loading properties...
          </div>
        ) : error ? (
          <div className="text-center py-10 text-red-500">{error}</div>
        ) : (
          <>
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50 text-xs">
                  <tr>
                    <th className="px-4 py-3 text-left">ID/Spot</th>
                    <th className="px-4 py-3 text-left">Category</th>
                    <th className="px-4 py-3 text-left">Type</th>
                    <th className="px-4 py-3 text-left">Possession Type</th>
                    <th className="px-4 py-3 text-left">Property Tag Date</th>
                    <th className="px-4 py-3 text-left">Phase</th>
                    <th className="px-4 py-3 text-left">Zone</th>
                    <th className="px-4 py-3 text-left">Khayaban</th>
                    <th className="px-4 py-3 text-left">Floor</th>
                  </tr>
                </thead>

                <tbody>
                  {properties.length > 0 ? (
                    properties.map((item, index) => (
                      <tr
                        key={item.id}
                        className={`${rowStyle(index)} hover:bg-gray-50`}
                      >
                        <td className="px-4 py-3 text-sm">{item.idSpot}</td>
                        <td className="px-4 py-3 text-sm">{item.category}</td>
                        <td className="px-4 py-3 text-sm">{item.type}</td>
                        <td className="px-4 py-3 text-sm">
                          {item.possessionType}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {item.propertyTagDate}
                        </td>
                        <td className="px-4 py-3 text-sm">{item.phase}</td>
                        <td className="px-4 py-3 text-sm">{item.zone}</td>
                        <td className="px-4 py-3 text-sm">{item.khayaban}</td>
                        <td className="px-4 py-3 text-sm">{item.floor}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={9}
                        className="px-4 py-10 text-center text-sm text-gray-400"
                      >
                        No properties found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="py-3 border-t flex justify-between items-center">
              <p className="text-xs text-gray-500">
                Page {currentPage} of {totalPages}
              </p>

              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.max(1, p - 1))
                  }
                  disabled={currentPage === 1}
                  className={`p-2 rounded border transition ${
                    currentPage === 1
                      ? "border-gray-300 text-gray-300 cursor-not-allowed"
                      : "border-[#30B33D] text-[#30B33D] hover:bg-[#30B33D] hover:text-white"
                  }`}
                >
                  <FiChevronLeft />
                </button>

                <span className="px-4 py-1.5 rounded bg-[#30B33D] text-white text-sm font-semibold">
                  {currentPage}
                </span>

                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded border transition ${
                    currentPage === totalPages
                      ? "border-gray-300 text-gray-300 cursor-not-allowed"
                      : "border-[#30B33D] text-[#30B33D] hover:bg-[#30B33D] hover:text-white"
                  }`}
                >
                  <FiChevronRight />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}