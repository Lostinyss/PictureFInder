# งาน: สร้าง Frontend (UI เท่านั้น) ของเว็บ "GetPic" ด้วย React + TypeScript

## 0. บทบาทและเป้าหมาย
คุณเป็น Senior Frontend Developer ให้สร้าง UI ของเว็บ GetPic เว็บนี้ใช้ค้นหารูปภาพฟรีถูกลิขสิทธิ์จาก Openverse API
ผู้ใช้บันทึกรูปลง "Moodboard" ได้ และสร้างข้อความให้เครดิตได้อัตโนมัติ
เป็นงาน Mini Project ของมหาวิทยาลัย ผู้สั่งงาน**ต้องเขียนส่วน logic/data เอง**เพื่ออธิบายโค้ดตอนนำเสนอ
คุณจึงทำได้แค่ UI และ stub ตามที่กำหนดเท่านั้น

## 1. Tech Stack (ห้ามเพิ่ม library อื่น)
- Vite + React 19 + TypeScript (strict, ห้ามใช้ `any`)
- React Router v7 (import จาก "react-router" ใช้ `createBrowserRouter` + `RouterProvider`)
- Tailwind CSS v4 (`@tailwindcss/vite`) + DaisyUI v5
- @tanstack/react-query และ zustand: ติดตั้งไว้ แต่**ห้ามเขียน logic จริง** (ดูข้อ 2)
- ห้ามใช้ icon library ให้ใช้ emoji/ตัวอักษร (☰ ☆ ★ ✕ ⋮ 📋 🔍 📁 ⚠️ ↗)
- ข้อควรระวังของ DaisyUI v5: ไม่มี `input-bordered`/`select-bordered` แล้ว (มีขอบเป็นค่าเริ่มต้น) และให้ใช้ `tabs-box` แทน `tabs-boxed`
- ข้อควรระวังของ Tailwind v4: ใช้ `bg-linear-to-t` แทน `bg-gradient-to-t` และใช้ `ring-2` แทน `ring`

## 2. กฎเหล็ก (ต้องทำตามทุกข้อ)
### ห้ามทำ ❌
- ห้ามเขียน `fetch`, ห้ามเรียก Openverse API, ห้ามใช้ `useQuery`/`useQueries`, ห้ามใช้ `create()` ของ zustand หรือ `persist`
- ห้ามเขียน logic จริงในไฟล์ต่อไปนี้: `src/api/*`, `src/hooks/*`, `src/store/*`, `src/utils/credit.ts`
  ให้สร้างเป็น **stub ตามข้อ 4 ทุกตัวอักษร** และแต่ละไฟล์ต้องมีคอมเมนต์บรรทัดแรกว่า
  `// TODO(ผู้พัฒนา): เขียน logic จริงเอง ไฟล์นี้เป็น stub ชั่วคราว`
- ห้ามแก้ signature หรือ type ใน `src/types/image.ts` และในไฟล์ stub
- ห้ามเก็บคำค้น, filter หรือเลขหน้าใน state ให้ใช้ URL (`useSearchParams`) เท่านั้น
- ห้ามสร้างไฟล์ backend, server, หรือ .env

### ต้องทำ ✅
- ข้อความบน UI เป็นภาษาไทยทั้งหมด
- ทุก component ต้องมีคอมเมนต์ภาษาไทยสั้นๆ ที่หัวไฟล์ บอกว่าทำหน้าที่อะไร รับ props อะไร
  และมีคอมเมนต์ `// [แก้ไข] ...` กำกับจุดที่มักต้องปรับ (สี, จำนวนคอลัมน์, สัดส่วนรูป, ข้อความ)
- Component ต้องรับข้อมูลผ่าน props เป็นหลัก ส่วนหน้า (pages) เป็นตัวเรียก hook/store
- ทุกหน้าที่โหลดข้อมูลต้องจัดการ 4 สถานะครบ: Loading (skeleton) / Error (มีปุ่มลองใหม่) / Empty / Success
- Responsive ทุกหน้าที่ 375px, 768px และ 1280px
- ใช้ `<Link>`/`<NavLink>` สำหรับลิงก์ภายใน ส่วนลิงก์ภายนอกใส่ `target="_blank" rel="noopener noreferrer"`
- รูปทุกรูปต้องมี `alt` และ `loading="lazy"` (ยกเว้นรูปใหญ่ในหน้า detail)

