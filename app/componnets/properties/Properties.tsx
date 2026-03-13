import React, { useState, useEffect } from "react";
import WarningModal from "../shared/WarningModal";
import SuccessModal from "../shared/SuccessModal";
import { useRouter } from "next/navigation";
import {
  FiChevronLeft,
  FiChevronRight,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";
import SvgIcon from "../shared/SvgIcon";
import { fetchPropertyList } from "../../lib/api-client";
import { Property } from "../../types/api";

// Extend Property type to include all API response fields used in the table
type PropertyWithSerial = Property & {
  serialNo?: number;
  propertyTag?: string;
  possessionType?: string;
  streetNo?: string;
  plotNo?: number;
  plot?: string;
};

/* ================= TYPES ================= */



/* ================= COMPONENT ================= */

const Properties = () => {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<"Active Properties" | "in-Active Properties">("Active Properties");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [properties, setProperties] = useState<PropertyWithSerial[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  // Action handlers for edit/delete
  const handleEdit = (item: PropertyWithSerial) => {
    // Store the property ID in localStorage for the add form to pick up
    localStorage.setItem('editPropertyData', JSON.stringify({ id: item.id }));
    router.push('/properties/add-property');
  };


  // Delete dialog state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<PropertyWithSerial | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleDelete = (item: PropertyWithSerial) => {
    setItemToDelete(item);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    try {
      setLoading(true);
      const token = localStorage.getItem('accessToken') || localStorage.getItem('authToken') || '';
      const authHeader = token ? `Bearer ${token}` : '';
      const response = await fetch('https://dfpwebp.dhakarachi.org/api/smartdha/residenceproperty/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(authHeader ? { Authorization: authHeader } : {}),
        },
        body: JSON.stringify({ id: itemToDelete.id }),
      });
      const text = await response.text();
      let result;
      try {
        result = JSON.parse(text);
      } catch {
        result = { message: text };
      }
        const succeeded = result.succeeded || (result.data && result.data.success);
        if (succeeded) {
          const msg = (result.data && result.data.message) || result.message || 'Property deleted successfully!';
          setSuccessMessage(msg);
          setShowSuccessModal(true);
          // Refresh list
          setProperties((prev) => prev.filter((p) => p.id !== itemToDelete.id));
          setTotalRecords((prev) => Math.max(0, prev - 1));
        } else {
          setError(((result.data && result.data.message) || result.message || '') + ' Failed to delete property.');
          // Optionally keep a console log for debugging, but not in UI
          // console.error('Delete property API response:', text);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to delete property');
      // eslint-disable-next-line no-console
      console.error('Delete property error:', err);
    } finally {
      setShowDeleteModal(false);
      setItemToDelete(null);
      setLoading(false);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setItemToDelete(null);
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
  };
      {/* Delete Confirmation Modal */}
      <WarningModal
        isOpen={showDeleteModal}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        title="Delete Property"
        message={`Are you sure you want to delete property ${itemToDelete?.propertyTag || itemToDelete?.id || ''}? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
      />

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleSuccessModalClose}
        title="Delete Successful"
        message={successMessage}
      />

  // Fetch properties from API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const isActive = activeTab === "Active Properties";
        const res = await fetchPropertyList({
          isActive,
          pageNumber: currentPage,
          pageSize: rowsPerPage,
        });
        // API returns { data: { items: Property[], totalCount: number, ... }, ... }
        if (Array.isArray(res.data?.items) && res.data.items.length > 0) {
          setProperties(res.data.items);
          setTotalRecords(res.data?.totalCount || 0);
        } else {
          setProperties([]);
          setTotalRecords(0);
        }
      } catch (err: any) {
        setProperties([]);
        setTotalRecords(0);
        setError(err.message || "Failed to fetch properties");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [activeTab, currentPage, rowsPerPage]);



  /* ================= PAGINATION ================= */


  const totalPages = Math.ceil(totalRecords / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + properties.length;
  const paginatedData = properties;

  /* ================= ROW COLOR ================= */

  const rowStyle = (index: number) =>
    index % 2 !== 0
      ? "bg-[#F4FFF1]"
      : "bg-white";


  // Helper to show '-' for null/undefined or 0 if API returns null
  const displayValue = (value: any) => {
    if (value === null || value === undefined || value==0) return "-";
    return value;
  };

  /* ================= RENDER ================= */

  return (
    <div className="w-full">
      {/* Delete Confirmation Modal */}
      <WarningModal
        isOpen={showDeleteModal}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        title="Delete Property"
        message={`Are you sure you want to delete property ${itemToDelete?.propertyTag || itemToDelete?.id || ''}? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
      />

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleSuccessModalClose}
        title="Delete Successful"
        message={successMessage}
      />

      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">{error}</div>
      )}
      {loading && (
        <div className="text-center py-8 text-gray-500">Loading properties...</div>
      )}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => router.push("/properties/add-property")}
          className="bg-gradient-to-t from-[rgba(48,179,61,0.7)] to-[rgba(48,179,61,1)] 
                     text-white text-sm font-semibold px-4 py-2 rounded-xl
                     hover:from-[rgba(48,179,61,0.7)] hover:to-[rgba(48,179,61,1)] 
                     transition w-[150px] h-[35px] text-center"
        >
          Tag New Property
        </button>
      </div>

      {/* ================= TABS ================= */}
      <div className="flex w-full border-b-2 border-gray-200">
        <button
          onClick={() => {
            setActiveTab("Active Properties");
            setCurrentPage(1);
          }}
          className={`flex-1 py-2.5 font-semibold rounded-tr-none rounded-tl-xl ${
            activeTab === "Active Properties"
              ? "bg-white text-[#30B33D] shadow-[0_-2px_8px_rgba(0,0,0,0.08)]"
              : "bg-gray-100 text-gray-500 shadow-[inset_0_4px_8px_rgba(225,227,238,0.95)] hover:text-[#30B33D]/70 hover:shadow-[inset_0_2px_4px_rgba(225,227,238,0.5)] hover:border-[#30B33D]/20"
          }`}
        >
          Active Properties
        </button>

        <button
          onClick={() => {
            setActiveTab("in-Active Properties");
            setCurrentPage(1);
          }}
          className={`flex-1 py-2.5 font-semibold rounded-tr-xl rounded-tl-none ${
            activeTab === "in-Active Properties"
              ? "bg-white text-[#30B33D] shadow-[0_-2px_8px_rgba(0,0,0,0.08)]"
              : "bg-gray-100 text-gray-500 shadow-[inset_0_4px_8px_rgba(225,227,238,0.95)] hover:text-[#30B33D]/70 hover:shadow-[inset_0_2px_4px_rgba(225,227,238,0.5)] hover:border-[#30B33D]/20"
          }`}
        >
          In-Active Properties
        </button>
      </div>

      {/* ================= TABLE ================= */}
      <div className="bg-white border border-gray-200 rounded-bl-xl rounded-br-xl overflow-hidden">
        {/* Header */}
        <div className="px-4 py-3 flex justify-between items-center">
          <div>
            <h2 className="text-sm font-semibold">
              {activeTab === "Active Properties"
                ? "Active Properties"
                : "In-Active Properties"}
            </h2>
            <p className="text-xs text-gray-500">
              {totalRecords} total records
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
        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <table className="min-w-full" style={{ minWidth: '1200px' }}>
            <thead className="bg-gray-50 text-xs">
              <tr>
                <>
                  <th className="px-4 py-3 text-left font-bold text-gray-900" style={{ width: '100px' }}>Serial No</th>
                  <th className="px-4 py-3 text-left font-bold text-gray-900" style={{ width: '120px' }}>Property Tag</th>
                  <th className="px-4 py-3 text-left font-bold text-gray-900" style={{ width: '120px' }}>Category</th>
                  <th className="px-4 py-3 text-left font-bold text-gray-900" style={{ width: '120px' }}>Type</th>
                  <th className="px-4 py-3 text-left font-bold text-gray-900" style={{ width: '120px' }}>Possession Type</th>
                  <th className="px-4 py-3 text-left font-bold text-gray-900" style={{ width: '120px' }}>Phase</th>
                  <th className="px-4 py-3 text-left font-bold text-gray-900" style={{ width: '120px' }}>Zone</th>
                  <th className="px-4 py-3 text-left font-bold text-gray-900" style={{ width: '120px' }}>Street No</th>
                  <th className="px-4 py-3 text-left font-bold text-gray-900" style={{ width: '120px' }}>Plot No</th>
                  <th className="px-4 py-3 text-left font-bold text-gray-900" style={{ width: '120px' }}>Plot</th>
                  <th className="px-4 py-3 text-left font-bold text-gray-900" style={{ width: '120px' }}>Khayaban</th>
                  <th className="px-4 py-3 text-left font-bold text-gray-900" style={{ width: '100px' }}>Floor</th>
                  <th className="px-4 py-3 text-center font-bold text-gray-900" style={{ width: '100px' }}>Action</th>
                </>
              </tr>
            </thead>

            <tbody>
              {paginatedData.length === 0 && !loading ? (
                <tr>
                  <td colSpan={12} className="text-center py-8 text-gray-400">No properties found.</td>
                </tr>
              ) : (
                paginatedData.map((item, index) => (
                  <tr
                    key={item.id}
                    className={`${rowStyle(index)} hover:bg-gray-50`}
                  >
                    <td className="px-4 py-3 text-sm">{displayValue(item.serialNo)}</td>
                    <td className="px-4 py-3 text-sm">{displayValue(item.propertyTag)}</td>
                    <td className="px-4 py-3 text-sm">{displayValue(item.category)}</td>
                    <td className="px-4 py-3 text-sm">{displayValue(item.type)}</td>
                    <td className="px-4 py-3 text-sm">{displayValue(item.possessionType)}</td>
                    <td className="px-4 py-3 text-sm">{displayValue(item.phase)}</td>
                    <td className="px-4 py-3 text-sm">{displayValue(item.zone)}</td>
                    <td className="px-4 py-3 text-sm">{displayValue(item.streetNo)}</td>
                    <td className="px-4 py-3 text-sm">{displayValue(item.plotNo)}</td>
                    <td className="px-4 py-3 text-sm">{displayValue(item.plot)}</td>
                    <td className="px-4 py-3 text-sm">{displayValue(item.khayaban)}</td>
                    <td className="px-4 py-3 text-sm">{displayValue(item.floor)}</td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() => handleEdit(item)}
                          className="w-8 h-8 p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200 flex items-center justify-center"
                        >
                          <SvgIcon name="Edit-Icon" size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(item)}
                          className="w-8 h-8 p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 flex items-center justify-center"
                        >
                          <SvgIcon name="delete-icon" size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ================= GREEN PAGINATION ================= */}
        <div className="px-4 py-3 border-t flex justify-between items-center">
          <div className="text-xs text-gray-600">
            Showing {totalRecords === 0 ? 0 : startIndex + 1} to {Math.min(endIndex, totalRecords)} of {totalRecords}
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

export default Properties;
