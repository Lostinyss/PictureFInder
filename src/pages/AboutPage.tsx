// AboutPage.tsx: หน้าเกี่ยวกับโครงการ ข้อมูลทีมผู้พัฒนา แหล่งที่มาของ API คู่มือ Creative Commons และวิธีใช้งาน
// Props: ไม่มี

import { useState } from "react";
import { LICENSES, type LicenseCode } from "../utils/license";
import { LicenseBadge } from "../components/image/LicenseBadge";

// [แก้ไข] ข้อมูลสมาชิกทีมผู้พัฒนา
interface Member {
  name: string;
  studentId: string;
  role: string;
  photo: string;
}

const MEMBERS: Member[] = [
  {
    name: "ธนวรรธน์ พจน์พริ้ง",
    studentId: "65010001",
    role: "Frontend Developer",
    photo: "/members/1.jpg",
  },
  {
    name: "กิตติศักดิ์ เจริญสุข",
    studentId: "65010002",
    role: "UI/UX Designer",
    photo: "/members/2.jpg",
  },
  {
    name: "วิภาดา สดใส",
    studentId: "65010003",
    role: "Project Coordinator",
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
  const licenseList = Object.keys(LICENSES) as LicenseCode[];

  return (
    <div className="space-y-12">
      {/* 1. ส่วนหัวและทีมผู้พัฒนา */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-base-content mb-2">ทีมผู้พัฒนา</h1>
          <p className="text-sm text-base-content/70">
            โปรเจกต์มินิโปรเจกต์ค้นหารูปภาพและจัดการลิขสิทธิ์สร้างสรรค์
          </p>
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

      {/* 2. แหล่งข้อมูล (ห้ามขาด) */}
      <section>
        <div className="card bg-base-100 shadow p-6 border border-base-200 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌐</span>
            <h2 className="text-xl font-bold text-base-content">
              ข้อมูลรูปภาพจาก Openverse API
            </h2>
          </div>
          <p className="text-sm text-base-content/80 leading-relaxed">
            ระบบ GetPic ดึงข้อมูลรูปภาพสาธารณสมบัติและสัญญาอนุญาตเปิดผ่านบริการของ Openverse
            ซึ่งรวบรวมผลงานลิขสิทธิ์เปิดกว้างจากแหล่งจัดเก็บภาพชั้นนำทั่วโลก
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="https://openverse.org"
              target="_blank"
              rel="noopener noreferrer"
              className="link link-primary font-medium inline-flex items-center gap-1 text-sm"
            >
              เว็บไซต์ Openverse ↗
            </a>
            <a
              href="https://api.openverse.org/v1/"
              target="_blank"
              rel="noopener noreferrer"
              className="link link-primary font-medium inline-flex items-center gap-1 text-sm"
            >
              เอกสาร Openverse API v1 ↗
            </a>
          </div>
        </div>
      </section>

      {/* 3. คู่มือ Creative Commons */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-base-content">
            คู่มือสัญญาอนุญาต Creative Commons
          </h2>
          <p className="text-sm text-base-content/70">
            ทำความเข้าใจความหมายและเงื่อนไขการใช้งานของสัญลักษณ์แต่ละประเภท
          </p>
        </div>

        <div className="overflow-x-auto bg-base-100 rounded-box shadow border border-base-200">
          <table className="table table-zebra w-full text-sm">
            <thead>
              <tr className="bg-base-200 text-base-content">
                <th>License</th>
                <th className="text-center">เชิงพาณิชย์</th>
                <th className="text-center">ดัดแปลง</th>
                <th className="text-center">ต้องให้เครดิต</th>
                <th className="text-center">Share-alike</th>
                <th>คำอธิบาย</th>
              </tr>
            </thead>
            <tbody>
              {licenseList.map((code) => {
                const info = LICENSES[code];
                return (
                  <tr key={code}>
                    <td className="whitespace-nowrap font-medium">
                      <LicenseBadge code={code} size="sm" />
                    </td>
                    <td className="text-center">
                      <span className={info.commercial ? "text-success font-bold" : "text-error font-bold"}>
                        {info.commercial ? "✓" : "✗"}
                      </span>
                    </td>
                    <td className="text-center">
                      <span className={info.modify ? "text-success font-bold" : "text-error font-bold"}>
                        {info.modify ? "✓" : "✗"}
                      </span>
                    </td>
                    <td className="text-center">
                      <span className={info.attribution ? "text-success font-bold" : "text-error font-bold"}>
                        {info.attribution ? "✓" : "✗"}
                      </span>
                    </td>
                    <td className="text-center">
                      <span className={info.shareAlike ? "text-success font-bold" : "text-error font-bold"}>
                        {info.shareAlike ? "✓" : "✗"}
                      </span>
                    </td>
                    <td className="text-xs text-base-content/80">{info.description}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. วิธีใช้งาน 4 ขั้นตอน */}
      <section className="space-y-6">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-2xl font-bold text-base-content mb-1">
            วิธีใช้งาน GetPic
          </h2>
          <p className="text-sm text-base-content/70">
            เพียง 4 ขั้นตอนง่ายๆ ในการค้นหาและนำรูปไปใช้อย่างถูกต้อง
          </p>
        </div>

        <div className="bg-base-100 p-6 rounded-box shadow border border-base-200">
          <ul className="steps steps-vertical lg:steps-horizontal w-full">
            <li className="step step-primary">
              <div className="text-left lg:text-center mt-2">
                <p className="font-semibold text-sm">1. ค้นหา</p>
                <p className="text-xs text-base-content/60">ค้นหารูปภาพตามคำและตัวกรอง</p>
              </div>
            </li>
            <li className="step step-primary">
              <div className="text-left lg:text-center mt-2">
                <p className="font-semibold text-sm">2. เข้าใจ License</p>
                <p className="text-xs text-base-content/60">ตรวจสอบเงื่อนไขและสิทธิ์</p>
              </div>
            </li>
            <li className="step step-primary">
              <div className="text-left lg:text-center mt-2">
                <p className="font-semibold text-sm">3. บันทึกลงบอร์ด</p>
                <p className="text-xs text-base-content/60">จัดกลุ่มภาพใน Moodboard</p>
              </div>
            </li>
            <li className="step step-primary">
              <div className="text-left lg:text-center mt-2">
                <p className="font-semibold text-sm">4. สร้างเครดิต</p>
                <p className="text-xs text-base-content/60">คัดลอกข้อความอ้างอิง</p>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
