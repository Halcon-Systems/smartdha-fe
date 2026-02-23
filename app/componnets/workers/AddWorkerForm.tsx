"use client";

import React, { useState } from "react";

type FormData = {
  searchQuery: string;
  jobType: string;
  fullName: string;
  fatherHusbandName: string;
  dob: string;
  cellNumber: string;
  cnic: string;
  policeVerification: string;
  cardDelivery: string;
  address: string;
  status: string;
  profilePicture: File | null;
  policeVerificationPicture: File | null;
  cnicFront: File | null;
  cnicBack: File | null;
};

const AddWorkerForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    searchQuery: "",
    jobType: "",
    fullName: "",
    fatherHusbandName: "",
    dob: "",
    cellNumber: "",
    cnic: "",
    policeVerification: "",
    cardDelivery: "",
    address: "",
    status: "Active",
    profilePicture: null,
    policeVerificationPicture: null,
    cnicFront: null,
    cnicBack: null,
  });

  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const [policePreview, setPolicePreview] = useState<string | null>(null);
  const [cnicFrontPreview, setCnicFrontPreview] = useState<string | null>(null);
  const [cnicBackPreview, setCnicBackPreview] = useState<string | null>(null);

  const [jobTypeDropdownOpen, setJobTypeDropdownOpen] = useState<boolean>(false);
  const [cardDeliveryDropdownOpen, setCardDeliveryDropdownOpen] = useState<boolean>(false);
  const [policeVerificationDropdownOpen, setPoliceVerificationDropdownOpen] = useState<boolean>(false);
  const [addressDropdownOpen, setAddressDropdownOpen] = useState<boolean>(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const fieldName = e.target.name;
      
      if (fieldName === 'profilePicture') {
        setFormData((prev) => ({ ...prev, profilePicture: file }));
        const reader = new FileReader();
        reader.onloadend = () => setProfilePreview(reader.result as string);
        reader.readAsDataURL(file);
      } else if (fieldName === 'policeVerificationPicture') {
        setFormData((prev) => ({ ...prev, policeVerificationPicture: file }));
        const reader = new FileReader();
        reader.onloadend = () => setPolicePreview(reader.result as string);
        reader.readAsDataURL(file);
      } else if (fieldName === 'cnicFront') {
        setFormData((prev) => ({ ...prev, cnicFront: file }));
        const reader = new FileReader();
        reader.onloadend = () => setCnicFrontPreview(reader.result as string);
        reader.readAsDataURL(file);
      } else if (fieldName === 'cnicBack') {
        setFormData((prev) => ({ ...prev, cnicBack: file }));
        const reader = new FileReader();
        reader.onloadend = () => setCnicBackPreview(reader.result as string);
        reader.readAsDataURL(file);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // Handle form submission here
  };

  const jobTypes: string[] = ["Driver", "Cook", "Guard", "Peon", "Gardener", "House Helper", "Security Guard", "Cleaner"];
  const cardDeliveryOptions: string[] = ["Delivered", "Pending", "Not Required", "In Process"];
  const policeVerificationOptions: string[] = ["Yes", "No"];
  const addressOptions: string[] = [
    "Main Gate", 
    "Block A", 
    "Block B", 
    "Block C", 
    "Community Center", 
    "Security Office", 
    "Admin Office",
    "Parking Area",
    "Garden Area",
    "Other"
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

  // Toggle Switch Component
  const ToggleSwitch = ({
    isOn,
    onToggle,
    label,
  }: {
    isOn: boolean;
    onToggle: () => void;
    label: string;
  }) => (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <button
        type="button"
        onClick={onToggle}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
          isOn ? 'bg-green-500' : 'bg-red-500'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            isOn ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
      <span className={`text-sm font-medium ${isOn ? 'text-green-600' : 'text-red-600'}`}>
        {isOn ? 'Active' : 'Inactive'}
      </span>
    </div>
  );

  return (
    <div className="w-full bg-[#F9FAFB] shadow-[0_0_15px_rgba(0,0,0,0.25)] rounded-lg p-6">
      <div className="w-full max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <p className="text-lg font-semibold text-black">Please provide details below!</p>
          <ToggleSwitch
            isOn={formData.status === "Active"}
            onToggle={() => setFormData(prev => ({
              ...prev,
              status: prev.status === "Active" ? "Inactive" : "Active"
            }))}
            label="Status"
          />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>

          {/* Row 1: Search + Job Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <FieldBox>
              <FieldLabel text="Search (If already registered)" />
              <TextInput 
                name="searchQuery" 
                value={formData.searchQuery} 
                placeholder="MemberShip No. / CNIC / Reg. Cell No." 
              />
            </FieldBox>

            <FieldBox>
              <FieldLabel text="Select Job Type" required />
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setJobTypeDropdownOpen(!jobTypeDropdownOpen)}
              >
                <span className={`text-sm ${formData.jobType ? "text-gray-700" : "text-gray-400"}`}>
                  {formData.jobType || "Select Job Type"}
                </span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
              {jobTypeDropdownOpen && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg z-10 mt-1 shadow-lg">
                  {jobTypes.map((job) => (
                    <div
                      key={job}
                      className="px-4 py-2.5 text-sm text-gray-700 cursor-pointer hover:bg-green-50"
                      onClick={() => {
                        setFormData((p) => ({ ...p, jobType: job }));
                        setJobTypeDropdownOpen(false);
                      }}
                    >
                      {job}
                    </div>
                  ))}
                </div>
              )}
            </FieldBox>
          </div>

          {/* Row 2: Full Name + Father/Husband Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <FieldBox>
              <FieldLabel text="Full Name" required />
              <TextInput name="fullName" value={formData.fullName} placeholder="Enter full name" required />
            </FieldBox>

            <FieldBox>
              <FieldLabel text="Father / Husband Name" required />
              <TextInput name="fatherHusbandName" value={formData.fatherHusbandName} placeholder="Enter father/husband name" required />
            </FieldBox>
          </div>

          {/* Row 3: DOB + Cell Number */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <FieldBox>
              <FieldLabel text="Date of Birth (DOB)" required />
              <TextInput name="dob" value={formData.dob} type="date" placeholder="Select date" required />
            </FieldBox>

            <FieldBox>
              <FieldLabel text="Add Cell Number" required />
              <TextInput name="cellNumber" value={formData.cellNumber} placeholder="0300-1234567" type="tel" required />
            </FieldBox>
          </div>

          {/* Row 4: CNIC + Police Verification */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <FieldBox>
              <FieldLabel text="CNIC / NICOP No." />
              <TextInput name="cnic" value={formData.cnic} placeholder="12345-1234567-1" />
            </FieldBox>

            <FieldBox>
              <FieldLabel text="Police Verification" required />
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setPoliceVerificationDropdownOpen(!policeVerificationDropdownOpen)}
              >
                <span className={`text-sm ${formData.policeVerification ? "text-gray-700" : "text-gray-400"}`}>
                  {formData.policeVerification || "Select (Yes/No)"}
                </span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
              {policeVerificationDropdownOpen && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg z-10 mt-1 shadow-lg">
                  {policeVerificationOptions.map((option) => (
                    <div
                      key={option}
                      className="px-4 py-2.5 text-sm text-gray-700 cursor-pointer hover:bg-green-50"
                      onClick={() => {
                        setFormData((p) => ({ ...p, policeVerification: option }));
                        setPoliceVerificationDropdownOpen(false);
                      }}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </FieldBox>
          </div>

          {/* Row 5: Card Delivery + Address */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <FieldBox>
              <FieldLabel text="Select Worker's Card Delivery" required />
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setCardDeliveryDropdownOpen(!cardDeliveryDropdownOpen)}
              >
                <span className={`text-sm ${formData.cardDelivery ? "text-gray-700" : "text-gray-400"}`}>
                  {formData.cardDelivery || "Owner/ Employer Address or Self Pick Up"}
                </span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
              {cardDeliveryDropdownOpen && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg z-10 mt-1 shadow-lg">
                  {cardDeliveryOptions.map((option) => (
                    <div
                      key={option}
                      className="px-4 py-2.5 text-sm text-gray-700 cursor-pointer hover:bg-green-50"
                      onClick={() => {
                        setFormData((p) => ({ ...p, cardDelivery: option }));
                        setCardDeliveryDropdownOpen(false);
                      }}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </FieldBox>

            <FieldBox>
              <FieldLabel text="Select Address / Location" />
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setAddressDropdownOpen(!addressDropdownOpen)}
              >
                <span className={`text-sm ${formData.address ? "text-gray-700" : "text-gray-400"}`}>
                  {formData.address || "Select Location"}
                </span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
              {addressDropdownOpen && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg z-10 mt-1 shadow-lg">
                  {addressOptions.map((option) => (
                    <div
                      key={option}
                      className="px-4 py-2.5 text-sm text-gray-700 cursor-pointer hover:bg-green-50"
                      onClick={() => {
                        setFormData((p) => ({ ...p, address: option }));
                        setAddressDropdownOpen(false);
                      }}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </FieldBox>
          </div>

          {/* Row 6: Profile Picture + Police Verification Picture */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="relative mb-6">
              <div className="bg-white border-2 border-dashed rounded-xl px-4 py-3 flex items-center justify-between min-h-[80px]">
                <div className="flex-1">
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
                        name="profilePicture"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  </div>

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
                      name="profilePicture"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>

                  <p className="text-[11px] text-gray-400 mt-1">
                    {formData.profilePicture ? formData.profilePicture.name : "No file chosen"}
                  </p>
                </div>

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

            <div className="relative mb-6">
              <div className="bg-white border-2 border-dashed rounded-xl px-4 py-3 flex items-center justify-between min-h-[80px]">
                <div className="flex-1">
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="text-xs font-semibold text-[#30B33D]">Police Verification Picture</span>
                    <span className="text-xs font-semibold text-red-500">*</span>
                    <span className="text-xs text-gray-400">(If Yes Add Picture)</span>
                    <label
                      htmlFor="policeUpload"
                      className="flex items-center justify-center w-5 h-5 bg-[#30B33D] rounded-full cursor-pointer shrink-0 ml-0.5"
                    >
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                      <input
                        id="policeUpload"
                        name="policeVerificationPicture"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <label
                    htmlFor="policeUpload2"
                    className="inline-flex items-center gap-1.5 cursor-pointer text-sm text-gray-700"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2">
                      <polyline points="16 16 12 12 8 16" />
                      <line x1="12" y1="12" x2="12" y2="21" />
                      <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
                    </svg>
                    Add Picture
                    <input
                      id="policeUpload2"
                      name="policeVerificationPicture"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>

                  <p className="text-[11px] text-gray-400 mt-1">
                    {formData.policeVerificationPicture ? formData.policeVerificationPicture.name : "No file chosen"}
                  </p>
                </div>

                <div className="w-[70px] h-[70px] rounded-lg overflow-hidden border-[3px] border-white shrink-0 bg-gray-300 flex items-center justify-center -mr-2 shadow-md">
                  {policePreview ? (
                    <img
                      src={policePreview}
                      alt="Police Verification"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
                      <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Row 7: CNIC Front + CNIC Back */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="relative mb-6">
              <div className="bg-white border-2 border-dashed rounded-xl px-4 py-3 flex items-center justify-between min-h-[80px]">
                <div className="flex-1">
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="text-xs font-semibold text-[#30B33D]">CNIC Front</span>
                    <span className="text-xs font-semibold text-red-500">*</span>
                    <label
                      htmlFor="cnicFrontUpload"
                      className="flex items-center justify-center w-5 h-5 bg-[#30B33D] rounded-full cursor-pointer shrink-0 ml-0.5"
                    >
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                      <input
                        id="cnicFrontUpload"
                        name="cnicFront"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <label
                    htmlFor="cnicFrontUpload2"
                    className="inline-flex items-center gap-1.5 cursor-pointer text-sm text-gray-700"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2">
                      <polyline points="16 16 12 12 8 16" />
                      <line x1="12" y1="12" x2="12" y2="21" />
                      <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
                    </svg>
                    Add Picture
                    <input
                      id="cnicFrontUpload2"
                      name="cnicFront"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>

                  <p className="text-[11px] text-gray-400 mt-1">
                    {formData.cnicFront ? formData.cnicFront.name : "No file chosen"}
                  </p>
                </div>

                <div className="w-[70px] h-[70px] rounded-lg overflow-hidden border-[3px] border-white shrink-0 bg-gray-300 flex items-center justify-center -mr-2 shadow-md">
                  {cnicFrontPreview ? (
                    <img
                      src={cnicFrontPreview}
                      alt="CNIC Front"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="16" rx="2" ry="2" />
                      <line x1="8" y1="10" x2="16" y2="10" />
                      <line x1="8" y1="14" x2="16" y2="14" />
                    </svg>
                  )}
                </div>
              </div>
            </div>

            <div className="relative mb-6">
              <div className="bg-white border-2 border-dashed rounded-xl px-4 py-3 flex items-center justify-between min-h-[80px]">
                <div className="flex-1">
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="text-xs font-semibold text-[#30B33D]">CNIC Back</span>
                    <span className="text-xs font-semibold text-red-500">*</span>
                    <label
                      htmlFor="cnicBackUpload"
                      className="flex items-center justify-center w-5 h-5 bg-[#30B33D] rounded-full cursor-pointer shrink-0 ml-0.5"
                    >
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                      <input
                        id="cnicBackUpload"
                        name="cnicBack"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <label
                    htmlFor="cnicBackUpload2"
                    className="inline-flex items-center gap-1.5 cursor-pointer text-sm text-gray-700"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2">
                      <polyline points="16 16 12 12 8 16" />
                      <line x1="12" y1="12" x2="12" y2="21" />
                      <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
                    </svg>
                    Add Picture
                    <input
                      id="cnicBackUpload2"
                      name="cnicBack"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>

                  <p className="text-[11px] text-gray-400 mt-1">
                    {formData.cnicBack ? formData.cnicBack.name : "No file chosen"}
                  </p>
                </div>

                <div className="w-[70px] h-[70px] rounded-lg overflow-hidden border-[3px] border-white shrink-0 bg-gray-300 flex items-center justify-center -mr-2 shadow-md">
                  {cnicBackPreview ? (
                    <img
                      src={cnicBackPreview}
                      alt="CNIC Back"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="16" rx="2" ry="2" />
                      <line x1="8" y1="10" x2="16" y2="10" />
                      <line x1="8" y1="14" x2="16" y2="14" />
                    </svg>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="py-3 rounded-xl bg-white text-[#30B33D] text-[15px] font-semibold cursor-pointer shadow-sm hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-3 rounded-xl bg-[#30B33D] text-white text-[15px] font-semibold cursor-pointer shadow-md hover:bg-[#28a035] transition"
            >
              Add Worker
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddWorkerForm;
