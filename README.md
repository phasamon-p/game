# Game Hub

โปรเจกต์ Vue 3 + Vite ที่ออกแบบให้เป็น "ที่รวมเกม" — เพิ่มเกมใหม่ได้เรื่อยๆ โดยไม่ต้องแก้โครงสร้างหลัก

## Setup

```bash
npm install
npm run dev
```

## โครงสร้างโปรเจกต์

```
src/
  games/
    registry.js          # รายการเกมทั้งหมด (id, name, route, component)
    <game-id>/            # โฟลเดอร์ของแต่ละเกม แยกเป็นอิสระ
  views/
    HomeView.vue          # เมนูหลัก ดึงรายการเกมจาก registry
  router/
    index.js              # สร้าง route จาก registry อัตโนมัติ
  layouts/
    ShellLayout.vue        # header/back-link ที่ใช้ร่วมกันทุกเกม
```

- `src/games/registry.js` คือจุดเดียวที่ทั้งเมนูหน้าแรกและ router ใช้ร่วมกัน จึงไม่มีทางที่เมนูกับ route จะไม่ตรงกัน
- แต่ละเกมอยู่ในโฟลเดอร์ตัวเอง (`src/games/<game-id>/`) มี component, composable, style ของตัวเอง ไม่ไปแก้ไฟล์เกมอื่น

## การเพิ่มเกมใหม่

1. สร้างโฟลเดอร์ `src/games/<new-game-id>/`
2. เขียนหน้าเกมหลัก (เช่น `NewGame.vue`) พร้อม `components/`, `composables/`, `constants.js`, `style.css` ตามต้องการ — ทั้งหมดอยู่ในโฟลเดอร์นี้
3. จัดการ state ด้วย composable ธรรมดา (`useXState.js`) คืนค่าเป็น refs/functions ก่อน — ใช้ Pinia ก็ต่อเมื่อ state ต้องแชร์ข้ามเกมจริงๆ (เช่น leaderboard รวม)
4. เพิ่ม entry ใน `src/games/registry.js`: `{ id, name, description, path, thumbnail, component: () => import('./<new-game-id>/NewGame.vue') }`
5. เสร็จแล้ว — router และเมนูหน้าแรกจะดึงเกมใหม่มาแสดงอัตโนมัติ ไม่ต้องแก้ไฟล์อื่น

## เกมที่มีในตอนนี้

- **จับคู่ภาพ** (`src/games/image-matching/`) — เกมความจำจับคู่การ์ด emoji มี 3 ระดับความยาก นับจำนวนครั้งที่พลิกและเวลาที่ใช้