## 3. โครงสร้างไฟล์ (สร้างให้ครบตามนี้)
```
index.html                       ใส่ Google Fonts "Prompt" (400,500,600,700) และ <html lang="th">
vite.config.ts
public/members/                  (โฟลเดอร์ว่าง ใส่ .gitkeep)
src/
├── main.tsx                     ครอบ QueryClientProvider (new QueryClient() เปล่าๆ) + RouterProvider
├── router.tsx
├── index.css
├── types/image.ts               ★ สัญญาข้อมูล (ข้อ 4.1)
├── mocks/images.ts              ข้อมูลจำลอง (ข้อ 4.2)
├── api/openverse.ts             ★ stub
├── hooks/useImageSearch.ts      ★ stub
├── hooks/useImageDetail.ts      ★ stub
├── hooks/useRelatedImages.ts    ★ stub
├── store/useBoardStore.ts       ★ stub
├── utils/license.ts             ข้อมูล static (ข้อ 6)
├── utils/credit.ts              ★ stub
├── components/
│   ├── layout/   RootLayout.tsx, Navbar.tsx, Footer.tsx
│   ├── image/    ImageCard.tsx, ImageGrid.tsx, LicenseBadge.tsx, LicensePermissions.tsx
│   ├── search/   SearchBar.tsx, FilterPanel.tsx, Pagination.tsx
│   ├── board/    BoardCard.tsx, BoardFormModal.tsx, SaveToBoardModal.tsx, ConfirmDialog.tsx
│   └── feedback/ SkeletonGrid.tsx, ErrorState.tsx, EmptyState.tsx, Toast.tsx
└── pages/
    SearchPage.tsx, ImageDetailPage.tsx, BoardsPage.tsx, BoardDetailPage.tsx,
    CreditPage.tsx, AboutPage.tsx, NotFoundPage.tsx
```

## 4. สัญญาข้อมูลและ Stub (คัดลอกตามนี้ ห้ามดัดแปลง)

### 4.1 src/types/image.ts
```ts
import type { LicenseCode } from "../utils/license";

export interface ImageSummary {
  id: string;
  title: string | null;
  thumbnail: string;
  url: string;
  creator: string | null;
  creator_url: string | null;
  license: LicenseCode;
  license_version: string;
  license_url: string;
  foreign_landing_url: string;
  provider: string;
  width?: number;
  height?: number;
  tags?: { name: string }[];
}

export interface SearchResponse {
  result_count: number;
  page_count: number;
  page: number;
  results: ImageSummary[];
}

export type LicenseType = "" | "commercial" | "modification";
export type AspectRatio = "" | "tall" | "wide" | "square";
export type ImageSize = "" | "small" | "medium" | "large";

export interface SearchParams {
  q: string;
  page: number;
  license_type: LicenseType;
  license: LicenseCode | "";
  aspect_ratio: AspectRatio;
  size: ImageSize;
}

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

/** รูปที่ผู้ใช้เลือกบันทึกไว้ในบอร์ด (เก็บเฉพาะฟิลด์ที่ต้องใช้แสดงผลและสร้างเครดิต) */
export type SavedImage = Pick<
  ImageSummary,
  "id" | "title" | "thumbnail" | "creator" | "creator_url" | "license"
  | "license_version" | "license_url" | "foreign_landing_url"
>;

export interface Board {
  id: string;
  name: string;
  description: string;
  createdAt: number;
  images: SavedImage[];
}

export type CreditFormat = "text" | "html" | "markdown";

/** รูปร่างผลลัพธ์ที่หน้าเว็บคาดหวังจาก hook (เลียนแบบ useQuery) */
export interface QueryResult<T> {
  data: T | undefined;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  error: ApiError | null;
  refetch: () => void;
}
```

### 4.2 src/mocks/images.ts
- export `MOCK_IMAGES: ImageSummary[]` จำนวน 24 รายการ
  - id: "mock-1" … "mock-24"
  - thumbnail: `https://picsum.photos/seed/getpic{n}/400/400`
  - url: `https://picsum.photos/seed/getpic{n}/1200/800`
  - กระจาย license ให้ครบทั้ง 8 แบบ, ให้บางรายการมี title/creator เป็น null, และใส่ tags 3–12 อัน
