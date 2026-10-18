// SearchPage.tsx: หน้าแรกสำหรับค้นหารูปภาพฟรีถูกลิขสิทธิ์ จัดการ URL Search Params และแสดงสถานะการโหลด 4 รูปแบบ
// Props: ไม่มี (อ่านสถานะการค้นหาจาก URL useSearchParams)

import { useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import type {
  AspectRatio,
  ImageSize,
  ImageSummary,
  LicenseType,
  SavedImage,
  SearchParams,
} from "../types/image";
import type { LicenseCode } from "../utils/license";
import { useImageSearch } from "../hooks/useImageSearch";
import { useBoardStore } from "../store/useBoardStore";
import { SearchBar } from "../components/search/SearchBar";
import { FilterPanel } from "../components/search/FilterPanel";
import { Pagination } from "../components/search/Pagination";
import { ImageGrid } from "../components/image/ImageGrid";
import { SkeletonGrid } from "../components/feedback/SkeletonGrid";
import { ErrorState } from "../components/feedback/ErrorState";
import { EmptyState } from "../components/feedback/EmptyState";
import { SaveToBoardModal, toSavedImage } from "../components/board/SaveToBoardModal";

export function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedImage, setSelectedImage] = useState<SavedImage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // [แก้ไข] คำค้นเริ่มต้นเมื่อผู้ใช้ยังไม่ได้พิมพ์คำค้นใดๆ ใน URL
  const defaultQuery = "nature";

  const rawQ = searchParams.get("q");
  const hasUserQuery = rawQ !== null;
  const q = rawQ !== null ? rawQ : defaultQuery;

  const page = parseInt(searchParams.get("page") || "1", 10) || 1;
  const license_type = (searchParams.get("license_type") || "") as LicenseType;
  const license = (searchParams.get("license") || "") as LicenseCode | "";
  const aspect_ratio = (searchParams.get("aspect_ratio") || "") as AspectRatio;
  const size = (searchParams.get("size") || "") as ImageSize;

  const currentParams: SearchParams = useMemo(
    () => ({
      q,
      page,
      license_type,
      license,
      aspect_ratio,
      size,
    }),
    [q, page, license_type, license, aspect_ratio, size]
  );

  const { data, isLoading, isFetching, isError, error, refetch } =
    useImageSearch(currentParams);

  const isImageSaved = useBoardStore((s) => s.isImageSaved);

  // อัปเดตพารามิเตอร์ใน URL โดยลบค่าว่างออก และรีเซ็ต page=1 เมื่อเปลี่ยนคำค้นหรือ filter
  const updateParams = (newEntries: Record<string, string | undefined>) => {
    const nextParams = new URLSearchParams(searchParams);

    Object.entries(newEntries).forEach(([key, val]) => {
      if (!val || val === "") {
        nextParams.delete(key);
      } else {
        nextParams.set(key, val);
      }
    });

    setSearchParams(nextParams);
  };

  const handleSearch = (newQuery: string) => {
    updateParams({
      q: newQuery,
      page: "1",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFilterChange = (partial: Partial<SearchParams>) => {
    const stringEntries: Record<string, string | undefined> = {
      page: "1",
    };

    if ("license_type" in partial) stringEntries.license_type = partial.license_type;
    if ("license" in partial) stringEntries.license = partial.license;
    if ("aspect_ratio" in partial) stringEntries.aspect_ratio = partial.aspect_ratio;
    if ("size" in partial) stringEntries.size = partial.size;

    updateParams(stringEntries);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleClearFilters = () => {
    updateParams({
      license_type: "",
      license: "",
      aspect_ratio: "",
      size: "",
      page: "1",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePageChange = (newPage: number) => {
    updateParams({ page: String(newPage) });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleImageAction = (img: ImageSummary | SavedImage) => {
    setSelectedImage("tags" in img ? toSavedImage(img) : img);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* 1. ส่วน Hero แสดงเฉพาะเมื่อยังไม่มีค่า q ใน URL */}
      {!hasUserQuery && (
        <section className="text-center py-8 px-4">
          {/* [แก้ไข] หัวข้อหลักและคำบรรยายของ Hero */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-base-content mb-3 tracking-tight">
            ค้นหารูปฟรี <span className="text-primary">ถูกลิขสิทธิ์</span>
          </h1>
          <p className="text-base sm:text-lg text-base-content/70 max-w-xl mx-auto">
            รวบรวมรูปภาพสัญญาอนุญาต Creative Commons จากทั่วโลก บันทึกลงบอร์ด
            และสร้างข้อความให้เครดิตอัตโนมัติ
          </p>
        </section>
      )}

      {/* 2. ช่องค้นหา */}
      <SearchBar defaultValue={rawQ ?? ""} onSearch={handleSearch} />

      {/* 3. แผงตัวกรอง */}
      <FilterPanel
        value={currentParams}
        onChange={handleFilterChange}
        onClear={handleClearFilters}
      />

      {/* 4. สรุปจำนวนผลลัพธ์ที่พบ */}
      {!isLoading && !isError && data && (
        <div className="flex justify-between items-center text-sm text-base-content/70 px-1">
          <p>
            พบ{" "}
            <span className="font-semibold text-base-content">
              {data.result_count.toLocaleString()}
            </span>{" "}
            รูป สำหรับ “<span className="italic">{q}</span>”
          </p>
          {isFetching && (
            <span className="text-xs text-primary animate-pulse">กำลังอัปเดต...</span>
          )}
        </div>
      )}

      {/* 5. เนื้อหาผลลัพธ์ 4 สถานะ */}
      {isLoading ? (
        <SkeletonGrid count={12} />
      ) : isError ? (
        <ErrorState error={error} onRetry={refetch} />
      ) : data?.results.length === 0 ? (
        <EmptyState
          icon="🔍"
          title="ไม่พบรูปที่ตรงกับคำค้น"
          description={`ลองค้นหาด้วยคำอื่น หรือกดล้างตัวกรองเพื่อค้นหา "${q}" อีกครั้ง`}
          action={
            <button
              type="button"
              onClick={handleClearFilters}
              className="btn btn-outline btn-sm"
            >
              ล้างตัวกรอง
            </button>
          }
        />
      ) : (
        <>
          <ImageGrid
            images={data?.results ?? []}
            variant="search"
            isSaved={isImageSaved}
            onAction={handleImageAction}
            dimmed={isFetching}
          />

          {/* 6. แถบเปลี่ยนหน้า */}
          {data && (
            <Pagination
              page={data.page}
              pageCount={data.page_count}
              onChange={handlePageChange}
            />
          )}
        </>
      )}

      {/* หน้าต่าง Modal สำหรับบันทึกรูปลงบอร์ด */}
      <SaveToBoardModal
        open={isModalOpen}
        image={selectedImage}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedImage(null);
        }}
      />
    </div>
  );
}
