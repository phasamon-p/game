import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { games } from '../games/registry'

const gameRoutes = games.map((game) => ({
  path: game.path,
  name: game.id,
  component: game.component,
}))

const routes = [
  { path: '/', name: 'home', component: HomeView },
  ...gameRoutes,
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
