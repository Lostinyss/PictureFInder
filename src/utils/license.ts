// ข้อมูลและข้อกำหนดสิทธิ์ใช้งาน Creative Commons และ Public Domain
// ข้อมูลชุดนี้เป็น static reference ตามมาตรฐานสากล

export type LicenseCode =
  | "cc0"
  | "pdm"
  | "by"
  | "by-sa"
  | "by-nd"
  | "by-nc"
  | "by-nc-sa"
  | "by-nc-nd";

export interface LicenseInfo {
  label: string;
  badgeClass: string;
  commercial: boolean;
  modify: boolean;
  attribution: boolean;
  shareAlike: boolean;
  description: string;
}

export const LICENSES: Record<LicenseCode, LicenseInfo> = {
  cc0: {
    label: "CC0",
    badgeClass: "badge-success",
    commercial: true,
    modify: true,
    attribution: false,
    shareAlike: false,
    description: "สาธารณสมบัติ ใช้ได้อิสระ ไม่ต้องให้เครดิต",
  },
  pdm: {
    label: "Public Domain",
    badgeClass: "badge-success",
    commercial: true,
    modify: true,
    attribution: false,
    shareAlike: false,
    description: "หมดลิขสิทธิ์แล้ว",
  },
  by: {
    label: "CC BY",
    badgeClass: "badge-info",
    commercial: true,
    modify: true,
    attribution: true,
    shareAlike: false,
    description: "ใช้ได้ทุกอย่าง แต่ต้องให้เครดิต",
  },
  "by-sa": {
    label: "CC BY-SA",
    badgeClass: "badge-accent",
    commercial: true,
    modify: true,
    attribution: true,
    shareAlike: true,
    description: "ให้เครดิต และงานดัดแปลงต้องใช้ license เดียวกัน",
  },
  "by-nd": {
    label: "CC BY-ND",
    badgeClass: "badge-primary",
    commercial: true,
    modify: false,
    attribution: true,
    shareAlike: false,
    description: "ให้เครดิต ห้ามดัดแปลง",
  },
  "by-nc": {
    label: "CC BY-NC",
    badgeClass: "badge-warning",
    commercial: false,
    modify: true,
    attribution: true,
    shareAlike: false,
    description: "ให้เครดิต ห้ามใช้เชิงพาณิชย์",
  },
  "by-nc-sa": {
    label: "CC BY-NC-SA",
    badgeClass: "badge-warning",
    commercial: false,
    modify: true,
    attribution: true,
    shareAlike: true,
    description: "ให้เครดิต ห้ามเชิงพาณิชย์ และต้องใช้ license เดิม",
  },
  "by-nc-nd": {
    label: "CC BY-NC-ND",
    badgeClass: "badge-error",
    commercial: false,
    modify: false,
    attribution: true,
    shareAlike: false,
    description: "เข้มงวดที่สุด ให้เครดิต ห้ามเชิงพาณิชย์ ห้ามดัดแปลง",
  },
};
