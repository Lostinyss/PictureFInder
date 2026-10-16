// ImageDetailPage.tsx: หน้ารายละเอียดรูปภาพ แสดงภาพขนาดใหญ่ ข้อมูลลิขสิทธิ์ สิทธิ์การใช้งาน กล่องเครดิต และรูปภาพที่คล้ายกัน
// Props: ไม่มี (อ่าน id จาก URL useParams)

import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { useImageDetail } from "../hooks/useImageDetail";
import { useRelatedImages } from "../hooks/useRelatedImages";
import { useBoardStore } from "../store/useBoardStore";
import { buildCredit } from "../utils/credit";
import { LICENSES } from "../utils/license";
import { LicenseBadge } from "../components/image/LicenseBadge";
import { LicensePermissions } from "../components/image/LicensePermissions";
import { ImageGrid } from "../components/image/ImageGrid";
import { SkeletonGrid } from "../components/feedback/SkeletonGrid";
import { ErrorState } from "../components/feedback/ErrorState";
import { EmptyState } from "../components/feedback/EmptyState";
import { Toast, useToast } from "../components/feedback/Toast";
import { SaveToBoardModal, toSavedImage } from "../components/board/SaveToBoardModal";
import type { ImageSummary, SavedImage } from "../types/image";

export function ImageDetailPage() {
  const { id = "" } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { message: toastMessage, show: showToast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageForModal, setSelectedImageForModal] = useState<SavedImage | null>(null);

  const { data: image, isLoading, isError, error, refetch } = useImageDetail(id);
  const {
    data: relatedData,
    isLoading: isRelatedLoading,
    isError: isRelatedError,
    error: relatedError,
    refetch: refetchRelated,
  } = useRelatedImages(id);

  const isImageSaved = useBoardStore((s) => s.isImageSaved);

  const handleCopyCredit = async () => {
    if (!image) return;
    const saved = toSavedImage(image);
    const text = buildCredit(saved, "text");
    try {
      await navigator.clipboard.writeText(text);
      showToast("คัดลอกแล้ว ✓");
    } catch {
      showToast("ไม่สามารถคัดลอกได้");
    }
  };

  const handleOpenSaveModal = (img: ImageSummary | SavedImage) => {
    setSelectedImageForModal("tags" in img ? toSavedImage(img) : img);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-8">
      {/* ปุ่มย้อนกลับ */}
      <div>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="btn btn-ghost btn-sm gap-2 text-base-content/80 hover:text-base-content"
        >
          ← ย้อนกลับ
        </button>
      </div>

      {/* จัดการสถานะการโหลดส่วนบน */}
      {isLoading ? (
        <div className="grid lg:grid-cols-5 gap-8">
          <div className="skeleton h-96 lg:col-span-3 rounded-box bg-base-300" />
          <div className="lg:col-span-2 space-y-4">
            <div className="skeleton h-8 w-3/4 rounded bg-base-300" />
            <div className="skeleton h-4 w-1/2 rounded bg-base-300" />
            <div className="skeleton h-24 w-full rounded bg-base-300" />
            <div className="skeleton h-12 w-full rounded bg-base-300" />
          </div>
        </div>
      ) : isError ? (
        error?.status === 404 ? (
          <EmptyState
            icon="⚠️"
            title="ไม่พบรูปนี้"
            description="รูปภาพที่คุณค้นหาอาจถูกลบหรือไม่มีอยู่ในระบบ"
            action={
              <Link to="/" className="btn btn-primary btn-sm">
                กลับหน้าค้นหา
              </Link>
            }
          />
        ) : (
          <ErrorState error={error} onRetry={refetch} />
        )
      ) : image ? (
        <>
          {/* ข้อมูลรูปภาพหลัก */}
          <div className="grid lg:grid-cols-5 gap-8">
            {/* ฝั่งซ้าย (3 คอลัมน์): รูปภาพขนาดใหญ่ */}
            <div className="lg:col-span-3 flex items-center justify-center bg-base-300 rounded-box overflow-hidden shadow-inner">
              <img
                src={image.url}
                alt={image.title ?? "รูปภาพขนาดใหญ่"}
                className="w-full max-h-[70vh] object-contain bg-base-300 rounded-box"
              />
            </div>

            {/* ฝั่งขวา (2 คอลัมน์): การ์ดข้อมูลและลิขสิทธิ์ */}
            <div className="lg:col-span-2">
              <div className="card bg-base-100 shadow p-6 space-y-4">
                {/* 1. ชื่อรูป */}
                <h1 className="text-2xl font-bold text-base-content leading-snug">
                  {image.title ?? "ไม่มีชื่อภาพ"}
                </h1>

                {/* 2. ผู้สร้างสรรค์ */}
                <div className="text-sm text-base-content/80">
                  <span>โดย </span>
                  {image.creator_url ? (
                    <a
                      href={image.creator_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link link-primary font-medium underline underline-offset-2"
                    >
                      {image.creator ?? "ไม่ระบุชื่อ"} ↗
                    </a>
                  ) : (
                    <span className="font-medium">{image.creator ?? "ไม่ระบุชื่อ"}</span>
                  )}
                </div>

                {/* 3. แหล่งที่มา (provider) */}
                <div className="text-xs text-base-content/70">
                  <span>แหล่งที่มา: </span>
                  <span className="badge badge-sm badge-neutral capitalize font-mono">
                    {image.provider}
                  </span>
                </div>

                {/* 4. ขนาดภาพ */}
                {image.width && image.height && (
                  <div className="text-xs text-base-content/70">
                    <span>ขนาดภาพ: </span>
                    <span className="font-mono">
                      {image.width} × {image.height} px
                    </span>
                  </div>
                )}

                {/* 5. ป้าย License + คำอธิบาย */}
                <div className="pt-2 border-t border-base-200 space-y-1">
                  <div className="flex items-center gap-2">
                    <LicenseBadge code={image.license} size="md" />
                    <span className="text-xs font-semibold text-base-content/70">
                      {LICENSES[image.license]?.label}
                    </span>
                  </div>
                  <p className="text-xs text-base-content/70">
                    {LICENSES[image.license]?.description}
                  </p>
                </div>

                {/* 6. ตารางสิทธิ์ License */}
                <LicensePermissions code={image.license} />

                {/* 7. กล่องเครดิตสำหรับคัดลอก */}
                <div className="space-y-1 pt-1">
                  <span className="text-xs font-semibold text-base-content/70">
                    ข้อความให้เครดิต (Text):
                  </span>
                  <div className="bg-base-200 p-3 rounded-box font-mono text-sm break-words flex flex-col gap-2">
                    <span className="text-xs">{buildCredit(toSavedImage(image), "text")}</span>
                    <button
                      type="button"
                      onClick={handleCopyCredit}
                      className="btn btn-xs btn-outline self-end gap-1"
                    >
                      📋 คัดลอก
                    </button>
                  </div>
                </div>

                {/* 8. ปุ่มดำเนินการ: บันทึกลงบอร์ด และ ดูต้นฉบับ */}
                <div className="flex flex-col sm:flex-row gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => handleOpenSaveModal(image)}
                    className="btn btn-secondary flex-1 gap-1"
                  >
                    <span>{isImageSaved(image.id) ? "★" : "☆"}</span>
                    <span>{isImageSaved(image.id) ? "บันทึกในบอร์ดแล้ว" : "บันทึกลงบอร์ด"}</span>
                  </button>

                  <a
                    href={image.foreign_landing_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline flex-1 gap-1"
                  >
                    ดูต้นฉบับ ↗
                  </a>
                </div>

                {/* 9. แท็กกำกับรูปภาพ */}
                {image.tags && image.tags.length > 0 && (
                  <div className="pt-2 border-t border-base-200">
                    <div className="flex flex-wrap gap-1.5">
                      {image.tags.slice(0, 10).map((t, index) => (
                        <span key={index} className="badge badge-ghost badge-sm">
                          #{t.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ส่วน "รูปที่คล้ายกัน" */}
          <section className="pt-8 border-t border-base-300">
            {/* [แก้ไข] หัวข้อของส่วนรูปที่เกี่ยวข้อง */}
            <h2 className="text-xl font-semibold text-base-content mb-4">
              รูปที่คล้ายกัน
            </h2>

            {isRelatedLoading ? (
              <SkeletonGrid count={10} />
            ) : isRelatedError ? (
              <ErrorState error={relatedError} onRetry={refetchRelated} />
            ) : relatedData?.results.length === 0 ? (
              <EmptyState
                icon="📁"
                title="ไม่มีรูปภาพที่คล้ายกัน"
                description="ไม่พบรูปภาพอื่นที่เกี่ยวข้องในขณะนี้"
              />
            ) : (
              <ImageGrid
                images={relatedData?.results ?? []}
                variant="search"
                isSaved={isImageSaved}
                onAction={handleOpenSaveModal}
              />
            )}
          </section>
        </>
      ) : null}

      {/* หน้าต่าง Modal บันทึกลงบอร์ด */}
      <SaveToBoardModal
        open={isModalOpen}
        image={selectedImageForModal}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedImageForModal(null);
        }}
      />

      {/* Toast แจ้งเตือนเมื่อคัดลอกสำเร็จ */}
      <Toast message={toastMessage} />
    </div>
  );
}
