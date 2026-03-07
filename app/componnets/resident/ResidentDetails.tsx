"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FiArrowLeft, FiEdit, FiTrash2, FiUser, FiMail, FiPhone, FiMapPin, FiFile, FiImage } from "react-icons/fi";

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

const ResidentDetails: React.FC<{ residentId: string }> = ({ residentId }) => {
  const router = useRouter();
  const [resident, setResident] = useState<ResidentType | CommercialType | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAllMembers, setShowAllMembers] = useState(false);
  const [showAllVehicles, setShowAllVehicles] = useState(false);
  const [showAllWorkers, setShowAllWorkers] = useState(false);
  const [showAllVisitors, setShowAllVisitors] = useState(false);

  // Generate mock data based on ID
  useEffect(() => {
    const generateMockData = () => {
      const id = parseInt(residentId);
      const isResident = id <= 45; // First 45 are residents
      
      if (isResident) {
        const residentData: ResidentType = {
          id,
          fullName: `Resident ${id}`,
          emailAddress: `resident${id}@example.com`,
          password: "password123",
          cellNumber: `0301-2346${(10 + id).toString().padStart(2, "0")}`,
          category: id % 2 === 0 ? "Resident" : "Commercial",
          subCategory: id % 3 === 0 ? "Owner" : id % 3 === 1 ? "Tenant" : "Family Member",
          phase: `Phase ${((id % 8) + 1)}`,
          zone: `Zone ${((id % 4) + 1)}`,
          khayaban: `Khayaban ${String.fromCharCode(65 + (id % 26))}`,
          floor: id % 10 === 0 ? undefined : `${(id % 10) + 1}`,
          laneStreetNo: `Lane ${(id % 20) + 1}`,
          plotNoNumeric: `${((id % 100) + 1)}`,
          plotNoAlphabetic: String.fromCharCode(65 + (id % 26)),
          plotNoAlphaNumeric: id % 3 === 0 ? undefined : `${(id % 10)}-${String.fromCharCode(65 + (id % 26))}`,
          profilePicture: null,
          proofOfPossession: null,
          utilityBill: null,
        };
        setResident(residentData);
      } else {
        const commercialId = id - 45;
        const commercialData: CommercialType = {
          id,
          fullName: `Com-User ${commercialId}`,
          emailAddress: `commercial${commercialId}@example.com`,
          password: "password123",
          cellNumber: `0300-5678${(10 + commercialId).toString().padStart(2, "0")}`,
          category: "Commercial",
          subCategory: commercialId % 3 === 0 ? "Retail" : commercialId % 3 === 1 ? "Office" : "Service",
          phase: `Phase ${((commercialId % 8) + 1)}`,
          zone: `Zone ${((commercialId % 4) + 1)}`,
          khayaban: `Commercial ${String.fromCharCode(65 + (commercialId % 26))}`,
          floor: commercialId % 10 === 0 ? undefined : `${(commercialId % 10) + 1}`,
          laneStreetNo: `Street ${(commercialId % 20) + 1}`,
          plotNoNumeric: `${((commercialId % 100) + 1)}`,
          plotNoAlphabetic: String.fromCharCode(65 + (commercialId % 26)),
          plotNoAlphaNumeric: commercialId % 3 === 0 ? undefined : `${(commercialId % 10)}-${String.fromCharCode(65 + (commercialId % 26))}`,
          profilePicture: null,
          proofOfPossession: null,
          utilityBill: null,
        };
        setResident(commercialData);
      }
      setLoading(false);
    };

    generateMockData();
  }, [residentId]);

  if (loading) {
    return (
      <div className="w-full p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-1/3 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-300 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!resident) {
    return (
      <div className="w-full p-6">
        <div className="text-center py-8">
          <p className="text-gray-500">Resident not found</p>
        </div>
      </div>
    );
  }

  const isResident = 'category' in resident && resident.category !== "Commercial";

  return (
    <div className="w-full p-6">
      <div className="w-full max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-lg bg-white text-gray-600 hover:bg-gray-50 transition"
          >
            <FiArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Family Details</h1>
          </div>
        </div>

        {/* Family Members Table */}
        <div id="family-details">
        <div className="flex justify-between items-center py-3 border-b border-gray-200">
            <h2 className="text-sm font-semibold text-gray-900">Family Details</h2>
            <button 
              onClick={() => setShowAllMembers(!showAllMembers)}
              className="text-sm text-[#30B33D] hover:text-[#28a035] font-medium"
            >
              {showAllMembers ? "Collapse" : "See More"}
            </button>
          </div>
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-900">Name</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-900">Relation</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-900">Phone</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-900">DOB</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-900">CNIC / nICOP No.</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-900">Resident Card No.</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(showAllMembers ? 10 : 3)].map((_, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {index === 0 ? "Shahid Hussain" : `Family Member ${index + 1}`}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {index === 0 ? "Son" : "Relation"}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {index === 0 ? "0301-2345678" : "Phone"}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {index === 0 ? "21/07/2001" : "DOB"}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {index === 0 ? "12345-1234567-1" : "CNIC"}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {index === 0 ? "UID-9278645300001192" : "Resident Card"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>

        {/* Vehicle Details */}
        <div id="vehicle-details" className="mt-6">
          <div className="flex justify-between items-center py-3 border-b border-gray-200">
            <h2 className="text-sm font-semibold text-gray-900">Vehicle</h2>
            <button 
              onClick={() => setShowAllVehicles(!showAllVehicles)}
              className="text-sm text-[#30B33D] hover:text-[#28a035] font-medium"
            >
              {showAllVehicles ? "Collapse" : "See More"}
            </button>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-900">State/Provided License Plate</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-900">Vehicle E-Tag ID</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-900">Ownership</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-900">Make</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-900">Model</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-900">Year</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-900">Color</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-900">Status</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(showAllVehicles ? 5 : 2)].map((_, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {index === 0 ? "ABC-123" : index === 1 ? "XYZ-456" : "Plate No."}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {index === 0 ? "ETAG-001" : index === 1 ? "ETAG-002" : "E-Tag ID"}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {index === 0 ? "Shahid Hussain" : index === 1 ? "Ahmed Ali" : "Owner Name"}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {index === 0 ? "Toyota" : index === 1 ? "Honda" : "Make"}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {index === 0 ? "Corolla" : index === 1 ? "CBR" : "Model"}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {index === 0 ? "2022" : index === 1 ? "2021" : "Year"}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {index === 0 ? "White" : index === 1 ? "Black" : "Color"}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        index === 0 
                          ? "bg-green-100 text-green-800" 
                          : index === 1 
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                      }`}>
                        {index === 0 ? "Active" : index === 1 ? "Inactive" : "Status"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Workers Details */}
        <div id="workers-details" className="mt-6">
          <div className="flex justify-between items-center py-3 border-b border-gray-200">
            <h2 className="text-sm font-semibold text-gray-900">Workers</h2>
            <button 
              onClick={() => setShowAllWorkers(!showAllWorkers)}
              className="text-sm text-[#30B33D] hover:text-[#28a035] font-medium"
            >
              {showAllWorkers ? "Collapse" : "See More"}
            </button>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-900">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-900">Job Type</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-900">Phone</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-900">DOB</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-900">CNIC/nICOP No.</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-900">Worker Card No.</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-900">Police Verification</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(showAllWorkers ? 5 : 2)].map((_, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {index === 0 ? "Muhammad Ali" : index === 1 ? "Ahmed Khan" : "Worker Name"}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {index === 0 ? "House Helper" : index === 1 ? "Driver" : "Job Type"}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {index === 0 ? "0321-9876543" : index === 1 ? "0345-1234567" : "Phone"}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {index === 0 ? "15/03/1990" : index === 1 ? "22/07/1985" : "DOB"}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {index === 0 ? "34567-8901234-1" : index === 1 ? "45678-9012345-1" : "CNIC"}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {index === 0 ? "WRK-927864530001" : index === 1 ? "WRK-927864530002" : "Worker Card"}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {index === 0 ? "Yes" : index === 1 ? "No" : "Status"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Visitor Details */}
        <div id="visitor-details" className="mt-6">
          <div className="flex justify-between items-center py-3 border-b border-gray-200">
            <h2 className="text-sm font-semibold text-gray-900">Visitor</h2>
            <button 
              onClick={() => setShowAllVisitors(!showAllVisitors)}
              className="text-sm text-[#30B33D] hover:text-[#28a035] font-medium"
            >
              {showAllVisitors ? "Collapse" : "See More"}
            </button>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-900">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-900">Vehicle Info</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-900">Visit Detail</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-900">Validity</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-900">CNIC No.</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(showAllVisitors ? 5 : 2)].map((_, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {index === 0 ? "John Smith" : index === 1 ? "Sarah Johnson" : "Visitor Name"}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {index === 0 ? "ABC-789" : index === 1 ? "XYZ-456" : "Vehicle Info"}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {index === 0 ? "Business Meeting" : index === 1 ? "Family Visit" : "Visit Detail"}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {index === 0 ? "18/02/2026" : index === 1 ? "20/02/2026" : "Validity"}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {index === 0 ? "56789-0123456-7" : index === 1 ? "67890-1234567-8" : "CNIC"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
       </div>
     </div>
   );
};

export default ResidentDetails;
