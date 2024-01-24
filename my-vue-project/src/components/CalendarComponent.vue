<template>
  <div class="calendar">
    <!-- Month Navigation Controls -->
    <div class="month-navigation">
      <button @click="previousMonth">Previous Month</button>
      <button @click="nextMonth">Next Month</button>
    </div>

    <!-- Calendar Grid -->
    <div class="calendar-grid">
      <div 
        v-for="day in daysOfMonth" 
        :key="day.day" 
        class="day" 
        :class="{ 'past-date': isPastDate(day), 'highlighted': day.isHighlighted }"
        @click="selectDate(day)"
      >
        <span class="day-of-week">{{ day.dayOfWeek }}</span>
        <span class="day-number">{{ day.day }}</span>
        <span class="month-year">{{ day.month }} '{{ day.year }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      selectedDate: null,
      invoiceDate: null,
      monthlyRentalRate: null,
      currentDate: new Date(),
      daysOfMonth: []
    };
  },
  methods: {
    selectDate(day) {
      const selectedDate = new Date(day.year, day.month - 1, day.day);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Set to start of today for comparison
      const fourteenDaysLater = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 14);

      if (selectedDate >= fourteenDaysLater) {
        this.selectedDate = day;
        this.highlightFourteenDaysBefore(selectedDate);
      }
    },
    nextMonth() {
      this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
      this.populateDaysOfMonth();
    },
    previousMonth() {
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();

      if (this.currentDate.getFullYear() > currentYear || 
          (this.currentDate.getFullYear() === currentYear && this.currentDate.getMonth() > currentMonth)) {
        this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
        this.populateDaysOfMonth();
      }
    },
    isInvoiceDate(day) {
      return day === this.invoiceDate;
    },
    isPastDate(day) {
      const dateToCheck = new Date(day.year, day.month - 1, day.day);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Set to start of today for comparison
      return dateToCheck < today;
    },
    fetchUserData() {
      axios.get('http://localhost:3001/api/user-data')
        .then(response => {
          this.invoiceDate = response.data.invoiceDate;
          this.monthlyRentalRate = response.data.monthlyRentalRate;
          console.log("Invoice Date:", this.invoiceDate);
          console.log("Monthly Rental Rate:", this.monthlyRentalRate);
        })
        .catch(error => console.error(error));
    },
    calculateRefund() {
      // Implement your refund calculation logic here
    },
    populateDaysOfMonth() {
      const year = this.currentDate.getFullYear();
      const month = this.currentDate.getMonth();
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      this.daysOfMonth = [];
      for (let day = 1; day <= daysInMonth; day++) {
        const dateObj = new Date(year, month, day);
        const dayOfWeek = dateObj.toLocaleString('default', { weekday: 'short' });
        const formattedMonth = dateObj.toLocaleString('default', { month: 'short' });
        const formattedYear = year.toString().substr(-2);

        this.daysOfMonth.push({
          day: day,
          dayOfWeek: dayOfWeek,
          month: formattedMonth,
          year: formattedYear
        });
      }
    },
    highlightFourteenDaysBefore(selectedDate) {
      const startHighlightDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate() - 14);
      
      this.daysOfMonth = this.daysOfMonth.map(day => {
        const dayDate = new Date(day.year, day.month - 1, day.day);
        day.isHighlighted = dayDate >= startHighlightDate && dayDate < selectedDate;
        return day;
      });
    }
  },
  created() {
    this.fetchUserData();
    this.populateDaysOfMonth();
  },
  mounted() {
    console.log("CalendarComponent mounted");
    console.log("Populated Days of Month:", this.daysOfMonth);
  }
};
</script>

<style>
.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 70px); /* 7 days a week */
  justify-content: center;
  gap: 1px;
}

.day {
  display: flex;
  flex-direction: column; /* Stack items vertically */
  align-items: center; /* Center items horizontally */
  justify-content: center; /* Center items vertically */
  padding: 1px;
  border: 1px solid #ccc;
  min-height: 1px; /* Adjust as needed */
}

.invoice-date-indicator {
  color: red;
  font-weight: bold;
}

.selected {
  background-color: #add8e6; /* Light blue background for selected day */
}
.month-navigation {
  text-align: center;
  margin-bottom: 10px;
}

.day-of-week {
  font-size: 12px; /* Adjust the font size as needed */
  margin-bottom: 5px;
}

.day-number {
  font-size: 24px; /* Large font size for day */
  font-weight: bold;
  margin-bottom: 5px; /* Space between day number and month-year */
}

.month-year {
  font-size: 12px; /* Smaller font size for month and year */
}

.past-date {
  color: #ccc; /* Greyed-out text */
  background-color: #f5f5f5; /* Light grey background */
  pointer-events: none; /* Disables clicking */
}

.highlighted {
  background-color: #add8e6; /* Light blue background for highlighted days */
}

</style>
