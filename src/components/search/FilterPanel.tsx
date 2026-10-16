// FilterPanel.tsx: แถบตัวกรองการค้นหารูปภาพ (การใช้งาน, สิทธิ์การใช้งาน, แนวรูป, ขนาดภาพ)
// Props: {
//   value: SearchParams;
//   onChange: (partial: Partial<SearchParams>) => void;
//   onClear: () => void;
// }

import type { AspectRatio, ImageSize, LicenseType, SearchParams } from "../../types/image";
import { LICENSES, type LicenseCode } from "../../utils/license";

interface FilterPanelProps {
  value: SearchParams;
  onChange: (partial: Partial<SearchParams>) => void;
  onClear: () => void;
}

export function FilterPanel({ value, onChange, onClear }: FilterPanelProps) {
  // ตรวจสอบว่ามีตัวกรองใดถูกเลือกไว้หรือไม่
  const hasActiveFilters = Boolean(
    value.license_type || value.license || value.aspect_ratio || value.size
  );

  const licenseCodes = Object.keys(LICENSES) as LicenseCode[];

  return (
    <div className="w-full max-w-4xl mx-auto my-4 space-y-3">
      {/* [แก้ไข] การจัดคอลัมน์ของตัวกรองในแต่ละขนาดหน้าจอ */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {/* 1. ตัวกรองการใช้งาน */}
        <div className="form-control">
          <label className="label py-1">
            <span className="label-text text-xs text-base-content/70">การใช้งาน</span>
          </label>
          <select
            value={value.license_type}
            onChange={(e) =>
              onChange({ license_type: e.target.value as LicenseType })
            }
            className="select select-sm w-full bg-base-100"
          >
            <option value="">ทั้งหมด</option>
            <option value="commercial">ใช้เชิงพาณิชย์ได้</option>
            <option value="modification">ดัดแปลงได้</option>
          </select>
        </div>

        {/* 2. ตัวกรอง License */}
        <div className="form-control">
          <label className="label py-1">
            <span className="label-text text-xs text-base-content/70">License</span>
          </label>
          <select
            value={value.license}
            onChange={(e) =>
              onChange({ license: e.target.value as LicenseCode | "" })
            }
            className="select select-sm w-full bg-base-100"
          >
            <option value="">ทั้งหมด</option>
            {licenseCodes.map((code) => (
              <option key={code} value={code}>
                {LICENSES[code].label}
              </option>
            ))}
          </select>
        </div>

        {/* 3. ตัวกรองแนวรูปภาพ */}
        <div className="form-control">
          <label className="label py-1">
            <span className="label-text text-xs text-base-content/70">แนวรูป</span>
          </label>
          <select
            value={value.aspect_ratio}
            onChange={(e) =>
              onChange({ aspect_ratio: e.target.value as AspectRatio })
            }
            className="select select-sm w-full bg-base-100"
          >
            <option value="">ทั้งหมด</option>
            <option value="tall">แนวตั้ง (Tall)</option>
            <option value="wide">แนวนอน (Wide)</option>
            <option value="square">สี่เหลี่ยมจัตุรัส (Square)</option>
          </select>
        </div>

        {/* 4. ตัวกรองขนาดรูปภาพ */}
        <div className="form-control">
          <label className="label py-1">
            <span className="label-text text-xs text-base-content/70">ขนาด</span>
          </label>
          <select
            value={value.size}
            onChange={(e) =>
              onChange({ size: e.target.value as ImageSize })
            }
            className="select select-sm w-full bg-base-100"
          >
            <option value="">ทั้งหมด</option>
            <option value="small">เล็ก (Small)</option>
            <option value="medium">กลาง (Medium)</option>
            <option value="large">ใหญ่ (Large)</option>
          </select>
        </div>
      </div>

      {/* ปุ่มล้างตัวกรอง แสดงเมื่อมีตัวกรองถูกเลือก */}
      {hasActiveFilters && (
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClear}
            className="btn btn-ghost btn-sm text-error hover:bg-error/10"
          >
            ✕ ล้างตัวกรอง
          </button>
        </div>
      )}
    </div>
  );
}
