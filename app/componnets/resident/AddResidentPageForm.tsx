"use client";

import React, { useCallback, useEffect, useState } from "react";
import SuccessModal from "../shared/SuccessModal";
import Snackbar from "../shared/Snackbar";
import { registerNonMember } from "@/app/lib/api-client";
import { useRouter } from "next/navigation";

type Tab = "resident" | "commercial";

type FormData = {
  selectType: string;
  searchQuery: string;
  fullName: string;
  password: string;
  emailAddress: string;
  cellNumber: string;
  category: string;
  subCategory: string;
  phase: string;
  zone: string;
  khayaban: string;
  laneStreetNo: string;
  floor: string;
  plotNoNumeric: string;
  plotNoAlphabetic: string;
  plotNoAlphaNumeric: string;
  profilePicture: File | null;
  proofOfPossession: File | null;
  utilityBill: File | null;
  cnic: string;
};

const AddResidentPageForm: React.FC<{
  initialTab?: Tab;
}> = ({
  initialTab = "resident",
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>(initialTab);
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const [proofOfPossession, setProofOfPossession] = useState<File | null>(null);
  const [utilityBill, setUtilityBill] = useState<File | null>(null);
  const [typeDropdownOpen, setTypeDropdownOpen] = useState<boolean>(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState<boolean>(false);
  const [subCategoryDropdownOpen, setSubCategoryDropdownOpen] = useState<boolean>(false);
  const [phaseDropdownOpen, setPhaseDropdownOpen] = useState<boolean>(false);
  const [zoneDropdownOpen, setZoneDropdownOpen] = useState<boolean>(false);

  const [formData, setFormData] = useState<FormData>({
    selectType: "Resident/Commercial",
    searchQuery: "",
    fullName: "",
    password: "",
    emailAddress: "",
    cellNumber: "",
    category: "",
    subCategory: "",
    phase: "",
    zone: "",
    khayaban: "",
    laneStreetNo: "",
    floor: "",
    plotNoNumeric: "",
    plotNoAlphabetic: "",
    plotNoAlphaNumeric: "",
    profilePicture: null,
    proofOfPossession: null,
    utilityBill: null,
    cnic: "",
  });

  useEffect(() => {
    const editData = localStorage.getItem("editResidentData");
    if (!editData) {
      return;
    }

    try {
      const parsed = JSON.parse(editData) as Partial<FormData>;
      setIsEditing(true);
      setFormData((prev) => ({
        ...prev,
        fullName: parsed.fullName ?? prev.fullName,
        emailAddress: parsed.emailAddress ?? prev.emailAddress,
        cellNumber: parsed.cellNumber ?? prev.cellNumber,
        category: parsed.category ?? prev.category,
        subCategory: parsed.subCategory ?? prev.subCategory,
        phase: parsed.phase ?? prev.phase,
        zone: parsed.zone ?? prev.zone,
        khayaban: parsed.khayaban ?? prev.khayaban,
        laneStreetNo: parsed.laneStreetNo ?? prev.laneStreetNo,
        floor: parsed.floor ?? prev.floor,
        plotNoNumeric: parsed.plotNoNumeric ?? prev.plotNoNumeric,
        plotNoAlphabetic: parsed.plotNoAlphabetic ?? prev.plotNoAlphabetic,
        plotNoAlphaNumeric: parsed.plotNoAlphaNumeric ?? prev.plotNoAlphaNumeric,
        cnic: parsed.cnic ?? prev.cnic,
      }));

      const selectedTab: Tab = parsed.category?.toLowerCase() === "commercial" ? "commercial" : "resident";
      setActiveTab(selectedTab);
    } catch (error) {
      console.error("Error parsing resident edit data:", error);
    }
  }, []);

  const handleInputChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const fieldName = e.target.name;
      
      if (fieldName === 'profilePicture') {
        setProfilePicture(file);
        const reader = new FileReader();
        reader.onloadend = () => setProfilePreview(reader.result as string);
        reader.readAsDataURL(file);
      } else if (fieldName === 'proofOfPossession') {
        setProofOfPossession(file);
      } else if (fieldName === 'utilityBill') {
        setUtilityBill(file);
      }
      
      setFormData((prev) => ({ ...prev, [fieldName]: file }));
    }
  };

  const [submitStatus, setSubmitStatus] = useState<string | null>(null);
  const [curlCommand, setCurlCommand] = useState<string>("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; type: "success" | "error" | "info" }>({ open: false, message: "", type: "info" });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitStatus(null);
    try {
      const fd = new window.FormData();
      fd.append("Name", formData.fullName);
      fd.append("Password", formData.password);
      fd.append("Email", formData.emailAddress);
      fd.append("MobileNo", formData.cellNumber);
      fd.append("CategoryId", formData.category);
      fd.append("SubCategoryId", formData.subCategory);
      fd.append("PhaseId", formData.phase);
      fd.append("ZoneId", formData.zone);
      fd.append("Khayaban", formData.khayaban);
      fd.append("LaneNo", formData.laneStreetNo);
      fd.append("Floors", formData.floor);
      fd.append("PlotNo", formData.plotNoNumeric);
      // Optionally add plotNoAlphabetic and plotNoAlphaNumeric if required by API
      if (formData.profilePicture) fd.append("ProfilePicture", formData.profilePicture);
      if (formData.proofOfPossession) fd.append("ProofOfPossession", formData.proofOfPossession);
      if (formData.utilityBill) fd.append("UtilityBill", formData.utilityBill);
      fd.append("CNIC", formData.cnic);

      // Generate cURL command
      let curl = 'curl -X POST https://dfpwebp.dhakarachi.org/api/smartdha/nonmemberregistration/register-nonmember \\\n  -H "Content-Type: multipart/form-data"';
      const fields = [
        ["Name", formData.fullName],
        ["Password", formData.password],
        ["Email", formData.emailAddress],
        ["MobileNo", formData.cellNumber],
        ["CategoryId", formData.category],
        ["SubCategoryId", formData.subCategory],
        ["PhaseId", formData.phase],
        ["ZoneId", formData.zone],
        ["Khayaban", formData.khayaban],
        ["LaneNo", formData.laneStreetNo],
        ["Floors", formData.floor],
        ["PlotNo", formData.plotNoNumeric],
        ["PlotNoAlphabetic", formData.plotNoAlphabetic],
        ["PlotNoAlphaNumeric", formData.plotNoAlphaNumeric],
        ["CNIC", formData.cnic],
      ];
      fields.forEach(([key, value]) => {
        if (value) curl += ` \\\n  -F \"${key}=${value}\"`;
      });
      if (formData.profilePicture) {
        curl += ` \\\n  -F \"ProfilePicture=@/path/to/file.jpg\"`;
      }
      if (formData.proofOfPossession) {
        curl += ` \\\n  -F \"ProofOfPossession=@/path/to/proof.jpg\"`;
      }
      if (formData.utilityBill) {
        curl += ` \\\n  -F \"UtilityBill=@/path/to/utility.jpg\"`;
      }
      setCurlCommand(curl);

      await registerNonMember(fd);
      setShowSuccessModal(true);
      setSubmitStatus("success");
      setSnackbar({ open: true, message: "Registration successful!", type: "success" });
      localStorage.removeItem("editResidentData");
    } catch (err: any) {
      setSubmitStatus("error: " + (err.message || "Unknown error"));
      setSnackbar({ open: true, message: err.message || "Unknown error", type: "error" });
    }
  };

  const handleCancel = () => {
    localStorage.removeItem("editResidentData");
    window.history.back();
  };

  // Dynamic categories and subcategories logic
  type Category = { label: string; uuid: string; raw?: any };
  type SubCategory = { label: string; uuid: string };
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);

  // Fetch categories on mount
  useEffect(() => {
    import("@/app/lib/api-client").then(({ apiClient }) => {
      apiClient
        .get("/api/nonmember/get-nonmember-category")
        .then((res) => {
          const arr = Array.isArray(res) ? res : (res as any[]);
          if (Array.isArray(arr)) {
            setCategories(
              arr.map((item: any) => ({
                label: item.displayName || item.name,
                uuid: item.id,
                raw: item,
              }))
            );
          } else {
            setCategories([]);
          }
        })
        .catch(() => setCategories([]));
    });
  }, []);

  // Fetch subcategories when category changes
  useEffect(() => {
    if (formData.category) {
      import("@/app/lib/api-client").then(({ apiClient }) => {
        apiClient
          .get(`/api/nonmember/get-nonmember-subcategory-bycategoryid?Id=${formData.category}`)
          .then((res) => {
            const arr = Array.isArray(res) ? res : (res as any[]);
            if (Array.isArray(arr)) {
              setSubCategories(
                arr.map((item: any) => ({
                  label: item.displayName || item.name,
                  uuid: item.id,
                }))
              );
            } else {
              setSubCategories([]);
            }
          })
          .catch(() => setSubCategories([]));
      });
    } else {
      setSubCategories([]);
    }
  }, [formData.category]);
  const phases = [
    { label: "Phase 1", uuid: "7cc92216-4327-4ac0-baa0-8a9ed7647e9f" },
    { label: "Phase 2", uuid: "30858a95-6a99-4822-963e-253c92adbdc3" },
    { label: "Phase 3", uuid: "613ece0b-1e3f-4ce5-b781-b595d4b8ebd5" },
    { label: "Phase 4", uuid: "cc208f88-558e-4ac0-be9d-c43f16f7b72b" },
    { label: "Phase 5", uuid: "d5b82c1f-ff55-4621-9dec-4175c6a489d6" },
    { label: "Phase 6", uuid: "b881af67-4f27-49d8-a4e1-e591fd060329" },
    { label: "Phase 7", uuid: "e6f5ba71-4fa8-41b5-a670-52beb235597f" },
    { label: "Phase 8", uuid: "085c320e-5e9e-43e2-871e-6c06691c3968" }
  ];
  const zones = [
    { label: "Zone-B", uuid: "3b87cdef-8531-459a-acb6-12e054d099cc" },
    { label: "Zone 1", uuid: "c7ce1457-0065-4b42-a9a5-38590f82acfe" },
    { label: "Zone-A", uuid: "f7224696-af90-4939-8580-3e208f4659e1" },
    { label: "Zone 2", uuid: "158356f9-a03a-4adc-97ba-6a6ab3c59786" }
    // Add more as needed
  ];

  // Reusable field box
  const FieldBox = useCallback(({ children }: { children: React.ReactNode }) => (
    <div className="bg-white border border-gray-200 rounded-xl px-4 py-3 relative">
      {children}
    </div>
  ), []);

  // Reusable label
  const FieldLabel = useCallback(({
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
  ), []);

  // Reusable input
  const TextInput = useCallback(({
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
  ), [handleInputChange]);

  const router = useRouter();

  return (
    <div className="w-full bg-[#F9FAFB] shadow-[0_0_15px_rgba(0,0,0,0.25)] rounded-lg p-6">
      <div className="w-full max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-6">
          <p className="text-lg font-semibold text-black">
            {isEditing ? "Edit resident details" : "Please provide details below!"}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>

          {/* Row 1: Full Name + Email Address */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <FieldBox>
              <FieldLabel text="Full Name" required />
              <TextInput name="fullName" value={formData.fullName} placeholder="Full Name here" required />
            </FieldBox>

            <FieldBox>
              <FieldLabel text="Email Address" required />
              <TextInput name="emailAddress" value={formData.emailAddress} placeholder="Email Address here" type="email" required />
            </FieldBox>
          </div>


          {/* Row 2: Password + Cell Number */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <FieldBox>
              <FieldLabel text="Password" required />
              <TextInput name="password" value={formData.password} placeholder="Password here" type="password" required />
            </FieldBox>

            <FieldBox>
              <FieldLabel text="Add Cell Number" required />
              <TextInput name="cellNumber" value={formData.cellNumber} placeholder="0300-1234567" type="tel" required />
            </FieldBox>
          </div>

          {/* Row 2.5: CNIC */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <FieldBox>
              <FieldLabel text="CNIC" required />
              <TextInput name="cnic" value={formData.cnic} placeholder="Enter CNIC" required />
            </FieldBox>
          </div>

          {/* Row 3: Category + Sub-Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <FieldBox>
              <FieldLabel text="Category" required />
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
              >
                <span className={`text-sm ${formData.category ? "text-gray-700" : "text-gray-400"}`}>
                  {categories.length === 0
                    ? "Loading..."
                    : categories.find((cat) => cat.uuid === formData.category)?.label || "Select Category"}
                </span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
              {categoryDropdownOpen && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg z-10 mt-1 shadow-lg max-h-60 overflow-y-auto">
                  {categories.length === 0 ? (
                    <div className="px-4 py-2.5 text-sm text-gray-400">No categories found</div>
                  ) : (
                    categories.map((cat) => (
                      <div
                        key={cat.uuid}
                        className="px-4 py-2.5 text-sm text-gray-700 cursor-pointer hover:bg-green-50"
                        onClick={() => {
                          setFormData((p) => ({ ...p, category: cat.uuid, subCategory: "" }));
                          setCategoryDropdownOpen(false);
                        }}
                      >
                        {cat.label}
                      </div>
                    ))
                  )}
                </div>
              )}
            </FieldBox>

            <FieldBox>
              <FieldLabel text="Sub-Category" />
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setSubCategoryDropdownOpen(!subCategoryDropdownOpen)}
              >
                <span className={`text-sm ${formData.subCategory ? "text-gray-700" : "text-gray-400"}`}>
                  {subCategories.find((sub) => sub.uuid === formData.subCategory)?.label || "Select Type"}
                </span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
              {subCategoryDropdownOpen && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg z-10 mt-1 shadow-lg max-h-60 overflow-y-auto">
                  {subCategories.length === 0 ? (
                    <div className="px-4 py-2.5 text-sm text-gray-400">No subcategories found</div>
                  ) : (
                    subCategories.map((subCat) => (
                      <div
                        key={subCat.uuid}
                        className="px-4 py-2.5 text-sm text-gray-700 cursor-pointer hover:bg-green-50"
                        onClick={() => {
                          setFormData((p) => ({ ...p, subCategory: subCat.uuid }));
                          setSubCategoryDropdownOpen(false);
                        }}
                      >
                        {subCat.label}
                      </div>
                    ))
                  )}
                </div>
              )}
            </FieldBox>
          </div>

          {/* Row 4: Phase + Zone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <FieldBox>
              <FieldLabel text="Phase" required />
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setPhaseDropdownOpen(!phaseDropdownOpen)}
              >
                <span className={`text-sm ${formData.phase ? "text-gray-700" : "text-gray-400"}`}>
                  {phases.find((p) => p.uuid === formData.phase)?.label || "Select Phase"}
                </span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
              {phaseDropdownOpen && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg z-10 mt-1 shadow-lg">
                  {phases.map((phase) => (
                    <div
                      key={phase.uuid}
                      className="px-4 py-2.5 text-sm text-gray-700 cursor-pointer hover:bg-green-50"
                      onClick={() => {
                        setFormData((p) => ({ ...p, phase: phase.uuid }));
                        setPhaseDropdownOpen(false);
                      }}
                    >
                      {phase.label}
                    </div>
                  ))}
                </div>
              )}
            </FieldBox>

            <FieldBox>
              <FieldLabel text="Zone" required />
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setZoneDropdownOpen(!zoneDropdownOpen)}
              >
                <span className={`text-sm ${formData.zone ? "text-gray-700" : "text-gray-400"}`}>
                  {zones.find((z) => z.uuid === formData.zone)?.label || "Select Zone"}
                </span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
              {zoneDropdownOpen && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg z-10 mt-1 shadow-lg">
                  {zones.map((zone) => (
                    <div
                      key={zone.uuid}
                      className="px-4 py-2.5 text-sm text-gray-700 cursor-pointer hover:bg-green-50"
                      onClick={() => {
                        setFormData((p) => ({ ...p, zone: zone.uuid }));
                        setZoneDropdownOpen(false);
                      }}
                    >
                      {zone.label}
                    </div>
                  ))}
                </div>
              )}
            </FieldBox>
          </div>

          {/* Row 5: Khayaban + Floor */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <FieldBox>
              <FieldLabel text="Khayaban" required />
              <TextInput name="khayaban" value={formData.khayaban} placeholder="Type here" required />
            </FieldBox>

            <FieldBox>
              <FieldLabel text="Floor" required />
              <TextInput name="floor" value={formData.floor} placeholder="2-Digits Only" />
            </FieldBox>
          </div>

          {/* Row 5: Lane no + plot */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
            <FieldBox>
              <FieldLabel text="Lane/Street No." required />
              <TextInput name="laneStreetNo" value={formData.laneStreetNo} placeholder="Type here" required />
            </FieldBox>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <FieldBox>
              <FieldLabel text="Plot No." required />
              <TextInput name="plotNoNumeric" value={formData.plotNoNumeric} placeholder="123 Only" required />
            </FieldBox>

            <FieldBox>
              <FieldLabel text="Plot No." required />
              <TextInput name="plotNoAlphabetic" value={formData.plotNoAlphabetic} placeholder="ABC Only" />
            </FieldBox>

            <FieldBox>
              <FieldLabel text="Plot No." required />
              <TextInput name="plotNoAlphaNumeric" value={formData.plotNoAlphaNumeric} placeholder="55-C" />
            </FieldBox>
           </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Profile Picture Upload */}
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
                  {profilePicture ? profilePicture.name : "No file chosen"}
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

          {/* Proof of Possession Upload */}
          <div className="relative mb-6">
            <div className="bg-white border-2 border-dashed rounded-xl px-4 py-3 flex items-center justify-between min-h-[80px]">
              <div className="flex-1">
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="text-xs font-semibold text-[#30B33D]">Proof of Possession</span>
                  <label
                    htmlFor="proofUpload"
                    className="flex items-center justify-center w-5 h-5 bg-[#30B33D] rounded-full cursor-pointer shrink-0 ml-0.5"
                  >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    <input
                      id="proofUpload"
                      name="proofOfPossession"
                      type="file"
                      accept="image/*,.pdf"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>

                <label
                  htmlFor="proofUpload2"
                  className="inline-flex items-center gap-1.5 cursor-pointer text-sm text-gray-700"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2">
                    <polyline points="16 16 12 12 8 16" />
                    <line x1="12" y1="12" x2="12" y2="21" />
                    <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
                  </svg>
                  Ownership or Rent Agreement
                  <input
                    id="proofUpload2"
                    name="proofOfPossession"
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>

                <p className="text-[11px] text-gray-400 mt-1">
                  {proofOfPossession ? proofOfPossession.name : "No file chosen"}
                </p>
              </div>
            </div>
          </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Utility Bill Upload */}
          <div className="relative mb-6">
            <div className="bg-white border-2 border-dashed rounded-xl px-4 py-3 flex items-center justify-between min-h-[80px]">
              <div className="flex-1">
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="text-xs font-semibold text-[#30B33D]">Attach Utility Bill</span>
                  <label
                    htmlFor="utilityUpload"
                    className="flex items-center justify-center w-5 h-5 bg-[#30B33D] rounded-full cursor-pointer shrink-0 ml-0.5"
                  >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    <input
                      id="utilityUpload"
                      name="utilityBill"
                      type="file"
                      accept="image/*,.pdf"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>

                <label
                  htmlFor="utilityUpload2"
                  className="inline-flex items-center gap-1.5 cursor-pointer text-sm text-gray-700"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2">
                    <polyline points="16 16 12 12 8 16" />
                    <line x1="12" y1="12" x2="12" y2="21" />
                    <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
                  </svg>
                  K.E or Gas Bill
                  <input
                    id="utilityUpload2"
                    name="utilityBill"
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>

                <p className="text-[11px] text-gray-400 mt-1">
                  {utilityBill ? utilityBill.name : "No file chosen"}
                </p>
              </div>
            </div>
          </div>
          </div>
          {/* Submit Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={handleCancel}
              className="py-3 rounded-xl bg-white text-[#30B33D] text-[15px] font-semibold cursor-pointer shadow-sm hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-3 rounded-xl bg-[#30B33D] text-white text-[15px] font-semibold cursor-pointer shadow-md hover:bg-[#28a035] transition"
            >
              {isEditing ? "Update" : "Add"}
            </button>
          </div>

          {/* Submission Status */}
          {submitStatus && submitStatus.startsWith("error") && (
            <div className="mt-4 text-red-600 font-semibold">{submitStatus}</div>
          )}
          {/* Show cURL command after submit */}
          {curlCommand && !showSuccessModal && (
            <div className="mt-4 p-4 bg-gray-100 rounded text-xs font-mono">
              <div className="mb-2 font-bold">Actual cURL:</div>
              <pre>{curlCommand}</pre>
            </div>
          )}
          <SuccessModal
            isOpen={showSuccessModal}
            onClose={() => {
              setShowSuccessModal(false);
              setCurlCommand(""); // Hide cURL block after success
              router.push("/residents"); // Navigate to /residents
            }}
            title="Registration Successful"
            message="Member registered successfully."
          />
          <Snackbar
            open={snackbar.open}
            message={snackbar.message}
            type={snackbar.type}
            onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
          />
        </form>
      </div>
    </div>
  );
};

export default AddResidentPageForm;
