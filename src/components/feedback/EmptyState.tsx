// EmptyState.tsx: แสดงผลเมื่อไม่พบข้อมูล ข้อมูลว่างเปล่า หรือผลการค้นหาเป็น 0
// Props: { icon: React.ReactNode; title: string; description?: string; action?: React.ReactNode }

import type { ReactNode } from "react";

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="text-center py-16 px-4 flex flex-col items-center justify-center">
      {/* [แก้ไข] ขนาดและสีของไอคอนสถานะว่างเปล่า */}
      <div className="text-5xl mb-4 select-none opacity-80">{icon}</div>
      <h3 className="text-xl font-semibold text-base-content mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-base-content/70 max-w-md mb-6">{description}</p>
      )}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
