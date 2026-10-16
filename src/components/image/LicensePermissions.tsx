// LicensePermissions.tsx: แสดงตารางสิทธิ์การใช้งาน 4 รายการ (เชิงพาณิชย์, ดัดแปลง, ให้เครดิต, ใช้ license เดิม)
// Props: { code: LicenseCode }

import { LICENSES, type LicenseCode } from "../../utils/license";

interface LicensePermissionsProps {
  code: LicenseCode;
}

export function LicensePermissions({ code }: LicensePermissionsProps) {
  const info = LICENSES[code];
  if (!info) return null;

  // [แก้ไข] รายการสิทธิ์และเงื่อนไขการใช้งาน
  const permissions = [
    { label: "ใช้เชิงพาณิชย์", allowed: info.commercial },
    { label: "ดัดแปลงได้", allowed: info.modify },
    { label: "ต้องให้เครดิต", allowed: info.attribution },
    { label: "ต้องใช้ license เดิม", allowed: info.shareAlike },
  ];

  return (
    <div className="grid grid-cols-2 gap-2">
      {permissions.map((p) => (
        <div
          key={p.label}
          className="flex items-center gap-2 p-3 rounded-box bg-base-200 text-sm"
        >
          {/* [แก้ไข] สัญลักษณ์และสีสำหรับสถานะ อนุญาต / ไม่อนุญาต */}
          <span
            className={`font-bold text-base ${
              p.allowed ? "text-success" : "text-error"
            }`}
          >
            {p.allowed ? "✓" : "✗"}
          </span>
          <span className="text-base-content/90 font-medium">{p.label}</span>
        </div>
      ))}
    </div>
  );
}
