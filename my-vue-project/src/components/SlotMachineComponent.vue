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
import { data } from '../../mock-backend/data.js'; // Import the entire data object

export default {
  data() {
    return {
      locations: [],
      sizes: [],
      selectedLocation: null,
      selectedSize: null,
      prices: {},
      consolidatedPrices: data.consolidatedPrices,
      selectedPrice: '',
      scrollDirection: null,
      scrollInterval: null,
      scrollSpeed: 200,
      currentPrice: null,
      allPriceCombinations: [],
      currentCombinationIndex: 0, // Index to keep track of the current combination
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
  this.fetchData().then(() => {
    this.allPriceCombinations = data.allPriceCombinations;
    // Ensure that the data is available before calling selectRandomValues
    if (this.locations && this.locations.length > 0 && this.sizes && this.sizes.length > 0) {
      this.selectRandomValues();
      // Find the index of the initial combination in the allPriceCombinations array
      this.currentCombinationIndex = this.allPriceCombinations.findIndex(comb => 
        comb.location === this.selectedLocation && comb.size === this.selectedSize && comb.price === this.selectedPrice);
    } else {
      console.error("Data is not available for selectRandomValues");
    }
  }).catch(error => {
    console.error("Error in fetchData: ", error);
  });
},

 methods: {
  async fetchData() {
  try {
    const response = await axios.get('http://localhost:3001/api/data');
    console.log('API Response:', response.data); // Log the entire response

    // Accessing the nested data
    const apiData = response.data.data;

    console.log('Locations:', apiData.locations);
    console.log('Sizes:', apiData.sizes);
    console.log('Prices:', apiData.prices);
    console.log('All Price Combinations:', apiData.allPriceCombinations);

    if (apiData && apiData.locations && apiData.sizes && apiData.prices) {
      this.locations = apiData.locations;
      this.sizes = apiData.sizes;
      this.prices = this.buildPriceLookup(apiData.prices);
      this.allPriceCombinations = apiData.allPriceCombinations || [];

      this.selectRandomValues();
    } else {
      console.error('API response does not contain the expected data');
    }
  } catch (error) {
    console.error('Error fetching data from API:', error);
  }
},
    
    buildPriceLookup(priceData) {
  const prices = {};
  if (priceData) {
    priceData.forEach(item => {
      prices[item.location] = item.prices;
    });
  } else {
    console.warn('Price data is undefined');
  }
  return prices;
  
},

    startScroll(variable, direction) {
    this.scrollDirection = direction;
    if (variable === 'price') {
      // Handle price scrolling
      this.scrollInterval = setInterval(this.scrollPrice, this.scrollSpeed);
    } else {
      // Handle location and size scrolling
      this.scrollInterval = setInterval(() => {
        if (variable === 'location') {
          this.scrollLocation();
        } else if (variable === 'size') {
          this.scrollSize();
        }
      }, this.scrollSpeed);
    }
  },
    stopScroll() {
      clearInterval(this.scrollInterval);
      this.scrollInterval = null;
    },
    scrollLocation() {
      const currentIndex = this.locations.indexOf(this.selectedLocation);
      const newIndex = this.scrollDirection === 'up' ? (currentIndex > 0 ? currentIndex - 1 : this.locations.length - 1) : (currentIndex < this.locations.length - 1 ? currentIndex + 1 : 0);
      this.selectedLocation = this.locations[newIndex];
      this.updateSelectedPrice();
    },
    scrollSize() {
  if (!this.sizes || this.sizes.length === 0) {
    console.warn("scrollSize called but sizes are not defined or empty");
    return; // Exit the function if sizes are not available
  }

  const currentIndex = this.sizes.indexOf(this.selectedSize);
  if (currentIndex === -1) {
    console.warn("Current size not found in sizes array");
    return; // Exit the function if the current size is not found
  }

  let newIndex;

  if (this.scrollDirection === 'up') {
    // When scrolling up, move to the next larger size or stop at the bottom
    newIndex = currentIndex < this.sizes.length - 1 ? currentIndex + 1 : currentIndex;
  } else {
    // When scrolling down, move to the next smaller size or stop at the top
    newIndex = currentIndex > 0 ? currentIndex - 1 : currentIndex;
  }

  this.selectedSize = this.sizes[newIndex];
  this.updateSelectedPrice();
},

    scrollPrice() {
  if (!this.allPriceCombinations.length || !this.selectedPrice) return;

  let newCombinationIndex = -1;
  if (this.scrollDirection === 'up') {
    // Find the next combination with a higher price
    newCombinationIndex = this.allPriceCombinations.findIndex(
      (comb, index) => parseFloat(comb.price.replace(/[^0-9.-]+/g,"")) > parseFloat(this.selectedPrice.replace(/[^0-9.-]+/g,"")) && index > this.currentCombinationIndex
    );
  } else {
    // Find the previous combination with a lower price, starting from the end of the list
    for (let i = this.currentCombinationIndex - 1; i >= 0; i--) {
      if (parseFloat(this.allPriceCombinations[i].price.replace(/[^0-9.-]+/g,"")) < parseFloat(this.selectedPrice.replace(/[^0-9.-]+/g,""))) {
        newCombinationIndex = i;
        break;
      }
    }
  }

  // If a new combination is found, update the selection
  if (newCombinationIndex !== -1) {
    this.currentCombinationIndex = newCombinationIndex;
    const newCombination = this.allPriceCombinations[newCombinationIndex];
    this.selectedLocation = newCombination.location;
    this.selectedSize = newCombination.size;
    this.selectedPrice = newCombination.price;
  } else {
    // Stop scrolling if no new combination is found
    this.stopScroll();
  }
},

    updateSelectedPrice() {
  if (this.selectedLocation && this.selectedSize) {
    this.selectedPrice = this.prices[this.selectedLocation][this.selectedSize];
  } else {
    this.selectedPrice = 'Select Location and Size';
  }
},

    selectRandomValues() {
    if (this.locations && this.locations.length > 0 && this.sizes && this.sizes.length > 0) {
    const randomLocationIndex = Math.floor(Math.random() * this.locations.length);
    const randomSizeIndex = Math.floor(Math.random() * this.sizes.length);
    this.selectedLocation = this.locations[randomLocationIndex];
    this.selectedSize = this.sizes[randomSizeIndex];
    this.selectedPrice = this.prices[this.selectedLocation][this.selectedSize] || '';
    console.log("Selected Values:", this.selectedLocation, this.selectedSize, this.selectedPrice); // Debugging log
  } else {
    console.warn("selectRandomValues called before data is available");
  }
},
// Add other methods as needed
}
};
</script>

<style scoped>

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
