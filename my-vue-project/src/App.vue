<template>
  <div id="app">
    <header>
      <h1>localpricehero.com</h1>
      <nav>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <!-- Add more navigation items as needed -->
        </ul>
      </nav>
    </header>

    <main>
      <!-- SlotMachineComponent -->
      <SlotMachineComponent />

      <!-- CalendarComponent -->
      <CalendarComponent />
    </main>
  </div>
</template>

<script>
import SlotMachineComponent from "@/components/SlotMachineComponent.vue";
import CalendarComponent from "@/components/CalendarComponent.vue"; // Make sure this path is correct

export default {
  components: {
    SlotMachineComponent,
    CalendarComponent
  },
};
</script>

<style>
  body {
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f8f8f8;
  }

  #app {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }

  header {
    background-color: #333;
    color: #fff;
    padding: 10px 0;
    text-align: center;
  }

  nav ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  nav li {
    display: inline-block;
    margin-right: 15px;
  }

  nav a {
    text-decoration: none;
    color: #fff;
    font-weight: bold;
    font-size: 16px;
  }

  main {
    background-color: #fff;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  .slot-machine {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: flex-start;
  }
</style>
