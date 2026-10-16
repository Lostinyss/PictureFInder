// BoardDetailPage.tsx: หน้ารายละเอียดภายในแต่ละบอร์ด แสดงรูปภาพทั้งหมดในบอร์ด พร้อมตัวเลือกสร้างเครดิตและลบรูปภาพ
// Props: ไม่มี (อ่าน boardId จาก useParams และดึงข้อมูลจาก useBoardStore)

import { useState } from "react";
import { Link, useParams } from "react-router";
import type { ImageSummary, SavedImage } from "../types/image";
import { useBoardStore } from "../store/useBoardStore";
import { ImageGrid } from "../components/image/ImageGrid";
import { BoardFormModal } from "../components/board/BoardFormModal";
import { EmptyState } from "../components/feedback/EmptyState";

export function BoardDetailPage() {
  const { boardId = "" } = useParams<{ boardId: string }>();

  const board = useBoardStore((s) => s.boards.find((b) => b.id === boardId));
  const renameBoard = useBoardStore((s) => s.renameBoard);
  const removeImage = useBoardStore((s) => s.removeImage);

  const [renameModalOpen, setRenameModalOpen] = useState(false);

  if (!board) {
    return (
      <EmptyState
        icon="⚠️"
        title="ไม่พบบอร์ดนี้"
        description="บอร์ดที่คุณต้องการดูอาจถูกลบหรือไม่มีอยู่ในระบบ"
        action={
          <Link to="/boards" className="btn btn-primary btn-sm">
            กลับหน้าบอร์ดทั้งหมด
          </Link>
        }
      />
    );
  }

  const handleRemoveImage = (image: ImageSummary | SavedImage) => {
    removeImage(board.id, image.id);
  };

  const handleRenameSubmit = (name: string, description?: string) => {
    renameBoard(board.id, name, description);
  };

  return (
    <div className="space-y-6">
      {/* ลิงก์ย้อนกลับ */}
      <div>
        <Link
          to="/boards"
          className="btn btn-ghost btn-sm gap-2 text-base-content/80 hover:text-base-content"
        >
          ← บอร์ดทั้งหมด
        </Link>
      </div>

      {/* [แก้ไข] รูปลักษณ์การจัดวางส่วนหัวบอร์ด */}
      <header className="bg-base-100 p-6 rounded-box shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1 max-w-2xl">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-3xl font-bold text-base-content">{board.name}</h1>
            <span className="badge badge-secondary badge-sm font-medium">
              {board.images.length} รูป
            </span>
          </div>
          {board.description && (
            <p className="text-sm text-base-content/70">{board.description}</p>
          )}
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => setRenameModalOpen(true)}
            className="btn btn-outline btn-sm gap-1"
          >
            ✏️ เปลี่ยนชื่อ
          </button>
          <Link
            to={`/credits?board=${board.id}`}
            className="btn btn-primary btn-sm gap-1"
          >
            📋 สร้างเครดิตบอร์ดนี้
          </Link>
        </div>
      </header>

      {/* รายการรูปภาพในบอร์ด */}
      {board.images.length === 0 ? (
        <EmptyState
          icon="📁"
          title="บอร์ดนี้ยังว่าง"
          description="คุณยังไม่ได้บันทึกรูปภาพใดๆ ลงในบอร์ดนี้ ไปสำรวจและค้นหารูปภาพที่ถูกใจกันเถอะ"
          action={
            <Link to="/" className="btn btn-primary btn-sm">
              ไปค้นหารูป
            </Link>
          }
        />
      ) : (
        <ImageGrid
          images={board.images}
          variant="board"
          onAction={handleRemoveImage}
        />
      )}

      {/* หน้าต่างแก้ไขชื่อบอร์ด */}
      <BoardFormModal
        open={renameModalOpen}
        mode="rename"
        initial={{ name: board.name, description: board.description }}
        onClose={() => setRenameModalOpen(false)}
        onSubmit={handleRenameSubmit}
      />
    </div>
  );
}
