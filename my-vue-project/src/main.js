import { createApp } from 'vue';
import App from './App.vue';

// Create the root Vue instance
const app = createApp(App);

// Set the global error handler
app.config.errorHandler = (err, vm, info) => {
    console.error('Global Error Handler:', err, info);
};

// Mount the app
app.mount('#app');
