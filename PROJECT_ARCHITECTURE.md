# Phân Tích Cấu Trúc và Luồng Hoạt Động Của Dự Án

## 1. Tổng Quan Dự Án
Dự án này là một **ứng dụng Web Frontend** theo dạng Landing Page/Portfolio cho một nền tảng về Web3/Crypto (mang tên **CorexCenter** / **Tradelis Exchange** theo các meta tags). 
Dự án sử dụng **Next.js (App Router)** và được cấu hình để xuất ra dạng static HTML (`output: "export"` trong `next.config.ts`).

## 2. Công Nghệ Sử Dụng (Tech Stack)
- **Framework**: Next.js 16.2.2 (React 19) sử dụng **App Router**.
- **Ngôn ngữ**: TypeScript.
- **Styling**: 
  - CSS truyền thống (Bootstrap 5.1.3 + SCSS - cấu trúc BEM).
  - TailwindCSS 4 (Cài đặt thêm nhưng UI chính đang chuộng dùng SASS & class nội bộ như `corex-*`).
- **Quản lý State**: Zustand.
- **Kết nối Web3**: ethers.js, @reown/appkit (Web3Modal).
- **Đa Ngôn Ngữ (i18n)**: i18next & react-i18next.
- **Tương tác thời gian thực**: Socket.io-client.
- **Hiệu ứng & UI Elements**: AOS (Animate on scroll), react-toastify, lightweight-charts.

## 3. Cấu Trúc Thư Mục (Directory Structure)
Toàn bộ mã nguồn chính nằm trong thư mục `frontend`:

```text
/Volumes/Code/portfolio-nextjs/frontend/
├── .next/                   # Thư mục build của Next.js
├── node_modules/            # Thư viện phụ thuộc
├── public/                  # Static assets được Next.js tự động serve (images, icons)
├── style/                   # Chứa mã nguồn SCSS / CSS của dự án
│   └── scss/                # Kiến trúc SCSS (có thể tuân theo chuẩn 7-1)
├── src/                     # Source code chính của ứng dụng
│   ├── app/                 # App Router của Next.js
│   │   ├── layout.tsx       # Root layout: Khai báo meta, import Bootstrap, Fonts, AOS, Providers
│   │   └── page.tsx         # Trang chủ chính: Chứa UI của Landing Page (Hero, Vision, Ecosystem...)
│   ├── components/          # Chứa các React Components
│   │   ├── common/          # Component dùng chung (Button, Modal, Input...)
│   │   └── layout/          # Component dàn trang (Header, Preloader, StreakCanvas...)
│   ├── hooks/               # Custom React Hooks
│   ├── locales/             # Chứa file JSON ngôn ngữ (en, vi, kr, jp...)
│   ├── providers/           # Các Global Providers (ví dụ: I18nProvider)
│   ├── services/            # Nơi gọi API, Axios instances (base-api.ts)
│   ├── stores/              # File Zustand quản lý state (account, auth, socketio, web3)
│   └── utils/               # Các hàm tiện ích logic, helper functions
├── next.config.ts           # Cấu hình Next.js (SSG mode - output: "export")
├── package.json             # Khai báo script và các dependencies
└── tsconfig.json            # Cấu hình TypeScript
```

## 4. Luồng Hoạt Động (Execution Flow)

1. **Khởi tạo và Load Meta Data (`src/app/layout.tsx`)**:
   - Khi người dùng truy cập, Next.js sẽ load file `layout.tsx` đầu tiên.
   - Tại đây, các thẻ `<meta>`, Google Fonts, stylesheet tĩnh của Bootstrap (`/client/css/bootstrap.min.css`) và AOS được inject vào `<head>`.
   - Toàn bộ ứng dụng được bọc trong các thẻ Provider (`<I18nProvider>`, `<Suspense>`, v.v.) nhằm khởi tạo i18n và quản lý môi trường toàn cục.
   - Inject tĩnh các script phía client nằm ngoài webpack (`bootstrap.bundle.min.js`, `all.min.js`).

2. **Render Nội Dung Trang Chủ (`src/app/page.tsx`)**:
   - Đây là một Client Component (nhờ `'use client'`).
   - Hooks như `useTranslation` (i18n) được sử dụng để lấy nội dung text. Logic thay đổi ngôn ngữ sẽ được lưu vị trí vào `localStorage`.
   - Effect `useEffect` sẽ khởi tạo thư viện hiệu ứng **AOS** ngay sau khi DOM load xong.
   - Trang sẽ tuần tự render cấu trúc HTML theo phương pháp **BEM** (Block-Element-Modifier): 
     - `corex-header` (Header & Offcanvas)
     - `corex-hero` (Hero Section có animation và glow)
     - `corex-section-py` (Core Strategy, Ecosystem...)

3. **Quản Trị State (Zustand)**:
   - Trong quá trình thao tác (như kết nối wallet, xử lý xác thực), các module trong thư mục `src/stores` như `auth.ts`, `web3.ts`, `socketio.ts` sẽ được dùng để quản lí trạng thái người dùng xuyên suốt toàn view.

4. **Kênh Tương Tác Backend (API & Socket.io)**:
   - Kết nối với REST API được thực hiện thông qua module trong thư mục `services/` (`base-api.ts` dùng instance Axios).
   - Real-time/Data live (nếu có, để update biểu đồ crypto hoặc lệnh giao dịch) được vận hành bằng socket kết nối với trạng thái trong `stores/socketio.ts`.

5. **Build & Triển Khai**:
   - Chạy lệnh `yarn build` (hoặc `npm run build`), Next.js sẽ tiền biên dịch (pre-render) toàn bộ files ra HTML/CSS tĩnh (bởi vì flag `output: "export"`).
   - Nội dung thư mục Build này có thể đưa thẳng lên các hệ thống host tĩnh như Nginx, S3 hay IPFS.

## 5. Đặc Điểm Nổi Bật & Nhận Xét
- **Kiến trúc Lai**: Dù dùng Next.js (chuyên SSR) nhưng lại chọn cách build Static Export + Client Components diện rộng ("use client"). Điều này cho thấy hệ thống có xu hướng xử lý logic Client-Heavy (kết nối ví Crypto, đồ thị).
- **CSS Strategy**: Mã nguồn có sự giao thoa, tuy có cài TailwindCSS nhưng code layout viết bằng các class tuân thủ **chuẩn BEM tĩnh** (`corex-header`, `corex-hero__glow`, ...). Rất khớp với thiết kế UI chú trọng đến Layout Module theo quy tắc BEM truyền thống.
- **Khả năng Mở Rộng**: Dự án rất có tổ chức với việc chia tách `services`, `stores`, `providers` rõ ràng, sẵn sàng nâng cấp để thành một ứng dụng phi tập trung (dApp)/sàn giao dịch Web3 hoàn chỉnh.
