<template>
  <div class="slot-machine">
    <!-- Reel for Location -->
    <div class="reel">
      <div class="variable">Location: {{ location }}</div>
      <div class="controls">
        <button @click="holdVariable('location')">Hold</button>
        <input type="range" min="1" max="100" v-model="location">
      </div>
    </div>

    <!-- Reel for Size -->
    <div class="reel">
      <div class="variable">Size: {{ size }}</div>
      <div class="controls">
        <button @click="holdVariable('size')">Hold</button>
        <input type="range" min="1" max="100" v-model="size">
      </div>
    </div>

    <!-- Reel for Price -->
    <div class="reel">
      <div class="variable">Price: {{ price }}</div>
      <div class="controls">
        <button @click="holdVariable('price')">Hold</button>
        <input type="range" min="1" max="100" v-model="price">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      location: 50, // Default value
      size: 50,     // Default value
      price: 50,    // Default value
      selectedVariable: null,
    };
  },
  methods: {
    holdVariable(variable) {
      this.selectedVariable = variable;
    },
  },
};
</script>

<style scoped>
  /* Your existing styles for slot-machine, reel, variable, and controls... */
</style>
