// LicenseBadge.tsx: ป้ายกำกับประเภทสัญญาอนุญาต Creative Commons หรือ Public Domain
// Props: { code: LicenseCode; size?: "sm" | "md" }

import { LICENSES, type LicenseCode } from "../../utils/license";

interface LicenseBadgeProps {
  code: LicenseCode;
  size?: "sm" | "md";
}

export function LicenseBadge({ code, size = "sm" }: LicenseBadgeProps) {
  const info = LICENSES[code] ?? {
    label: code.toUpperCase(),
    badgeClass: "badge-neutral",
  };

  // [แก้ไข] ขนาดเริ่มต้นและรูปแบบความหนาของตัวอักษร
  const sizeClass = size === "md" ? "badge-md" : "badge-sm";

  return (
    <span
      className={`badge ${info.badgeClass} ${sizeClass} font-medium shadow-xs select-none`}
      title={info.description}
    >
      {info.label}
    </span>
  );
}
