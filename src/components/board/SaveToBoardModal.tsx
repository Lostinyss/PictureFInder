// SaveToBoardModal.tsx: หน้าต่างป๊อปอัปสำหรับเลือกบอร์ดที่จะบันทึกรูปภาพ พร้อมฟอร์มสร้างบอร์ดใหม่
// Props: { open: boolean; image: SavedImage | null; onClose: () => void }

import { useEffect, useRef, useState } from "react";
import type { ImageSummary, SavedImage } from "../../types/image";
import { useBoardStore } from "../../store/useBoardStore";

export function toSavedImage(img: ImageSummary): SavedImage {
  return {
    id: img.id,
    title: img.title,
    thumbnail: img.thumbnail,
    creator: img.creator,
    creator_url: img.creator_url,
    license: img.license,
    license_version: img.license_version,
    license_url: img.license_url,
    foreign_landing_url: img.foreign_landing_url,
  };
}

interface SaveToBoardModalProps {
  open: boolean;
  image: SavedImage | null;
  onClose: () => void;
}

export function SaveToBoardModal({ open, image, onClose }: SaveToBoardModalProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [newBoardName, setNewBoardName] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const boards = useBoardStore((s) => s.boards);
  const toggleImage = useBoardStore((s) => s.toggleImage);
  const createBoard = useBoardStore((s) => s.createBoard);

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
      setIsCreating(false);
      setNewBoardName("");
    }
  }, [open]);

  const handleCreateNewBoard = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newBoardName.trim();
    if (!trimmed || !image) return;

    const newId = createBoard(trimmed);
    toggleImage(newId, image);
    setNewBoardName("");
    setIsCreating(false);
  };

  if (!image) return null;

  return (
    <dialog
      ref={dialogRef}
      className="modal modal-bottom sm:modal-middle"
      onClose={onClose}
    >
      {/* [แก้ไข] ความกว้างและ padding ของกล่อง modal */}
      <div className="modal-box max-w-md p-6 bg-base-100 text-base-content">
        {/* ส่วนหัว modal: รูปย่อและชื่อรูป */}
        <div className="flex items-center gap-3 pb-4 border-b border-base-200">
          <img
            src={image.thumbnail}
            alt={image.title ?? "รูปภาพ"}
            className="w-14 h-14 rounded-box object-cover shrink-0 bg-base-300"
          />
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-base truncate">
              {image.title ?? "ไม่มีชื่อภาพ"}
            </h3>
            <p className="text-xs text-base-content/60 truncate">
              บันทึกลงในบอร์ดคอลเลกชัน
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="btn btn-sm btn-circle btn-ghost"
            aria-label="ปิด"
          >
            ✕
          </button>
        </div>

        {/* รายการบอร์ด */}
        <div className="py-4">
          <p className="text-xs font-semibold text-base-content/70 uppercase tracking-wider mb-2">
            เลือกบอร์ดของคุณ
          </p>

          <div className="max-h-64 overflow-y-auto space-y-1 pr-1">
            {boards.length === 0 ? (
              <p className="text-sm text-base-content/60 py-4 text-center">
                ยังไม่มีบอร์ด สร้างบอร์ดแรกของคุณด้านล่าง
              </p>
            ) : (
              boards.map((board) => {
                const isChecked = board.images.some((i) => i.id === image.id);
                return (
                  <label
                    key={board.id}
                    className="flex items-center justify-between p-2.5 rounded-box hover:bg-base-200 cursor-pointer transition select-none"
                  >
                    <div className="min-w-0 pr-2">
                      <p className="font-medium text-sm truncate">{board.name}</p>
                      <p className="text-xs text-base-content/60">
                        {board.images.length} รูป
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleImage(board.id, image)}
                      className="checkbox checkbox-primary checkbox-sm"
                    />
                  </label>
                );
              })
            )}
          </div>
        </div>

        {/* ฟอร์มสร้างบอร์ดใหม่แบบ Inline */}
        <div className="pt-2 border-t border-base-200">
          {isCreating ? (
            <form onSubmit={handleCreateNewBoard} className="space-y-2 mt-2">
              <input
                type="text"
                value={newBoardName}
                onChange={(e) => setNewBoardName(e.target.value)}
                placeholder="ชื่อบอร์ดใหม่..."
                autoFocus
                maxLength={40}
                className="input input-sm w-full bg-base-100"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="btn btn-ghost btn-xs"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  disabled={!newBoardName.trim()}
                  className="btn btn-primary btn-xs"
                >
                  สร้างและบันทึก
                </button>
              </div>
            </form>
          ) : (
            <button
              type="button"
              onClick={() => setIsCreating(true)}
              className="btn btn-ghost btn-sm w-full text-primary justify-start font-medium"
            >
              + สร้างบอร์ดใหม่
            </button>
          )}
        </div>

        {/* ปุ่มด้านล่าง */}
        <div className="modal-action mt-4">
          <button
            type="button"
            onClick={onClose}
            className="btn btn-primary btn-sm w-full"
          >
            เสร็จสิ้น
          </button>
        </div>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button type="button" onClick={onClose}>ปิด</button>
      </form>
    </dialog>
  );
}
