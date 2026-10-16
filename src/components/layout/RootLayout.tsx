// RootLayout.tsx: โครงสร้างหลักของทุกหน้าในระบบ รวม Navbar, Main Content, Footer และ ScrollRestoration
// Props: ไม่มี (แสดงผลหน้าย่อยผ่าน <Outlet /> ของ React Router)

import { Outlet, ScrollRestoration } from "react-router";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-base-200 text-base-content antialiased">
      <Navbar />
      {/* [แก้ไข] ความกว้างสูงสุดและ padding ของส่วนเนื้อหา */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  );
}
