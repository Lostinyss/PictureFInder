// BoardFormModal.tsx: หน้าต่างป๊อปอัปสำหรับสร้างบอร์ดใหม่หรือเปลี่ยนชื่อบอร์ด
// Props: {
//   open: boolean;
//   mode: "create" | "rename";
//   initial?: { name: string; description: string };
//   onClose: () => void;
//   onSubmit: (name: string, description?: string) => void;
// }

import { useEffect, useRef, useState } from "react";

interface BoardFormModalProps {
  open: boolean;
  mode: "create" | "rename";
  initial?: { name: string; description: string };
  onClose: () => void;
  onSubmit: (name: string, description?: string) => void;
}

export function BoardFormModal({
  open,
  mode,
  initial,
  onClose,
  onSubmit,
}: BoardFormModalProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      setName(initial?.name ?? "");
      setDescription(initial?.description ?? "");
      setHasSubmitted(false);
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [open, initial]);

  const isNameEmpty = name.trim().length === 0;
  const showError = hasSubmitted && isNameEmpty;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSubmitted(true);
    if (isNameEmpty) return;

    onSubmit(name.trim(), description.trim());
    onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      className="modal modal-bottom sm:modal-middle"
      onClose={onClose}
    >
      <div className="modal-box max-w-md p-6 bg-base-100 text-base-content">
        <h3 className="font-bold text-lg mb-4">
          {/* [แก้ไข] หัวข้อตามสถานะ สร้าง / แก้ไข */}
          {mode === "create" ? "สร้างบอร์ดใหม่" : "เปลี่ยนชื่อบอร์ด"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* ช่องกรอกชื่อบอร์ด */}
          <div className="form-control">
            <div className="flex justify-between items-center mb-1">
              <label className="label-text text-sm font-medium">
                ชื่อบอร์ด <span className="text-error">*</span>
              </label>
              <span className="text-xs text-base-content/60">
                {name.length}/40
              </span>
            </div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="เช่น ภาพวิวธรรมชาติ, ไอเดียตกแต่งบ้าน"
              maxLength={40}
              className={`input w-full bg-base-100 ${
                showError ? "input-error" : ""
              }`}
            />
            {showError && (
              <p className="text-error text-xs mt-1">กรุณากรอกชื่อบอร์ด</p>
            )}
          </div>

          {/* ช่องกรอกคำอธิบาย */}
          <div className="form-control">
            <label className="label-text text-sm font-medium mb-1">
              คำอธิบาย (ไม่บังคับ)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="ระบุคำอธิบายสั้นๆ เกี่ยวกับคอลเลกชันนี้..."
              rows={3}
              className="textarea w-full bg-base-100 resize-none"
            />
          </div>

          {/* ปุ่มบันทึกและยกเลิก */}
          <div className="modal-action flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-ghost btn-sm"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              className="btn btn-primary btn-sm"
            >
              บันทึก
            </button>
          </div>
        </form>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button type="button" onClick={onClose}>ปิด</button>
      </form>
    </dialog>
  );
}
