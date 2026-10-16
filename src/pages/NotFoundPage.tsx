// NotFoundPage.tsx: หน้าแสดงข้อผิดพลาดเมื่อไม่พบ URL ที่ระบุ (404 Not Found)
// Props: ไม่มี

import { Link } from "react-router";

export function NotFoundPage() {
  return (
    <div className="text-center py-24 px-4 flex flex-col items-center justify-center">
      {/* [แก้ไข] รหัสข้อผิดพลาดและขนาดตัวอักษร */}
      <h1 className="text-7xl font-bold text-primary tracking-tight mb-4">404</h1>
      {/* [แก้ไข] ข้อความแจ้งเตือน */}
      <p className="text-xl sm:text-2xl font-medium text-base-content/80 mb-2">
        ไม่พบหน้าที่คุณต้องการ
      </p>
      <p className="text-sm text-base-content/60 max-w-md mb-8">
        หน้าที่คุณกำลังค้นหาอาจถูกย้าย ลบ หรือที่อยู่ URL ไม่ถูกต้อง
      </p>
      <Link to="/" className="btn btn-primary">
        กลับหน้าหลัก
      </Link>
    </div>
  );
}
