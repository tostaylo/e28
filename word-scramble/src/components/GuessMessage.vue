<template>
  <div v-show="guesses.length > 0">
    <span v-bind:class="{ won: gameState.won, lost: !gameState.won }"
      ><slot></slot
    ></span>
    <button
      v-show="gameState.won || gameState.lost"
      @click="$emit('reset-state')"
    >
      Play again
    </button>
  </div>
</template>

<script>
export default {
  props: ["gameState", "guesses"],
};
</script>

<style scoped>
.won {
  background: green;
}
.lost {
  background: red;
}
</style>


	

	
