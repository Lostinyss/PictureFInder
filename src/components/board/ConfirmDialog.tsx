// ConfirmDialog.tsx: หน้าต่างกล่องข้อความยืนยันการกระทำ (เช่น การลบบอร์ด)
// Props: {
//   open: boolean;
//   title: string;
//   message: string;
//   confirmText?: string;
//   onConfirm: () => void;
//   onClose: () => void;
// }

import { useEffect, useRef } from "react";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmText?: string;
  onConfirm: () => void;
  onClose: () => void;
}

export function ConfirmDialog({
  open,
  title,
  message,
  // [แก้ไข] ข้อความปุ่มยืนยันเริ่มต้น
  confirmText = "ยืนยันการลบ",
  onConfirm,
  onClose,
}: ConfirmDialogProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      className="modal modal-bottom sm:modal-middle"
      onClose={onClose}
    >
      <div className="modal-box max-w-sm p-6 bg-base-100 text-base-content">
        <h3 className="font-bold text-lg text-error flex items-center gap-2 mb-2">
          <span>⚠️</span>
          <span>{title}</span>
        </h3>
        <p className="text-sm text-base-content/80 my-3">{message}</p>
        <div className="modal-action flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="btn btn-ghost btn-sm"
          >
            ยกเลิก
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="btn btn-error btn-sm text-error-content"
          >
            {confirmText}
          </button>
        </div>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button type="button" onClick={onClose}>ปิด</button>
      </form>
    </dialog>
  );
}
