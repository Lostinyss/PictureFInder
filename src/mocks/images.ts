import type { Board, ImageSummary, SavedImage } from "../types/image";
import type { LicenseCode } from "../utils/license";

// [แก้ไข] เปลี่ยนค่านี้เพื่อทดสอบสถานะต่างๆ ของ UI: "success" | "loading" | "error" | "empty"
export const MOCK_STATE: "success" | "loading" | "error" | "empty" = "success";

const LICENSE_LIST: LicenseCode[] = [
  "cc0",
  "pdm",
  "by",
  "by-sa",
  "by-nd",
  "by-nc",
  "by-nc-sa",
  "by-nc-nd",
];

const SAMPLE_TITLES = [
  "วิวภูเขายามเช้าหมอกหนา",
  "ทุ่งดอกไม้ป่าสีสันสดใส",
  "ทะเลสาบสงบสะท้อนแสงแดด",
  null,
  "ป่าเขตร้อนหลังฝนตก",
  "สถาปัตยกรรมโมเดิร์นมินิมอล",
  "สัตว์ป่าในเขตอนุรักษ์ธรรมชาติ",
  "น้ำตกกลางหุบเขาลึก",
  null,
  "เส้นทางเดินป่าสายหมอก",
  "ท้องฟ้ายามเย็นแสงทไวไลท์",
  "ทุ่งหญ้าสะวันนาและกวางป่า",
  "คลื่นทะเลซัดชายหาดสีทอง",
  "ใบไม้เปลี่ยนสีในฤดูใบไม้ร่วง",
  null,
  "ดอกซากุระบานสะพรั่งริมแม่น้ำ",
  "สตรีทอาร์ตในเมืองหลวง",
  "แมวส้มผ่อนคลายบนหน้าต่าง",
  "สะพานแขวนข้ามหุบเขา",
  "กาแฟหอมกรุ่นในคาเฟ่อบอุ่น",
  null,
  "ภูเขาไฟฟูจิสะท้อนผิวน้ำ",
  "แสงเหนือออโรร่าระยิบระยับ",
  "ตลาดน้ำและวิถีชีวิตริมคลอง",
];

const SAMPLE_CREATORS = [
  "Somchai Natthaphol",
  "Alex Rivera",
  null,
  "Emily Watson",
  "Takeshi Tanaka",
  null,
  "Chitraphon K.",
  "David Miller",
  "Maria Garcia",
  null,
  "Liam O'Connor",
  "Pornchai S.",
  "Ananya Sharma",
  null,
  "Sophie Bernard",
  "Kornkamon W.",
  "Lucas Silva",
  "Elena Rostova",
  null,
  "Kenji Sato",
  "Wichai Art",
  "Chloe Dupont",
  null,
  "Nattapong Photo",
];

const TAG_POOLS = [
  ["ธรรมชาติ", "ภูเขา", "หมอก", "วิวสวย", "ท่องเที่ยว"],
  ["ดอกไม้", "สวน", "สีสัน", "ฤดูใบไม้ผลิ"],
  ["ทะเลสาบ", "น้ำ", "สะท้อน", "เงียบสงบ", "ธรรมชาติ"],
  ["ป่า", "ต้นไม้", "เขียวขจี", "ฤดูฝน"],
  ["สถาปัตยกรรม", "ตึก", "เมือง", "การออกแบบ", "มินิมอล"],
  ["สัตว์ป่า", "สัตว์น่ารัก", "ธรรมชาติ", "สิ่งแวดล้อม"],
  ["น้ำตก", "ธารน้ำ", "ความสดชื่น", "ป่าเขา"],
  ["แสงเย็น", "พระอาทิตย์ตก", "ท้องฟ้า", "ทไวไลท์", "อบอุ่น"],
];

export const MOCK_IMAGES: ImageSummary[] = Array.from({ length: 24 }, (_, index) => {
  const n = index + 1;
  const license = LICENSE_LIST[index % LICENSE_LIST.length];
  const title = SAMPLE_TITLES[index];
  const creator = SAMPLE_CREATORS[index];
  const tags = TAG_POOLS[index % TAG_POOLS.length].map((name) => ({ name }));

  return {
    id: `mock-${n}`,
    title,
    thumbnail: `https://picsum.photos/seed/getpic${n}/400/400`,
    url: `https://picsum.photos/seed/getpic${n}/1200/800`,
    creator,
    creator_url: creator ? `https://example.com/user/creator-${n}` : null,
    license,
    license_version: license === "cc0" || license === "pdm" ? "1.0" : "4.0",
    license_url: `https://creativecommons.org/licenses/${license}/4.0/`,
    foreign_landing_url: `https://openverse.org/image/mock-${n}`,
    provider: index % 3 === 0 ? "flickr" : index % 3 === 1 ? "wikimedia" : "rawpixel",
    width: 1200,
    height: 800,
    tags,
  };
});

// ฟังก์ชันแปลง ImageSummary เป็น SavedImage สำหรับใส่ใน mock board
function toMockSaved(img: ImageSummary): SavedImage {
  return {
    id: img.id,
    title: img.title,
    thumbnail: img.thumbnail,
    creator: img.creator,
    creator_url: img.creator_url,
    license: img.license,
    license_version: img.license_version,
    license_url: img.license_url,
    foreign_landing_url: img.foreign_landing_url,
  };
}

export const MOCK_BOARDS: Board[] = [
  {
    id: "board-1",
    name: "วิวธรรมชาติและทิวทัศน์",
    description: "รวมภาพธรรมชาติ ภูเขา และทะเลสำหรับโปรเจกต์นำเสนอ",
    createdAt: Date.now() - 86400000 * 3, // 3 วันก่อน
    images: MOCK_IMAGES.slice(0, 5).map(toMockSaved), // 5 รูป
  },
  {
    id: "board-2",
    name: "สถาปัตยกรรมและมินิมอล",
    description: "ไอเดียโทนสีและงานออกแบบสถาปัตยกรรมสมัยใหม่",
    createdAt: Date.now() - 86400000 * 1, // 1 วันก่อน
    images: MOCK_IMAGES.slice(5, 6).map(toMockSaved), // 1 รูป
  },
];
