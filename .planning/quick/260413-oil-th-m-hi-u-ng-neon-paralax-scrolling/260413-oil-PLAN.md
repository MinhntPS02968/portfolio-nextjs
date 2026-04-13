# Quick Plan: Them hieu ung neon + parallax scrolling

## Objective
- Nang cap trai nghiem thi giac cho portfolio bang neon glow co kiem soat va parallax scrolling nhe.
- Giu uu tien readability, maintainability, va performance tren mobile.

## Context
- Trang thai hien tai: `.planning/STATE.md` (Phase 1 dang o trang thai "Ready to plan", can giu chat luong motion an toan hieu nang).
- Code hien tai lien quan: `frontend/src/components/layout/Header.tsx`.
- Rang buoc tu du an/user:
  - Khong dung inline CSS.
  - Uu tien code de maintain, de doc.
  - Dong bo style Bootstrap 5.3 + SCSS conventions.
  - Khong auto-format neu khong duoc yeu cau.

## Tasks

### Task 1 - Tach bien style neon/parallax thanh cau hinh de tai su dung
**Files**
- `frontend/src/components/layout/Header.tsx`
- `frontend/style/scss/style.scss` (hoac file partial SCSS dang dung cho header/hero)

**Action**
- Xac dinh cac class hien co (`pf-header`, `pf-header__logo`, `pf-header__link`) va bo sung token/class cho neon effect theo huong utility co y nghia (vd `pf-neon-soft`, `pf-neon-active`) thay vi hardcode.
- Dinh nghia bien SCSS cho mau glow/intensity/blur theo 2 profile desktop-mobile de de tune ve sau.
- Dam bao toan bo style moi nam trong SCSS, khong inline style.

**Verify (automated)**
- `cd frontend && yarn lint`

**Done**
- Header co bo class neon ro rang, khong phat sinh inline style, va SCSS co bien cau hinh de dieu chinh nhanh.

### Task 2 - Implement parallax scrolling nhe, co gioi han hieu nang
**Files**
- `frontend/src/components/layout/Header.tsx`
- `frontend/src/components/layout/portfolio/HeroSection.tsx` (neu parallax anchor o hero)

**Action**
- Them logic parallax dua tren `scrollY` voi he so nho, dung `requestAnimationFrame` + guard de tranh update qua muc.
- Chi apply tren cac phan tu trang tri (decorative layers), khong apply vao text chinh de tranh giam readability.
- Them fallback: tat/giam parallax cho mobile nho va khi `prefers-reduced-motion` bat.

**Verify (automated)**
- `cd frontend && yarn lint`

**Done**
- Parallax hoat dong muot tren desktop, khong giat lag ro ret, va co behavior an toan cho mobile/reduced-motion.

### Task 3 - Khoa chat visual quality va kha nang maintain
**Files**
- `frontend/src/components/layout/Header.tsx`
- `frontend/src/components/layout/portfolio/HeroSection.tsx`
- `frontend/style/scss/style.scss` (hoac SCSS partial lien quan)

**Action**
- Ra soat lai muc tuong phan mau (text/nen/neon) de dam bao de doc, dac biet o section dau trang.
- Chuan hoa naming class moi theo quy uoc hien tai (`pf-*`) va bo comment ngan gon bang tieng Anh tai khoi logic phuc tap.
- Loai bo debug logs neu co trong luong render/scroll path.

**Verify (automated)**
- `cd frontend && yarn lint`

**Done**
- Hieu ung neon + parallax dat muc "premium but readable", naming nhat quan, code de bao tri va khong phat sinh lint error.

## Success Criteria
- Neon effect nhan dien ro nhung khong lam kho doc noi dung.
- Parallax tao chieu sau thi giac ma van on dinh FPS trong dieu kien su dung thong thuong.
- Kien truc code ro rang: style nam o SCSS, logic scroll co guard hieu nang, naming class nhat quan.
