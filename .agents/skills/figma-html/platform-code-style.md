# Part 2 — Platform code style & tech stack

Phần này mô tả **stack, chuẩn HTML/SCSS/JS và asset** cho platform (Bootstrap 5 + SCSS). Dùng khi code UI **có hoặc không** có Figma; khi có Figma, kết hợp với `figma-to-html-workflow.md`. Khi user đưa **link trang web** làm mẫu, đọc thêm `web-url-clone-workflow.md` rồi áp dụng các chuẩn dưới đây.

## Stack & Scope

- **Layout / UI base:** Bootstrap 5.3 (grid, utilities, components).
- **Styles:** SCSS modules dưới `src/public/scss` (điều chỉnh path nếu project khác).
- **Template:** Project có thể dùng Pug hoặc HTML thuần; skill tập trung **cấu trúc HTML và convention CSS/JS**, không bắt buộc engine template.

## Core Principles

1. **No inline CSS**  
   Không dùng attribute `style` trong HTML. Mọi style qua class trong SCSS.  
   **`img`:** không dùng attributes `width` / `height` trên `<img>` cho layout hay kích thước hiển thị; đặt trong SCSS trên class (`width`, `height`, `aspect-ratio`, `object-fit`, …). Giữ `alt`, `loading`, `decoding`, `fetchpriority` khi cần.

2. **Bootstrap-first layout**  
   Dùng grid và utilities: `row`, `col-*`, `g-*`, `mx-auto`, `d-flex`, … Chỉ thêm class layout custom khi utility không đủ.

3. **Semantic + structured HTML**  
   Ưu tiên `header`, `main`, `section`, `footer`, `nav`, `button`, `form`, `label`, `table`, … Dùng `div` khi không có tag semantic phù hợp.

4. **SCSS, not raw CSS**  
   Style mới vào SCSS modules; reuse `variables.scss`, `breakpoint.scss` khi có.

5. **Comments in English only**  
   Comment ngắn gọn, tiếng Anh, giải thích ý định — không nhập lại code.

## HTML Structure Standards

### Page shell

Shape khái niệm cho màn mới:

```html
<div class="frogverse row">
  <main class="main mx-auto">
    <header class="header">
      <!-- topbar, nav, etc. -->
    </header>
    <div class="content">
      <!-- page-specific sections -->
    </div>
  </main>
</div>
```

- Outer: `.frogverse`
- Main column: `.main`
- Vùng scroll: `.content`  
Trên project thực tế thường qua Pug/layouts; giữ pattern đó khi sửa.

### Bootstrap components

- **Modal:** `.modal` → `.modal-dialog` → `.modal-content` → header/body/footer.
- **Nav/tabs:** `.nav`, `.nav-tabs`, `.nav-link`, `role="tablist"`, `role="tab"`, `data-bs-toggle="tab"`, `data-bs-target="#id"`.
- **Table:** `.table` trong `.table-responsive` khi cần scroll ngang.

### Class naming

- Lowercase, dash-separated: `withdraw-screen`, `withdraw-field-label`, `kpi-block`, `kpi-val`, …
- Modifier: thêm class (`info-note red`, `neon-border neon-border--legendary`), tránh tên vô nghĩa (`box1`).

### ID usage

- Chỉ khi: hook JS (`#submitBtn`), hoặc Bootstrap cần (`data-bs-target="#…"`).
- Không style theo `id`; luôn qua class.

### Accessibility basics

- Modal: `role="dialog"`, `aria-labelledby`, `aria-hidden`, `tabindex="-1"` khi cần (Bootstrap có thể đã cover một phần).
- Tabs: `role="tablist"`, `role="tab"`, `aria-controls`, `aria-selected`.
- Form: `for`/`id` hoặc bọc input trong `label`; `aria-label` khi không có label hiển thị.

## SCSS & Styling Standards

### Where to put styles

- App-wide: `style.scss` (chủ yếu `@use`/`@forward`, `.frogverse`, `.header`, `.content`, utilities chung).
- Theo trang/feature: module riêng (`frog-wallet.scss`, `history.scss`, …).

### Variables and tokens

- Màu, gradient, typography, spacing: lấy từ `variables.scss` khi đã có.
- Token mới, reusable: thêm vào `variables.scss` thay vì magic number trong component.

### Nesting

- Nest dưới parent có nghĩa; hạn chế > 3–4 cấp.
- Modifier/state với `&`:

```scss
.nav-link {
  &.active {
    // ...
  }
}
```

- Pattern lặp (neon border, card chung): class utility độc lập, gắn trên HTML.

### Responsive

- Dùng mixins `breakpoint.scss` (ví dụ `@include sm { ... }`).
- Nhiều breakpoint trong Figma → gom vào mixin breakpoints, không dựng nhiều layout tĩnh tách rời.

### Bootstrap-friendly overrides

- Scope dưới parent (`.frogverse .table`, `.frogverse .modal`) để tránh leak global.
- Có thể dùng CSS variables Bootstrap (`--bs-body-bg`, …) khi phù hợp.

## JavaScript Interaction Patterns

### Libraries

- **jQuery:** DOM ready, event, thao tác DOM đơn giản (theo pattern `validate.js`).
- **Vanilla + Bootstrap:** API chính thức (ví dụ `new bootstrap.Offcanvas('#Verifymail')`).

### Event binding

- Không `onclick="..."` inline; bind trong file JS qua class/id.

### Form validation & states

- Success/error/disabled: toggle class (`success`, `error`, …) và attribute (`disabled`), không inline style.

### Bootstrap JS

- Modal, offcanvas, tabs: dùng API documented; không hack nội bộ Bootstrap.

## Image & Asset Naming

### Folder per page

- Ảnh từ thiết kế: dưới **public images root** của project.
- **Repo này:** `src/public/images`, ví dụ:
  - `src/public/images/index/`
  - `src/public/images/frog-wallet/`
  - Sub-section: `src/public/images/frog-wallet/header/`
- Project khác: giữ convention folder-theo-trang nhưng đổi root (`public/images`, …).

### File naming

- Lowercase, không space; ký tự: `a-z`, `0-9`, `-`.
- Tên mô tả: `wallet-hero-illustration.svg`, `kpi-income-chart-placeholder.png`, …
- Variant: `*-sm|md|lg`, `*-active`, `*-disabled`, `*-hover`.

### Referencing (repo này)

- HTML (public map tới `/`): `src="/images/frog-wallet/wallet-hero-illustration.svg"`
- SCSS (relative từ `src/public/scss`): `url('../images/frog-wallet/wallet-hero-illustration.svg')`
- Project khác: chỉnh theo cách build/public URL thực tế.

### Kích thước `<img>` (bắt buộc trong repo này)

- **Không** đặt `width="…"` / `height="…"` trên thẻ `<img>` cho layout.
- Đặt kích thước / `aspect-ratio` trong SCSS (theo module trang), trùng với spec Figma khi implement từ design.
