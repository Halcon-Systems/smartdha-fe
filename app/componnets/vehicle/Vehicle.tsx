import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";
// import AddResidentForm from "./AddResidentForm";

/* ================= TYPES ================= */

type ResidentType = {
  id: number;
  licensePlate: string;
  eTagId: string;
  ownership: string;
  make: string;
  model: string;
  year: string;
  color: string;
  status: string;
};

/* ================= COMPONENT ================= */

const Resident = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const router = useRouter();

  /* ================= LARGE DUMMY DATA ================= */

  const dummyVehicles: ResidentType[] = Array.from(
    { length: 45 },
    (_, i) => ({
      id: i + 1,
      licensePlate: `ABC-${1000 + i}`,
      eTagId: `ETAG-${5000 + i}`,
      ownership: i % 2 === 0 ? "Owner" : "Tenant",
      make: i % 3 === 0 ? "Toyota" : i % 3 === 1 ? "Honda" : "Suzuki",
      model: i % 3 === 0 ? "Corolla" : i % 3 === 1 ? "Civic" : "Alto",
      year: `${2015 + (i % 10)}`,
      color: i % 3 === 0 ? "White" : i % 3 === 1 ? "Black" : "Silver",
      status: i % 2 === 0 ? "Active" : "Inactive",
    })
  );

  /* ================= PAGINATION ================= */

  const totalPages = Math.ceil(
    dummyVehicles.length / rowsPerPage
  );

  const startIndex =
    (currentPage - 1) * rowsPerPage;

  const endIndex = startIndex + rowsPerPage;

  const paginatedData = dummyVehicles.slice(
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

      {/* <AddResidentForm
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        initialTab={activeTab}
      /> */}


      <div className="flex justify-end mb-6">
        <button
          onClick={() => router.push("/vehicle/add-vehicle")}
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
              Vehicle Records
            </h2>
            <p className="text-xs text-gray-500">
              {dummyVehicles.length} total records
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
                  <th className="px-4 py-3 text-left">State/Provided License Plate</th>
                  <th className="px-4 py-3 text-left">Vehicle E-Tag ID</th>
                  <th className="px-4 py-3 text-left">Ownership</th>
                  <th className="px-4 py-3 text-left">Make</th>
                  <th className="px-4 py-3 text-left">Model</th>
                  <th className="px-4 py-3 text-left">Year</th>
                  <th className="px-4 py-3 text-center">Color</th>
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
                    {(item as ResidentType).licensePlate}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {(item as ResidentType).eTagId}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {item.ownership}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {(item as ResidentType).make}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {item.model}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {(item as ResidentType).year}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {(item as ResidentType).color}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {(item as ResidentType).status}
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
            {Math.min(endIndex, dummyVehicles.length)} of{" "}
            {dummyVehicles.length}
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

export default Resident;