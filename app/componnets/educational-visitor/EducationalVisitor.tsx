
"use client";
import { useRouter } from "next/navigation";

import React, { useState, useEffect } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import SvgIcon from "../shared/SvgIcon";
import { fetchNonMemberVerificationList } from "../../lib/api-client";

interface EducationalVisitorType {
  id: string;
  name: string;
  email: string;
  phone: string;
  subcategory: string;
  institute: string;
  vehicleInfo: string;
}

const EducationalVisitor: React.FC = () => {
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [visitors, setVisitors] = useState<EducationalVisitorType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasNextPage, setHasNextPage] = useState(false);

  const handleEdit = (visitor: EducationalVisitorType) => {
    localStorage.setItem("editEducationalVisitorData", JSON.stringify(visitor));
    router.push("/residents/add-educational-visitor");
  };


  // Fetch educational visitors from API
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);
    fetchNonMemberVerificationList({
      memberType: "Educational Visitor",
      pageNumber: currentPage,
      pageSize: rowsPerPage,
    })
      .then((data) => {
        if (!isMounted) return;
        setVisitors(data || []);
        setHasNextPage(Array.isArray(data) && data.length === rowsPerPage);
      })
      .catch((err) => {
        if (!isMounted) return;
        setError(err.message || "Failed to fetch educational visitors");
        setVisitors([]);
        setHasNextPage(false);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, [currentPage, rowsPerPage]);


  // Since backend doesn't return total, we only know if there's a next page if we get a full page of results
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + visitors.length;
  const paginatedData = visitors;

  const rowStyle = (index: number) =>
    index % 2 !== 0 ? "bg-[#F4FFF1]" : "bg-white";

  return (
    <div>
      <div className="flex justify-end mb-6">
        <button
          onClick={() => {
            localStorage.removeItem("editEducationalVisitorData");
            router.push("/residents/add-educational-visitor");
          }}
          className="bg-gradient-to-t from-[rgba(48,179,61,0.7)] to-[rgba(48,179,61,1)] 
                   text-white text-sm font-semibold px-4 py-2 rounded-xl
                   hover:from-[rgba(48,179,61,0.7)] hover:to-[rgba(48,179,61,1)] 
                   transition w-[150px] h-[35px] text-center"
        >
          Add New
        </button>
      </div>

      {/* Educational Visitor Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        {/* Header */}
        <div className="px-4 py-3 flex justify-between items-center">
          <div>
            <h2 className="text-sm font-semibold">Educational Visitor List</h2>
            <p className="text-xs text-gray-500">{visitors.length} total records</p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs">Show:</span>
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

        {/* Table Body */}
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50 text-xs">
              <tr>
                <th className="px-4 py-3 text-left">#</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Phone</th>
                <th className="px-4 py-3 text-left">Sub Category</th>
                <th className="px-4 py-3 text-left">Institute</th>
                <th className="px-4 py-3 text-left">Vehicle Info</th>
                <th className="px-4 py-3 text-center">Action</th>
              
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={8} className="text-center py-6 text-gray-500">Loading...</td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={8} className="text-center py-6 text-red-500">{error}</td>
                </tr>
              ) : paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-6 text-gray-400">No records found.</td>
                </tr>
              ) : paginatedData.map((visitor, index) => (
                <tr
                  key={visitor.id}
                  className={`${rowStyle(index)} hover:bg-gray-50`}
                >
                  <td className="px-4 py-3 text-sm">{startIndex + index + 1}</td>
                  <td className="px-4 py-3 text-sm">{visitor.name}</td>
                  <td className="px-4 py-3 text-sm">{visitor.email}</td>
                  <td className="px-4 py-3 text-sm">{visitor.phone}</td>
                  <td className="px-4 py-3 text-sm">{visitor.subcategory}</td>
                  <td className="px-4 py-3 text-sm">{visitor.institute}</td>
                  <td className="px-4 py-3 text-sm">{visitor.vehicleInfo}</td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => handleEdit(visitor)}
                        className="w-8 h-8 p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200 flex items-center justify-center"
                      >
                        <SvgIcon name="Edit-Icon" size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-4 py-3 border-t flex justify-between items-center">
          <div className="text-xs text-gray-600">
            Showing {startIndex + 1} to {endIndex} (page {currentPage})
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1 || loading}
              className={`p-2 rounded border transition ${
                currentPage === 1 || loading
                  ? "border-gray-300 text-gray-300 cursor-not-allowed"
                  : "border-[#30B33D] text-[#30B33D] hover:bg-[#30B33D] hover:text-white"
              }`}
            >
              <FiChevronLeft />
            </button>

            <span className="px-4 py-1.5 rounded bg-[#30B33D] text-white text-sm font-semibold">
              Page {currentPage}
            </span>

            <button
              onClick={() => setCurrentPage((p) => p + 1)}
              disabled={!hasNextPage || loading}
              className={`p-2 rounded border transition ${
                !hasNextPage || loading
                  ? "border-gray-300 text-gray-300 cursor-not-allowed"
                  : "border-[#30B33D] text-[#30B33D] hover:bg-[#30B33D] hover:text-white"
              }`}
            >
              <FiChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationalVisitor;
