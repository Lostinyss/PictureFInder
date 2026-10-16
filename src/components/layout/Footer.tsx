// Footer.tsx: ส่วนท้ายหน้าเว็บ แสดงข้อมูลลิขสิทธิ์และที่มาของข้อมูลรูปภาพ
// Props: ไม่มี

export function Footer() {
  return (
    <footer className="footer footer-center p-6 bg-base-100 text-sm text-base-content/80 border-t border-base-300">
      <aside className="space-y-1">
        <p>
          Images provided by{" "}
          <a
            href="https://openverse.org"
            target="_blank"
            rel="noopener noreferrer"
            className="link link-primary font-medium underline underline-offset-2 hover:opacity-80"
          >
            Openverse
          </a>
        </p>
        <p className="text-xs text-base-content/60">
          {/* [แก้ไข] ข้อความเครดิตและปีลิขสิทธิ์ */}
          © 2025 GetPic – Mini Project
        </p>
      </aside>
    </footer>
  );
}
