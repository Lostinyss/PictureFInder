// TODO(ผู้พัฒนา): เขียน logic จริงเอง ไฟล์นี้เป็น stub ชั่วคราว
import type { CreditFormat, SavedImage } from "../types/image";

export function buildCredit(image: SavedImage, format: CreditFormat): string {
  return `[${format}] "${image.title ?? "Untitled"}" by ${image.creator ?? "Unknown"} (TODO)`;
}
