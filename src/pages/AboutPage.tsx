// AboutPage.tsx: ข้อมูลทีมผู้พัฒนา
// Props: ไม่มี

import { useState } from "react";

// [แก้ไข] ข้อมูลสมาชิกทีมผู้พัฒนา
interface Member {
  name: string;
  studentId: string;
  role: string;
  photo: string;
}

const MEMBERS: Member[] = [
  {
    name: "กิตติกร มานิมนต์",
    studentId: "1660707413",
    role: "developer",
    photo: "/members/1.jpg",
  },
  {
    name: "ธนวันต์ โพธี",
    studentId: "1660703149",
    role: "UI design",
    photo: "/members/2.jpg",
  },
  {
    name: "อภิศักดิ์ พันฤทธิ์",
    studentId: "1660703099",
    role: "developer",
    photo: "/members/3.jpg",
  },
];

function MemberAvatar({ member }: { member: Member }) {
  const [imgFailed, setImgFailed] = useState(false);
  const initial = member.name.charAt(0);

  return (
    <div className="avatar mb-4">
      <div className="w-28 h-28 rounded-full ring-2 ring-primary ring-offset-2 overflow-hidden bg-base-300 flex items-center justify-center">
        {imgFailed ? (
          <span className="text-3xl font-bold text-primary select-none">
            {initial}
          </span>
        ) : (
          <img
            src={member.photo}
            alt={member.name}
            loading="lazy"
            onError={() => setImgFailed(true)}
            className="w-full h-full object-cover"
          />
        )}
      </div>
    </div>
  );
}

export function AboutPage() {
  return (
    <div className="space-y-6">
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-base-content mb-2">ทีมผู้พัฒนา</h1>
        </div>

        {/* การ์ดสมาชิก 3 คน */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MEMBERS.map((member) => (
            <div
              key={member.studentId}
              className="card bg-base-100 shadow items-center text-center p-6 border border-base-200"
            >
              <MemberAvatar member={member} />
              <h3 className="font-bold text-lg text-base-content">{member.name}</h3>
              <p className="text-xs text-base-content/60 font-mono mt-0.5">
                รหัสนักศึกษา: {member.studentId}
              </p>
              <div className="mt-3">
                <span className="badge badge-outline badge-primary text-xs">
                  {member.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
