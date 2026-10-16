// ImageGrid.tsx: แสดงรายการรูปภาพในรูปแบบ Grid ตอบสนองทุกขนาดหน้าจอ
// Props: {
//   images: (ImageSummary | SavedImage)[];
//   variant?: "search" | "board";
//   isSaved?: (id: string) => boolean;
//   onAction: (image: ImageSummary | SavedImage) => void;
//   dimmed?: boolean;
// }

import type { ImageSummary, SavedImage } from "../../types/image";
import { ImageCard } from "./ImageCard";

interface ImageGridProps {
  images: (ImageSummary | SavedImage)[];
  variant?: "search" | "board";
  isSaved?: (id: string) => boolean;
  onAction: (image: ImageSummary | SavedImage) => void;
  dimmed?: boolean;
}

export function ImageGrid({
  images,
  variant = "search",
  isSaved,
  onAction,
  dimmed = false,
}: ImageGridProps) {
  return (
    // [แก้ไข] จำนวนคอลัมน์ในแต่ละขนาดหน้าจอและระยะห่างระหว่างการ์ด
    <div
      className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 my-4 ${
        dimmed ? "opacity-50 pointer-events-none transition" : "transition"
      }`}
    >
      {images.map((img) => (
        <ImageCard
          key={img.id}
          image={img}
          variant={variant}
          isSaved={isSaved ? isSaved(img.id) : false}
          onAction={onAction}
        />
      ))}
    </div>
  );
}
