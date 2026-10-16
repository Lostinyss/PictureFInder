import type { LicenseCode } from "../utils/license";

export interface ImageSummary {
  id: string;
  title: string | null;
  thumbnail: string;
  url: string;
  creator: string | null;
  creator_url: string | null;
  license: LicenseCode;
  license_version: string;
  license_url: string;
  foreign_landing_url: string;
  provider: string;
  width?: number;
  height?: number;
  tags?: { name: string }[];
}

export interface SearchResponse {
  result_count: number;
  page_count: number;
  page: number;
  results: ImageSummary[];
}

export type LicenseType = "" | "commercial" | "modification";
export type AspectRatio = "" | "tall" | "wide" | "square";
export type ImageSize = "" | "small" | "medium" | "large";

export interface SearchParams {
  q: string;
  page: number;
  license_type: LicenseType;
  license: LicenseCode | "";
  aspect_ratio: AspectRatio;
  size: ImageSize;
}

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

/** รูปที่ผู้ใช้เลือกบันทึกไว้ในบอร์ด (เก็บเฉพาะฟิลด์ที่ต้องใช้แสดงผลและสร้างเครดิต) */
export type SavedImage = Pick<
  ImageSummary,
  "id" | "title" | "thumbnail" | "creator" | "creator_url" | "license"
  | "license_version" | "license_url" | "foreign_landing_url"
>;

export interface Board {
  id: string;
  name: string;
  description: string;
  createdAt: number;
  images: SavedImage[];
}

export type CreditFormat = "text" | "html" | "markdown";

/** รูปร่างผลลัพธ์ที่หน้าเว็บคาดหวังจาก hook (เลียนแบบ useQuery) */
export interface QueryResult<T> {
  data: T | undefined;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  error: ApiError | null;
  refetch: () => void;
}