- export `MOCK_STATE: "success" | "loading" | "error" | "empty" = "success"`
  พร้อมคอมเมนต์ `// [แก้ไข] เปลี่ยนค่านี้เพื่อทดสอบสถานะต่างๆ ของ UI`
- export `MOCK_BOARDS: Board[]` จำนวน 2 บอร์ด (บอร์ดละ 5 รูป และ 1 รูป)

### 4.3 Stub ของ hooks (ทุก hook ทำแบบเดียวกัน)
```ts
// src/hooks/useImageSearch.ts
// TODO(ผู้พัฒนา): เขียน logic จริงเอง ไฟล์นี้เป็น stub ชั่วคราว
import type { QueryResult, SearchParams, SearchResponse } from "../types/image";
import { ApiError } from "../types/image";
import { MOCK_IMAGES, MOCK_STATE } from "../mocks/images";

export function useImageSearch(params: SearchParams): QueryResult<SearchResponse> {
  void params;
  const base = { isFetching: false, refetch: () => {} };
  if (MOCK_STATE === "loading") return { ...base, data: undefined, isLoading: true, isError: false, error: null };
  if (MOCK_STATE === "error")   return { ...base, data: undefined, isLoading: false, isError: true, error: new ApiError(429, "rate limit") };
  const results = MOCK_STATE === "empty" ? [] : MOCK_IMAGES.slice(0, 20);
  return { ...base, data: { result_count: results.length * 5, page_count: 5, page: params.page, results },
           isLoading: false, isError: false, error: null };
}
```
- `useImageDetail(id: string): QueryResult<ImageSummary>`: หารูปจาก MOCK_IMAGES ถ้าไม่เจอให้คืน `isError: true, error: new ApiError(404, "not found")`
- `useRelatedImages(id: string): QueryResult<SearchResponse>`: คืน 10 รูปจาก mock ที่ไม่ใช่ id นี้
- `src/api/openverse.ts`: export ฟังก์ชันเปล่า `searchImages`, `getImage`, `getRelated` ที่ `throw new Error("TODO")` พร้อม type ตามสัญญา

### 4.4 Stub ของ store
```ts
// src/store/useBoardStore.ts
// TODO(ผู้พัฒนา): เปลี่ยนเป็น zustand create() + persist เอง ไฟล์นี้เป็น stub ชั่วคราว
import type { Board, SavedImage } from "../types/image";
import { MOCK_BOARDS } from "../mocks/images";

export interface BoardState {
  boards: Board[];
  createBoard: (name: string, description?: string) => string; // คืน id ของบอร์ดใหม่
  renameBoard: (id: string, name: string, description?: string) => void;
  deleteBoard: (id: string) => void;
  toggleImage: (boardId: string, image: SavedImage) => void;
  removeImage: (boardId: string, imageId: string) => void;
  isImageSaved: (imageId: string) => boolean;
}

const mockState: BoardState = {
  boards: MOCK_BOARDS,
  createBoard: () => { console.info("TODO createBoard"); return "mock-board-new"; },
  renameBoard: () => console.info("TODO renameBoard"),
  deleteBoard: () => console.info("TODO deleteBoard"),
  toggleImage: () => console.info("TODO toggleImage"),
  removeImage: () => console.info("TODO removeImage"),
  isImageSaved: (imageId) => MOCK_BOARDS.some((b) => b.images.some((i) => i.id === imageId)),
};

export function useBoardStore<T>(selector: (s: BoardState) => T): T {
  return selector(mockState);
}
```
UI ต้องเรียก store แบบ selector เสมอ เช่น `useBoardStore(s => s.boards)` (เพื่อให้เปลี่ยนเป็น zustand จริงได้โดยไม่ต้องแก้ UI)

### 4.5 Stub ของ utils/credit.ts
```ts
// TODO(ผู้พัฒนา): เขียน logic จริงเอง ไฟล์นี้เป็น stub ชั่วคราว
import type { CreditFormat, SavedImage } from "../types/image";
export function buildCredit(image: SavedImage, format: CreditFormat): string {
  return `[${format}] "${image.title ?? "Untitled"}" by ${image.creator ?? "Unknown"} (TODO)`;
}
```

