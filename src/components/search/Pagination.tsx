// Pagination.tsx: ปุ่มสลับเปลี่ยนหน้าข้อมูล แสดงหมายเลขหน้าปัจจุบันและจำนวนหน้าทั้งหมด
// Props: { page: number; pageCount: number; onChange: (page: number) => void }

interface PaginationProps {
  page: number;
  pageCount: number;
  onChange: (page: number) => void;
}

export function Pagination({ page, pageCount, onChange }: PaginationProps) {
  if (pageCount <= 1) return null;

  const isFirst = page <= 1;
  const isLast = page >= pageCount;

  return (
    <div className="flex justify-center items-center my-8">
      {/* [แก้ไข] รูปลักษณ์และขนาดปุ่มเปลี่ยนหน้า */}
      <div className="join shadow-xs bg-base-100">
        <button
          type="button"
          onClick={() => onChange(page - 1)}
          disabled={isFirst}
          className="join-item btn btn-sm sm:btn-md"
          aria-label="หน้าก่อนหน้า"
        >
          « ก่อนหน้า
        </button>

        <span className="join-item btn btn-sm sm:btn-md btn-ghost no-animation font-medium select-none pointer-events-none">
          หน้า {page} / {pageCount}
        </span>

        <button
          type="button"
          onClick={() => onChange(page + 1)}
          disabled={isLast}
          className="join-item btn btn-sm sm:btn-md"
          aria-label="หน้าถัดไป"
        >
          ถัดไป »
        </button>
      </div>
    </div>
  );
}
