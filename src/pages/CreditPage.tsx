// CreditPage.tsx: หน้าสร้างข้อความให้เครดิตผู้สร้างสรรค์อัตโนมัติ รองรับรูปแบบ Plain Text, HTML และ Markdown
// Props: ไม่มี (อ่านค่าบอร์ดจาก ?board=<id> และ useBoardStore)

import { useState } from "react";
import { Link, useSearchParams } from "react-router";
import type { CreditFormat, SavedImage } from "../types/image";
import { useBoardStore } from "../store/useBoardStore";
import { buildCredit } from "../utils/credit";
import { LICENSES } from "../utils/license";
import { EmptyState } from "../components/feedback/EmptyState";
import { Toast, useToast } from "../components/feedback/Toast";

export function CreditPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  // [แก้ไข] รูปแบบเครดิตเริ่มต้น ("text" | "html" | "markdown")
  const [format, setFormat] = useState<CreditFormat>("text");
  const { message: toastMessage, show: showToast } = useToast();

  const boards = useBoardStore((s) => s.boards);

  // เลือกรหัสบอร์ดจาก URL หรือใช้บอร์ดแรกเป็นค่าเริ่มต้น
  const selectedBoardId = searchParams.get("board") || (boards[0]?.id ?? "");
  const currentBoard = boards.find((b) => b.id === selectedBoardId);

  const handleSelectBoard = (boardId: string) => {
    setSearchParams({ board: boardId });
  };

  const copyToClipboard = async (text: string, successMsg: string) => {
    try {
      await navigator.clipboard.writeText(text);
      showToast(successMsg);
    } catch {
      showToast("ไม่สามารถคัดลอกได้");
    }
  };

  const handleCopySingle = (image: SavedImage) => {
    const text = buildCredit(image, format);
    copyToClipboard(text, "คัดลอกเครดิตรูปนี้แล้ว ✓");
  };

  const handleCopyAll = () => {
    if (!currentBoard || currentBoard.images.length === 0) return;
    const allCredits = currentBoard.images
      .map((img) => buildCredit(img, format))
      .join("\n");
    copyToClipboard(allCredits, "คัดลอกเครดิตทั้งหมดแล้ว ✓");
  };

  return (
    <div className="space-y-6">
      {/* ส่วนหัวหน้าเว็บ */}
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-base-content">
          สร้างเครดิตอัตโนมัติ
        </h1>
        <p className="text-sm text-base-content/70 max-w-3xl leading-relaxed">
          การระบุแหล่งที่มาและให้เกียรติผู้สร้างสรรค์ (Attribution) เป็นข้อกำหนดสำคัญภายใต้สัญญาอนุญาต
          Creative Commons เพื่อสนับสนุนวัฒนธรรมการแบ่งปันผลงานอย่างถูกต้องตามกฎหมาย
        </p>
      </header>

      {/* ตรวจสอบกรณีไม่มีบอร์ดใดๆ เลย */}
      {boards.length === 0 ? (
        <EmptyState
          icon="📁"
          title="ยังไม่มีบอร์ดสำหรับสร้างเครดิต"
          description="กรุณาสร้างบอร์ดและบันทึกรูปภาพที่ต้องการก่อนสร้างข้อความให้เครดิต"
          action={
            <Link to="/boards" className="btn btn-primary btn-sm">
              ไปที่หน้าบอร์ด
            </Link>
          }
        />
      ) : (
        <>
          {/* แถวเครื่องมือควบคุม: เลือกบอร์ด, เลือกรูปแบบ tab, ปุ่มคัดลอกทั้งหมด */}
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between bg-base-100 p-4 rounded-box shadow-sm">
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center flex-1">
              {/* ตัวเลือกเลือกบอร์ด */}
              <div className="form-control min-w-[200px]">
                <label className="label py-1">
                  <span className="label-text text-xs text-base-content/70">เลือกบอร์ด</span>
                </label>
                <select
                  value={selectedBoardId}
                  onChange={(e) => handleSelectBoard(e.target.value)}
                  className="select select-sm w-full bg-base-100"
                >
                  {boards.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name} ({b.images.length} รูป)
                    </option>
                  ))}
                </select>
              </div>

              {/* แท็บเลือกรูปแบบเครดิต (DaisyUI v5 ใช้ tabs-box) */}
              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text text-xs text-base-content/70">รูปแบบเครดิต</span>
                </label>
                <div role="tablist" className="tabs tabs-box">
                  <button
                    type="button"
                    role="tab"
                    className={`tab ${format === "text" ? "tab-active" : ""}`}
                    onClick={() => setFormat("text")}
                  >
                    ข้อความธรรมดา
                  </button>
                  <button
                    type="button"
                    role="tab"
                    className={`tab ${format === "html" ? "tab-active" : ""}`}
                    onClick={() => setFormat("html")}
                  >
                    HTML
                  </button>
                  <button
                    type="button"
                    role="tab"
                    className={`tab ${format === "markdown" ? "tab-active" : ""}`}
                    onClick={() => setFormat("markdown")}
                  >
                    Markdown
                  </button>
                </div>
              </div>
            </div>

            {/* ปุ่มคัดลอกทั้งหมด */}
            <div className="sm:self-end">
              <button
                type="button"
                onClick={handleCopyAll}
                disabled={!currentBoard || currentBoard.images.length === 0}
                className="btn btn-primary btn-sm w-full sm:w-auto gap-1"
              >
                📋 คัดลอกทั้งหมด
              </button>
            </div>
          </div>

          {/* รายการเครดิตของรูปภาพในบอร์ด */}
          {!currentBoard || currentBoard.images.length === 0 ? (
            <EmptyState
              icon="🔍"
              title="บอร์ดนี้ยังไม่มีรูปภาพ"
              description="ค้นหาและบันทึกรูปภาพลงในบอร์ดนี้เพื่อสร้างข้อความให้เครดิต"
              action={
                <Link to="/" className="btn btn-primary btn-sm">
                  ไปค้นหารูป
                </Link>
              }
            />
          ) : (
            <div className="space-y-3">
              {currentBoard.images.map((image) => {
                const creditText = buildCredit(image, format);
                const licenseInfo = LICENSES[image.license];
                const isNoAttributionRequired = licenseInfo && !licenseInfo.attribution;

                return (
                  <div
                    key={image.id}
                    className="flex flex-col sm:flex-row gap-3 items-start sm:items-center p-3 bg-base-100 rounded-box shadow-xs border border-base-200"
                  >
                    <img
                      src={image.thumbnail}
                      alt={image.title ?? "ภาพในบอร์ด"}
                      loading="lazy"
                      className="w-16 h-16 object-cover rounded shrink-0 bg-base-300"
                    />

                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-xs text-base-content/80">
                          {image.title ?? "ไม่มีชื่อภาพ"}
                        </span>
                        {isNoAttributionRequired && (
                          <span className="badge badge-success badge-sm font-medium">
                            ไม่บังคับให้เครดิต
                          </span>
                        )}
                      </div>
                      <p className="font-mono text-sm break-words text-base-content/90 bg-base-200 p-2 rounded">
                        {creditText}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleCopySingle(image)}
                      className="btn btn-ghost btn-xs gap-1 self-end sm:self-center"
                    >
                      📋 คัดลอก
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* Toast แจ้งเตือนเมื่อคัดลอก */}
      <Toast message={toastMessage} />
    </div>
  );
}
