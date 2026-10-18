import type { SavedImage } from "../types/image";
import { LICENSES } from "./license";

export function buildCredit(image: SavedImage): string {
  const title = image.title ?? "Untitled";
  const creator = image.creator ?? "Unknown";
  const license = LICENSES[image.license]?.label ?? image.license;

  return `"${title}" by ${creator}, licensed under ${license}: ${image.foreign_landing_url}`;
}
