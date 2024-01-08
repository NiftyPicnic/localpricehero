<template>
  <div class="slot-machine">
    <div class="reel">
      <div class="variable">Location: {{ selectedLocation }}</div>
      <select v-model="selectedLocation">
        <option v-for="location in locations" :key="location" :value="location">
          {{ location }}
        </option>
      </select>
    </div>

    <div class="reel">
      <div class="variable">Size: {{ selectedSize }}</div>
      <select v-model="selectedSize">
        <option v-for="size in sizes" :key="size" :value="size">
          {{ size }}
        </option>
      </select>
    </div>

    <div class="reel">
      <div class="variable">Price: {{ computedPrice }}</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      locations: [],
      sizes: [],
      selectedLocation: null,
      selectedSize: null,
      prices: {}
    };
  },
  computed: {
    computedPrice() {
      if (this.selectedLocation && this.selectedSize) {
        return this.prices[this.selectedLocation][this.selectedSize];
      }
      return 'Select Location and Size';
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get('http://localhost:3001/api/data');
        this.locations = response.data.locations;
        this.sizes = response.data.sizes;
        this.prices = this.buildPriceLookup(response.data.prices);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    buildPriceLookup(priceData) {
      const prices = {};
      priceData.forEach(item => {
        prices[item.location] = item.prices;
      });
      return prices;
    }
  }
};
</script>

<style scoped>
/* Add your custom styles here */
.slot-machine {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.reel {
  text-align: center;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.variable {
  font-size: 18px;
  margin-bottom: 10px;
}

select {
  width: 100%;
  padding: 5px;
  font-size: 16px;
}
</style>
