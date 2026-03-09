import React, { useState, useEffect } from "react";
import {
  FiBook,
  FiChevronLeft,
  FiChevronRight,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";
import AddResidentForm from "./AddResidentPageForm";
import { fetchNonMemberVerificationList } from "../../lib/api-client";
import SvgIcon from "../shared/SvgIcon";
import { useRouter } from "next/navigation";
import EducationalVisitor from "../educational-visitor/EducationalVisitor";
import CommercialEmployee from "../commercial-employee/CommercialEmployee";
import HouseHelpWorker from "../house-help-worker/HouseHelpWorker";
import VisitorComponent from "../visitor/VisitorComponent";
import Others from "../others/Others";

/* ================= TYPES ================= */

type ResidentType = {
  id: number;
  fullName: string;
  emailAddress: string;
  password: string;
  cellNumber: string;

  category: string;
  subCategory?: string;

  phase: string;
  zone: string;
  khayaban: string;
  floor?: string;

  laneStreetNo: string;

  plotNoNumeric?: string;
  plotNoAlphabetic?: string;
  plotNoAlphaNumeric?: string;

  profilePicture?: File | null;
  proofOfPossession?: File | null;
  utilityBill?: File | null;
};

type CommercialType = {
  id: number;
   fullName: string;
  emailAddress: string;
  password: string;
  cellNumber: string;

  category: string;
  subCategory?: string;

  phase: string;
  zone: string;
  khayaban: string;
  floor?: string;

  laneStreetNo: string;

  plotNoNumeric?: string;
  plotNoAlphabetic?: string;
  plotNoAlphaNumeric?: string;

  profilePicture?: File | null;
  proofOfPossession?: File | null;
  utilityBill?: File | null;
};

type MainTabType = "residential-commercial" | "educational-visitor" | "commercial-employee" | "house-help-worker" | "visitor" | "others";
type Tab = "commercial" | "resident";

/* ================= COMPONENT ================= */

const Resident = () => {

  const router = useRouter();

  const [activeMainTab, setActiveMainTab] = useState<MainTabType>("residential-commercial");
  const [activeTab, setActiveTab] = useState<Tab>("commercial");

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
   const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleEdit = (item: ResidentType | CommercialType) => {
    localStorage.setItem("editResidentData", JSON.stringify(item));
    router.push("/residents/add-residents");
  };


  // ================= API DATA & PAGINATION =================
  const [residentData, setResidentData] = useState<ResidentType[]>([]);
  const [commercialData, setCommercialData] = useState<CommercialType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);
    const memberType = activeTab === "resident" ? "Residential" : "Commercial";
    fetchNonMemberVerificationList({
      memberType,
      pageNumber: currentPage,
      pageSize: rowsPerPage,
    })
      .then((data) => {
        if (!isMounted) return;
        // Map API fields to UI fields
        const mapped = (data || []).map((item: any) => ({
          id: item.id,
          fullName: item.name || item.fullName || "",
          emailAddress: item.email || item.emailAddress || "",
          cellNumber: item.phone || item.cellNumber || "",
          category: item.category || "",
          subCategory: item.subcategory || item.subCategory || "",
          phase: item.phase || "",
          zone: item.zone || "",
          khayaban: item.khayaban || "",
          floor: item.floor || "",
          laneStreetNo: item.laneStreetNo || "",
          plotNoNumeric: item.plotNoNumeric || "",
          plotNoAlphabetic: item.plotNoAlphabetic || "",
          plotNoAlphaNumeric: item.plotNoAlphaNumeric || "",
          profilePicture: item.profilePicture || null,
          proofOfPossession: item.proofOfPossession || null,
          utilityBill: item.utilityBill || null,
        }));
        if (activeTab === "resident") {
          setResidentData(mapped);
        } else {
          setCommercialData(mapped);
        }
        setHasNextPage(Array.isArray(data) && data.length === rowsPerPage);
      })
      .catch((err) => {
        if (!isMounted) return;
        setError(err.message || "Failed to fetch data");
        setResidentData([]);
        setCommercialData([]);
        setHasNextPage(false);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, [activeTab, currentPage, rowsPerPage]);

  const paginatedData = activeTab === "resident" ? residentData : commercialData;
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + paginatedData.length;

  /* ================= ROW COLOR ================= */

  const rowStyle = (index: number) =>
    index % 2 !== 0
      ? "bg-[#F4FFF1]"
      : "bg-white";

  /* ================= RENDER ================= */

  return (
    <div className="w-full">
      {/* ================= MAIN LEVEL 1 TABS ================= */}
      <div className="bg-white rounded-lg shadow-sm mb-6">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveMainTab("residential-commercial")}
            className={`px-6 py-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
              activeMainTab === "residential-commercial"
                ? "text-[#30B33D] border-[#30B33D]"
                : "text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Residential/Commercial
          </button>
          
          <button
            onClick={() => setActiveMainTab("educational-visitor")}
            className={`px-6 py-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
              activeMainTab === "educational-visitor"
                ? "text-[#30B33D] border-[#30B33D]"
                : "text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Educational Visitor
          </button>
          
          <button
            onClick={() => setActiveMainTab("commercial-employee")}
            className={`px-6 py-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
              activeMainTab === "commercial-employee"
                ? "text-[#30B33D] border-[#30B33D]"
                : "text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Commercial Employee
          </button>
          
          <button
            onClick={() => setActiveMainTab("house-help-worker")}
            className={`px-6 py-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
              activeMainTab === "house-help-worker"
                ? "text-[#30B33D] border-[#30B33D]"
                : "text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            House-Help Worker
          </button>
          
          <button
            onClick={() => setActiveMainTab("visitor")}
            className={`px-6 py-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
              activeMainTab === "visitor"
                ? "text-[#30B33D] border-[#30B33D]"
                : "text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Visitor
          </button>
          
          <button
            onClick={() => setActiveMainTab("others")}
            className={`px-6 py-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
              activeMainTab === "others"
                ? "text-[#30B33D] border-[#30B33D]"
                : "text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Others
          </button>
        </div>
      </div>

      {/* ================= CONTENT BASED ON MAIN TAB ================= */}
      {activeMainTab === "residential-commercial" ? (
        <div>
          <div className="flex justify-end mb-6">
            <button
              onClick={() => {
                localStorage.removeItem("editResidentData");
                router.push("/residents/add-residents");
              }}
              className="bg-gradient-to-t from-[rgba(48,179,61,0.7)] to-[rgba(48,179,61,1)] 
                       text-white text-sm font-semibold px-4 py-2 rounded-xl
                       hover:from-[rgba(48,179,61,0.7)] hover:to-[rgba(48,179,61,1)] 
                       transition w-[150px] h-[35px] text-center"
            >
              Add New
            </button>
          </div>

          {/* ================= SUB-TABS (Commercial/Residents) ================= */}
          <div className="flex w-full border-b-2 border-gray-200">
            <button
              onClick={() => {
                setActiveTab("commercial");
                setCurrentPage(1);
              }}
              className={`flex-1 py-2.5 font-semibold rounded-tr-none rounded-tl-xl ${
                activeTab === "commercial"
                  ? "bg-white text-[#30B33D] shadow-[0_-2px_8px_rgba(0,0,0,0.08)]"
                  : "bg-gray-100 text-gray-500 shadow-[inset_0_4px_8px_rgba(225,227,238,0.95)] hover:text-[#30B33D]/70 hover:shadow-[inset_0_2px_4px_rgba(225,227,238,0.5)] hover:border-[#30B33D]/20"
              }`}
            >
              Commercial
            </button>

            <button
              onClick={() => {
                setActiveTab("resident");
                setCurrentPage(1);
              }}
              className={`flex-1 py-2.5 font-semibold rounded-tr-xl rounded-tl-none ${
                activeTab === "resident"
                  ? "bg-white text-[#30B33D] shadow-[0_-2px_8px_rgba(0,0,0,0.08)]"
                  : "bg-gray-100 text-gray-500 shadow-[inset_0_4px_8px_rgba(225,227,238,0.95)] hover:text-[#30B33D]/70 hover:shadow-[inset_0_2px_4px_rgba(225,227,238,0.5)] hover:border-[#30B33D]/20"
              }`}
            >
              Residents
            </button>
          </div>

          {/* ================= TABLE ================= */}
          <div className="bg-white border border-gray-200 rounded-bl-xl rounded-br-xl overflow-hidden">
            {/* Header */}
            <div className="px-4 py-3 flex justify-between items-center">
              <div>
                <h2 className="text-sm font-semibold">
                  {activeTab === "resident"
                    ? "Resident List"
                    : "Commercial List"}
                </h2>
                <p className="text-xs text-gray-500">
                  {paginatedData.length} records on this page
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
                <thead className="bg-gray-50 text-xs">
                  <tr>
                    {activeTab === "resident" ? (
                      <>
                        <th className="px-4 py-3 text-left">Full Name</th>
                        <th className="px-4 py-3 text-left">Email Address</th>
                        <th className="px-4 py-3 text-left">Cell Number</th>
                        <th className="px-4 py-3 text-left">Category</th>
                        <th className="px-4 py-3 text-left">Phase</th>
                        <th className="px-4 py-3 text-left">Zone</th>
                        <th className="px-4 py-3 text-left">Khayaban</th>
                        <th className="px-4 py-3 text-center">Action</th>
                      </>
                    ) : (
                      <>
                        <th className="px-4 py-3 text-left">Full Name</th>
                        <th className="px-4 py-3 text-left">Email Address</th>
                        <th className="px-4 py-3 text-left">Cell Number</th>
                        <th className="px-4 py-3 text-left">Category</th>
                        <th className="px-4 py-3 text-left">Phase</th>
                        <th className="px-4 py-3 text-left">Zone</th>
                        <th className="px-4 py-3 text-left">Khayaban</th>
                        <th className="px-4 py-3 text-center">Action</th>
                      </>
                    )}
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
                  ) : paginatedData.map((item, index) => (
                    <tr
                      key={item.id}
                      className={`${rowStyle(index)} hover:bg-gray-50`}
                    >
                      {activeTab === "resident" ? (
                        <>
                          <td className="px-4 py-3 text-sm">
                            {(item as ResidentType).fullName}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {(item as ResidentType).emailAddress}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {(item as ResidentType).cellNumber}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {(item as ResidentType).category}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {(item as ResidentType).phase}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {(item as ResidentType).zone}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {(item as ResidentType).khayaban}
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="px-4 py-3 text-sm">
                            {(item as CommercialType).fullName}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {(item as CommercialType).emailAddress}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {(item as CommercialType).cellNumber}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {(item as CommercialType).category}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {(item as CommercialType).phase}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {(item as CommercialType).zone}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {(item as CommercialType).khayaban}
                          </td>
                        </>
                      )}

                      <td className="px-4 py-3 text-center">
                        <div className="flex justify-center gap-3">
                           <button 
                             onClick={() => router.push(`/residents/${item.id}`)}
                             className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200"
                           >
                                <FiBook size={14} />
                            </button>
                          <button
                            onClick={() => handleEdit(item as ResidentType | CommercialType)}
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

            {/* ================= GREEN PAGINATION ================= */}

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
      ) : activeMainTab === "educational-visitor" ? (
        <EducationalVisitor />
      ) : activeMainTab === "commercial-employee" ? (
        <CommercialEmployee />
      ) : activeMainTab === "house-help-worker" ? (
        <HouseHelpWorker />
      ) : activeMainTab === "visitor" ? (
        <VisitorComponent />
      ) : (
        <Others />
      )}
    </div>
  );
};

export default Resident;
