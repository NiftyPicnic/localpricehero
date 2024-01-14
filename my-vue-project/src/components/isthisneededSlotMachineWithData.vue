<template>
  <div class="slot-machine">
    <div class="reel" @mouseover="hoverReel('location')">
      <div class="variable" v-if="selectedVariable === 'location'">Location: {{ currentLocation }}</div>
      <div class="scroll-box" v-if="selectedVariable === 'location'">
        <span v-for="(item, index) in locations" :key="index" @click="setCurrentLocation(item)">
          {{ item }}
        </span>
      </div>
    </div>

    <div class="reel" @mouseover="hoverReel('size')">
      <div class="variable" v-if="selectedVariable === 'size'">Size: {{ currentSize }}</div>
      <div class="scroll-box" v-if="selectedVariable === 'size'">
        <span v-for="(item, index) in sizes" :key="index" @click="setCurrentSize(item)">
          {{ item }}
        </span>
      </div>
    </div>

    <div class="reel" @mouseover="hoverReel('price')">
      <div class="variable" v-if="selectedVariable === 'price'">Price: {{ currentPrice }}</div>
      <div class="scroll-box" v-if="selectedVariable === 'price'">
        <span v-for="(item, index) in prices" :key="index" @click="setCurrentPrice(item)">
          {{ item }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      locations: [],
      currentLocation: '',
      sizes: [],
      currentSize: '',
      prices: [],
      currentPrice: '',
      selectedVariable: 'location', // Default selected variable
    };
  },
  created() {
    this.fetchLocations();
    this.fetchSizes();
    this.fetchPrices();
  },
  methods: {
    async fetchLocations() {
      try {
        // Replace this section with your actual API request or data retrieval logic for locations
        // For example:
        // this.locations = await et('http://localhost:3001/api/data');
        // this.currentLocation = this.locations.length > 0 ? this.locations[0] : '';
        this.locations = ['London', 'New York', 'Tokyo', 'Paris', 'Berlin', 'Sydney']; // Temporary data
        this.currentLocation = this.locations.length > 0 ? this.locations[0] : ''; // Temporary selection
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    },
    async fetchSizes() {
      try {
        // Replace this section with your actual API request or data retrieval logic for sizes
        // For example:
        // this.sizes = await axios.get('http://localhost:3001/api/data');
        // this.currentSize = this.sizes.length > 0 ? this.sizes[0] : '';
        this.sizes = ['1000 sqft', '1500 sqft', '2000 sqft', '2500 sqft', '3000 sqft']; // Temporary data
        this.currentSize = this.sizes.length > 0 ? this.sizes[0] : ''; // Temporary selection
      } catch (error) {
        console.error('Error fetching sizes:', error);
      }
    },
    async fetchPrices() {
      try {
        // Replace this section with your actual API request or data retrieval logic for prices
        // For example:
        // this.prices = await axios.get('http://localhost:3001/api/data');
        // this.currentPrice = this.prices.length > 0 ? this.prices[0] : '';
        this.prices = ['$500,000', '$750,000', '$1,000,000', '$1,250,000', '$1,500,000']; // Temporary data
        this.currentPrice = this.prices.length > 0 ? this.prices[0] : ''; // Temporary selection
      } catch (error) {
        console.error('Error fetching prices:', error);
      }
    },
    setCurrentLocation(location) {
      this.currentLocation = location;
    },
    setCurrentSize(size) {
      this.currentSize = size;
    },
    setCurrentPrice(price) {
      this.currentPrice = price;
    },
    hoverReel(variable) {
      this.selectedVariable = variable;
    },
  },
};
</script>

<style scoped>
  /* Your styles here */
  .slot-machine {
    /* Styles for the slot machine container */
  }
  .reel {
    /* Styles for each reel */
  }
  .variable {
    /* Styles for displaying the variable */
  }
  .scroll-box {
    /* Styles for the scroll-box */
    overflow-y: auto; /* Enable vertical scroll bar */
    max-height: 200px; /* Set maximum height to enable scrolling */
  }
</style>
