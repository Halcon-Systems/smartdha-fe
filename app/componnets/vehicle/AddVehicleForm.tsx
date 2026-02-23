"use client";

import { useState, useRef } from "react";
import SvgIcon from "../shared/SvgIcon";
// import { Plus, ChevronDown, ImagePlus, X } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────
interface VehicleFormData {
  vehicleNoABC: string;
  vehicleNoNum: string;
  licensePlate: string;
  make: string;
  model: string;
  year: string;
  color: string;
  attachment: File | null;
}

// ─── Year options ─────────────────────────────────────────────────────────────
const YEARS = Array.from({ length: 30 }, (_, i) =>
  String(new Date().getFullYear() - i)
);

// ─── Reusable Field components ────────────────────────────────────────────────

function FieldLabel({ label, required }: { label: string; required?: boolean }) {
  return (
    <label className="block text-[12px] font-medium text-[#30B33D]">
      {label}
      {required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
  );
}

function TextInput({
  placeholder,
  value,
  onChange,
}: {
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="
        w-full text-[13px] text-gray-700 placeholder-gray-300
        bg-transparent border-0 outline-none
        focus:ring-0 p-0
      "
    />
  );
}

function FieldBox({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`
        bg-white border border-gray-200 rounded-xl px-4 py-3
        focus-within:border-green-400 focus-within:ring-2 focus-within:ring-green-50
        transition-all duration-150 ${className}
      `}
    >
      {children}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AddVehicleForm({
  onCancel,
  onAdd,
}: {
  onCancel?: () => void;
  onAdd?: (data: VehicleFormData) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<VehicleFormData>({
    vehicleNoABC: "",
    vehicleNoNum: "",
    licensePlate: "",
    make: "",
    model: "",
    year: "2001",
    color: "",
    attachment: null,
  });

  const [yearOpen, setYearOpen] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const set = (field: keyof VehicleFormData, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) return;
    setForm((prev) => ({ ...prev, attachment: file }));
    setPreview(URL.createObjectURL(file));
  };

  const removeAttachment = () => {
    setForm((prev) => ({ ...prev, attachment: null }));
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleAdd = () => {
    onAdd?.(form);
  };

  return (
    <div className="w-full bg-[#F9FAFB] shadow-[0_0_15px_rgba(0,0,0,0.25)] rounded-lg p-4">
      <div className="w-full">

        {/* Heading */}
        <p className="text-[1ypx] font-semibold text-black mb-5">
          Please provide details below!
        </p>

        {/* ── Form grid ── */}
        <div className="flex flex-col gap-3">

          {/* Row 1: Vehicle No (ABC) | Vehicle No (Num) | License Plate */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Vehicle No — ABC Only */}
              <FieldBox>
                <FieldLabel label="Vehicle No" required />
                <TextInput
                  placeholder="ABC Only"
                  value={form.vehicleNoABC}
                  onChange={(v) => set("vehicleNoABC", v)}
                />
              </FieldBox>

              {/* Vehicle No — Number Only */}
              <FieldBox>
                <FieldLabel label="Vehicle No" required />
                <TextInput
                  placeholder="Number Only"
                  value={form.vehicleNoNum}
                  onChange={(v) => set("vehicleNoNum", v)}
                />
              </FieldBox>
            </div>

            {/* License Plate */}
            <FieldBox>
              <FieldLabel label="License Plate" />
              <TextInput
                placeholder="ABC-123"
                value={form.licensePlate}
                onChange={(v) => set("licensePlate", v)}
              />
            </FieldBox>
          </div>

          {/* Row 2: Make | Model */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <FieldBox>
              <FieldLabel label="Make" required />
              <TextInput
                placeholder="Manufacturer"
                value={form.make}
                onChange={(v) => set("make", v)}
              />
            </FieldBox>

            <FieldBox>
              <FieldLabel label="Model" required />
              <TextInput
                placeholder="Model Name"
                value={form.model}
                onChange={(v) => set("model", v)}
              />
            </FieldBox>
          </div>

          {/* Row 3: Year (dropdown) | Color */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

            {/* Year dropdown */}
            <div className="relative">
              <FieldBox className="cursor-pointer" >
                <FieldLabel label="Year" required />
                <div
                  className="flex items-center justify-between"
                  onClick={() => setYearOpen((o) => !o)}
                >
                  <span className="text-[13px] text-gray-700">
                    {form.year || "Select Year"}
                  </span>
                  {/* <ChevronDown
                      size={15}
                      className={`text-gray-400 transition-transform duration-150 ${
                        yearOpen ? "rotate-180" : ""
                      }`}
                    /> */}
                </div>
              </FieldBox>

              {yearOpen && (
                <div className="absolute z-30 top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
                  <div className="max-h-[180px] overflow-y-auto">
                    {YEARS.map((yr) => (
                      <div
                        key={yr}
                        onClick={() => {
                          set("year", yr);
                          setYearOpen(false);
                        }}
                        className={`
                            px-4 py-2 text-[13px] cursor-pointer transition-colors
                            ${form.year === yr
                            ? "bg-green-50 text-green-700 font-medium"
                            : "text-gray-700 hover:bg-gray-50"
                          }
                          `}
                      >
                        {yr}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Color */}
            <FieldBox>
              <FieldLabel label="Color" required />
              <TextInput
                placeholder="White"
                value={form.color}
                onChange={(v) => set("color", v)}
              />
            </FieldBox>
          </div>

          {/* Row 4: Attachment (half width) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div
              className="
                  bg-white border border-gray-200 rounded-xl px-4 py-3
                  transition-all duration-150
                "
            >
              {/* Attachment header */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-[12px] font-medium text-[#30B33D]">
                  Attachment
                </span>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="
                      w-6 h-6 rounded-md border border-gray-300
                      flex items-center justify-center
                      hover:border-green-400 hover:bg-green-50
                      transition-colors duration-150
                    "
                >
                   <SvgIcon name="add-icon" size={12} />
                  {/* <Plus size={13} className="text-gray-500" /> */}
                </button>
              </div>

              {/* Preview or placeholder */}
              {preview ? (
                <div className="relative">
                  <img
                    src={preview}
                    alt="attachment"
                    className="w-full h-[72px] object-cover rounded-lg border border-gray-100"
                  />
                  <button
                    type="button"
                    onClick={removeAttachment}
                    className="absolute top-1 right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center shadow"
                  >
                    {/* <X size={10} className="text-white" /> */}
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex flex-col items-start gap-0.5 text-left w-full"
                >
                  <div className="flex items-center gap-1.5 text-gray-400">
                    {/* <ImagePlus size={14} /> */}
                    <span className="text-[12px]">Add Picture</span>
                  </div>
                  <span className="text-[11px] text-gray-300">Add file here</span>
                </button>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFile}
              />
            </div>
          </div>

        </div>

        {/* ── Action buttons ── */}
        <div className="flex items-center gap-3 mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="
                flex-1 py-2.5 rounded-xl border border-gray-200
                text-[13px] font-medium text-[#30B33D]
                hover:bg-gray-50 hover:text-gray-700
                transition-all duration-150
              "
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleAdd}
            className="
                flex-1 py-2.5 rounded-xl
                text-[13px] font-semibold text-white
                bg-[#30B33D] hover:bg-green-600 active:bg-green-700
                transition-all duration-150 shadow-sm
              "
          >
            Add
          </button>
        </div>

      </div>
    </div>
  );
}