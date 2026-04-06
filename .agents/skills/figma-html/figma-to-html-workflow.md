# Part 1 — Figma → HTML (cơ chế & luồng)

Phần này mô tả **cách lấy thiết kế từ Figma** và **chuyển thành cấu trúc HTML + quyết định token/style**, không lặp lại chi tiết kỹ thuật stack (Bootstrap, SCSS, JS) — xem `platform-code-style.md`.

## When This Document Applies

Kích hoạt phần này khi:

- User chia sẻ **Figma URL** (design/board/make) hoặc trích frame/component.
- User yêu cầu "code màn/section" hoặc "implement design" dựa trên Figma.
- Bạn cần **xuất ảnh, đọc context design, map layout** từ Figma sang code.

Giả định: lớp hiển thị tuân theo stack trong `platform-code-style.md` (Bootstrap 5 + SCSS modules).

## Bám sát Figma (không tự thêm / không thay asset)

1. **Chỉ làm đúng thiết kế Figma** — không thêm section, block, form, CTA, copy hay thành phần UI mà frame/design không có. Không “bổ sung” vì tiện hay vì template sẵn có.
2. **Icon và hình ảnh chỉ lấy từ Figma** — export đúng node/asset trong file; không đổi sang icon bộ khác, stock ảnh, placeholder, hay tự vẽ lại thay thế trừ khi user yêu cầu rõ ràng.

Mọi chỗ khác trong workflow (layout, token, code style) vẫn áp dụng, nhưng **không** được vi phạm hai quy tắc trên.

## Workflow: Từ Figma Đến Implementation

### 1. Lấy design context (khi có công cụ)

Khi user cung cấp Figma URL:

- Parse URL để lấy `fileKey` và `nodeId` (đổi `-` thành `:` trong nodeId nếu cần).
- Dùng Figma MCP (ví dụ `get_design_context`) để lấy cấu trúc component và screenshot tham chiếu.
- Coi code/tool output là **tham chiếu**, không phải bản cuối: adapt theo convention platform (Bootstrap layout, SCSS modules, naming) trong `platform-code-style.md`.

### 2. Tải và sắp xếp ảnh từ Figma

- Mọi **icon, illustration, ảnh bitmap** trong UI phải bám đúng asset trên Figma (export node tương ứng). Không thay bằng icon/ảnh khác ngoài thiết kế — xem mục **Bám sát Figma**.
- Với frame/section sẽ thành trang hoặc block lớn: dùng MCP export (ví dụ `get_screenshot`) cho các node tương ứng.
- Lưu vào **root ảnh public của project**, convention folder-theo-trang — chi tiết đường dẫn và quy tắc tên file xem `platform-code-style.md` → Image & Asset Naming.
- Ưu tiên `.svg` nếu nguồn vector; `.png` cho capture UI.

### 3. Map layout Figma → cấu trúc HTML

- Nhận diện section logic: header, hero, card, table, form, footer.
- Triển khai bằng:
  - Bootstrap grid cho layout.
  - Semantic tags.
  - Class naming theo `platform-code-style.md`.
- **Không** copy absolute positioning từ Figma vào HTML; diễn giải thành cấu trúc logic + grid.

### 4. Typography và màu (tokens)

Từ design (inspector hoặc `get_design_context`):

- Thu thập: font, size, weight, line-height, letter-spacing; màu chữ primary/secondary/muted/accent.
- Đối chiếu token SCSS có sẵn trong project; ưu tiên map vào biến/font stack hiện có (`variables.scss`, utilities Bootstrap).
- Chỉ thêm biến mới khi không thể reuse hợp lý.
- Triển khai: utility Bootstrap khi đủ (`fw-bold`, `text-muted`, …); phần custom qua SCSS variables/mixins, không hard-code font/mào lặp lại xuyên project trong component SCSS.

### 5. Map style trực quan → SCSS

- Màu, radius, shadow: ưu tiên biến hiện có; bổ sung `variables.scss` khi cần.
- Tránh copy pixel-perfect position từ Figma; ưu tiên layout responsive, dễ maintain.

### 6. Gắn tương tác

- Modal, tab, …: dùng component Bootstrap khi khớp.
- Hành vi: bind trong JS theo pattern trong `platform-code-style.md` (không inline handler).

## Ví Dụ Tốt / Xấu (Figma → HTML)

**Tốt:**

- KPI dùng `.row` + `.col-*` thay vì absolute position.
- Card dùng class có chủ đích (`kpi-card`, …) và style trong SCSS module.
- Trạng thái tab/card chọn qua class (`active`, `is-selected`).

**Xấu:**

- Thêm section/form/CTA hoặc copy không có trên Figma.
- Thay icon/ảnh Figma bằng Font Awesome, stock, hoặc asset tự chọn.
- `style="position:absolute; left:…"` trên element.
- Màu/font hard-code trong CSS thay vì variables.
- Bỏ qua Bootstrap grid khi design rõ ràng là grid.

Áp dụng nhất quán khi implement UI từ Figma; mọi quy tắc kỹ thuật chi tiết nằm ở `platform-code-style.md`.
