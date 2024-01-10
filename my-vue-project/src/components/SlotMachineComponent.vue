<template>
  <div class="slot-machine">
    <div class="reel">
      <div class="arrow up" @mouseenter="startScroll('location', 'up')" @mouseleave="stopScroll">
        &uarr;
      </div>
      <div class="variable location">{{ selectedLocation }}</div>
      <div class="arrow down" @mouseenter="startScroll('location', 'down')" @mouseleave="stopScroll">
        &darr;
      </div>
    </div>

    <div class="reel">
      <div class="arrow up" @mouseenter="startScroll('size', 'up')" @mouseleave="stopScroll">
        &uarr;
      </div>
      <div class="variable size">{{ selectedSize }}</div>
      <div class="arrow down" @mouseenter="startScroll('size', 'down')" @mouseleave="stopScroll">
        &darr;
      </div>
    </div>

    <div class="reel">
      <div class="variable price">{{ computedPrice }}</div>
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
      prices: {},
      scrollDirection: null,
      scrollInterval: null,
      scrollSpeed: 200, // Adjusted scroll speed
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
        this.selectRandomValues();
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
    },
    startScroll(variable, direction) {
      this.scrollDirection = direction;
      this.scrollInterval = setInterval(() => {
        let selectedValue;
        if (variable === 'location') {
          selectedValue = this.selectedLocation;
        } else {
          selectedValue = this.selectedSize;
        }
        const currentIndex = variable === 'location' ? this.locations.indexOf(selectedValue) : this.sizes.indexOf(selectedValue);
        if (currentIndex !== -1) {
          let newIndex;
          if (this.scrollDirection === 'up') {
            newIndex = currentIndex - 1;
            if (newIndex < 0) {
              newIndex = variable === 'location' ? this.locations.length - 1 : this.sizes.length - 1;
            }
          } else {
            newIndex = currentIndex + 1;
            if (newIndex >= (variable === 'location' ? this.locations.length : this.sizes.length)) {
              newIndex = 0;
            }
          }
          if (variable === 'location') {
            this.selectedLocation = this.locations[newIndex];
          } else {
            this.selectedSize = this.sizes[newIndex];
          }
        }
      }, this.scrollSpeed);
    },
    stopScroll() {
      clearInterval(this.scrollInterval);
    },
    selectRandomValues() {
      const randomLocationIndex = Math.floor(Math.random() * this.locations.length);
      const randomSizeIndex = Math.floor(Math.random() * this.sizes.length);
      this.selectedLocation = this.locations[randomLocationIndex];
      this.selectedSize = this.sizes[randomSizeIndex];
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
  flex: 1; /* Equal distribution of space */
  display: flex;
  flex-direction: column;
  align-items: center;
}

.variable {
  font-size: 18px;
  margin-bottom: 10px;
  margin-top: 10px; /* Adjusted margin-top to move the content down a bit */
}

.arrow {
  width: 30px;
  height: 30px;
  background-color: #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-weight: bold;
  font-size: 20px;
}
</style>
