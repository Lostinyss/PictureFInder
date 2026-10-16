// SearchBar.tsx: กล่องค้นหาคำหลักพร้อมปุ่มค้นหา ไม่ยอมรับค่าว่าง
// Props: { defaultValue?: string; onSearch: (q: string) => void }

import { useEffect, useState } from "react";

interface SearchBarProps {
  defaultValue?: string;
  onSearch: (q: string) => void;
}

export function SearchBar({ defaultValue = "", onSearch }: SearchBarProps) {
  const [query, setQuery] = useState(defaultValue);

  useEffect(() => {
    setQuery(defaultValue);
  }, [defaultValue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    onSearch(trimmed);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto my-4">
      {/* [แก้ไข] ความกว้างและรูปแบบกล่องค้นหา */}
      <div className="join w-full shadow-sm">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ค้นหารูปภาพฟรีถูกลิขสิทธิ์ เช่น ภูเขา, ดอกไม้, คาเฟ่..."
          className="input join-item flex-1 bg-base-100 focus:outline-none"
          aria-label="คำค้นหารูปภาพ"
        />
        <button
          type="submit"
          className="btn btn-primary join-item px-6"
          disabled={!query.trim()}
        >
          {/* [แก้ไข] ข้อความบนปุ่มค้นหา */}
          <span>🔍 ค้นหา</span>
        </button>
      </div>
    </form>
  );
}
