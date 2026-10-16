// ErrorState.tsx: แสดงข้อความแจ้งเตือนเมื่อเกิดข้อผิดพลาดในการโหลดข้อมูล พร้อมปุ่มลองใหม่
// Props: { error?: ApiError | null; onRetry?: () => void }

import type { ApiError } from "../../types/image";

interface ErrorStateProps {
  error?: ApiError | null;
  onRetry?: () => void;
}

export function ErrorState({ error, onRetry }: ErrorStateProps) {
  // [แก้ไข] ข้อความสำหรับกรณี Rate Limit (429) และข้อผิดพลาดทั่วไป
  const isRateLimit = error?.status === 429;
  const message = isRateLimit
    ? "เรียกใช้งานถี่เกินไป กรุณารอสักครู่แล้วลองใหม่"
    : "โหลดข้อมูลไม่สำเร็จ";

  return (
    <div className="alert alert-error shadow-md my-6 flex flex-col sm:flex-row justify-between items-center gap-4">
      <div className="flex items-center gap-3">
        <span className="text-xl">⚠️</span>
        <div>
          <h3 className="font-semibold">{message}</h3>
          {error?.message && error.status !== 429 && (
            <p className="text-xs opacity-80 mt-0.5">{error.message}</p>
          )}
        </div>
      </div>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="btn btn-sm btn-outline btn-neutral bg-base-100 text-base-content hover:bg-base-200"
        >
          ลองใหม่
        </button>
      )}
    </div>
  );
}
