// Single source of truth for every game in this hub.
// The home menu and the router both read from this array, so they can never
// drift out of sync. To add a new game, add an entry here — nothing else
// needs to change. See README.md for the full steps.
export const games = [
  {
    id: 'image-matching',
    name: 'จับคู่ภาพ',
    description: 'พลิกการ์ดแล้วจับคู่ภาพให้ครบ ยิ่งพลิกน้อยยิ่งเก่ง',
    path: '/games/image-matching',
    thumbnail: '🧠',
    component: () => import('./image-matching/ImageMatchingGame.vue'),
  },
]
