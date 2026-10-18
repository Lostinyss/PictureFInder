// ImageCard.tsx: การ์ดแสดงรูปภาพแต่ละรายการ รองรับทั้งการแสดงในผลการค้นหา (search) และในบอร์ด (board)
// Props: {
//   image: ImageSummary | SavedImage;
//   variant?: "search" | "board";
//   isSaved?: boolean;
//   onAction: (image: ImageSummary | SavedImage) => void;
// }

import { useState } from "react";
import { Link } from "react-router";
import type { ImageSummary, SavedImage } from "../../types/image";
import { LicenseBadge } from "./LicenseBadge";

interface ImageCardProps {
  image: ImageSummary | SavedImage;
  variant?: "search" | "board";
  isSaved?: boolean;
  onAction: (image: ImageSummary | SavedImage) => void;
}

export function ImageCard({
  image,
  variant = "search",
  isSaved = false,
  onAction,
}: ImageCardProps) {
  const [hasError, setHasError] = useState(false);

  const displayTitle = image.title ?? "ไม่มีชื่อภาพ";
  const displayCreator = image.creator ?? "ไม่ระบุผู้สร้างสรรค์";

  const handleActionClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAction(image);
  };

  return (
    <Link
      to={`/image/${image.id}`}
      className="group relative block overflow-hidden rounded-box bg-base-300 shadow-sm hover:shadow-lg transition"
    >
      {/* ส่วนรูปภาพหรือกล่องสำรองเมื่อโหลดไม่สำเร็จ */}
      {hasError ? (
        <div className="aspect-square w-full flex flex-col items-center justify-center p-4 text-center bg-base-300 text-base-content/60">
          <span className="text-2xl mb-1">⚠️</span>
          {/* [แก้ไข] ข้อความกรณีโหลดรูปภาพไม่สำเร็จ */}
          <span className="text-xs">ไม่สามารถโหลดรูปได้</span>
        </div>
      ) : (
        <img
          src={image.thumbnail}
          alt={displayTitle}
          loading="lazy"
          decoding="async"
          onError={() => setHasError(true)}
          className="aspect-square w-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      )}

      {/* มุมซ้ายบน: ป้ายกำกับ License */}
      <div className="absolute top-2 left-2 z-10">
        <LicenseBadge code={image.license} size="sm" />
      </div>

      {/* มุมขวาบน: ปุ่มจัดการ (บันทึก / ลบออกจากบอร์ด) */}
      <div className="absolute top-2 right-2 z-10">
        {variant === "search" ? (
          <button
            type="button"
            onClick={handleActionClick}
            aria-label={isSaved ? "บันทึกในบอร์ดแล้ว" : "บันทึกลงบอร์ด"}
            className={`btn btn-circle btn-sm shadow-md transition ${
              isSaved
                ? "btn-secondary"
                : "btn-ghost bg-base-100/80 hover:bg-base-100 text-base-content"
            }`}
          >
            {isSaved ? "★" : "☆"}
          </button>
        ) : (
          <button
            type="button"
            onClick={handleActionClick}
            aria-label="นำออกจากบอร์ด"
            className="btn btn-circle btn-sm btn-error shadow-md text-error-content hover:opacity-90"
          >
            ✕
          </button>
        )}
      </div>

      {/* แถบ Overlay ข้อมูลด้านล่าง (บนมือถือแสดงตลอด, บนจอ >=md แสดงเมื่อ hover) */}
      <div className="absolute inset-x-0 bottom-0 p-3 bg-linear-to-t from-black/70 via-black/40 to-transparent text-white transition-opacity duration-200 opacity-100 md:opacity-0 md:group-hover:opacity-100">
        <p className="text-xs font-semibold truncate leading-tight mb-0.5" title={displayTitle}>
          {displayTitle}
        </p>
        <p className="text-[11px] text-white/80 truncate">
          โดย {displayCreator}
        </p>
      </div>
    </Link>
  );
}
