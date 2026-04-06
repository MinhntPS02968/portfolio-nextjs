---
name: figma-html
description: >
  Implements responsive HTML/CSS from Figma or from a provided website URL using Bootstrap 5, SCSS modules, and strict naming/asset conventions. The skill splits into (1) Figma-to-HTML workflow, (2) website-URL clone/rebuild workflow, and (3) platform code style & tech — read the relevant docs below. In this repository, images live under src/public/images; adjust per project.
---

# Figma → HTML Skill (Bootstrap + SCSS)

Skill này gồm **ba tài liệu**; chọn file phù hợp nguồn thiết kế, luôn bám **`platform-code-style.md`** khi viết code.

| Document | Nội dung |
| -------- | -------- |
| [figma-to-html-workflow.md](figma-to-html-workflow.md) | **Figma → HTML:** lấy design context, export ảnh, map layout/typography/token, SCSS, tương tác; ví dụ dịch đúng/sai. |
| [web-url-clone-workflow.md](web-url-clone-workflow.md) | **URL trang web → rebuild:** thu thập reference từ link, semantic structure, token, asset, JS — tái hiện bằng Bootstrap/SCSS platform, không copy trái phép. |
| [platform-code-style.md](platform-code-style.md) | **Tech & code style:** Bootstrap/SCSS/JS, cấu trúc HTML, modules, naming, accessibility, asset paths. |

Viết để dùng ngay trong repo này; project khác cùng stack chỉ cần chỉnh path và naming nơi có ghi chú.

## When to Use This Skill

Kích hoạt khi có **Figma**, **link trang web tham chi khảo**, hoặc khi code UI **theo chuẩn platform** (Bootstrap + SCSS).

- User gửi **Figma URL** hoặc trích frame/component/flow.
- User gửi **URL website** và muốn clone / làm lại layout trong project.
- User yêu cầu code màn, section, hoặc implement design (ví dụ Frogverse).
- Bạn sửa/tạo HTML/CSS/JS tương ứng design.

Luồng đề xuất:

1. Nguồn **Figma** → **figma-to-html-workflow.md**, rồi **platform-code-style.md**.
2. Nguồn **trang web (URL)** → **web-url-clone-workflow.md**, rồi **platform-code-style.md**.
3. Chỉ refactor style/HTML theo convention, không đụng Figma/URL → **platform-code-style.md**.
