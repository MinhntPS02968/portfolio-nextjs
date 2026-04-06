# Clone / rebuild UI từ URL trang web

Phần này mô tả **luồng làm việc khi user đưa link một trang web** và cần **tái tạo giao diện** trong project platform (Bootstrap 5 + SCSS). Mọi quy tắc code, file SCSS, naming, asset → áp dụng **`platform-code-style.md`**.

## When This Document Applies

- User gửi **một hoặc nhiều URL** (landing, marketing site, trang con) và yêu cầu “clone”, “làm giống”, “build lại layout”.
- User muốn **chuyển giao diện reference** (đã publish) thành HTML/SCSS trong repo hiện tại.
- Không thay thế **Figma workflow**: nếu song song có file Figma, ưu tiên `figma-to-html-workflow.md` cho phần design; URL chỉ là thêm reference.

## Phạm vi và lưu ý (bắt buộc đọc)

- **Mục tiêu kỹ thuật:** tái hiện **cấu trúc, hierarchy, spacing, typography và palette** phù hợp sản phẩm của bạn — implement lại bằng **Bootstrap + SCSS modules**, không dán nguyên HTML/CSS/JS của site gốc vào project.
- **Bản quyền & đạo đức:** logo, ảnh stock có bản quyền, font commercial, nội dung marketing — **không copy trái phép**. Dùng placeholder, asset nội bộ, hoặc nguồn bạn có quyền; font chỉ nhúng khi license cho phép.
- **Không inline CSS** trong HTML (theo platform); không phụ thuộc style attribute từ site gốc.

## Workflow Đề Xuất

### 1. Thu thập reference từ URL

- Ghi nhận **viewport** user quan tâm (desktop / mobile / cả hai).
- Dùng công cụ có sẵn môi trường (fetch nội dung, snapshot, DevTools-style inspection) để:
  - Xác định **các section** theo thứ tự (header, hero, features, CTA, footer, …).
  - Ghi chú **grid** cảm quan (cột, gap, max-width container) — sẽ map sang `row` / `col-*` / container Bootstrap.
- Coi DOM/CSS từ site gốc là **gợi ý cấu trúc**, không phải source truth để copy 1:1.

### 2. Phác thảo cây HTML (semantic)

- Mỗi section → khối có class theo convention (dash-separated), bọc trong `section` / `header` / `footer` khi phù hợp.
- Trùng khớp **page shell** platform khi đây là app screen: xem `platform-code-style.md` → HTML Structure Standards.

### 3. Typography & màu → token

- Từ reference, rút **font family, cỡ, weight, line-height**, màu nền/chữ/accent.
- **Map** vào `variables.scss` và utilities Bootstrap (`text-muted`, `fw-bold`, …) thay vì hard-code rải rác.
- Nếu font web: chỉ dùng khi license hợp lệ; khai báo thống nhất (ví dụ một chỗ trong SCSS/global), không nhân bản `@import` font lung tung.

### 4. Layout: Bootstrap-first

- Dịch layout reference sang **grid + utilities**; tránh tái tạo bằng `position: absolute` hàng loạt nếu design thực chất là flow/grid.
- Breakpoint: đối chiếu vài độ rộng (mobile / tablet / desktop); responsive dùng `breakpoint.scss` như `platform-code-style.md`.

### 5. Ảnh & icon

- Lưu theo **folder per page** và quy tắc tên file trong `platform-code-style.md`.
- Logo / hình độc quyền của site gốc: thay bằng placeholder hoặc asset của bạn trừ khi user xác nhận quyền dùng.
- Icon: ưu tiên SVG gọn, hoặc icon set project đang dùng — không nhúng chuỗi SVG khổng lồ inline nếu có thể đặt file trong `images`.

### 6. Hành vi & JS

- Menu mobile, modal, tab, form: **implement lại** bằng Bootstrap JS + pattern jQuery/vanilla trong `platform-code-style.md`.
- Không dán script analytics / widget của bên thứ ba chỉ để “giống link gốc” trừ khi user yêu cầu rõ và đồng ý rủi ro.

### 7. Kiểm tra trước khi coi xong

- So layout với reference ở **cùng viewport** (chủ quan: hierarchy và rhythm, không cần pixel-perfect nếu không được yêu cầu).
- Kiểm tra **một breakpoint phụ** (ví dụ mobile) để tránh chỉ đẹp một cỡ màn.
- Rà **a11y cơ bản**: thứ tự heading, label form, contrast đọc được.

## Tóm tắt

| Bước | Việc chính |
| ---- | ---------- |
| Reference | URL + section tree + viewport |
| Markup | Semantic + class platform |
| Style | SCSS modules + variables, không inline |
| Assets | Đúng folder/tên; tôn trọng bản quyền |
| Behavior | Bootstrap + JS convention nội bộ |

Sau khi nắm luồng ở file này, **mọi chi tiết code** áp dụng **`platform-code-style.md`**.
