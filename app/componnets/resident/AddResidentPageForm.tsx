"use client";

import React, { useState } from "react";

type Tab = "resident" | "commercial";

type FormData = {
  selectType: string;
  searchQuery: string;
  relation: string;
  fullName: string;
  fatherName: string;
  dob: string;
  cellNumber: string;
  cnic: string;
  companyName: string;
  ownerName: string;
  commercialPhone: string;
  commercialCnic: string;
  officeNo: string;
  ntntax: string;
  businessType: string;
};

const AddResidentPageForm: React.FC<{
  initialTab?: Tab;
}> = ({
  initialTab = "resident",
}) => {
  const [activeTab, setActiveTab] = useState<Tab>(initialTab);
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const [typeDropdownOpen, setTypeDropdownOpen] = useState<boolean>(false);
  const [relationDropdownOpen, setRelationDropdownOpen] = useState<boolean>(false);

  const [formData, setFormData] = useState<FormData>({
    selectType: "Resident/Commercial",
    searchQuery: "",
    relation: "",
    fullName: "",
    fatherName: "",
    dob: "",
    cellNumber: "",
    cnic: "",
    companyName: "",
    ownerName: "",
    commercialPhone: "",
    commercialCnic: "",
    officeNo: "",
    ntntax: "",
    businessType: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfilePicture(file);
      const reader = new FileReader();
      reader.onloadend = () => setProfilePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // Handle form submission here
  };

  const relations: string[] = [
    "Spouse", "Son", "Daughter", "Brother", "Mother", "Father", "Sister",
  ];

  const businessTypes: string[] = [
    "Retail", "Office", "Restaurant", "Medical", "Education", "Other",
  ];

  // Reusable field box
  const FieldBox = ({ children }: { children: React.ReactNode }) => (
    <div className="bg-white border border-gray-200 rounded-xl px-4 py-3 relative">
      {children}
    </div>
  );

  // Reusable label
  const FieldLabel = ({
    text,
    required = false,
    green = true,
  }: {
    text: string;
    required?: boolean;
    green?: boolean;
  }) => (
    <label className={`block text-xs font-semibold mb-1.5 ${green ? "text-[#30B33D]" : "text-gray-700"}`}>
      {text} {required && <span className="text-red-500">*</span>}
    </label>
  );

  // Reusable input
  const TextInput = ({
    name,
    value,
    placeholder,
    type = "text",
    required = false,
  }: {
    name: keyof FormData;
    value: string;
    placeholder: string;
    type?: string;
    required?: boolean;
  }) => (
    <input
      type={type}
      name={name}
      value={value}
      onChange={handleInputChange}
      placeholder={placeholder}
      required={required}
      className="w-full text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent"
    />
  );

  return (
    <div className="w-full bg-[#F9FAFB] shadow-[0_0_15px_rgba(0,0,0,0.25)] rounded-lg p-6">
      <div className="w-full max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-6">
          <p className="text-lg font-semibold text-black">Please provide details below!</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>

          {/* Row 1: Select Type + Search */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">

            {/* Select Type */}
            <FieldBox>
              <FieldLabel text="Select Type" required />
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setTypeDropdownOpen(!typeDropdownOpen)}
              >
                <span className="text-sm text-gray-500">Resident/Commercial</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
              {typeDropdownOpen && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg z-10 mt-1 shadow-lg">
                  {(["Resident", "Commercial"] as const).map((type) => (
                    <div
                      key={type}
                      className="px-4 py-2.5 text-sm text-gray-700 cursor-pointer hover:bg-green-50"
                      onClick={() => {
                        setActiveTab(type.toLowerCase() as Tab);
                        setTypeDropdownOpen(false);
                      }}
                    >
                      {type}
                    </div>
                  ))}
                </div>
              )}
            </FieldBox>

            {/* Search */}
            <FieldBox>
              <FieldLabel text="Search (if already registered)" />
              <div className="flex justify-between items-center gap-2">
                <input
                  type="text"
                  name="searchQuery"
                  value={formData.searchQuery}
                  onChange={handleInputChange}
                  placeholder="Type Membership No. / CNIC / Reg. Cell No."
                  className="flex-1 text-xs text-gray-400 placeholder-gray-400 outline-none bg-transparent"
                />
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" className="shrink-0">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            </FieldBox>
          </div>

          {/* ── RESIDENT FIELDS ── */}
          {activeTab === "resident" ? (
            <>
              {/* Row 2: Relation + Full Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <FieldBox>
                  <FieldLabel text="Select Relation" required />
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => setRelationDropdownOpen(!relationDropdownOpen)}
                  >
                    <span className={`text-sm ${formData.relation ? "text-gray-700" : "text-gray-400"}`}>
                      {formData.relation || "Spouse, Son, Daughter, Brother, Mother, ..."}
                    </span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                  {relationDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg z-10 mt-1 shadow-lg">
                      {relations.map((rel) => (
                        <div
                          key={rel}
                          className="px-4 py-2.5 text-sm text-gray-700 cursor-pointer hover:bg-green-50"
                          onClick={() => {
                            setFormData((p) => ({ ...p, relation: rel }));
                            setRelationDropdownOpen(false);
                          }}
                        >
                          {rel}
                        </div>
                      ))}
                    </div>
                  )}
                </FieldBox>

                <FieldBox>
                  <FieldLabel text="Full Name" required />
                  <TextInput name="fullName" value={formData.fullName} placeholder="Full Name here" required />
                </FieldBox>
              </div>

              {/* Row 3: Father Name + DOB */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <FieldBox>
                  <FieldLabel text="Father / Husband Name" required />
                  <TextInput name="fatherName" value={formData.fatherName} placeholder="Full Name here" required />
                </FieldBox>

                <FieldBox>
                  <FieldLabel text="Date of Birth (DOB)" required />
                  <div className="flex items-center justify-between gap-2">
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleInputChange}
                      required
                      className={`flex-1 text-sm outline-none bg-transparent ${formData.dob ? "text-gray-700" : "text-gray-400"}`}
                    />
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#30B33D" strokeWidth="2" className="shrink-0">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                  </div>
                </FieldBox>
              </div>

              {/* Row 4: Cell Number + CNIC */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <FieldBox>
                  <FieldLabel text="Add Cell Number" required />
                  <TextInput name="cellNumber" value={formData.cellNumber} placeholder="0300-1234567" type="tel" required />
                </FieldBox>

                <FieldBox>
                  <FieldLabel text="CNIC / NICOP No." />
                  <TextInput name="cnic" value={formData.cnic} placeholder="(12345-1234567-1)" />
                </FieldBox>
              </div>

              {/* Profile Picture */}
              <div className="relative mb-6">
                <div className="bg-white border-2 border-dashed border-[#60b8d4] rounded-xl px-4 py-3 flex items-center justify-between min-h-[80px]">

                  {/* Left side */}
                  <div className="flex-1">
                    {/* Label row: "Profile Picture * +" */}
                    <div className="flex items-center gap-1.5 mb-2">
                      <span className="text-xs font-semibold text-[#30B33D]">Profile Picture</span>
                      <span className="text-xs font-semibold text-red-500">*</span>
                      <label
                        htmlFor="profileUpload"
                        className="flex items-center justify-center w-5 h-5 bg-[#30B33D] rounded-full cursor-pointer shrink-0 ml-0.5"
                      >
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5">
                          <line x1="12" y1="5" x2="12" y2="19" />
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                        <input
                          id="profileUpload"
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </label>
                    </div>

                    {/* Add Picture */}
                    <label
                      htmlFor="profileUpload2"
                      className="inline-flex items-center gap-1.5 cursor-pointer text-sm text-gray-700"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2">
                        <polyline points="16 16 12 12 8 16" />
                        <line x1="12" y1="12" x2="12" y2="21" />
                        <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
                      </svg>
                      Add Picture
                      <input
                        id="profileUpload2"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>

                    {/* No file chosen */}
                    <p className="text-[11px] text-gray-400 mt-1">
                      {profilePicture ? profilePicture.name : "No file chosen"}
                    </p>
                  </div>

                  {/* Right: Avatar overlapping border */}
                  <div className="w-[70px] h-[70px] rounded-full overflow-hidden border-[3px] border-white shrink-0 bg-gray-300 flex items-center justify-center -mr-2 shadow-md">
                    {profilePreview ? (
                      <img
                        src={profilePreview}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <svg width="42" height="42" viewBox="0 0 100 100" fill="none">
                        <circle cx="50" cy="35" r="18" fill="#9ca3af" />
                        <ellipse cx="50" cy="80" rx="28" ry="20" fill="#9ca3af" />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* ── COMMERCIAL FIELDS ── */
            <>
              {/* Row 1: Company + Owner */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <FieldBox>
                  <FieldLabel text="Company Name" required />
                  <TextInput name="companyName" value={formData.companyName} placeholder="Company Name here" required />
                </FieldBox>
                <FieldBox>
                  <FieldLabel text="Owner Name" required />
                  <TextInput name="ownerName" value={formData.ownerName} placeholder="Owner Name here" required />
                </FieldBox>
              </div>

              {/* Row 2: Phone + CNIC */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <FieldBox>
                  <FieldLabel text="Phone Number" required />
                  <TextInput name="commercialPhone" value={formData.commercialPhone} placeholder="0300-1234567" type="tel" required />
                </FieldBox>
                <FieldBox>
                  <FieldLabel text="CNIC / NICOP No." />
                  <TextInput name="commercialCnic" value={formData.commercialCnic} placeholder="(12345-1234567-1)" />
                </FieldBox>
              </div>

              {/* Row 3: Office No + NTN */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <FieldBox>
                  <FieldLabel text="Office No." required />
                  <TextInput name="officeNo" value={formData.officeNo} placeholder="Office No. here" required />
                </FieldBox>
                <FieldBox>
                  <FieldLabel text="NTN / Tax No." />
                  <TextInput name="ntntax" value={formData.ntntax} placeholder="NTN / Tax Number" />
                </FieldBox>
              </div>

              {/* Row 4: Business Type */}
              <div className="mb-6">
                <FieldBox>
                  <FieldLabel text="Business Type" required />
                  <select
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleInputChange}
                    required
                    className="w-full text-sm text-gray-700 outline-none bg-transparent cursor-pointer"
                  >
                    <option value="">Select Business Type</option>
                    {businessTypes.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </FieldBox>
              </div>
            </>
          )}

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-8 py-3 rounded-xl bg-[#30B33D] text-white text-[15px] font-semibold cursor-pointer shadow-md hover:bg-[#28a035] transition"
            >
              Add Resident
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddResidentPageForm;
