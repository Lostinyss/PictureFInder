// Toast.tsx: คอมโพเนนต์แสดงข้อความแจ้งเตือนสถานะสำเร็จ (Toast Alert) และ hook สำหรับเรียกใช้
// Props ของ Toast: { message: string | null }
// Return ของ useToast: { message: string | null, show: (msg: string) => void }

import { useEffect, useRef, useState } from "react";

export function useToast() {
  const [message, setMessage] = useState<string | null>(null);
  const timerRef = useRef<number | null>(null);

  const show = (msg: string) => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
    }
    setMessage(msg);
    // [แก้ไข] ระยะเวลาที่ Toast จะแสดงผล (ค่าเริ่มต้น 2000 ms)
    timerRef.current = window.setTimeout(() => {
      setMessage(null);
      timerRef.current = null;
    }, 2000);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  return { message, show };
}

interface ToastProps {
  message: string | null;
}

export function Toast({ message }: ToastProps) {
  if (!message) return null;

  return (
    <div className="toast toast-end z-50">
      <div className="alert alert-success shadow-lg text-success-content flex items-center gap-2">
        <span>✓</span>
        <span>{message}</span>
      </div>
    </div>
  );
}