## 5. ธีม (src/index.css)
```css
@import "tailwindcss";
@plugin "daisyui" { themes: getpic --default, dark --prefersdark; }
@plugin "daisyui/theme" {
  name: "getpic"; default: true; color-scheme: light;
  --color-base-100: #ffffff; --color-base-200: #f5f6fa; --color-base-300: #e5e7ef;
  --color-base-content: #1f2433;
  --color-primary: #4f46e5; --color-primary-content: #ffffff;
  --color-secondary: #ec4899; --color-secondary-content: #ffffff;
  --color-accent: #14b8a6; --color-accent-content: #ffffff;
  --color-neutral: #2a2e3d; --color-neutral-content: #ffffff;
  --color-success: #16a34a; --color-warning: #f59e0b; --color-error: #dc2626;
  --radius-box: 1rem; --radius-field: 0.5rem;
}
body { font-family: "Prompt", "Inter", sans-serif; }
```
ใส่คอมเมนต์ `/* [แก้ไข] */` กำกับบรรทัดสีหลัก บรรทัดความโค้ง และบรรทัดฟอนต์

## 6. src/utils/license.ts (ข้อมูล static ให้เขียนเต็ม)
- export `type LicenseCode = "cc0" | "pdm" | "by" | "by-sa" | "by-nd" | "by-nc" | "by-nc-sa" | "by-nc-nd"`
- export `interface LicenseInfo { label; badgeClass; commercial; modify; attribution; shareAlike; description }`
- export `LICENSES: Record<LicenseCode, LicenseInfo>` ตามตารางนี้

| code | label | badgeClass | commercial | modify | attribution | shareAlike | description |
|---|---|---|---|---|---|---|---|
| cc0 | CC0 | badge-success | ✓ | ✓ | ✗ | ✗ | สาธารณสมบัติ ใช้ได้อิสระ ไม่ต้องให้เครดิต |
| pdm | Public Domain | badge-success | ✓ | ✓ | ✗ | ✗ | หมดลิขสิทธิ์แล้ว |
| by | CC BY | badge-info | ✓ | ✓ | ✓ | ✗ | ใช้ได้ทุกอย่าง แต่ต้องให้เครดิต |
| by-sa | CC BY-SA | badge-accent | ✓ | ✓ | ✓ | ✓ | ให้เครดิต และงานดัดแปลงต้องใช้ license เดียวกัน |
| by-nd | CC BY-ND | badge-primary | ✓ | ✗ | ✓ | ✗ | ให้เครดิต ห้ามดัดแปลง |
| by-nc | CC BY-NC | badge-warning | ✗ | ✓ | ✓ | ✗ | ให้เครดิต ห้ามใช้เชิงพาณิชย์ |
| by-nc-sa | CC BY-NC-SA | badge-warning | ✗ | ✓ | ✓ | ✓ | ให้เครดิต ห้ามเชิงพาณิชย์ และต้องใช้ license เดิม |
| by-nc-nd | CC BY-NC-ND | badge-error | ✗ | ✗ | ✓ | ✗ | เข้มงวดที่สุด ให้เครดิต ห้ามเชิงพาณิชย์ ห้ามดัดแปลง |

## 7. Routing (src/router.tsx)
ทุก route เป็น children ของ `RootLayout`

| path | page |
|---|---|
| `/` (index) | SearchPage |
| `/image/:id` | ImageDetailPage |
| `/boards` | BoardsPage |
| `/boards/:boardId` | BoardDetailPage |
| `/credits` | CreditPage (อ่าน `?board=<id>`) |
| `/about` | AboutPage |
| `*` | NotFoundPage |

## 8. Components

### Layout
- **RootLayout:** `min-h-screen flex flex-col bg-base-200` ประกอบด้วย Navbar, `<main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6"><Outlet/></main>`, Footer และ `<ScrollRestoration/>`
- **Navbar:** `navbar bg-base-100 shadow-sm sticky top-0 z-30`
  - โลโก้ "GetPic" (`text-2xl font-bold text-primary`) ลิงก์ไป `/`
  - เมนูมาจาก array `links` ได้แก่ ค้นหา(/) · บอร์ดของฉัน(/boards) · สร้างเครดิต(/credits) · เกี่ยวกับ(/about)
  - จอ ≥md แสดงแนวนอน ส่วนจอ <md ใช้ปุ่ม ☰ เปิด `dropdown dropdown-end` ที่มี `menu`
  - NavLink ที่ active ใช้ `text-primary font-semibold` และใส่ `end` เฉพาะ "/"
  - "บอร์ดของฉัน" มี `badge badge-secondary badge-sm` แสดงจำนวนบอร์ดจาก `useBoardStore(s => s.boards.length)` เมื่อมีมากกว่า 0
