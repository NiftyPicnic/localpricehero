<template>
  <div class="slot-machine">
    <div class="reel">
      <!-- Location -->
      <div class="arrow up" @mouseenter="startScroll('location', 'up')" @mouseleave="stopScroll">
        &uarr;
      </div>
      <div class="variable location">{{ selectedLocation }}</div>
      <div class="arrow down" @mouseenter="startScroll('location', 'down')" @mouseleave="stopScroll">
        &darr;
      </div>
    </div>

    <div class="reel">
      <!-- Size -->
      <div class="arrow up" @mouseenter="startScroll('size', 'up')" @mouseleave="stopScroll">
        &uarr;
      </div>
      <div class="variable size">{{ selectedSize }}</div>
      <div class="arrow down" @mouseenter="startScroll('size', 'down')" @mouseleave="stopScroll">
        &darr;
      </div>
    </div>

    <div class="reel">
      <!-- Price -->
      <div class="arrow up" @mouseenter="startScroll('price', 'up')" @mouseleave="stopScroll">
        &uarr;
      </div>
      <div class="variable price">{{ computedPrice }}</div>
      <div class="arrow down" @mouseenter="startScroll('price', 'down')" @mouseleave="stopScroll">
        &darr;
      </div>
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
      scrollSpeed: 200,
      currentPrice: null,
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
      console.log(`startScroll called with variable: ${variable}, direction: ${direction}`);
      this.scrollDirection = direction;
      this.scrollInterval = setInterval(() => {
        if (variable === 'location') {
          this.scrollLocation();
        } else if (variable === 'size') {
          this.scrollSize();
        } else if (variable === 'price') {
          this.scrollPrice();
        }
      }, this.scrollSpeed);
    },
    scrollLocation() {
      if (this.scrollDirection === 'up') {
        const currentIndex = this.locations.indexOf(this.selectedLocation);
        const newIndex = currentIndex > 0 ? currentIndex - 1 : this.locations.length - 1;
        this.selectedLocation = this.locations[newIndex];
      } else if (this.scrollDirection === 'down') {
        const currentIndex = this.locations.indexOf(this.selectedLocation);
        const newIndex = currentIndex < this.locations.length - 1 ? currentIndex + 1 : 0;
        this.selectedLocation = this.locations[newIndex];
      }
    },
    scrollSize() {
      if (this.scrollDirection === 'up') {
        const currentIndex = this.sizes.indexOf(this.selectedSize);
        const newIndex = currentIndex > 0 ? currentIndex - 1 : this.sizes.length - 1;
        this.selectedSize = this.sizes[newIndex];
      } else if (this.scrollDirection === 'down') {
        const currentIndex = this.sizes.indexOf(this.selectedSize);
        const newIndex = currentIndex < this.sizes.length - 1 ? currentIndex + 1 : 0;
        this.selectedSize = this.sizes[newIndex];
      }
    },
    scrollPrice() {
      console.log(`scrollPrice called with direction: ${this.scrollDirection}`);
      if (this.scrollDirection === 'up') {
        this.currentPrice = this.currentPrice + 10;
      } else if (this.scrollDirection === 'down') {
        this.currentPrice = this.currentPrice - 10;
      }
      if (this.currentPrice < 0) {
        this.currentPrice = 0;
      }
    },
    stopScroll() {
      clearInterval(this.scrollInterval);
      if (this.scrollDirection === 'up' || this.scrollDirection === 'down') {
        this.computedPrice = this.currentPrice;
      }
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
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.variable {
  font-size: 18px;
  margin-bottom: 10px;
  margin-top: 10px;
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
