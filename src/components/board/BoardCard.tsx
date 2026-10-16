// BoardCard.tsx: การ์ดแสดงข้อมูลบอร์ด พร้อมภาพปกแบบ Collage 4 รูป และเมนูจัดการบอร์ด
// Props: {
//   board: Board;
//   onRename: (board: Board) => void;
//   onDelete: (board: Board) => void;
// }

import { Link } from "react-router";
import type { Board } from "../../types/image";

interface BoardCardProps {
  board: Board;
  onRename: (board: Board) => void;
  onDelete: (board: Board) => void;
}

export function BoardCard({ board, onRename, onDelete }: BoardCardProps) {
  // สร้าง array ขนาด 4 สำหรับ collage ช่องที่ไม่มีรูปให้เป็น null
  const coverImages = [
    board.images[0] ?? null,
    board.images[1] ?? null,
    board.images[2] ?? null,
    board.images[3] ?? null,
  ];

  const dateFormatted = new Date(board.createdAt).toLocaleDateString("th-TH", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="card bg-base-100 shadow hover:shadow-lg transition flex flex-col overflow-hidden">
      {/* ปก Collage 4 รูป */}
      <Link
        to={`/boards/${board.id}`}
        className="grid grid-cols-2 aspect-video overflow-hidden rounded-t-box bg-base-300 relative group"
        aria-label={`เปิดบอร์ด ${board.name}`}
      >
        {coverImages.map((img, idx) => (
          <div key={idx} className="relative w-full h-full overflow-hidden bg-base-300">
            {img ? (
              <img
                src={img.thumbnail}
                alt={img.title ?? `รูปที่ ${idx + 1}`}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full bg-base-300 flex items-center justify-center text-base-content/20 text-xs">
                {idx === 0 && board.images.length === 0 ? "ไม่มีรูปภาพ" : ""}
              </div>
            )}
          </div>
        ))}
      </Link>

      {/* รายละเอียดการ์ดบอร์ด */}
      <div className="card-body p-4 flex-1 flex flex-col justify-between">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <Link
              to={`/boards/${board.id}`}
              className="font-bold text-lg text-base-content hover:text-primary transition truncate block"
              title={board.name}
            >
              {board.name}
            </Link>
            {board.description && (
              <p className="text-xs text-base-content/70 line-clamp-2 mt-1">
                {board.description}
              </p>
            )}
          </div>

          {/* เมนู ⋮ Dropdown */}
          <div className="dropdown dropdown-end">
            <button
              type="button"
              tabIndex={0}
              aria-label="ตัวเลือกบอร์ด"
              className="btn btn-ghost btn-circle btn-sm text-base"
            >
              ⋮
            </button>
            <ul
              tabIndex={0}
              className="dropdown-content menu menu-sm bg-base-100 rounded-box z-20 w-44 p-2 shadow-lg border border-base-200"
            >
              <li>
                <button
                  type="button"
                  onClick={() => onRename(board)}
                  className="flex items-center gap-2 py-2"
                >
                  <span>✏️</span>
                  <span>เปลี่ยนชื่อ</span>
                </button>
              </li>
              <li>
                <Link
                  to={`/credits?board=${board.id}`}
                  className="flex items-center gap-2 py-2"
                >
                  <span>📋</span>
                  <span>สร้างเครดิต</span>
                </Link>
              </li>
              <li className="border-t border-base-200 mt-1 pt-1">
                <button
                  type="button"
                  onClick={() => onDelete(board)}
                  className="flex items-center gap-2 py-2 text-error"
                >
                  <span>✕</span>
                  <span>ลบ</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* ข้อมูลจำนวนรูปและวันที่ */}
        <div className="flex items-center justify-between text-xs text-base-content/60 pt-3 border-t border-base-200 mt-3">
          <span className="badge badge-sm badge-ghost font-medium">
            {board.images.length} รูป
          </span>
          <span>สร้างเมื่อ {dateFormatted}</span>
        </div>
      </div>
    </div>
  );
}
