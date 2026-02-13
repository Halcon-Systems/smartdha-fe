import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";
// import AddWorkerForm from "./AddWorkerForm";

/* ================= TYPES ================= */

type WorkerType = {
  id: number;
  name: string;
  workerId: string;
  department: string;
  designation: string;
  phone: string;
  cnic: string;
  shift: string;
  status: string;
};

/* ================= COMPONENT ================= */

const Worker = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const router = useRouter();

  /* ================= LARGE DUMMY DATA ================= */

  const dummyWorkers: WorkerType[] = Array.from(
    { length: 45 },
    (_, i) => ({
      id: i + 1,
      name: `Worker ${i + 1}`,
      workerId: `WRK-${1000 + i}`,
      department: i % 3 === 0 ? "Security" : i % 3 === 1 ? "Maintenance" : "Housekeeping",
      designation: i % 3 === 0 ? "Guard" : i % 3 === 1 ? "Technician" : "Cleaner",
      phone: `0300-123${(100 + i).toString().padStart(3, "0")}`,
      cnic: `35201-12345${i.toString().padStart(3, "0")}-${(i % 9) + 1}`,
      shift: i % 3 === 0 ? "Morning" : i % 3 === 1 ? "Evening" : "Night",
      status: i % 4 === 0 ? "Inactive" : "Active",
    })
  );

  /* ================= PAGINATION ================= */

  const totalPages = Math.ceil(
    dummyWorkers.length / rowsPerPage
  );

  const startIndex =
    (currentPage - 1) * rowsPerPage;

  const endIndex = startIndex + rowsPerPage;

  const paginatedData = dummyWorkers.slice(
    startIndex,
    endIndex
  );
  /* ================= ROW COLOR ================= */

  const rowStyle = (index: number) =>
    index % 2 !== 0
      ? "bg-[#F4FFF1]"
      : "bg-white";

  /* ================= RENDER ================= */

  return (
    <div className="w-full">

      {/* <AddWorkerForm
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      /> */}


      <div className="flex justify-end mb-6">
        <button
          onClick={() => router.push("/worker/add-worker")}
          className="bg-gradient-to-t from-[rgba(48,179,61,0.7)] to-[rgba(48,179,61,1)] 
                     text-white text-sm font-semibold px-4 py-2 rounded-xl
                     hover:from-[rgba(48,179,61,0.7)] hover:to-[rgba(48,179,61,1)] 
                     transition w-[150px] h-[35px] text-center"
        >
          Add New
        </button>
      </div>

      {/* ================= TABLE ================= */}

      <div className="bg-white border border-gray-200 rounded-bl-xl rounded-br-xl overflow-hidden">
        {/* Header */}
        <div className="px-4 py-3 flex justify-between items-center">
          <div>
            <h2 className="text-sm font-semibold">
              Worker Records
            </h2>
            <p className="text-xs text-gray-500">
              {dummyWorkers.length} total records
            </p>
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
            <thead className="bg-gray-50 text-xs uppercase">
              <tr>
                <>
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">ID</th>
                  <th className="px-4 py-3 text-left">Department</th>
                  <th className="px-4 py-3 text-left">Designation</th>
                  <th className="px-4 py-3 text-left">Phone</th>
                  <th className="px-4 py-3 text-left">CNIC</th>
                  <th className="px-4 py-3 text-center">Shift</th>
                  <th className="px-4 py-3 text-center">Status</th>
                  <th className="px-4 py-3 text-center">Action</th>
                </>
              </tr>
            </thead>

            <tbody>
              {paginatedData.map((item, index) => (
                <tr
                  key={item.id}
                  className={`${rowStyle(index)} hover:bg-gray-50`}
                >
                  <td className="px-4 py-3 text-sm">
                    {item.name}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {item.workerId}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {item.department}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {item.designation}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {item.phone}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {item.cnic}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {item.shift}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      item.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {item.status}
                </span>
                  </td>
                  

                  <td className="px-4 py-3 text-center">
                    <div className="flex justify-center gap-3">
                      <button className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200">
                        <FiEdit2 size={14} />
                      </button>
                      <button className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200">
                        <FiTrash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ================= GREEN PAGINATION ================= */}

        <div className="px-4 py-3 border-t flex justify-between items-center">
          <div className="text-xs text-gray-600">
            Showing {startIndex + 1} to{" "}
            {Math.min(endIndex, dummyWorkers.length)} of{" "}
            {dummyWorkers.length}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                setCurrentPage((p) => Math.max(1, p - 1))
              }
              disabled={currentPage === 1}
              className={`p-2 rounded border transition ${currentPage === 1
                  ? "border-gray-300 text-gray-300 cursor-not-allowed"
                  : "border-[#30B33D] text-[#30B33D] hover:bg-[#30B33D] hover:text-white"
                }`}
            >
              <FiChevronLeft />
            </button>

            <span className="px-4 py-1.5 rounded bg-[#30B33D] text-white text-sm font-semibold">
              {currentPage} / {totalPages}
            </span>

            <button
              onClick={() =>
                setCurrentPage((p) =>
                  Math.min(totalPages, p + 1)
                )
              }
              disabled={currentPage === totalPages}
              className={`p-2 rounded border transition ${currentPage === totalPages
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

export default Worker;