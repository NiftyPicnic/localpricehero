<template>
  <div class="slot-machine">
    <div class="reel">
      <!-- Location -->
      <div class="arrow up" @mousedown="startScroll('location', 'down')" @mouseup="stopScroll">
      &uarr;
      </div>
      <div class="variable location">{{ selectedLocation }}</div>
      <button class="hold-button" :class="{held: heldField === 'location'}" @click="holdField('location')">Hold</button>
      <div class="arrow down" @mousedown="startScroll('location', 'up')" @mouseup="stopScroll">
        &darr;
      </div>
    </div>

    <div class="reel">
      <!-- Size -->
      <div class="arrow up" @mousedown="startScroll('size', 'down')" @mouseup="stopScroll">
        &uarr;
      </div>
      <div class="variable size">{{ selectedSize }}</div>
      <button class="hold-button" :class="{held: heldField === 'size'}" @click="holdField('size')">Hold</button>
      <div class="arrow down" @mousedown="startScroll('size', 'up')" @mouseup="stopScroll">
        &darr;
      </div>
    </div>

    <div class="reel">
      <!-- Price -->
      <div class="arrow up" @mousedown="startScroll('price', 'down')" @mouseup="stopScroll">
        &uarr;
      </div>
      <div class="variable price">{{ computedPrice }}</div>
      <button class="hold-button" :class="{held: heldField === 'price'}" @click="holdField('price')">Hold</button>
      <div class="arrow down" @mousedown="startScroll('price', 'up')" @mouseup="stopScroll">
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
      heldField: null, // New property to track the held field
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

    // Log the data from the API
    console.log('Locations:', apiData.locations);
    console.log('Sizes:', apiData.sizes);
    console.log('API Prices:', apiData.prices);
    console.log('All Price Combinations:', apiData.allPriceCombinations);

    // Build and set the prices lookup
    this.prices = this.buildPriceLookup(apiData.prices);
    console.log('Prices after setting:', this.prices); // Log the prices after setting them

    // Set other data properties
    if (apiData && apiData.locations && apiData.sizes && apiData.prices) {
      this.locations = apiData.locations;
      this.sizes = apiData.sizes;
      this.allPriceCombinations = apiData.allPriceCombinations || [];

      // Select random values for initial display
      this.selectRandomValues();
    } else {
      console.error('API response does not contain the expected data');
    }
  } catch (error) {
    console.error('Error fetching data from API:', error);
  }
},
    isCombinationValid(changedVariable) {
  if (!this.heldField) return true; // If no field is held, all combinations are valid

  // Check if the current combination is valid for the held field
  return this.allPriceCombinations.some(comb => {
    return comb[this.heldField] === this['selected' + this.capitalizeFirstLetter(this.heldField)] &&
           comb[changedVariable] === this['selected' + this.capitalizeFirstLetter(changedVariable)];
  });
},
    checkValidCombinations(variable) {
  if (!this.heldField) return true; // Always true if no field is held

  return this.allPriceCombinations.some(comb => {
    return comb[this.heldField] === this['selected' + this.capitalizeFirstLetter(this.heldField)] &&
           comb[variable] !== this['selected' + this.capitalizeFirstLetter(variable)];
  });
},
getNewIndex(currentIndex, array) {
      if (this.scrollDirection === 'up') {
        return currentIndex > 0 ? currentIndex - 1 : 0;
      } else if (this.scrollDirection === 'down') {
        return currentIndex < array.length - 1 ? currentIndex + 1 : array.length - 1;
      }
      return currentIndex;
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

   holdField(field) {
    this.heldField = (this.heldField === field) ? null : field;
  },

    startScroll(variable, direction) {
      this.scrollDirection = direction;

      if (variable !== this.heldField) {
        this.genericScroll(variable); // Scroll immediately on click

        // Start automatic scrolling after 0.5 seconds
        this.scrollInterval = setTimeout(() => {
          this.scrollInterval = setInterval(() => {
            this.genericScroll(variable);
          }, this.scrollSpeed);
        }, 500);
      }
    },

    stopScroll() {
      clearTimeout(this.scrollInterval); // Clear the timeout
      clearInterval(this.scrollInterval); // Clear the interval
      this.scrollInterval = null;
    },
    scrollLocation() {
    if (this.heldField === 'location') return;
    this.updateScroll('location');
  },
    scrollSize() {
    if (this.heldField === 'size' || (this.heldField === 'price' && !this.isPriceCombinationAvailable('size'))) return;
    this.updateScroll('size');
  },
    scrollPrice() {
  if (this.heldField === 'price') return;

  const sizePriceMap = this.prices[this.selectedLocation];
  if (!sizePriceMap) {
    console.error('No price data available for location:', this.selectedLocation);
    return;
  }

  const sortedPrices = Object.entries(sizePriceMap).sort((a, b) => a[0].localeCompare(b[0]));

  const currentIndex = sortedPrices.findIndex(([size,]) => size === this.selectedSize);
  if (currentIndex === -1) {
    console.error('Current size not found in price data:', this.selectedSize);
    return;
  }

  const newIndex = this.scrollDirection === 'up'
    ? (currentIndex > 0 ? currentIndex - 1 : sortedPrices.length - 1)
    : (currentIndex < sortedPrices.length - 1 ? currentIndex + 1 : 0);

  const [newSize, newPrice] = sortedPrices[newIndex];
  this.selectedSize = newSize;
  this.selectedPrice = newPrice;
},

    genericScroll(variable) {
  if (this.heldField === variable) return;

  if (variable === 'price') {
    let allCombinations = [];
    for (const location in this.prices) {
      for (const size in this.prices[location]) {
        let priceValue = parseFloat(this.prices[location][size].replace(/[^\d.-]/g, ''));
        allCombinations.push({ location, size, price: this.prices[location][size], priceValue });
      }
    }

    if (this.heldField === 'size') {
      allCombinations = allCombinations.filter(comb => comb.size === this.selectedSize);
    } else if (this.heldField === 'location') {
      allCombinations = allCombinations.filter(comb => comb.location === this.selectedLocation);
    }

    allCombinations.sort((a, b) => a.priceValue - b.priceValue);

    const currentPriceValue = parseFloat(this.selectedPrice.replace(/[^\d.-]/g, ''));
    const currentCombinationIndex = allCombinations.findIndex(comb =>
      comb.location === this.selectedLocation && comb.size === this.selectedSize && comb.priceValue === currentPriceValue);

    let newIndex = (this.scrollDirection === 'up')
      ? (currentCombinationIndex > 0 ? currentCombinationIndex - 1 : allCombinations.length - 1)
      : (currentCombinationIndex < allCombinations.length - 1 ? currentCombinationIndex + 1 : 0);

    const newCombination = allCombinations[newIndex];
    if (this.heldField !== 'location') {
      this.selectedLocation = newCombination.location;
    }
    if (this.heldField !== 'size') {
      this.selectedSize = newCombination.size;
    }
    this.selectedPrice = newCombination.price;
  } else {
    let array = this[variable + 's']; // e.g., this.locations or this.sizes
    let currentIndex = array.indexOf(this['selected' + this.capitalizeFirstLetter(variable)]);
    let newIndex;

    if (this.heldField === 'price') {
      // When price is held, adjust scrolling for 'size' and 'location'
      let validCombinations = this.allPriceCombinations.filter(comb => 
        comb.price === this.selectedPrice
      );

      let filteredArray = validCombinations.map(comb => comb[variable]);
      // Remove duplicates from filteredArray
      filteredArray = [...new Set(filteredArray)];

      currentIndex = filteredArray.indexOf(this['selected' + this.capitalizeFirstLetter(variable)]);
      newIndex = this.getNewIndex(currentIndex, filteredArray);

      if (currentIndex !== -1 && newIndex !== currentIndex) {
        let newCombination = validCombinations.find(comb => 
          comb[variable] === filteredArray[newIndex]
        );
        if (newCombination) {
          this.selectedLocation = newCombination.location;
          this.selectedSize = newCombination.size;
        }
      }
    } else {
      // Original logic for scrolling when price is not held
      do {
        newIndex = (this.scrollDirection === 'up')
          ? (currentIndex > 0 ? currentIndex - 1 : array.length - 1)
          : (currentIndex < array.length - 1 ? currentIndex + 1 : 0);

        this['selected' + this.capitalizeFirstLetter(variable)] = array[newIndex];

        if (!this.heldField || this.isCombinationValid(variable)) {
          break;
        }
      } while (newIndex !== currentIndex);
    }

    // Update price if necessary
    if (this.heldField !== 'price' && variable !== 'price') {
      this.updateSelectedPrice();
    }
  }
},

updateForHeldPrice(variable) {
  const priceCombinations = this.allPriceCombinations.filter(comb =>
    comb.price === this.selectedPrice && comb[variable] === this['selected' + this.capitalizeFirstLetter(variable)]);
  
  if (priceCombinations.length > 0) {
    const match = priceCombinations[0]; // Take the first matching combination
    if (variable === 'location') {
      this.selectedSize = match.size;
    } else if (variable === 'size') {
      this.selectedLocation = match.location;
    }
  }
},

findMatchingPriceForHeldValue() {
  const sizesAtLocation = this.prices[this.selectedLocation] || {};
  for (const size in sizesAtLocation) {
    if (sizesAtLocation[size] === this.selectedPrice) {
      this.selectedSize = size;
      return; // Found a matching price, exit the loop
    }
  }
  // If no matching price is found, the size remains unchanged
},

  updateScroll(variable) {
  let array;
  if (variable === 'location') {
    array = this.locations;
  } else if (variable === 'size') {
    array = this.sizes;
  } else if (variable === 'price') {
    // Handle price separately
    array = this.prices[this.selectedLocation];
    if (!array) {
      console.warn('No price data for selected location:', this.selectedLocation);
      return;
    }
  } else {
    console.warn('Unhandled variable in updateScroll:', variable);
    return;
  }

  const currentIndex = array.indexOf(this['selected' + this.capitalizeFirstLetter(variable)]);
  const maxIndex = array.length - 1;
  const newIndex = this.scrollDirection === 'up' ? (currentIndex > 0 ? currentIndex - 1 : maxIndex) : (currentIndex < maxIndex ? currentIndex + 1 : 0);
  this['selected' + this.capitalizeFirstLetter(variable)] = array[newIndex];

  if (this.heldField !== 'price' && variable !== 'price') {
    this.updateSelectedPrice();
  }
},

  updateSelectedPrice() {
  if (this.heldField === 'price') return;
  this.selectedPrice = this.prices[this.selectedLocation][this.selectedSize];
},

  isPriceCombinationAvailable(heldVariable) {
    return this.allPriceCombinations.some(comb =>
      comb.location === (heldVariable === 'location' ? this.selectedLocation : comb.location) &&
      comb.size === (heldVariable === 'size' ? this.selectedSize : comb.size) &&
      comb.price === this.selectedPrice
    );
  },

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
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
  transition: all 0.3s ease-in-out;
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

.arrow:hover, .hold-button:hover {
  background-color: #f2f2f2;
  transition: background-color 0.2s;
}

.hold-button.held {
  background-color: #ddd;
  box-shadow: 0 0 15px #666;
  transition: box-shadow 0.3s ease-in-out;
}

@keyframes spin {
  0% { transform: translateY(0); }
  100% { transform: translateY(-100%); }
}

.reel .variable {
  animation: spin 0.5s ease-in-out;
}
</style>
