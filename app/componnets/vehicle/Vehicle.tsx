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
  name: string;
  relation: string;
  phone: string;
  dob: string;
  cnic: string;
  residentCard: string;
};

type CommercialType = {
  id: number;
  companyName: string;
  ownerName: string;
  phone: string;
  cnic: string;
  officeNo: string;
};

/* ================= COMPONENT ================= */

const Resident = () => {
  const [activeTab, setActiveTab] = useState<
    "commercial" | "resident"
  >("commercial");

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
   const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  /* ================= LARGE DUMMY DATA ================= */

  const dummyResidents: ResidentType[] = Array.from(
    { length: 45 },
    (_, i) => ({
      id: i + 1,
      name: `Resident ${i + 1}`,
      relation:
        i % 3 === 0 ? "Son" : i % 3 === 1 ? "Daughter" : "Spouse",
      phone: `0301-2346${(10 + i)
        .toString()
        .padStart(2, "0")}`,
      dob: `0${(i % 9) + 1}-0${(i % 11) + 1}-199${i % 10}`,
      cnic: `35201-12345${i
        .toString()
        .padStart(2, "0")}-1`,
      residentCard: `UID-92786453${1000 + i}`,
    })
  );

  const dummyCommercial: CommercialType[] = Array.from(
    { length: 32 },
    (_, i) => ({
      id: i + 1,
      companyName: `Company ${i + 1}`,
      ownerName: `Owner ${i + 1}`,
      phone: `0300-5678${(10 + i)
        .toString()
        .padStart(2, "0")}`,
      cnic: `42101-76543${i
        .toString()
        .padStart(2, "0")}-1`,
      officeNo: `Office ${100 + i}`,
    })
  );

  /* ================= PAGINATION ================= */

  const activeData =
    activeTab === "resident"
      ? dummyResidents
      : dummyCommercial;

  const totalPages = Math.ceil(
    activeData.length / rowsPerPage
  );

  const startIndex =
    (currentPage - 1) * rowsPerPage;

  const endIndex = startIndex + rowsPerPage;

  const paginatedData = activeData.slice(
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
          onClick={() => setIsAddModalOpen(true)}
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

        {/* Table Body */}
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50 text-xs uppercase">
              <tr>
                {activeTab === "resident" ? (
                  <>
                    <th className="px-4 py-3 text-left">Name</th>
                    <th className="px-4 py-3 text-left">Relation</th>
                    <th className="px-4 py-3 text-left">Phone</th>
                    <th className="px-4 py-3 text-left">DOB</th>
                    <th className="px-4 py-3 text-left">CNIC</th>
                    <th className="px-4 py-3 text-left">Resident Card</th>
                    <th className="px-4 py-3 text-center">Action</th>
                  </>
                ) : (
                  <>
                    <th className="px-4 py-3 text-left">Company Name</th>
                    <th className="px-4 py-3 text-left">Owner Name</th>
                    <th className="px-4 py-3 text-left">Phone</th>
                    <th className="px-4 py-3 text-left">CNIC</th>
                    <th className="px-4 py-3 text-left">Office No.</th>
                    <th className="px-4 py-3 text-center">Action</th>
                  </>
                )}
              </tr>
            </thead>

            <tbody>
              {paginatedData.map((item, index) => (
                <tr
                  key={item.id}
                  className={`${rowStyle(index)} hover:bg-gray-50`}
                >
                  {activeTab === "resident" ? (
                    <>
                      <td className="px-4 py-3 text-sm">
                        {(item as ResidentType).name}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {(item as ResidentType).relation}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {item.phone}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {(item as ResidentType).dob}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {item.cnic}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {(item as ResidentType).residentCard}
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-4 py-3 text-sm">
                        {(item as CommercialType).companyName}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {(item as CommercialType).ownerName}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {item.phone}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {item.cnic}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {(item as CommercialType).officeNo}
                      </td>
                    </>
                  )}

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
            {Math.min(endIndex, activeData.length)} of{" "}
            {activeData.length}
          </div>

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
              {currentPage} / {totalPages}
            </span>

            <button
              onClick={() =>
                setCurrentPage((p) =>
                  Math.min(totalPages, p + 1)
                )
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
      </div>
    </div>
  );
};

export default Resident;