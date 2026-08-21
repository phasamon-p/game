<template>
  <button
    class="match-card"
    :class="{ 'match-card--flipped': card.isFlipped || card.isMatched, 'match-card--matched': card.isMatched }"
    :disabled="card.isMatched"
    @click="$emit('flip')"
  >
    <span class="match-card__face match-card__face--front">❔</span>
    <span class="match-card__face match-card__face--back">{{ card.emoji }}</span>
  </button>
</template>

<script setup>
defineProps({
  card: {
    type: Object,
    required: true,
  },
})

defineEmits(['flip'])
</script>

<style scoped>
.match-card {
  position: relative;
  aspect-ratio: 1 / 1;
  border: none;
  border-radius: 10px;
  background: transparent;
  perspective: 600px;
  padding: 0;
}

.match-card__face {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  border-radius: 10px;
  backface-visibility: hidden;
  transition: transform 0.3s ease;
}

.match-card__face--front {
  background: #4a5580;
  color: white;
  transform: rotateY(0deg);
}

.match-card__face--back {
  background: white;
  border: 2px solid #4a5580;
  transform: rotateY(180deg);
}

.match-card--flipped .match-card__face--front {
  transform: rotateY(180deg);
}

.match-card--flipped .match-card__face--back {
  transform: rotateY(360deg);
}

.match-card--matched .match-card__face--back {
  border-color: #3ba55d;
  opacity: 0.7;
}
</style>
