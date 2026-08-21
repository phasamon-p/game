import { ref, computed, onUnmounted } from 'vue'
import { EMOJI_POOL } from '../constants'

function shuffle(array) {
  const result = [...array]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

const MISMATCH_DELAY_MS = 800

export function useMatchingGame() {
  const deck = ref([])
  const flippedIds = ref([])
  const moves = ref(0)
  const elapsedSeconds = ref(0)
  const isLocked = ref(false)

  let timerHandle = null

  const isWon = computed(
    () => deck.value.length > 0 && deck.value.every((card) => card.isMatched),
  )

  function stopTimer() {
    if (timerHandle !== null) {
      clearInterval(timerHandle)
      timerHandle = null
    }
  }

  function startTimer() {
    if (timerHandle !== null) return
    timerHandle = setInterval(() => {
      elapsedSeconds.value++
    }, 1000)
  }

  function startNewGame(pairCount) {
    stopTimer()
    const chosenEmojis = shuffle(EMOJI_POOL).slice(0, pairCount)
    const cards = shuffle([...chosenEmojis, ...chosenEmojis]).map((emoji, index) => ({
      id: index,
      emoji,
      isFlipped: false,
      isMatched: false,
    }))

    deck.value = cards
    flippedIds.value = []
    moves.value = 0
    elapsedSeconds.value = 0
    isLocked.value = false
  }

  function flipCard(cardId) {
    if (isLocked.value) return

    const card = deck.value.find((c) => c.id === cardId)
    if (!card || card.isFlipped || card.isMatched) return

    startTimer()
    card.isFlipped = true
    flippedIds.value.push(cardId)

    if (flippedIds.value.length < 2) return

    moves.value++
    const [firstId, secondId] = flippedIds.value
    const first = deck.value.find((c) => c.id === firstId)
    const second = deck.value.find((c) => c.id === secondId)

    if (first.emoji === second.emoji) {
      first.isMatched = true
      second.isMatched = true
      flippedIds.value = []
      if (isWon.value) stopTimer()
      return
    }

    isLocked.value = true
    setTimeout(() => {
      first.isFlipped = false
      second.isFlipped = false
      flippedIds.value = []
      isLocked.value = false
    }, MISMATCH_DELAY_MS)
  }

  onUnmounted(stopTimer)

  return {
    deck,
    moves,
    elapsedSeconds,
    isLocked,
    isWon,
    startNewGame,
    flipCard,
  }
}
