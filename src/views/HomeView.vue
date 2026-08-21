<template>
  <div class="home">
    <h1>เลือกเกม</h1>
    <div class="home__grid">
      <router-link
        v-for="game in games"
        :key="game.id"
        :to="game.path"
        class="game-card"
      >
        <span class="game-card__thumb">{{ game.thumbnail }}</span>
        <span class="game-card__name">{{ game.name }}</span>
        <span class="game-card__desc">{{ game.description }}</span>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { games } from '../games/registry'
</script>

<style scoped>
.home__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.game-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1.5rem 1rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  text-decoration: none;
  color: inherit;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.game-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
}

.game-card__thumb {
  font-size: 2.5rem;
}

.game-card__name {
  font-weight: 700;
  font-size: 1.1rem;
}

.game-card__desc {
  font-size: 0.85rem;
  color: #666;
  text-align: center;
}
</style>
