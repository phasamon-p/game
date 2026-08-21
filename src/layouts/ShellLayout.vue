<template>
  <div class="shell">
    <header class="shell__header">
      <router-link to="/" class="shell__title">🎮 Game Hub</router-link>
      <router-link v-if="!isHome" to="/" class="shell__back">← กลับเมนู</router-link>
    </header>
    <main class="shell__content">
      <slot />
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isHome = computed(() => route.path === '/')
</script>

<style scoped>
.shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.shell__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  background: #2c3350;
  color: white;
}

.shell__title {
  color: white;
  text-decoration: none;
  font-weight: 700;
  font-size: 1.1rem;
}

.shell__back {
  color: #d7dcff;
  text-decoration: none;
  font-size: 0.95rem;
}

.shell__back:hover {
  text-decoration: underline;
}

.shell__content {
  flex: 1;
  padding: 1.5rem;
}
</style>
