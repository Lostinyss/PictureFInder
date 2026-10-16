// BoardsPage.tsx: หน้ารวมบอร์ด Moodboard ทั้งหมดของผู้ใช้ พร้อมปุ่มสร้างบอร์ด จัดการแก้ไข และลบบอร์ด
// Props: ไม่มี (ดึงข้อมูลจาก useBoardStore)

import { useState } from "react";
import type { Board } from "../types/image";
import { useBoardStore } from "../store/useBoardStore";
import { BoardCard } from "../components/board/BoardCard";
import { BoardFormModal } from "../components/board/BoardFormModal";
import { ConfirmDialog } from "../components/board/ConfirmDialog";
import { EmptyState } from "../components/feedback/EmptyState";

export function BoardsPage() {
  const boards = useBoardStore((s) => s.boards);
  const createBoard = useBoardStore((s) => s.createBoard);
  const renameBoard = useBoardStore((s) => s.renameBoard);
  const deleteBoard = useBoardStore((s) => s.deleteBoard);

  const [formModalOpen, setFormModalOpen] = useState(false);
  const [formMode, setFormMode] = useState<"create" | "rename">("create");
  const [activeBoard, setActiveBoard] = useState<Board | null>(null);

  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [boardToDelete, setBoardToDelete] = useState<Board | null>(null);

  const handleOpenCreate = () => {
    setFormMode("create");
    setActiveBoard(null);
    setFormModalOpen(true);
  };

  const handleOpenRename = (board: Board) => {
    setFormMode("rename");
    setActiveBoard(board);
    setFormModalOpen(true);
  };

  const handleFormSubmit = (name: string, description?: string) => {
    if (formMode === "create") {
      createBoard(name, description);
    } else if (formMode === "rename" && activeBoard) {
      renameBoard(activeBoard.id, name, description);
    }
  };

  const handleOpenDelete = (board: Board) => {
    setBoardToDelete(board);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (boardToDelete) {
      deleteBoard(boardToDelete.id);
      setBoardToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* ส่วนหัวหน้าเว็บ: ชื่อหน้าและปุ่มสร้างบอร์ด */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-base-content">
            บอร์ดของฉัน ({boards.length})
          </h1>
          <p className="text-sm text-base-content/70 mt-1">
            จัดการคอลเลกชันรูปภาพที่คุณชื่นชอบสำหรับใช้งานและสร้างเครดิต
          </p>
        </div>
        <button
          type="button"
          onClick={handleOpenCreate}
          className="btn btn-primary btn-sm sm:btn-md gap-1"
        >
          + สร้างบอร์ด
        </button>
      </header>

      {/* เนื้อหาบอร์ด */}
      {boards.length === 0 ? (
        <EmptyState
          icon="📁"
          title="ยังไม่มีบอร์ด"
          description="เริ่มต้นรวบรวมรูปภาพที่คุณสนใจโดยการสร้างบอร์ดแรกของคุณตอนนี้"
          action={
            <button
              type="button"
              onClick={handleOpenCreate}
              className="btn btn-primary btn-sm"
            >
              สร้างบอร์ดแรก
            </button>
          }
        />
      ) : (
        /* [แก้ไข] การจัดคอลัมน์ของบอร์ด */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {boards.map((board) => (
            <BoardCard
              key={board.id}
              board={board}
              onRename={handleOpenRename}
              onDelete={handleOpenDelete}
            />
          ))}
        </div>
      )}

      {/* หน้าต่างฟอร์มสร้าง/เปลี่ยนชื่อบอร์ด */}
      <BoardFormModal
        open={formModalOpen}
        mode={formMode}
        initial={
          activeBoard
            ? { name: activeBoard.name, description: activeBoard.description }
            : undefined
        }
        onClose={() => {
          setFormModalOpen(false);
          setActiveBoard(null);
        }}
        onSubmit={handleFormSubmit}
      />

      {/* หน้าต่างยืนยันการลบบอร์ด */}
      <ConfirmDialog
        open={deleteConfirmOpen}
        title="ยืนยันการลบบอร์ด"
        message={`ลบบอร์ด “${boardToDelete?.name ?? ""}” และรูปทั้งหมดในบอร์ดใช่ไหม?`}
        confirmText="ลบบอร์ด"
        onConfirm={handleConfirmDelete}
        onClose={() => {
          setDeleteConfirmOpen(false);
          setBoardToDelete(null);
        }}
      />
    </div>
  );
}
