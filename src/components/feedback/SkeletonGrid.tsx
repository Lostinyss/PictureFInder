// SkeletonGrid.tsx: โครงร่างกำลังโหลด (Skeleton Loader) สำหรับหน้าแสดงรายการรูปภาพ
// Props: { count?: number } (ค่าเริ่มต้น 20 ช่อง)

interface SkeletonGridProps {
  count?: number;
}

export function SkeletonGrid({ count = 20 }: SkeletonGridProps) {
  // [แก้ไข] กำหนดจำนวนช่อง skeleton เริ่มต้น
  const items = Array.from({ length: count }, (_, i) => i);

  return (
    // [แก้ไข] จำนวนคอลัมน์และระยะห่าง (ต้องสอดคล้องกับ ImageGrid)
    <div
      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 my-4"
      aria-busy="true"
      aria-label="กำลังโหลดข้อมูลรูปภาพ"
    >
      {items.map((i) => (
        <div
          key={i}
          className="skeleton aspect-square w-full rounded-box bg-base-300 animate-pulse"
        />
      ))}
    </div>
  );
}
