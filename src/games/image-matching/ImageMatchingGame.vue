<template>
  <div class="matching-game">
    <h1>จับคู่ภาพ</h1>

    <div v-if="!hasStarted" class="matching-game__setup">
      <button v-for="option in GRID_OPTIONS" :key="option.id" @click="start(option)">
        {{ option.label }}
      </button>
    </div>

    <template v-else>
      <div class="matching-game__status">
        <span>ระดับ: {{ activeOption.label }}</span>
        <span>พลิก: {{ moves }}</span>
        <span>เวลา: {{ formattedTime }}</span>
        <button @click="start(activeOption)">เริ่มใหม่</button>
        <button @click="hasStarted = false">เลือกระดับ</button>
      </div>

      <div
        class="matching-game__grid"
        :style="{ gridTemplateColumns: `repeat(${activeOption.columns}, 1fr)` }"
      >
        <MatchCard
          v-for="card in deck"
          :key="card.id"
          :card="card"
          @flip="flipCard(card.id)"
        />
      </div>

      <div v-if="isWon" class="matching-game__win">
        🎉 ชนะแล้ว! ใช้ {{ moves }} ครั้ง เวลา {{ formattedTime }}
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import MatchCard from './components/MatchCard.vue'
import { useMatchingGame } from './composables/useMatchingGame'
import { GRID_OPTIONS } from './constants'
import './style.css'

const { deck, moves, elapsedSeconds, isWon, startNewGame, flipCard } = useMatchingGame()

const hasStarted = ref(false)
const activeOption = ref(GRID_OPTIONS[0])

function start(option) {
  activeOption.value = option
  hasStarted.value = true
  startNewGame(option.pairs)
}

const formattedTime = computed(() => {
  const minutes = Math.floor(elapsedSeconds.value / 60)
  const seconds = elapsedSeconds.value % 60
  return `${minutes}:${String(seconds).padStart(2, '0')}`
})
</script>
