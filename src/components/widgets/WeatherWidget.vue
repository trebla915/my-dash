<template>
  <div class="weather-widget">
    <div class="widget-header">
      <h2>Weather Info</h2>
      <button @click="removeWidget" class="remove-btn">&#8722;</button>
    </div>
    <div v-if="weather && weather.main" class="weather-details">
      <p><strong>Location:</strong> {{ weather.name }}</p>
      <p><strong>Temperature:</strong> {{ weather.main.temp }}°C</p>
      <p><strong>Condition:</strong> {{ weather.weather[0].main }}</p>
    </div>
    <div v-else class="loading">
      Loading weather data...
    </div>
  </div>
</template>

<script>
export default {
  name: 'WeatherWidget',
  props: ['zipCode', 'widgetId'],
  data() {
    return {
      weather: null,
    };
  },
  methods: {
    async fetchWeather() {
      const apiKey = '0d6a42c8a98462a58f8f83c36cad29e9'; // Use your actual API key
      const url = `https://api.openweathermap.org/data/2.5/weather?zip=${this.zipCode},us&appid=${apiKey}&units=metric`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        this.weather = await response.json();
      } catch (error) {
        console.error("Failed to fetch weather data:", error);
        this.weather = null;
      }
    },
    removeWidget() {
      this.$emit('remove-widget', this.widgetId);
    },
  },
  watch: {
    zipCode(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.fetchWeather();
      }
    },
  },
  mounted() {
    this.fetchWeather();
  },
};
</script>

<style scoped>
.weather-widget {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 300px; /* Adjust as needed */
  margin: auto;
}

.widget-header {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

h2 {
  margin: 0;
  font-size: 24px;
  color: #333;
}

.remove-btn {
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  font-size: 24px;
}

.weather-details {
  text-align: center;
}

.loading {
  color: #666;
}
</style>