- **Footer:** `footer footer-center p-6 bg-base-100 text-sm` มีข้อความ "Images provided by Openverse" (ลิงก์ https://openverse.org) และ "© 2025 GetPic – Mini Project"

### Image
- **LicenseBadge:** `{ code: LicenseCode; size?: "sm" | "md" }` แสดงเป็น `badge ${badgeClass} badge-${size} font-medium`
- **LicensePermissions:** `{ code }` เป็น `grid grid-cols-2 gap-2` มี 4 ช่อง (ใช้เชิงพาณิชย์ / ดัดแปลงได้ / ต้องให้เครดิต / ต้องใช้ license เดิม) แต่ละช่องเป็น `flex items-center gap-2 p-3 rounded-box bg-base-200` ใช้ ✓ `text-success` หรือ ✗ `text-error`
- **ImageCard:** props `{ image: ImageSummary | SavedImage; variant?: "search" | "board"; isSaved?: boolean; onAction: (image) => void }`
  - ทั้งการ์ดเป็น `<Link to={/image/:id}>` ใช้คลาส `group relative block overflow-hidden rounded-box bg-base-300 shadow-sm hover:shadow-lg transition`
  - รูปใช้ `aspect-square w-full object-cover group-hover:scale-105 transition-transform duration-300` ถ้า `onError` ให้สลับเป็นกล่อง "ไม่สามารถโหลดรูปได้"
  - มุมซ้ายบนเป็น LicenseBadge
  - มุมขวาบนเป็น `btn btn-circle btn-sm` ที่เรียก `e.preventDefault(); e.stopPropagation();` ก่อน `onAction`
    - variant "search": แสดง ★ (`btn-secondary`) ถ้า isSaved ไม่งั้นแสดง ☆ (`btn-ghost bg-base-100/80`)
    - variant "board": แสดง ✕ พร้อม aria-label "นำออกจากบอร์ด"
  - ด้านล่างเป็น overlay `bg-linear-to-t from-black/70 to-transparent text-white` แสดงชื่อและ "โดย {creator}" มองเห็นตลอดบนมือถือ บน ≥md ให้แสดงเฉพาะตอน hover
- **ImageGrid:** `{ images; variant?; isSaved?: (id) => boolean; onAction; dimmed?: boolean }` ใช้ `grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4` และเมื่อ `dimmed` ให้ใส่ `opacity-50 pointer-events-none transition`

### Search
- **SearchBar:** `{ defaultValue; onSearch(q) }` ใช้ `<form>` + `join w-full max-w-2xl mx-auto` ประกอบด้วย `input join-item flex-1` และ `btn btn-primary join-item` "ค้นหา" ห้ามส่งค่าว่าง
- **FilterPanel:** `{ value: SearchParams; onChange(partial: Partial<SearchParams>); onClear() }` ใช้ `grid grid-cols-2 md:grid-cols-4 gap-3` มี 4 ตัวเป็น `select select-sm w-full`
  - การใช้งาน: "" ทั้งหมด / commercial ใช้เชิงพาณิชย์ได้ / modification ดัดแปลงได้
  - License: "" ทั้งหมด + สร้างจาก `LICENSES`
  - แนวรูป: "" / tall แนวตั้ง / wide แนวนอน / square สี่เหลี่ยม
  - ขนาด: "" / small เล็ก / medium กลาง / large ใหญ่
  - ปุ่ม "ล้างตัวกรอง" (`btn btn-ghost btn-sm`) แสดงเฉพาะเมื่อมี filter ใดไม่ว่าง
- **Pagination:** `{ page; pageCount; onChange(page) }` ใช้ `join` มีปุ่ม « ก่อนหน้า / "หน้า X / Y" / ถัดไป » และ disable ปุ่มที่ขอบ

### Board
- **BoardCard:** `{ board; onRename; onDelete }` เป็น `card bg-base-100 shadow hover:shadow-lg`
  - ส่วนปกเป็น collage `grid grid-cols-2 aspect-video overflow-hidden rounded-t-box` จาก 4 รูปแรก ช่องที่ขาดให้ใช้ `bg-base-300`
  - body แสดงชื่อ, "{n} รูป" และวันที่สร้างแบบไทย (`toLocaleDateString("th-TH")`)
  - เมนู ⋮ เป็น dropdown มี เปลี่ยนชื่อ / สร้างเครดิต (Link ไป `/credits?board=id`) / ลบ (`text-error`)
  - คลิกที่ปกหรือชื่อแล้วไป `/boards/:id`
- **BoardFormModal:** `{ open; mode: "create" | "rename"; initial?: { name; description }; onClose; onSubmit(name, description) }`
  - ใช้ `<dialog className="modal">` ร่วมกับ `useRef` + `showModal()`/`close()` ตาม prop open
  - input ชื่อ (required, maxLength 40, แสดงตัวนับ x/40) และ textarea คำอธิบาย
  - ถ้าชื่อว่างหลัง trim ให้ใส่ `input-error` และแสดง `text-error text-xs` "กรุณากรอกชื่อบอร์ด"
  - ปุ่ม ยกเลิก / บันทึก (`btn-primary`)
- **ConfirmDialog:** `{ open; title; message; confirmText; onConfirm; onClose }` ปุ่มยืนยันใช้ `btn btn-error`
- **SaveToBoardModal:** `{ open; image: SavedImage | null; onClose }`
  - หัว modal มี thumbnail `w-14 h-14 rounded object-cover` และชื่อรูป
  - รายการบอร์ด (`max-h-64 overflow-y-auto`) แสดง checkbox ต่อบอร์ด ติ๊กอยู่เมื่อรูปอยู่ในบอร์ดนั้น onChange เรียก `toggleImage`
  - ท้ายรายการมี inline form "+ สร้างบอร์ดใหม่" ใช้ `createBoard` แล้วต่อด้วย `toggleImage(newId, image)`
  - ปุ่ม "เสร็จสิ้น" และใช้ `modal-box max-w-md`
  - export ฟังก์ชัน `toSavedImage(img: ImageSummary): SavedImage` ไว้ในไฟล์นี้

### Feedback
- **SkeletonGrid:** `{ count = 20 }` grid เดียวกับ ImageGrid และแต่ละช่องเป็น `skeleton aspect-square w-full rounded-box`
- **ErrorState:** `{ error?: ApiError | null; onRetry }` ใช้ `alert alert-error`
  - status 429 แสดง "เรียกใช้งานถี่เกินไป กรุณารอสักครู่แล้วลองใหม่"
  - กรณีอื่นแสดง "โหลดข้อมูลไม่สำเร็จ"
  - มีปุ่ม "ลองใหม่"
- **EmptyState:** `{ icon; title; description?; action?: ReactNode }` จัดใน `text-center py-16`
- **Toast:** `{ message: string | null }` ใช้ `toast toast-end` + `alert alert-success`
  - สร้าง hook `useToast()` ในไฟล์เดียวกัน คืน `{ message, show(msg) }` ที่หายเองใน 2 วินาที (useState + setTimeout)

## 9. Pages

### SearchPage (/)
- อ่าน/เขียนค่าทั้งหมดผ่าน `useSearchParams`
  - ถ้าไม่มี `q` ให้ใช้ค่า default `"nature"` (คอมเมนต์ `// [แก้ไข] คำค้นเริ่มต้น`)
  - `page` แปลงเป็น number (ค่าเริ่มต้น 1)
- เปลี่ยนคำค้นหรือ filter ใดๆ แล้วต้องตั้ง `page=1` และลบ key ที่ค่าว่างออกจาก URL
- เปลี่ยนหน้าแล้วเรียก `window.scrollTo({ top: 0, behavior: "smooth" })`
- Layout จากบนลงล่าง:
  1. Hero (`text-center py-8`) แสดงเฉพาะเมื่อ URL ไม่มี q: "ค้นหารูปฟรี ถูกลิขสิทธิ์" + คำอธิบาย
  2. SearchBar
  3. FilterPanel
  4. ข้อความ "พบ {result_count.toLocaleString()} รูป สำหรับ “{q}”" (`text-sm text-base-content/70`)
  5. เนื้อหาตามลำดับ isLoading → SkeletonGrid / isError → ErrorState / ผลว่าง → EmptyState 🔍 "ไม่พบรูปที่ตรงกับคำค้น" + ปุ่มล้างตัวกรอง / สำเร็จ → ImageGrid (dimmed={isFetching})
  6. Pagination
- กด ☆ แล้วเปิด SaveToBoardModal ด้วย `toSavedImage(image)`

### ImageDetailPage (/image/:id)
- ปุ่ม "← ย้อนกลับ" ใช้ `navigate(-1)`
- Loading: `grid lg:grid-cols-5 gap-8` ซ้ายเป็น `skeleton h-96 lg:col-span-3` ขวาเป็น skeleton หลายแถว
- Error 404: EmptyState "ไม่พบรูปนี้" + ปุ่มกลับหน้าค้นหา ส่วน error อื่นใช้ ErrorState
- Success:
  - `grid lg:grid-cols-5 gap-8`
  - ซ้าย `lg:col-span-3`: รูปใหญ่ `w-full max-h-[70vh] object-contain bg-base-300 rounded-box`
  - ขวา `lg:col-span-2`: `card bg-base-100 shadow p-6 space-y-4` เรียงดังนี้
    - ชื่อ `text-2xl font-bold`
    - "โดย" + ลิงก์ creator_url (ถ้ามี)
    - แหล่งที่มา (provider)
    - ขนาด "W × H px"
    - LicenseBadge ขนาด md + description
    - LicensePermissions
    - กล่องเครดิต `bg-base-200 p-3 rounded-box font-mono text-sm break-words` แสดง `buildCredit(img, "text")` + ปุ่ม "📋 คัดลอก" (`navigator.clipboard.writeText` แล้วแสดง Toast "คัดลอกแล้ว ✓")
    - ปุ่ม `btn btn-secondary` "บันทึกลงบอร์ด" (★ ถ้าบันทึกแล้ว) และ `btn btn-outline` "ดูต้นฉบับ ↗"
    - แท็ก `badge badge-ghost` สูงสุด 10 อัน
- ส่วน "รูปที่คล้ายกัน" (`text-xl font-semibold mt-12 mb-4`) ใช้ useRelatedImages และจัดการ 4 สถานะแยกจากส่วนบน

### BoardsPage (/boards)
- Header `flex justify-between items-center mb-6`: "บอร์ดของฉัน ({n})" + `btn btn-primary` "+ สร้างบอร์ด"
- Grid `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6` ของ BoardCard
- Empty: 📁 "ยังไม่มีบอร์ด" + ปุ่ม "สร้างบอร์ดแรก"
- ใช้ BoardFormModal (create/rename) และ ConfirmDialog "ลบบอร์ด “{name}” และรูปทั้งหมดในบอร์ดใช่ไหม?"

### BoardDetailPage (/boards/:boardId)
- หาบอร์ดจาก store ถ้าไม่เจอให้แสดง EmptyState "ไม่พบบอร์ดนี้" + ลิงก์ไป /boards
- Header มีลิงก์ "← บอร์ดทั้งหมด" · ชื่อ `text-3xl font-bold` · คำอธิบาย · "{n} รูป" · ปุ่ม "เปลี่ยนชื่อ" และ Link `btn btn-primary` "สร้างเครดิตบอร์ดนี้" ไป `/credits?board=id`
- ImageGrid variant="board" กด ✕ แล้วเรียก `removeImage`
- Empty: "บอร์ดนี้ยังว่าง" + ปุ่ม "ไปค้นหารูป"

### CreditPage (/credits)
- หัวข้อ "สร้างเครดิตอัตโนมัติ" + ย่อหน้าสั้นๆ ว่าทำไมต้องให้เครดิตตามเงื่อนไข Creative Commons
- แถวควบคุม `flex flex-col sm:flex-row gap-3 sm:items-center`:
  - `select` เลือกบอร์ด ผูกกับ `?board=` (ถ้าไม่มีให้ใช้บอร์ดแรก)
  - `tabs tabs-box` มี 3 tab: ข้อความธรรมดา(text) / HTML / Markdown (เก็บใน useState)
  - `btn btn-primary` "📋 คัดลอกทั้งหมด" รวมทุกบรรทัดด้วย "\n"
- รายการเครดิต (`space-y-3`) แต่ละแถวเป็น `flex gap-3 items-start p-3 bg-base-100 rounded-box`
  - thumbnail `w-16 h-16 object-cover rounded shrink-0`
  - ข้อความ `font-mono text-sm break-words flex-1`
  - ถ้า license ไม่ต้องให้เครดิต (attribution=false) ให้แสดง `badge badge-success badge-sm` "ไม่บังคับให้เครดิต"
  - ปุ่ม `btn btn-ghost btn-xs` "คัดลอก"
- ไม่มีบอร์ดเลย: EmptyState + ลิงก์ไป /boards ส่วนบอร์ดว่าง: EmptyState + ลิงก์ไปค้นหา
- คัดลอกสำเร็จแล้วแสดง Toast

### AboutPage (/about)
1. **ทีมผู้พัฒนา:** array `members` คงที่ที่หัวไฟล์ (คอมเมนต์ `// [แก้ไข] ข้อมูลสมาชิก`) จำนวน 3 คน มีฟิลด์ `{ name, studentId, role, photo }` โดย photo เป็น "/members/1.jpg" … ใช้ `grid grid-cols-1 md:grid-cols-3 gap-6` แต่ละคนเป็น `card bg-base-100 shadow items-center text-center p-6` มี avatar `w-28 rounded-full ring-2 ring-primary ring-offset-2` และถ้ารูปโหลดไม่ได้ให้แสดงตัวอักษรแรกของชื่อ ส่วน role ใช้ `badge badge-outline`
2. **แหล่งข้อมูล (ห้ามขาด):** การ์ด "ข้อมูลรูปภาพจาก Openverse API" ลิงก์ไป https://openverse.org และ https://api.openverse.org/v1/
3. **คู่มือ Creative Commons:** `overflow-x-auto` ครอบ `table table-zebra` ที่ map จาก `LICENSES` มีคอลัมน์ License | เชิงพาณิชย์ | ดัดแปลง | ต้องให้เครดิต | Share-alike | คำอธิบาย
4. **วิธีใช้งาน:** `steps steps-vertical lg:steps-horizontal` 4 ขั้น ได้แก่ ค้นหา → เข้าใจ License → บันทึกลงบอร์ด → สร้างเครดิต

### NotFoundPage (*)
`text-center py-24` มี "404" (`text-7xl font-bold text-primary`), "ไม่พบหน้าที่คุณต้องการ" และ Link `btn btn-primary` "กลับหน้าหลัก"

## 10. เกณฑ์ตรวจรับ (ต้องผ่านทุกข้อ)
- [ ] `npm run build` ผ่าน ไม่มี TypeScript error และไม่มี `any`
- [ ] หน้าแรกแสดง ≥ 20 รูปทันทีโดยไม่ต้องค้นหา
- [ ] เปลี่ยน `MOCK_STATE` เป็น loading/error/empty แล้วทุกหน้าแสดงสถานะถูกต้อง
- [ ] filter/คำค้น/หน้า อยู่ใน URL และกด Back ของเบราว์เซอร์แล้วค่ายังถูกต้อง
- [ ] เปิด `/image/mock-1`, `/image/xxx`, `/boards/<id>`, `/boards/xxx`, `/abc` ได้ผลตามที่ระบุ
- [ ] ไม่มี fetch, useQuery, zustand create หรือ persist อยู่ในโปรเจค (ค้นด้วย grep แล้วต้องไม่เจอ)
- [ ] ไม่มี layout แตกหรือ scroll แนวนอนที่ 375px / 768px / 1280px
- [ ] ทุก component มีคอมเมนต์หัวไฟล์และจุด `[แก้ไข]`

## 11. ลำดับการทำงาน (ทำทีละเฟส แล้วหยุดรอให้ฉันพิมพ์ "ต่อ")
1. Setup: vite config, index.html, index.css, types, mocks, stubs ทั้งหมด, license.ts
2. Layout + Router + NotFoundPage
3. Components: image/* และ feedback/*
4. SearchPage + search/* + SaveToBoardModal
5. ImageDetailPage
6. BoardsPage + BoardDetailPage + board/*
7. CreditPage + AboutPage
8. ตรวจตามข้อ 10 แล้วรายงานผลเป็น checklist

เมื่อจบแต่ละเฟส ให้สรุปสั้นๆ ว่าสร้างหรือแก้ไฟล์อะไรบ้าง และ component ไหนต้องรับข้อมูลอะไร