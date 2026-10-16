// Navbar.tsx: แถบนำทางหลักด้านบนของเว็บไซต์ รองรับทั้งหน้าจอเดสก์ท็อปและมือถือ
// Props: ไม่มี (ดึงจำนวนบอร์ดจาก useBoardStore ผ่าน selector)

import { useState } from "react";
import { Link, NavLink } from "react-router";
import { useBoardStore } from "../../store/useBoardStore";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const boardsCount = useBoardStore((s) => s.boards.length);

  // [แก้ไข] รายการเมนูหลักและเส้นทาง URL
  const navLinks = [
    { label: "ค้นหา", to: "/", end: true },
    { label: "บอร์ดของฉัน", to: "/boards", badge: boardsCount > 0 ? boardsCount : null },
    { label: "สร้างเครดิต", to: "/credits" },
    { label: "เกี่ยวกับ", to: "/about" },
  ];

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="navbar bg-base-100 shadow-sm sticky top-0 z-30 px-4 sm:px-6 lg:px-8">
      {/* ฝั่งซ้าย: โลโก้เว็บไซต์ */}
      <div className="flex-1">
        <Link to="/" className="text-2xl font-bold text-primary hover:opacity-90 transition">
          {/* [แก้ไข] ชื่อแบรนด์ / โลโก้ */}
          GetPic
        </Link>
      </div>

      {/* ฝั่งขวา (จอเดสก์ท็อป >= md): เมนูแนวนอน */}
      <nav className="hidden md:flex items-center gap-1">
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) =>
              `px-3 py-2 rounded-btn text-sm font-medium transition flex items-center gap-1.5 ${
                isActive
                  ? "text-primary font-semibold bg-primary/10"
                  : "text-base-content/80 hover:text-base-content hover:bg-base-200"
              }`
            }
          >
            <span>{link.label}</span>
            {link.badge !== null && (
              <span className="badge badge-secondary badge-sm">{link.badge}</span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* ฝั่งขวา (จอมือถือ < md): ปุ่ม Hamburger dropdown */}
      <div className="md:hidden relative">
        <button
          type="button"
          aria-label="เปิดเมนูหลัก"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="btn btn-ghost btn-circle text-lg"
        >
          ☰
        </button>

        {mobileMenuOpen && (
          <ul
            className="menu menu-sm absolute right-0 mt-3 p-2 shadow-lg bg-base-100 rounded-box w-52 z-50 border border-base-300"
            role="menu"
          >
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.end}
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    `flex justify-between items-center py-2 ${
                      isActive ? "text-primary font-semibold active" : ""
                    }`
                  }
                >
                  <span>{link.label}</span>
                  {link.badge !== null && (
                    <span className="badge badge-secondary badge-sm">{link.badge}</span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        )}
      </div>
    </header>
  );
}
